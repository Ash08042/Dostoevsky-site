import { ArchivePage } from "../../../components/ArchivePage";

export default function CharactersPage() {
  return <ArchivePage index="04" eyebrow="Fictional lives" title="人物关系" intro="人物关系图的第一层：五位主角像五种不同的精神温度。他们将在后续版本中彼此连线，并连接到作品与思想主题。" entries={[
    { title: "拉斯柯尔尼科夫", meta: "罪与罚", detail: "以非凡人理论越过界限，却发现思想无法替代良知。" },
    { title: "伊万·卡拉马佐夫", meta: "卡拉马佐夫兄弟", detail: "拒绝用来世补偿儿童苦难的世界，他的怀疑具有不可回避的力量。" },
    { title: "阿廖沙·卡拉马佐夫", meta: "卡拉马佐夫兄弟", detail: "相信具体的爱与共同体；他不是天真，而是在破碎中实践善。" },
    { title: "斯塔夫罗金", meta: "群魔", detail: "魅力、冷漠与精神真空结合成危险的中心。" },
    { title: "梅什金公爵", meta: "白痴", detail: "近乎无条件的同情心，在现实社会里成为一种脆弱的异物。" },
  ]} />;
}
