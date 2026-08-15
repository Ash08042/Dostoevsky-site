"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { workAnchorId } from "../lib/archive-links";

type HomeWork = {
  slug: string;
  title: string;
  year: string;
  image: string;
  theme: string;
  detail: string;
  overlay?: string;
};

const works: readonly HomeWork[] = [
  {
    slug: "poor-folk",
    title: "穷人",
    year: "1846",
    image: "/images/works/poor-folk.png",
    theme: "贫困、尊严与书信",
    detail: "两颗被生活挤压的心，通过书信彼此照亮；贫穷并未夺走他们对尊严的最后坚持。",
  },
  {
    slug: "white-nights",
    title: "白夜",
    year: "1848",
    image: "/images/works/white-nights.png",
    theme: "孤独、相遇与幻梦",
    detail: "在彼得堡短暂明亮的夜里，一次相遇让孤独的人相信，爱或许曾经来过。",
  },
  {
    slug: "netochka-nezvanova",
    title: "涅朵奇卡",
    year: "1849",
    image: "/images/works/netochka-nezvanova.png",
    theme: "童年、艺术与创伤",
    detail: "一个少女在失序的家庭与音乐的召唤之间，试图为自己寻找能够呼吸的世界。",
  },
  {
    slug: "humiliated-and-insulted",
    title: "被侮辱与被损害的",
    year: "1861",
    image: "/images/works/humiliated-and-insulted.png",
    theme: "屈辱、怜悯与承受",
    detail: "在城市的冷雨中，受伤的人彼此相认；同情不是施舍，而是拒绝遗忘他人的痛苦。",
  },
  {
    slug: "notes-from-house-of-dead",
    title: "死屋手记",
    year: "1861–1862",
    image: "/images/works/notes-from-house-of-dead.png",
    theme: "囚禁、人性与见证",
    detail: "在流放营的极端处境中，人的尊严并未消失；它以最微弱也最坚韧的方式存活。",
  },
  {
    slug: "notes-from-underground",
    title: "地下室手记",
    year: "1864",
    image: "/images/works/notes-from-underground.png",
    theme: "自由意志与自我意识",
    detail: "一个人宁愿选择伤害自己，也要证明自己不是理性机器上的齿轮。",
  },
  {
    slug: "crime-and-punishment",
    title: "罪与罚",
    year: "1866",
    image: "/images/works/crime-and-punishment-portrait.jpg",
    theme: "越界、良知与救赎",
    detail:
      "一场关于观念能否凌驾于生命之上的审判。拉斯柯尔尼科夫越过界限，终于发现思想不能解除人与人之间的联系。",
  },
  {
    slug: "the-gambler",
    title: "赌徒",
    year: "1866",
    image: "/images/works/the-gambler.png",
    theme: "欲望、偶然与自我毁弃",
    detail: "轮盘转动时，人以为自己在与命运博弈，实际上却常在下注于无法摆脱的内心。",
  },
  {
    slug: "the-idiot",
    title: "白痴",
    year: "1869",
    image: "/images/works/the-idiot-confrontation.jpg",
    theme: "纯善与怜悯",
    detail: "梅诗金公爵带着近乎无条件的怜悯步入现实，而现实则以其复杂与残酷回应他。",
  },
  {
    slug: "demons",
    title: "群魔",
    year: "1872",
    image: "/images/works/demons.png",
    theme: "虚无主义与精神失序",
    detail: "当观念只剩下否定的快感，精神的空洞会在共同体中蔓延成一场风暴。",
  },
  {
    slug: "the-adolescent",
    title: "少年",
    year: "1875",
    image: "/images/works/the-adolescent.png",
    theme: "成长、身份与孤独",
    detail: "一个年轻人渴望成为独立的个体，却必须先穿过家庭、金钱与自我想象交织的迷宫。",
  },
  {
    slug: "brothers-karamazov",
    title: "卡拉马佐夫兄弟",
    year: "1880",
    image: "/images/works/brothers-karamazov-trial.jpg",
    theme: "信仰、怀疑与责任",
    detail: "父与子、怀疑与信仰、自由与责任，在一部未完成的人类精神史中彼此照见。",
    overlay: "linear-gradient(180deg, rgba(3, 7, 13, .18), rgba(2, 5, 10, .42))",
  },
];

export default function HomeWorksBrowser() {
  const prefersReducedMotion = useReducedMotion();
  const [[activeIndex, direction], setPage] = useState([0, 1]);
  const work = works[activeIndex];

  const turnPage = (step: number) => {
    setPage(([current]) => [(current + step + works.length) % works.length, step]);
  };

  const handleBookKeyDown = (event: KeyboardEvent<HTMLAnchorElement>) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      turnPage(event.key === "ArrowRight" ? 1 : -1);
    }
  };

  const turn = prefersReducedMotion ? 0 : direction > 0 ? 82 : -82;

  return (
    <section
      className="archive-rule relative border-b bg-[#0f0f0e] px-5 py-20 sm:px-10 sm:py-24"
      id="works-browser"
    >
      <div className="mx-auto max-w-7xl">
        <header className="archive-rule grid gap-6 border-t pt-6 md:grid-cols-[1fr_2fr]">
          <p className="text-[10px] uppercase tracking-museum text-ash">
            Works in chronological order
          </p>
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl leading-none sm:text-5xl">作品浏览</h2>
              <p className="text-paper/42 mt-4 text-[10px] tracking-[0.13em]">
                1846—1880 · 十二部作品
              </p>
            </div>
            <p className="text-paper/42 hidden text-[10px] tracking-[0.12em] sm:block">
              翻页浏览 · 点击书页进入展厅
            </p>
          </div>
        </header>

        <div className="mx-auto mt-12 max-w-5xl [perspective:1800px] sm:mt-16">
          <Link
            aria-label={`前往作品展厅中的《${work.title}》`}
            className="group block aspect-[4/3] focus:outline-none sm:aspect-[16/9]"
            href={`/works#${workAnchorId(work.title)}`}
            onKeyDown={handleBookKeyDown}
          >
            <div className="archive-rule relative grid h-full grid-cols-2 overflow-hidden border bg-[#11110f] shadow-[0_26px_70px_rgba(0,0,0,.48)] transition duration-300 group-hover:border-paper/35 group-focus-visible:border-paper/55">
              <div className="relative overflow-hidden bg-[#0a0a09]">
                <AnimatePresence initial={false} mode="sync">
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                    exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 }}
                    initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 1.025 }}
                    key={work.slug}
                    transition={{ duration: prefersReducedMotion ? 0.12 : 0.48, ease: "easeOut" }}
                  >
                    <Image
                      alt={`${work.title}作品背景`}
                      className="object-cover brightness-[.72] contrast-[.93] saturate-[.76] sepia-[.06] transition duration-700 group-hover:brightness-[.78]"
                      fill
                      priority={activeIndex === 0}
                      sizes="(max-width: 1024px) 50vw, 512px"
                      src={work.image}
                    />
                    {work.overlay && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0"
                        style={{ background: work.overlay }}
                      />
                    )}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-r from-black/5 via-transparent to-black/45"
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="text-paper/46 absolute bottom-4 left-4 z-10 text-[8px] tracking-[0.16em] sm:bottom-6 sm:left-6 sm:text-[9px]">
                  IMAGE / {String(activeIndex + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative overflow-hidden bg-[radial-gradient(circle_at_80%_18%,rgba(163,130,76,.07),transparent_34%),linear-gradient(145deg,#1a1916,#11110f)] [perspective:1400px]">
                <AnimatePresence custom={direction} initial={false} mode="wait">
                  <motion.article
                    animate={{ opacity: 1, rotateY: 0 }}
                    className="absolute inset-0 flex flex-col p-4 [backface-visibility:hidden] sm:p-7 lg:p-10"
                    exit={{ opacity: 0, rotateY: -turn }}
                    initial={{ opacity: 0, rotateY: turn }}
                    key={work.slug}
                    style={{ transformOrigin: direction > 0 ? "left center" : "right center" }}
                    transition={{
                      duration: prefersReducedMotion ? 0.12 : 0.52,
                      ease: [0.45, 0, 0.2, 1],
                    }}
                  >
                    <div className="flex items-center justify-between gap-3 text-[7px] tracking-[0.12em] text-ash sm:text-[9px] sm:tracking-museum">
                      <span>
                        {String(activeIndex + 1).padStart(2, "0")} /{" "}
                        {String(works.length).padStart(2, "0")}
                      </span>
                      <span>{work.year}</span>
                    </div>
                    <div className="my-auto py-3 sm:py-5">
                      <p className="text-[7px] tracking-[0.12em] text-[#c7ad72] sm:text-[10px] sm:tracking-[0.17em]">
                        {work.theme}
                      </p>
                      <h3 className="mt-2 text-balance font-display text-[clamp(1rem,4.5vw,3.2rem)] leading-[.98] tracking-[-0.035em] text-paper sm:mt-4">
                        {work.title}
                      </h3>
                    </div>
                    <div className="archive-rule border-t pt-3 sm:pt-5">
                      <p className="text-paper/58 line-clamp-4 text-[8px] leading-4 sm:text-xs sm:leading-6 lg:text-sm lg:leading-7">
                        {work.detail}
                      </p>
                      <span className="text-paper/38 group-hover:text-paper/68 mt-3 hidden text-[8px] tracking-[0.13em] transition sm:inline-flex">
                        进入作品卡 ↗
                      </span>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 top-0 z-20 w-8 -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(0,0,0,.68)_45%,rgba(0,0,0,.86)_51%,rgba(0,0,0,.36)_68%,transparent)]"
              />
              <span
                aria-hidden="true"
                className="archive-rule pointer-events-none absolute inset-1.5 z-20 border"
              />
            </div>
          </Link>

          <div className="mt-7 flex items-center justify-between gap-5">
            <button
              aria-label="上一部作品"
              className="archive-rule text-paper/62 min-h-11 border px-5 text-xs transition hover:border-paper/45 hover:text-paper focus-visible:border-paper/55 focus-visible:text-paper"
              onClick={() => turnPage(-1)}
              type="button"
            >
              ←
            </button>
            <div
              aria-label={`第 ${activeIndex + 1} 部，共 ${works.length} 部`}
              className="flex flex-1 items-center justify-center gap-1.5"
            >
              <span className="text-paper/52 text-[9px] tracking-[0.14em] sm:hidden">
                {String(activeIndex + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}
              </span>
              {works.map((item, index) => (
                <button
                  aria-label={`查看《${item.title}》`}
                  aria-pressed={activeIndex === index}
                  className={`hidden h-8 max-w-10 flex-1 py-3 before:block before:h-px before:w-full before:transition-colors sm:block ${activeIndex === index ? "before:bg-paper/80" : "before:bg-paper/18 hover:before:bg-paper/42"}`}
                  key={item.slug}
                  onClick={() => setPage([index, index >= activeIndex ? 1 : -1])}
                  type="button"
                />
              ))}
            </div>
            <button
              aria-label="下一部作品"
              className="archive-rule text-paper/62 min-h-11 border px-5 text-xs transition hover:border-paper/45 hover:text-paper focus-visible:border-paper/55 focus-visible:text-paper"
              onClick={() => turnPage(1)}
              type="button"
            >
              →
            </button>
          </div>

          <p className="text-paper/38 mt-5 text-center text-[9px] tracking-[0.11em] sm:hidden">
            点击书页进入展厅 · 使用箭头翻页
          </p>
        </div>
      </div>
    </section>
  );
}
