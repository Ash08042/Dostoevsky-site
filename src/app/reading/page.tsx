import { ArchivePage } from "../../../components/ArchivePage";

export default function ReadingPage() {
  return <ArchivePage index="05" eyebrow="Where to begin" title="阅读指南" intro="不用从最厚的一本开始。这里提供三条进入陀思妥耶夫斯基世界的路径，适合不同的阅读期待。" entries={[
    { title: "入门路线", detail: "《白夜》→《地下室手记》→《罪与罚》：从抒情、反叛到完整的心理小说。" },
    { title: "作品比较", detail: "《罪与罚》问“能否越界”；《白痴》问“善能否存在”；《群魔》问“价值崩塌后会发生什么”。" },
    { title: "哲学影响", detail: "从存在主义到精神分析，许多思想家都与他的小说发生过深刻对话。" },
  ]} />;
}
