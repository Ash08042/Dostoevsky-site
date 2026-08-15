import "server-only";

type TurnstileVerification = {
  action?: string;
  "error-codes"?: string[];
  hostname?: string;
  metadata?: {
    result_with_testing_key?: boolean;
  };
  success?: boolean;
};

export async function verifyCommentTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) throw new Error("missing_server_env:TURNSTILE_SECRET_KEY");
  if (!token || token.length > 2048) return false;

  const body = new URLSearchParams({ secret, response: token });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    body,
    cache: "no-store",
    method: "POST",
    signal: AbortSignal.timeout(8_000),
  });
  if (!response.ok) return false;

  const result = (await response.json()) as TurnstileVerification;
  const expectedHostname = process.env.TURNSTILE_EXPECTED_HOSTNAME?.trim();
  const isOfficialLocalTest =
    process.env.NODE_ENV !== "production" && secret === "1x0000000000000000000000000000000AA";

  const accepted = isOfficialLocalTest
    ? Boolean(result.success && (!expectedHostname || result.hostname === expectedHostname))
    : Boolean(
        result.success &&
        result.action === "comment" &&
        (!expectedHostname || result.hostname === expectedHostname),
      );

  if (!accepted && process.env.NODE_ENV !== "production") {
    console.warn("[turnstile] Siteverify rejected a comment token", {
      action: result.action,
      errorCodes: result["error-codes"] ?? [],
      hostname: result.hostname,
      success: result.success,
      testingKey: isOfficialLocalTest || result.metadata?.result_with_testing_key === true,
    });
  }

  return accepted;
}
