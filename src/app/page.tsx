"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import HomeCharacterPortraits from "./HomeCharacterPortraits";
import HomeIdeasConstellation from "./HomeIdeasConstellation";
import HomeLifeTimeline from "./HomeLifeTimeline";
import HomeWorksBrowser from "./HomeWorksBrowser";

const navigation = [
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想", "/ideas"],
  ["人物", "/characters"],
  ["阅读", "/reading"],
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="overflow-x-clip bg-ink">
      <section className="film-grain archive-rule relative min-h-screen border-b">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{ backgroundImage: "url('/images/hero-petersburg.png?v=2')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-ink/15" />

        <nav
          aria-label="首页导航"
          className="relative z-20 border-b border-paper/25 bg-ink/55 backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex items-center justify-between px-6 py-4 sm:px-10 md:py-5">
              <span className="font-display text-lg tracking-[0.12em] text-paper">F·D</span>
              <div className="text-paper/82 hidden items-center gap-9 text-[13px] uppercase tracking-[0.16em] md:flex">
                {navigation.map(([label, href]) => (
                  <Link
                    className="transition hover:text-paper focus-visible:text-paper"
                    href={href}
                    key={href}
                  >
                    {label}
                  </Link>
                ))}
              </div>
              <span className="text-[10px] tracking-[0.14em] text-paper/70 sm:text-[11px]">
                数字文学博物馆
              </span>
            </div>

            <div className="grid grid-cols-5 border-t border-paper/15 px-3 md:hidden">
              {navigation.map(([label, href]) => (
                <Link
                  className="text-paper/78 min-h-11 py-3 text-center text-[11px] tracking-[0.12em] transition hover:bg-paper/5 hover:text-paper focus-visible:bg-paper/5 focus-visible:text-paper"
                  href={href}
                  key={href}
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-102px)] max-w-7xl items-end px-6 pb-12 sm:px-10 sm:pb-16 md:min-h-[calc(100svh-61px)]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.14 }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7 }}
              className="mb-5 text-[10px] uppercase tracking-[0.28em] text-paper/65"
            >
              Saint Petersburg · 1864 · A winter night
            </motion.p>
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="font-display text-[clamp(4.2rem,12vw,10.5rem)] font-medium leading-[0.76] tracking-[-0.045em]"
            >
              陀思妥
              <br />
              耶夫斯基
            </motion.h1>
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8 }}
              className="mt-10 flex max-w-lg items-start gap-5 border-l border-paper/50 pl-5"
            >
              <p className="text-sm leading-7 text-paper/85 sm:text-base">
                “人是一种谜。必须解开这个谜；如果你用一生的时间去解它，也不要说浪费了时间。”
              </p>
            </motion.div>
          </motion.div>
          <span className="vertical-label absolute bottom-12 right-7 text-[9px] uppercase tracking-[0.24em] text-paper/55 sm:right-10">
            Scroll to enter
          </span>
        </div>
      </section>

      <HomeLifeTimeline />

      <HomeWorksBrowser />

      <HomeIdeasConstellation />

      <HomeCharacterPortraits />

      <section
        id="threshold"
        className="archive-rule relative border-b bg-[#1a1a18] px-6 py-28 sm:px-10 md:py-40"
      >
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div className="archive-rule relative aspect-[3/4] overflow-hidden border bg-[url('/images/manuscript.jpg')] bg-cover bg-center">
            <div className="absolute inset-0 bg-ink/25" />
            <span className="absolute bottom-5 left-5 text-[10px] tracking-museum text-paper/70">
              MS. 1866 / FRAGMENT
            </span>
          </div>
          <div className="md:pl-12">
            <p className="text-[10px] uppercase tracking-museum text-ash">The Threshold</p>
            <h2 className="mt-6 font-display text-5xl leading-[.92] sm:text-7xl">
              从一页
              <br />
              手稿开始
            </h2>
            <p className="mt-8 max-w-md text-sm leading-8 text-paper/70">
              第一展厅将在这里展开：《罪与罚》的诞生。你会看见构想如何被划去、重写，最终成为拉斯柯尔尼科夫走过的那条街。
            </p>
            <button className="mt-10 border border-paper/50 px-6 py-3 text-[10px] uppercase tracking-museum transition hover:bg-paper hover:text-ink">
              即将开放
            </button>
          </div>
        </div>
      </section>

      <footer
        id="about"
        className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-10 text-[10px] uppercase tracking-museum text-paper/55 sm:flex-row sm:px-10"
      >
        <p>Fyodor Dostoevsky · Digital Literary Archive</p>
        <p className="normal-case text-paper/75">Contact me: Rednote @惭愧了信仰的一切</p>
        <p>AN INDEPENDENT DIGITAL ARCHIVE · 2026</p>
      </footer>
    </main>
  );
}
