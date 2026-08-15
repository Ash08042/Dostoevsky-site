"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { workAnchorId } from "../lib/archive-links";

type ThemeSlug = "suffering" | "evil" | "love" | "freedom" | "faith";

type StarTheme = {
  slug: ThemeSlug;
  number: string;
  title: string;
  english: string;
  x: number;
  y: number;
  characters: string[];
  works: string[];
};

const starThemes: readonly StarTheme[] = [
  {
    slug: "suffering",
    number: "01",
    title: "苦难",
    english: "SUFFERING",
    x: 50,
    y: 51,
    characters: ["索尼娅", "娜斯塔霞", "伊万", "阿辽沙"],
    works: ["《死屋手记》", "《罪与罚》", "《白痴》", "《卡拉马佐夫兄弟》"],
  },
  {
    slug: "evil",
    number: "02",
    title: "罪恶",
    english: "EVIL",
    x: 21,
    y: 52,
    characters: ["地下室人", "拉斯柯尔尼科夫", "斯塔夫罗金", "斯乜尔加科夫"],
    works: ["《地下室手记》", "《罪与罚》", "《群魔》", "《卡拉马佐夫兄弟》"],
  },
  {
    slug: "love",
    number: "03",
    title: "爱",
    english: "LOVE",
    x: 79,
    y: 52,
    characters: ["杰武什金", "索尼娅", "梅诗金", "阿辽沙"],
    works: ["《穷人》", "《白痴》", "《罪与罚》", "《卡拉马佐夫兄弟》"],
  },
  {
    slug: "freedom",
    number: "04",
    title: "自由",
    english: "FREEDOM",
    x: 50,
    y: 17,
    characters: ["地下室人", "拉斯柯尔尼科夫", "斯塔夫罗金", "伊万"],
    works: ["《地下室手记》", "《罪与罚》", "《群魔》", "《卡拉马佐夫兄弟》"],
  },
  {
    slug: "faith",
    number: "05",
    title: "信仰",
    english: "FAITH",
    x: 50,
    y: 85,
    characters: ["梅诗金", "基里洛夫", "伊万", "阿辽沙", "佐西马"],
    works: ["《白痴》", "《群魔》", "《少年》", "《卡拉马佐夫兄弟》"],
  },
];

const characterProfileIds: Record<string, string> = {
  索尼娅: "sonya",
  娜斯塔霞: "nastassya",
  伊万: "ivan-karamazov",
  阿辽沙: "alyosha-karamazov",
  地下室人: "underground-man",
  拉斯柯尔尼科夫: "raskolnikov",
  斯塔夫罗金: "stavrogin",
  斯乜尔加科夫: "smerdyakov",
  杰武什金: "devushkin",
  梅诗金: "myshkin",
  基里洛夫: "kirillov",
};

const edges: [ThemeSlug, ThemeSlug][] = [
  ["suffering", "evil"],
  ["suffering", "freedom"],
  ["suffering", "love"],
  ["evil", "freedom"],
  ["evil", "faith"],
  ["freedom", "love"],
  ["freedom", "faith"],
  ["love", "faith"],
];

const stars = [
  [4, 12, 1],
  [10, 67, 2],
  [15, 29, 1],
  [18, 88, 1],
  [23, 8, 1],
  [27, 73, 1],
  [33, 38, 2],
  [36, 94, 1],
  [41, 23, 1],
  [46, 70, 1],
  [52, 7, 2],
  [55, 91, 1],
  [61, 31, 1],
  [64, 64, 2],
  [69, 14, 1],
  [73, 82, 1],
  [78, 34, 1],
  [82, 7, 1],
  [87, 61, 2],
  [91, 25, 1],
  [94, 89, 1],
  [97, 44, 1],
  [7, 44, 1],
  [31, 58, 1],
] as const;

function pointFor(slug: ThemeSlug) {
  const theme = starThemes.find((item) => item.slug === slug);
  return { x: theme?.x ?? 0, y: theme?.y ?? 0 };
}

export default function HomeIdeasConstellation() {
  const prefersReducedMotion = useReducedMotion();
  const [activeSlug, setActiveSlug] = useState<ThemeSlug>("suffering");
  const activeTheme = starThemes.find((theme) => theme.slug === activeSlug) ?? starThemes[0];

  return (
    <section
      className="archive-rule relative overflow-hidden border-b bg-[#07090c] px-5 py-20 sm:px-10 sm:py-24"
      id="ideas-constellation"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_36%_46%,rgba(75,86,105,.14),transparent_30%),radial-gradient(circle_at_72%_22%,rgba(140,113,64,.07),transparent_22%),linear-gradient(180deg,#080a0d,#050607)]"
      />
      <div aria-hidden="true" className="absolute inset-0 opacity-70">
        {stars.map(([x, y, size], index) => (
          <span
            className="absolute rounded-full bg-paper"
            key={`${x}-${y}`}
            style={{
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              opacity: 0.18 + (index % 4) * 0.11,
            }}
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-7xl">
        <header className="archive-rule grid gap-6 border-t pt-6 md:grid-cols-[1fr_2fr]">
          <p className="text-[10px] uppercase tracking-museum text-ash">
            Five ideas · one constellation
          </p>
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl leading-none sm:text-5xl">思想星图</h2>
              <p className="text-paper/42 mt-4 text-[10px] tracking-[0.13em]">
                苦难 · 罪恶 · 爱 · 自由 · 信仰
              </p>
            </div>
            <p className="text-paper/42 hidden text-[10px] tracking-[0.12em] sm:block">
              悬停展开关系 · 点击进入主题
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(300px,.55fr)] lg:items-stretch lg:gap-12">
          <div
            className="archive-rule relative h-[430px] overflow-hidden border bg-black/20 sm:h-[520px]"
            aria-label="思想主题星图"
          >
            <svg
              aria-hidden="true"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="none"
              viewBox="0 0 100 100"
            >
              {edges.map(([fromSlug, toSlug]) => {
                const from = pointFor(fromSlug);
                const to = pointFor(toSlug);
                const active = fromSlug === activeSlug || toSlug === activeSlug;
                return (
                  <motion.line
                    animate={{ opacity: active ? 0.72 : 0.24 }}
                    key={`${fromSlug}-${toSlug}`}
                    stroke={active ? "rgba(211,193,153,.72)" : "rgba(144,153,168,.42)"}
                    strokeWidth={active ? 0.28 : 0.16}
                    vectorEffect="non-scaling-stroke"
                    x1={from.x}
                    x2={to.x}
                    y1={from.y}
                    y2={to.y}
                  />
                );
              })}
            </svg>

            {starThemes.map((theme) => {
              const active = theme.slug === activeSlug;
              const central = theme.slug === "suffering";
              return (
                <Link
                  aria-label={`进入“${theme.title}”主题介绍`}
                  className={`group absolute z-10 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border text-center transition duration-300 focus:outline-none ${central ? "h-24 w-24 sm:h-28 sm:w-28" : "h-[72px] w-[72px] sm:h-20 sm:w-20"} ${active ? "border-[#d2bd8b] bg-[#15171a] text-paper shadow-[0_0_0_7px_rgba(198,173,115,.06),0_0_34px_rgba(198,173,115,.12)]" : "text-paper/68 border-[#707782]/55 bg-[#090b0e]/90 hover:border-paper/65 hover:text-paper"}`}
                  href={`/ideas/${theme.slug}`}
                  key={theme.slug}
                  onFocus={() => setActiveSlug(theme.slug)}
                  onMouseEnter={() => setActiveSlug(theme.slug)}
                  style={{ left: `${theme.x}%`, top: `${theme.y}%` }}
                >
                  <span>
                    <span className="block text-[7px] tracking-[0.16em] text-paper/35">
                      {theme.number}
                    </span>
                    <span
                      className={`${central ? "text-2xl" : "text-xl"} mt-1.5 block font-display`}
                    >
                      {theme.title}
                    </span>
                  </span>
                </Link>
              );
            })}

            <p className="text-paper/28 absolute bottom-4 left-4 text-[8px] uppercase tracking-[0.15em]">
              Constellation / 05
            </p>
          </div>

          <aside
            className="archive-rule bg-black/32 relative min-h-[430px] overflow-hidden border p-6 sm:min-h-[520px] sm:p-8"
            aria-live="polite"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                initial={{ opacity: 0, x: prefersReducedMotion ? 0 : 12 }}
                key={activeTheme.slug}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[8px] uppercase tracking-[0.17em] text-[#bca36c]">
                      {activeTheme.number} / {activeTheme.english}
                    </p>
                    <h3 className="mt-3 font-display text-4xl tracking-[-0.035em] text-paper">
                      {activeTheme.title}
                    </h3>
                  </div>
                  <Link
                    className="text-paper/42 text-lg transition hover:text-paper"
                    href={`/ideas/${activeTheme.slug}`}
                    aria-label={`进入“${activeTheme.title}”主题介绍`}
                  >
                    ↗
                  </Link>
                </div>

                <div className="border-paper/22 relative mt-8 border-l pl-6">
                  <div>
                    <p className="text-paper/38 text-[8px] uppercase tracking-[0.16em]">人物</p>
                    <ul className="mt-3 space-y-2.5">
                      {activeTheme.characters.map((character) => {
                        const profileId = characterProfileIds[character];

                        return (
                          <li
                            className="before:bg-paper/22 relative before:absolute before:-left-6 before:top-1/2 before:h-px before:w-4"
                            key={character}
                          >
                            {profileId ? (
                              <Link
                                className="text-paper/72 group inline-flex min-h-7 items-center gap-2 text-xs transition hover:text-paper focus-visible:text-paper sm:text-sm"
                                href={`/characters/${profileId}#character-biography`}
                              >
                                <span>{character}</span>
                                <span
                                  aria-hidden="true"
                                  className="translate-x-0 text-[9px] text-[#bca36c] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                                >
                                  ↗
                                </span>
                              </Link>
                            ) : (
                              <span className="text-paper/72 inline-flex min-h-7 items-center text-xs sm:text-sm">
                                {character}
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="mt-7">
                    <p className="text-paper/38 text-[8px] uppercase tracking-[0.16em]">作品</p>
                    <ul className="mt-3 space-y-2.5">
                      {activeTheme.works.map((work) => (
                        <li
                          className="before:bg-paper/22 relative before:absolute before:-left-6 before:top-1/2 before:h-px before:w-4"
                          key={work}
                        >
                          <Link
                            className="text-paper/72 group inline-flex min-h-7 items-center gap-2 text-xs transition hover:text-paper focus-visible:text-paper sm:text-sm"
                            href={`/works#${workAnchorId(work)}`}
                          >
                            <span>{work}</span>
                            <span
                              aria-hidden="true"
                              className="translate-x-0 text-[9px] text-[#bca36c] opacity-0 transition group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100"
                            >
                              ↗
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Link
                  className="archive-rule text-paper/58 mt-8 inline-flex min-h-11 items-center border px-5 text-[9px] tracking-[0.13em] transition hover:border-paper/45 hover:text-paper"
                  href={`/ideas/${activeTheme.slug}`}
                >
                  进入主题介绍 ↗
                </Link>
              </motion.div>
            </AnimatePresence>
          </aside>
        </div>

        <p className="mt-5 text-center text-[9px] tracking-[0.11em] text-paper/35 sm:hidden">
          点击星点进入主题介绍
        </p>
      </div>
    </section>
  );
}
