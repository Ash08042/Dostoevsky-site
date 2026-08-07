import { ArchivePage } from "../../../components/ArchivePage";

export default function TimelinePage() {
  return <ArchivePage index="01" eyebrow="A life in five stations" title="生平年表" intro="从莫斯科到圣彼得堡，从行刑场到西伯利亚，再回到小说的中心：这条时间线记录一位作家如何在极端经验中重写人的内心。" entries={[
    { title: "出生", meta: "1821", image: "/images/hero-petersburg.png", detail: "出生于莫斯科马林医院附近，一个日后反复回到贫困、疾病与尊严的世界。" },
    { title: "死刑假释", meta: "1849", image: "/images/manuscript.svg", detail: "彼得拉舍夫斯基小组案后，他在行刑前最后一刻获赦。这一经验改变了他对死亡与生命的感知。" },
    { title: "西伯利亚流放", meta: "1850—1854", image: "/images/hero-petersburg.png", detail: "在鄂木斯克苦役营度过四年，与囚犯共同生活；《死屋手记》的土壤由此形成。" },
    { title: "创作黄金时期", meta: "1864—1880", image: "/images/manuscript.svg", detail: "《地下室手记》《罪与罚》《白痴》《群魔》与《卡拉马佐夫兄弟》相继诞生。" },
    { title: "去世", meta: "1881", image: "/images/hero-petersburg.png", detail: "卒于圣彼得堡。他留下的并非答案，而是一系列至今仍在逼问读者的问题。" },
  ]} />;
}
