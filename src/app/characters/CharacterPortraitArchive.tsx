"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { commentCharacterIds } from "../../lib/comment-characters";
import { characters } from "../HomeCharacterPortraits";
import {
  buildCharacterBiography,
  getCharacterRelations,
  getSupportingCharacter,
} from "./character-profile-data";
import TurnstileWidget, { type TurnstileWidgetHandle } from "./TurnstileWidget";

type CharacterPortraitArchiveProps = {
  initialCharacterId?: string;
};

type AnonymousComment = {
  character_slug: string | null;
  content: string;
  created_at: string;
  id: string;
};

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
];

// 先按作品的普通读者知名度排序，再按同一作品中人物的受欢迎程度排序。
const orderedCharacters = commentCharacterIds.flatMap((id) => {
  const character = characters.find((item) => item.id === id);
  return character ? [character] : [];
});

const characterGroups = orderedCharacters.reduce<
  { characters: typeof orderedCharacters; work: string }[]
>((groups, character) => {
  const group = groups.find((item) => item.work === character.work);
  if (group) {
    group.characters.push(character);
  } else {
    groups.push({ characters: [character], work: character.work });
  }
  return groups;
}, []);

function CommentCharacterPicker({
  onSelect,
  value,
}: {
  onSelect: (characterId: string) => void;
  value: string;
}) {
  const selectedCharacter = orderedCharacters.find((character) => character.id === value);
  const [isOpen, setIsOpen] = useState(false);
  const [activeWork, setActiveWork] = useState(
    selectedCharacter?.work ?? characterGroups[0]?.work ?? "",
  );
  const pickerRef = useRef<HTMLDivElement>(null);
  const activeGroup =
    characterGroups.find((group) => group.work === activeWork) ?? characterGroups[0];

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (!pickerRef.current?.contains(event.target as Node)) setIsOpen(false);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={pickerRef}>
      <label
        className="mb-2 block text-[9px] tracking-[0.14em] text-paper/45"
        id="comment-character-label"
      >
        选择评论角色（可选）
      </label>
      <div className="relative">
        <button
          aria-controls="comment-character-menu"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          aria-labelledby="comment-character-label comment-character-trigger"
          className="text-paper/72 flex min-h-11 w-full items-center justify-between gap-4 border border-paper/15 bg-[#0d0e10] px-4 text-left font-display text-sm outline-none transition hover:border-paper/30 focus-visible:border-paper/40"
          id="comment-character-trigger"
          onClick={() => {
            if (!isOpen && selectedCharacter) setActiveWork(selectedCharacter.work);
            setIsOpen((open) => !open);
          }}
          type="button"
        >
          <span>
            {selectedCharacter
              ? `《${selectedCharacter.work}》 · ${selectedCharacter.name}`
              : "不选择角色 · 匿名评论"}
          </span>
          <span aria-hidden="true" className="text-[10px] text-[#bca36c]">
            {isOpen ? "▴" : "▾"}
          </span>
        </button>

        {isOpen ? (
          <div
            aria-label="按作品选择评论角色"
            className="absolute left-0 right-0 z-30 mt-1 border border-paper/20 bg-[#0b0c0e] shadow-[0_18px_40px_rgba(0,0,0,.42)]"
            id="comment-character-menu"
            role="menu"
          >
            <button
              className="text-paper/58 flex min-h-11 w-full items-center justify-between border-b border-paper/10 px-4 text-left text-xs transition hover:bg-paper/[.05] hover:text-paper focus-visible:bg-paper/[.05] focus-visible:text-paper"
              onClick={() => {
                onSelect("");
                setIsOpen(false);
              }}
              role="menuitem"
              type="button"
            >
              <span>不选择角色</span>
              <span className="font-display text-paper/40">匿名评论</span>
            </button>

            <div className="grid h-[min(360px,52vh)] grid-cols-[minmax(116px,.95fr)_minmax(0,1.05fr)] overflow-hidden">
              <div
                aria-label="作品列表"
                className="overflow-y-scroll overscroll-contain border-r border-paper/10 py-1 [scrollbar-color:rgba(188,163,108,.38)_transparent] [scrollbar-width:thin]"
                role="group"
              >
                {characterGroups.map((group) => {
                  const isActive = group.work === activeGroup?.work;
                  return (
                    <button
                      aria-expanded={isActive}
                      className={`flex min-h-10 w-full items-center justify-between gap-2 px-3 py-2 text-left text-[11px] leading-4 transition sm:px-4 ${
                        isActive
                          ? "bg-paper/[.07] text-paper"
                          : "text-paper/48 hover:text-paper/78 hover:bg-paper/[.035]"
                      }`}
                      key={group.work}
                      onClick={() => setActiveWork(group.work)}
                      onFocus={() => setActiveWork(group.work)}
                      onMouseEnter={() => setActiveWork(group.work)}
                      role="menuitem"
                      type="button"
                    >
                      <span>《{group.work}》</span>
                      <span aria-hidden="true" className="shrink-0 text-[9px] text-[#bca36c]">
                        ›
                      </span>
                    </button>
                  );
                })}
              </div>

              <div
                aria-label="角色列表"
                aria-live="polite"
                className="overflow-y-auto p-2"
                role="group"
              >
                <p className="px-2 pb-2 pt-1 text-[8px] tracking-[0.12em] text-paper/30">
                  《{activeGroup?.work}》
                </p>
                {activeGroup?.characters.map((character) => (
                  <button
                    aria-checked={character.id === value}
                    className={`flex min-h-10 w-full items-center justify-between px-2 text-left font-display text-sm transition hover:bg-paper/[.05] hover:text-paper focus-visible:bg-paper/[.05] focus-visible:text-paper ${
                      character.id === value ? "text-[#c7ad72]" : "text-paper/65"
                    }`}
                    key={character.id}
                    onClick={() => {
                      onSelect(character.id);
                      setIsOpen(false);
                    }}
                    role="menuitemradio"
                    type="button"
                  >
                    <span>{character.name}</span>
                    {character.id === value ? (
                      <span aria-hidden="true" className="text-[9px]">
                        ●
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function formatCommentTime(timestamp: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(timestamp));
}

function RelationshipGraph({ characterId }: { characterId: string }) {
  const activeCharacter = characters.find((character) => character.id === characterId)!;
  const relations = getCharacterRelations(characterId).flatMap((relation) => {
    const archiveCharacter = characters.find((character) => character.id === relation.targetId);
    if (archiveCharacter) {
      return [{ ...relation, character: archiveCharacter, isArchiveCharacter: true }];
    }

    const supportingCharacter = getSupportingCharacter(relation.targetId);
    return supportingCharacter
      ? [{ ...relation, character: supportingCharacter, isArchiveCharacter: false }]
      : [];
  });
  const center = { x: 260, y: 280 };
  const positions = relations.map((_, index) => {
    const isLeft = index % 2 === 0;
    const sideIndex = Math.floor(index / 2);
    const sideCount = isLeft ? Math.ceil(relations.length / 2) : Math.floor(relations.length / 2);
    const spacing = 108;
    return {
      x: isLeft ? 98 : 422,
      y: center.y - ((sideCount - 1) * spacing) / 2 + sideIndex * spacing,
    };
  });

  return (
    <svg
      aria-describedby="relationship-graph-description"
      aria-label={`${activeCharacter.name}人物关系图`}
      className="h-auto w-full min-w-[440px] font-display sm:min-w-0"
      role="img"
      viewBox="0 0 520 560"
    >
      <desc id="relationship-graph-description">
        {activeCharacter.name}与《{activeCharacter.work}》中主要人物及重要配角的关系。
      </desc>

      <g aria-hidden="true">
        {relations.map((relation, index) => {
          const position = positions[index];

          return (
            <line
              key={`${characterId}-${relation.targetId}`}
              stroke="rgba(188,163,108,.34)"
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
              x1={center.x}
              x2={position.x}
              y1={center.y}
              y2={position.y}
            />
          );
        })}
      </g>

      {relations.map((relation, index) => {
        const position = positions[index];
        const relatedCharacter = relation.character;
        const nameSize =
          relatedCharacter.name.length > 11 ? 13.5 : relatedCharacter.name.length > 8 ? 15 : 17;
        const relationSize = relation.label.length > 11 ? 10 : 11.5;
        const nodeContent = (
          <g
            className={relation.isArchiveCharacter ? "group cursor-pointer" : undefined}
            role={relation.isArchiveCharacter ? undefined : "group"}
          >
            <rect
              className={
                relation.isArchiveCharacter
                  ? "fill-[#151618] stroke-paper/25 transition group-hover:stroke-[#bca36c] group-focus:stroke-[#bca36c]"
                  : "fill-[#111214] stroke-paper/15"
              }
              height="64"
              strokeDasharray={relation.isArchiveCharacter ? undefined : "4 3"}
              vectorEffect="non-scaling-stroke"
              width="178"
              x={position.x - 89}
              y={position.y - 32}
            />
            <text
              dominantBaseline="middle"
              fill={relation.isArchiveCharacter ? "rgba(229,224,212,.9)" : "rgba(229,224,212,.72)"}
              fontSize={nameSize}
              textAnchor="middle"
              x={position.x}
              y={position.y - 8}
            >
              {relatedCharacter.name}
            </text>
            <text
              dominantBaseline="middle"
              fill="rgba(188,163,108,.78)"
              fontFamily="var(--font-sans)"
              fontSize={relationSize}
              letterSpacing=".04em"
              textAnchor="middle"
              x={position.x}
              y={position.y + 15}
            >
              {relation.label}
            </text>
          </g>
        );

        return relation.isArchiveCharacter ? (
          <Link
            aria-label={`查看${relatedCharacter.name}人物档案`}
            href={`/characters/${relatedCharacter.id}`}
            key={relatedCharacter.id}
          >
            {nodeContent}
          </Link>
        ) : (
          <g aria-label={`${relatedCharacter.name}：${relation.label}`} key={relatedCharacter.id}>
            {nodeContent}
          </g>
        );
      })}

      <g aria-hidden="true">
        <rect
          fill="#0b0c0e"
          height="78"
          stroke="#bca36c"
          vectorEffect="non-scaling-stroke"
          width="140"
          x={center.x - 70}
          y={center.y - 39}
        />
        <text
          dominantBaseline="middle"
          fill="rgba(188,163,108,.72)"
          fontFamily="var(--font-sans)"
          fontSize="9.5"
          letterSpacing=".16em"
          textAnchor="middle"
          x={center.x}
          y={center.y - 17}
        >
          中心人物
        </text>
        <text
          dominantBaseline="middle"
          fill="#e5e0d4"
          fontSize={
            activeCharacter.name.length > 8 ? 13.5 : activeCharacter.name.length > 6 ? 15 : 18
          }
          textAnchor="middle"
          x={center.x}
          y={center.y + 9}
        >
          {activeCharacter.name}
        </text>
      </g>
    </svg>
  );
}

export default function CharacterPortraitArchive({
  initialCharacterId = "raskolnikov",
}: CharacterPortraitArchiveProps) {
  const router = useRouter();
  const activeCharacter =
    characters.find((character) => character.id === initialCharacterId) ?? characters[0];
  const biography = useMemo(() => buildCharacterBiography(activeCharacter), [activeCharacter]);
  const [comments, setComments] = useState<AnonymousComment[]>([]);
  const [draft, setDraft] = useState("");
  const [selectedCharacterSlug, setSelectedCharacterSlug] = useState("");
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const threadSlug = `character:${activeCharacter.id}`;

  useEffect(() => {
    let disposed = false;

    async function loadComments(showLoading = false) {
      if (showLoading) setCommentsLoading(true);
      try {
        const response = await fetch(`/api/comments?work_slug=${encodeURIComponent(threadSlug)}`, {
          cache: "no-store",
        });
        const result = (await response.json()) as {
          comments?: AnonymousComment[];
          error?: string;
        };
        if (!response.ok) throw new Error(result.error ?? "评论暂时无法读取。");
        if (!disposed) {
          setComments(result.comments ?? []);
        }
      } catch {
        if (!disposed) {
          setComments([]);
        }
      } finally {
        if (!disposed) setCommentsLoading(false);
      }
    }

    void loadComments(true);
    const poll = window.setInterval(() => void loadComments(), 30_000);
    setDraft("");
    setSelectedCharacterSlug("");
    setSubmitMessage("");
    turnstileRef.current?.reset();

    return () => {
      disposed = true;
      window.clearInterval(poll);
    };
  }, [threadSlug]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || submitting) return;

    setSubmitting(true);
    setSubmitMessage("");
    try {
      const turnstileToken = await turnstileRef.current?.execute();
      if (!turnstileToken) throw new Error("评论验证暂时不可用，请稍后再试。");

      const response = await fetch("/api/comments", {
        body: JSON.stringify({
          characterSlug: selectedCharacterSlug || null,
          content,
          turnstileToken,
          workSlug: threadSlug,
        }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });
      const result = (await response.json()) as {
        comment?: AnonymousComment;
        error?: string;
      };
      if (!response.ok) throw new Error(result.error ?? "评论提交失败，请稍后再试。");

      if (result.comment?.id && result.comment.created_at) {
        setComments((current) => [result.comment!, ...current]);
      }
      setDraft("");
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : "评论提交失败，请稍后再试。");
    } finally {
      turnstileRef.current?.reset();
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030303] px-4 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-[#27272a] pb-5">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">
          F·D
        </Link>
        <span className="hidden text-[10px] uppercase tracking-museum text-[#767d88] sm:block">
          Dostoevsky · fictional lives
        </span>
        <span className="text-[10px] tracking-[0.16em] text-[#767d88] sm:hidden">人物群像</span>
      </nav>

      <div className="mx-auto max-w-[1500px] py-12 sm:py-16 lg:grid lg:grid-cols-[155px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-12 lg:mb-0">
          <p className="text-[10px] tracking-museum text-[#767d88]">04 / ARCHIVE</p>
          <div className="archive-sidebar-nav mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[#767d88] lg:grid lg:gap-y-5">
            {navigation.map(([label, href]) => (
              <Link
                className={`transition hover:text-paper ${href === "/characters" ? "text-paper" : ""}`}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </aside>

        <section className="min-w-0">
          <header className="archive-rule grid gap-7 border-t pt-6 lg:grid-cols-[1fr_2fr]">
            <p className="text-[10px] uppercase tracking-museum text-ash">Fictional lives / 036</p>
            <div>
              <h1 className="font-display text-6xl leading-none sm:text-8xl">人物群像</h1>
              <p className="text-paper/62 mt-7 max-w-2xl text-sm leading-7">
                从人物姓名进入小传，在关系图中查看同一部原著里的精神牵引，并留下不署名的阅读回应。
              </p>
            </div>
          </header>

          <div className="archive-rule mt-12 grid border-t lg:grid-cols-[minmax(180px,.52fr)_minmax(340px,1.08fr)_minmax(360px,1fr)] xl:grid-cols-[minmax(180px,.44fr)_minmax(350px,.92fr)_minmax(430px,1.14fr)]">
            <section className="archive-rule border-b py-7 lg:border-b-0 lg:border-r lg:pr-6">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-ash">
                <h2>人物姓名</h2>
                <span>36 figures</span>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-x-4 sm:grid-cols-3 lg:grid-cols-1">
                {orderedCharacters.map((character, index) => {
                  const isActive = character.id === activeCharacter.id;
                  return (
                    <Link
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex min-h-11 items-center gap-3 border-b border-paper/[.08] py-3 transition ${
                        isActive ? "text-paper" : "text-paper/48 hover:text-paper"
                      }`}
                      href={`/characters/${character.id}`}
                      key={character.id}
                      onClick={(event) => {
                        if (window.matchMedia("(max-width: 1023px)").matches) {
                          event.preventDefault();
                          router.push(`/characters/${character.id}#character-biography`);
                        }
                      }}
                    >
                      <span className="w-5 text-[8px] tabular-nums text-[#bca36c]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="font-display text-[15px] leading-5">{character.name}</span>
                    </Link>
                  );
                })}
              </div>
            </section>

            <section
              className="archive-rule scroll-mt-4 border-b py-7 lg:border-b-0 lg:border-r lg:px-8"
              id="character-biography"
            >
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-ash">
                <h2>人物小传</h2>
                <span>{biography.length} 字</span>
              </div>

              <div className="mt-7 grid gap-7 sm:grid-cols-[132px_1fr] lg:block xl:grid xl:grid-cols-[146px_1fr]">
                <div className="relative aspect-[3/4] overflow-hidden border border-paper/15 bg-[#0b0c0e]">
                  {activeCharacter.image ? (
                    <Image
                      alt={`${activeCharacter.name}人物插图`}
                      className="object-contain brightness-[.74] contrast-[.94] saturate-[.5] sepia-[.06]"
                      fill
                      priority
                      sizes="146px"
                      src={activeCharacter.image}
                      style={{ objectPosition: activeCharacter.imagePosition }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center">
                      <span className="font-display text-7xl text-paper/[.06]">
                        {activeCharacter.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-[0.16em] text-[#bca36c]">
                    《{activeCharacter.work}》 · {activeCharacter.year}
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.05] tracking-[-0.025em]">
                    {activeCharacter.name}
                  </h2>
                  <div className="text-paper/72 mt-5 flex items-center gap-3 text-sm">
                    <span>{activeCharacter.conflict[0]}</span>
                    <span aria-hidden="true" className="h-px flex-1 bg-paper/15" />
                    <span>{activeCharacter.conflict[1]}</span>
                  </div>
                </div>
              </div>

              <p className="text-paper/68 mt-8 text-[14px] leading-8">{biography}</p>

              <section className="archive-rule mt-12 border-t pt-6" aria-labelledby="comment-title">
                <h3 className="font-display text-2xl" id="comment-title">
                  人物评论
                </h3>

                <form className="mt-6" onSubmit={submitComment}>
                  <div className="mb-4">
                    <CommentCharacterPicker
                      onSelect={setSelectedCharacterSlug}
                      value={selectedCharacterSlug}
                    />
                  </div>
                  <label className="sr-only" htmlFor="anonymous-character-comment">
                    评论内容
                  </label>
                  <textarea
                    className="min-h-28 w-full resize-y border border-paper/15 bg-black/20 p-4 text-sm leading-7 text-paper outline-none transition placeholder:text-paper/25 focus:border-paper/40"
                    id="anonymous-character-comment"
                    maxLength={400}
                    onChange={(event) => setDraft(event.target.value)}
                    placeholder={`写下你对${activeCharacter.name}的想法......`}
                    value={draft}
                  />
                  <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                    <span className="text-[9px] tabular-nums text-paper/30">
                      {draft.length} / 400
                    </span>
                    <TurnstileWidget
                      ref={turnstileRef}
                      siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""}
                    />
                    <button
                      className="min-h-11 border border-paper/25 px-5 text-[10px] tracking-[0.14em] text-paper/70 transition hover:border-paper/50 hover:text-paper disabled:cursor-not-allowed disabled:opacity-30"
                      disabled={!draft.trim() || submitting}
                      type="submit"
                    >
                      {submitting ? "发送中" : "发送"}
                    </button>
                  </div>
                  {submitMessage ? (
                    <p className="mt-3 text-xs leading-6 text-paper/50" role="status">
                      {submitMessage}
                    </p>
                  ) : null}
                </form>

                <div className="mt-7 space-y-4" aria-live="polite">
                  {commentsLoading ? (
                    <p className="border-l border-paper/10 py-2 pl-4 text-xs text-paper/30">
                      正在读取评论……
                    </p>
                  ) : comments.length ? (
                    comments.map((comment) => {
                      const commentCharacter = characters.find(
                        (character) => character.id === comment.character_slug,
                      );

                      return (
                        <article
                          className="border-l border-paper/15 bg-[linear-gradient(90deg,rgba(229,224,212,.035),transparent_72%)] px-4 py-4"
                          key={comment.id}
                        >
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                            <span className="font-sans text-[10px] tracking-[0.14em] text-ash">
                              {commentCharacter?.name ?? "匿名"}
                            </span>
                            <span aria-hidden="true" className="h-px min-w-6 flex-1 bg-paper/10" />
                            <time
                              className="text-[8px] tracking-[0.12em] text-ash opacity-60"
                              dateTime={comment.created_at}
                            >
                              {formatCommentTime(comment.created_at)}
                            </time>
                          </div>
                          <p className="text-paper/66 mt-3 whitespace-pre-wrap break-words text-sm leading-7">
                            {comment.content}
                          </p>
                        </article>
                      );
                    })
                  ) : (
                    <p className="border-l border-paper/10 py-2 pl-4 text-xs leading-6 text-paper/30">
                      暂无公开评论。
                    </p>
                  )}
                </div>
              </section>
            </section>

            <section className="min-w-0 py-7 lg:pl-8">
              <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.16em] text-ash">
                <h2>原著人物关系</h2>
                <span>《{activeCharacter.work}》</span>
              </div>
              <div className="archive-rule mt-6 overflow-x-auto border bg-[#101113] p-3 sm:p-5 lg:sticky lg:top-7">
                <RelationshipGraph characterId={activeCharacter.id} />
                <p className="text-paper/36 border-t border-paper/10 pt-4 text-[9px] leading-5 tracking-[0.08em]">
                  关系卡同时收录主要人物与重要配角；虚线框为配角，实线框可点击切换人物档案。
                </p>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
