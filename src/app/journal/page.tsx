import { ArchivePage } from "../../../components/ArchivePage";

export default function JournalPage() {
  return <ArchivePage index="06" eyebrow="Personal notes" title="评论与博客" intro="这是你的声音所在：展厅提供材料，评论区则记录你作为读者的犹疑、发现与重新理解。" entries={[
    { title: "第一篇文章待写", meta: "草稿", detail: "可以从一次阅读中的具体困惑开始，而不是试图概括整个陀思妥耶夫斯基。" },
    { title: "读书笔记模板", meta: "工具", detail: "摘录一句话、描述它所在的情境，再写下它为什么在今天仍然刺痛你。" },
  ]} />;
}
