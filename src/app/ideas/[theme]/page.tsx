"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const content: Record<string, { title: string; question: string; body: string }> = {
  suffering: { title: "苦难", question: "痛苦能否成为人格觉醒的契机？", body: "在别尔嘉耶夫的阅读线索中，陀思妥耶夫斯基并不把苦难当作值得歌颂的命运。苦难揭开人既渴望自由又会伤害他人的裂缝；它的意义只可能在承担、同情与转向他者时出现。" },
  evil: { title: "罪恶", question: "人为何会渴望越过界限？", body: "罪恶不是外部标签，而是自由可能走向自我封闭的一面。小说让罪进入具体关系：受害者、良知、承认与宽恕，因此没有任何观念可以替人免除责任。" },
  love: { title: "爱", question: "爱如何对抗孤立？", body: "这里的爱不是抽象的善意，而是对具体之人的回应。它要求人放弃把他者作为工具的冲动，也要求人在羞耻与伤害之后仍愿意建立联系。" },
  freedom: { title: "自由", question: "自由为何令人恐惧？", body: "自由并不保证舒适。它包含拒绝被安排、选择错误甚至反抗理性方案的能力；正因如此，它既是人格尊严的来源，也可能成为坠落的风险。" },
  faith: { title: "信仰", question: "怀疑之后，信仰还能说什么？", body: "信仰不抹去伊万式的怀疑，而是在怀疑之后仍选择爱、责任与共同生活。它不是对苦难的轻率解释，而是对绝望的一种行动回应。" },
};

export default function ThemePage() {
  const params = useParams<{ theme: string }>();
  const item = content[params.theme] ?? content.suffering;
  return <main className="min-h-screen bg-[#050505] px-6 py-7 text-paper sm:px-10"><nav className="mx-auto flex max-w-5xl justify-between border-b archive-rule pb-6"><Link className="font-display text-xl" href="/ideas">← 思想地图</Link><span className="text-[10px] uppercase tracking-museum text-ash">Reading note</span></nav><article className="mx-auto max-w-3xl py-28"><p className="text-[10px] uppercase tracking-museum text-ash">Dostoevsky's worldview</p><h1 className="mt-6 font-display text-7xl">{item.title}</h1><h2 className="mt-12 text-xl font-medium leading-8">{item.question}</h2><p className="mt-8 text-base leading-9 text-paper/70">{item.body}</p><p className="mt-14 border-t archive-rule pt-6 text-xs leading-6 text-ash">本页为基于《陀思妥耶夫斯基的世界观》问题意识整理的导读，不替代原书阅读。</p></article></main>;
}
