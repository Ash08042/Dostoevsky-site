import { ArchivePage } from "../../../components/ArchivePage";

export default function WorksPage() {
  return <ArchivePage index="02" eyebrow="The novels" title="作品展厅" intro="每一部小说都是一个精神实验室：人物在这里追问自由的代价、善的可能，以及上帝沉默之后人应如何活着。" entries={[
    { title: "罪与罚", meta: "1866", image: "/images/hero-petersburg.png", detail: "主题：越界后的良知与救赎。摘录线索：拉斯柯尔尼科夫发现，观念无法免除人与人的联系。" },
    { title: "白痴", meta: "1869", image: "/images/hero-petersburg.png", detail: "主题：纯善进入现实社会。摘录线索：梅什金的怜悯并非软弱，而是对每个人不可替代性的承认。" },
    { title: "群魔", meta: "1872", image: "/images/manuscript.svg", detail: "主题：虚无主义与精神失序。摘录线索：当否定失去爱的约束，理念会变成支配他人的工具。" },
    { title: "卡拉马佐夫兄弟", meta: "1880", image: "/images/hero-petersburg.png", detail: "主题：信仰、怀疑与责任。阿廖沙的肖像将在下一版替换为经授权的历史插图；此处以冬夜意象呈现他的静默与行动。" },
    { title: "地下室手记", meta: "1864", image: "/images/manuscript.svg", detail: "主题：自由意志与自我意识的牢笼。摘录线索：人会拒绝被计算的幸福，以证明自己并非齿轮。" },
  ]} />;
}
