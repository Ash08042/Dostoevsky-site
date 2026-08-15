import { createHmac, randomBytes } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import {
  createSupabaseAdminClient,
  createSupabasePublicServerClient,
} from "../../../lib/supabase/server";
import { commentCharacterIdSet } from "../../../lib/comment-characters";
import { verifyCommentTurnstile } from "../../../lib/turnstile";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_COMMENT_LENGTH = 400;
const MAX_BODY_BYTES = 12_000;
const RATE_COOKIE = "dostoevsky_comment_rate";
const WORK_SLUG_PATTERN = /^[a-z0-9][a-z0-9:/-]{0,99}$/;
const FORBIDDEN_CONTROL_CHARACTERS = /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/;

type CommentSubmission = {
  characterSlug?: unknown;
  workSlug?: unknown;
  content?: unknown;
  turnstileToken?: unknown;
};

function normalizeContent(value: string) {
  return value.normalize("NFC").replace(/\r\n?/g, "\n").trim();
}

function noStoreJson(body: unknown, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store, max-age=0" },
  });
}

export async function GET(request: NextRequest) {
  const workSlug = request.nextUrl.searchParams.get("work_slug")?.trim() ?? "";
  if (!WORK_SLUG_PATTERN.test(workSlug)) {
    return noStoreJson({ error: "评论页面参数无效。" }, 400);
  }

  try {
    const supabase = createSupabasePublicServerClient();
    const { data, error } = await supabase
      .from("comments")
      .select("id, character_slug, content, created_at")
      .eq("work_slug", workSlug)
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) throw error;
    return noStoreJson({ comments: data ?? [] });
  } catch {
    return noStoreJson({ error: "评论暂时无法读取。" }, 503);
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (origin && origin !== request.nextUrl.origin) {
    return noStoreJson({ error: "提交来源无效。" }, 403);
  }

  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return noStoreJson({ error: "提交内容过大。" }, 413);
  }

  let submission: CommentSubmission;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
      return noStoreJson({ error: "提交内容过大。" }, 413);
    }
    submission = JSON.parse(rawBody) as CommentSubmission;
  } catch {
    return noStoreJson({ error: "评论格式无效。" }, 400);
  }

  const workSlug = typeof submission.workSlug === "string" ? submission.workSlug.trim() : "";
  const characterSlug =
    typeof submission.characterSlug === "string" ? submission.characterSlug.trim() : "";
  const content =
    typeof submission.content === "string" ? normalizeContent(submission.content) : "";
  const turnstileToken =
    typeof submission.turnstileToken === "string" ? submission.turnstileToken : "";

  if (!WORK_SLUG_PATTERN.test(workSlug)) {
    return noStoreJson({ error: "评论页面参数无效。" }, 400);
  }
  if (characterSlug && !commentCharacterIdSet.has(characterSlug)) {
    return noStoreJson({ error: "评论角色无效。" }, 400);
  }
  if (
    !content ||
    Array.from(content).length > MAX_COMMENT_LENGTH ||
    content.includes("<") ||
    content.includes(">") ||
    FORBIDDEN_CONTROL_CHARACTERS.test(content)
  ) {
    return noStoreJson({ error: `评论须为 1—${MAX_COMMENT_LENGTH} 字的纯文本。` }, 400);
  }

  try {
    const captchaPassed = await verifyCommentTurnstile(turnstileToken);
    if (!captchaPassed) return noStoreJson({ error: "人机验证未通过，请重试。" }, 400);

    const rateLimitSecret = process.env.COMMENT_RATE_LIMIT_SECRET?.trim();
    if (!rateLimitSecret) throw new Error("missing_server_env:COMMENT_RATE_LIMIT_SECRET");

    const existingRateToken = request.cookies.get(RATE_COOKIE)?.value;
    const rateToken =
      existingRateToken && /^[a-f0-9]{64}$/.test(existingRateToken)
        ? existingRateToken
        : randomBytes(32).toString("hex");
    const rateKey = createHmac("sha256", rateLimitSecret).update(rateToken).digest("hex");

    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase.rpc("submit_comment", {
      p_character_slug: characterSlug || null,
      p_content: content,
      p_rate_key: rateKey,
      p_work_slug: workSlug,
    });

    if (error) {
      if (error.message.includes("rate_limit_exceeded")) {
        return noStoreJson({ error: "提交过于频繁，请十分钟后再试。" }, 429);
      }
      if (error.message.includes("invalid_")) {
        return noStoreJson({ error: "评论内容无效。" }, 400);
      }
      throw error;
    }

    const inserted = Array.isArray(data) ? data[0] : undefined;
    const response = noStoreJson(
      {
        comment: {
          id: inserted?.comment_id,
          character_slug: inserted?.comment_character_slug ?? null,
          content,
          created_at: inserted?.comment_created_at,
        },
        status: "approved",
      },
      201,
    );
    response.cookies.set(RATE_COOKIE, rateToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });
    return response;
  } catch {
    return noStoreJson({ error: "评论服务尚未配置或暂时不可用。" }, 503);
  }
}
