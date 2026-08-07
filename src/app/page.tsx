"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const sections = [
  { number: "01", title: "生平年表", caption: "1821 — 1881", text: "从莫斯科医院的童年到圣彼得堡的最后居所，一条被流放、疾病与写作切开的生命线。" },
  { number: "02", title: "作品展厅", caption: "THE NOVELS", text: "不是书目，而是一组通往罪、自由、信仰与救赎的房间。" },
  { number: "03", title: "思想索引", caption: "IDEAS & MOTIFS", text: "地下室、双重人格、审判、穷人、上帝沉默之后的自由。" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <main className="overflow-hidden bg-ink">
      <section className="film-grain relative min-h-screen border-b archive-rule">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-85"
          style={{ backgroundImage: "url('/images/hero-petersburg.png?v=2')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-ink/10 to-ink/15" />

        <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-7 text-[10px] uppercase tracking-museum sm:px-10">
          <span className="font-display text-sm tracking-[0.12em]">F·D</span>
          <div className="hidden gap-8 text-paper/70 md:flex">
            <Link href="/timeline" className="transition hover:text-paper">生平</Link>
            <Link href="/works" className="transition hover:text-paper">作品</Link>
            <Link href="/ideas" className="transition hover:text-paper">思想</Link>
            <Link href="/characters" className="transition hover:text-paper">人物</Link>
            <Link href="/reading" className="transition hover:text-paper">阅读</Link>
            <Link href="/journal" className="transition hover:text-paper">评论</Link>
          </div>
          <span className="text-paper/60">数字文学博物馆</span>
        </nav>

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-78px)] max-w-7xl items-end px-6 pb-12 sm:px-10 sm:pb-16">
          <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.14 }} className="max-w-3xl">
            <motion.p variants={fadeUp} transition={{ duration: 0.7 }} className="mb-5 text-[10px] uppercase tracking-[0.28em] text-paper/65">Saint Petersburg · 1864 · A winter night</motion.p>
            <motion.h1 variants={fadeUp} transition={{ duration: 0.8 }} className="font-display text-[clamp(4.2rem,12vw,10.5rem)] font-medium leading-[0.76] tracking-[-0.045em]">
              陀思妥<br />耶夫斯基
            </motion.h1>
            <motion.div variants={fadeUp} transition={{ duration: 0.8 }} className="mt-10 flex max-w-lg items-start gap-5 border-l border-paper/50 pl-5">
              <p className="text-sm leading-7 text-paper/85 sm:text-base">“人是一种谜。必须解开这个谜；如果你用一生的时间去解它，也不要说浪费了时间。”</p>
            </motion.div>
          </motion.div>
          <span className="vertical-label absolute bottom-12 right-7 text-[9px] uppercase tracking-[0.24em] text-paper/55 sm:right-10">Scroll to enter</span>
        </div>
      </section>

      <section id="archive" className="mx-auto max-w-7xl px-6 py-24 sm:px-10 md:py-36">
        <div className="grid gap-12 border-t archive-rule pt-6 md:grid-cols-[1fr_2fr]">
          <p className="text-[10px] uppercase tracking-museum text-ash">The Collection / 001—003</p>
          <div>
            <p className="max-w-xl font-display text-4xl leading-tight sm:text-5xl">一位作家，一座在黑暗中仍然发光的精神地形。</p>
            <p className="mt-7 max-w-lg text-sm leading-7 text-paper/65">这不是百科全书。我们将手稿、城市、人物与思想并置，邀请你以自己的路径走近这位俄国作家的内心剧场。</p>
          </div>
        </div>

        <div className="mt-20 grid border-t archive-rule md:grid-cols-3">
          {sections.map((section, index) => (
            <motion.a href="#threshold" key={section.number} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.35 }} transition={{ delay: index * 0.12, duration: 0.55 }} className="group min-h-72 border-b archive-rule py-7 md:border-b-0 md:px-7 md:first:pl-0 md:not(:last-child):border-r md:last:pr-0">
              <div className="flex items-start justify-between text-[10px] tracking-museum text-ash"><span>{section.number}</span><span>{section.caption}</span></div>
              <div className="mt-20">
                <h2 className="font-display text-4xl transition duration-500 group-hover:translate-x-2">{section.title}</h2>
                <p className="mt-4 max-w-xs text-sm leading-7 text-paper/60">{section.text}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <section id="threshold" className="relative border-y archive-rule bg-[#1a1a18] px-6 py-28 sm:px-10 md:py-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
          <div className="relative aspect-[3/4] overflow-hidden border archive-rule bg-[url('/images/manuscript.svg')] bg-cover bg-center grayscale">
            <div className="absolute inset-0 bg-ink/25" />
            <span className="absolute bottom-5 left-5 text-[10px] tracking-museum text-paper/70">MS. 1866 / FRAGMENT</span>
          </div>
          <div className="md:pl-12">
            <p className="text-[10px] uppercase tracking-museum text-ash">The Threshold</p>
            <h2 className="mt-6 font-display text-5xl leading-[.92] sm:text-7xl">从一页<br />手稿开始</h2>
            <p className="mt-8 max-w-md text-sm leading-8 text-paper/70">第一展厅将在这里展开：《罪与罚》的诞生。你会看见构想如何被划去、重写，最终成为拉斯柯尔尼科夫走过的那条街。</p>
            <button className="mt-10 border border-paper/50 px-6 py-3 text-[10px] uppercase tracking-museum transition hover:bg-paper hover:text-ink">即将开放</button>
          </div>
        </div>
      </section>

      <footer id="about" className="mx-auto flex max-w-7xl flex-col justify-between gap-10 px-6 py-10 text-[10px] uppercase tracking-museum text-paper/55 sm:flex-row sm:px-10">
        <p>Fyodor Dostoevsky · Digital Literary Archive</p>
        <p>一期原型 · 2026</p>
      </footer>
    </main>
  );
}
