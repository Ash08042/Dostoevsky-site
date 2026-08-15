"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const lifeMoments = [
  {
    year: "1821",
    title: "出生于莫斯科",
    note: "在马林贫民医院旁长大。",
    href: "/timeline#year-1821",
  },
  {
    year: "1846",
    title: "《穷人》出版",
    note: "一夜之间进入彼得堡文坛。",
    href: "/timeline#year-1846",
  },
  {
    year: "1849",
    title: "死刑前最后一刻",
    note: "模拟处决后改判西伯利亚苦役。",
    href: "/timeline#year-1849",
    rupture: true,
  },
  {
    year: "1850—54",
    title: "鄂木斯克苦役",
    note: "四年镣铐重塑了他对罪与信仰的理解。",
    href: "/timeline#year-1850-1854",
  },
  {
    year: "1866",
    title: "《罪与罚》",
    note: "在债务与限期中完成代表作。",
    href: "/timeline#year-1865-1866",
  },
  {
    year: "1880",
    title: "《卡拉马佐夫兄弟》",
    note: "最后一部长篇完成连载。",
    href: "/timeline#year-1879-1880",
  },
  {
    year: "1881",
    title: "逝世于彼得堡",
    note: "未及继续计划中的第二部。",
    href: "/timeline#year-1881",
  },
];

export default function HomeLifeTimeline() {
  const ruptureDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ruptureBlackoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rupturePlayedSinceEnterRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [ruptureBlackout, setRuptureBlackout] = useState(false);

  useEffect(() => {
    return () => {
      if (ruptureDelayTimerRef.current) clearTimeout(ruptureDelayTimerRef.current);
      if (ruptureBlackoutTimerRef.current) clearTimeout(ruptureBlackoutTimerRef.current);
    };
  }, []);

  const showRuptureBlackout = () => {
    if (
      rupturePlayedSinceEnterRef.current ||
      ruptureDelayTimerRef.current ||
      ruptureBlackoutTimerRef.current
    )
      return;
    rupturePlayedSinceEnterRef.current = true;
    ruptureDelayTimerRef.current = setTimeout(() => {
      ruptureDelayTimerRef.current = null;
      setRuptureBlackout(true);
      ruptureBlackoutTimerRef.current = setTimeout(() => {
        setRuptureBlackout(false);
        ruptureBlackoutTimerRef.current = null;
      }, 2000);
    }, 1500);
  };

  const cancelPendingRuptureBlackout = () => {
    rupturePlayedSinceEnterRef.current = false;
    if (ruptureDelayTimerRef.current) {
      clearTimeout(ruptureDelayTimerRef.current);
      ruptureDelayTimerRef.current = null;
    }
  };

  const activeMoment = lifeMoments[activeIndex];

  return (
    <>
      <section className="archive-rule relative min-h-svh border-b bg-[#171715]" id="life-in-brief">
        <div className="flex min-h-svh items-center overflow-hidden px-6 py-20 sm:px-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(111,97,72,.14),transparent_38%),linear-gradient(180deg,#171715,#10100f)]"
          />

          <div className="relative z-10 mx-auto w-full max-w-7xl">
            <div className="archive-rule grid gap-8 border-t pt-6 md:grid-cols-[1fr_2fr]">
              <p className="text-[10px] uppercase tracking-museum text-ash">
                A life in seven moments
              </p>
              <div className="flex items-end justify-between gap-8">
                <h2 className="font-display text-4xl leading-none sm:text-5xl">生平速写</h2>
                <Link
                  className="text-paper/52 hidden font-body text-[10px] tracking-museum transition hover:text-paper sm:inline-flex"
                  href="/timeline"
                >
                  完整生平年表 ↗
                </Link>
              </div>
            </div>

            <div className="mt-8 grid items-center gap-8 sm:mt-14 sm:grid-cols-[130px_minmax(0,1fr)] lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-12 xl:grid-cols-[250px_minmax(0,1fr)]">
              <figure className="mx-auto w-28 sm:mx-0 sm:w-full">
                <div className="archive-rule relative aspect-[4/5] overflow-hidden border bg-[#0c0c0b]">
                  <Image
                    alt="彼罗夫1872年绘制的陀思妥耶夫斯基肖像"
                    className="object-cover object-center brightness-[.78] contrast-[.94] saturate-[.72] sepia-[.08]"
                    fill
                    sizes="(max-width: 639px) 112px, (max-width: 1023px) 130px, 250px"
                    src="/images/dostoevsky-perov-1872.jpg"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/10"
                  />
                </div>
                <figcaption className="text-paper/38 mt-3 text-center text-[8px] leading-4 tracking-[0.1em] sm:text-left">
                  瓦西里·彼罗夫 / 1872
                </figcaption>
              </figure>

              <div className="min-w-0">
                <div className="relative mx-2">
                  <div
                    aria-hidden="true"
                    className="bg-paper/22 absolute left-0 right-0 top-2 h-px"
                  />
                  <ol className="relative grid grid-cols-7">
                    {lifeMoments.map((moment, index) => (
                      <li className="min-w-0" key={moment.year}>
                        <Link
                          aria-current={activeIndex === index ? "step" : undefined}
                          className={`group block pt-8 text-center transition-colors ${activeIndex === index ? "text-paper" : "text-paper/38 hover:text-paper/75"}`}
                          href={moment.href}
                          onFocus={() => setActiveIndex(index)}
                          onMouseEnter={() => {
                            setActiveIndex(index);
                            if (moment.rupture) showRuptureBlackout();
                          }}
                          onMouseLeave={moment.rupture ? cancelPendingRuptureBlackout : undefined}
                        >
                          <span
                            className={`mx-auto mb-4 block rounded-full border bg-[#171715] transition-all ${moment.rupture ? "h-3.5 w-3.5 border-[#b99a60]" : "h-2.5 w-2.5 border-current"}`}
                          />
                          <span className="block text-[9px] tracking-[0.04em] sm:text-xs">
                            {moment.year}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                </div>

                <motion.article
                  aria-live="polite"
                  className="mx-auto mt-8 min-h-32 max-w-xl text-center sm:mt-12"
                  key={activeMoment.year}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28 }}
                >
                  <p
                    className={`text-[10px] uppercase tracking-[0.2em] ${activeMoment.rupture ? "text-[#c7a96b]" : "text-paper/45"}`}
                  >
                    {activeMoment.year}
                  </p>
                  <h3 className="mt-3 font-display text-2xl text-paper sm:text-3xl">
                    {activeMoment.title}
                  </h3>
                  <p className="text-paper/58 mt-3 text-xs leading-6 sm:text-sm">
                    {activeMoment.note}
                  </p>
                </motion.article>
              </div>
            </div>

            <Link
              className="text-paper/52 mt-8 inline-flex font-body text-[10px] tracking-museum transition hover:text-paper sm:hidden"
              href="/timeline"
            >
              完整生平年表 ↗
            </Link>
          </div>
        </div>
      </section>

      {ruptureBlackout && (
        <motion.div
          animate={{ opacity: [0, 1, 1, 0] }}
          aria-live="polite"
          className="pointer-events-none fixed inset-0 z-[9999] grid place-items-center bg-black px-5 text-center"
          data-rupture-blackout
          initial={{ opacity: 0 }}
          role="status"
          transition={{ duration: 2, ease: "easeInOut", times: [0, 0.18, 0.82, 1] }}
        >
          <p className="whitespace-nowrap text-[clamp(9px,3vw,18px)] tracking-[0.08em] text-paper">
            死刑宣判——理解陀思妥耶夫斯基的一道断裂。
          </p>
        </motion.div>
      )}
    </>
  );
}
