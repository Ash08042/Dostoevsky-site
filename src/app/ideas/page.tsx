import Link from "next/link";

const nodes = [
  { label: "罪恶", href: "/ideas/evil", position: "left-[5%] top-[26%]" },
  { label: "爱", href: "/ideas/love", position: "right-[5%] top-[26%]" },
  { label: "自由", href: "/ideas/freedom", position: "bottom-[8%] left-[17%]" },
  { label: "信仰", href: "/ideas/faith", position: "bottom-[8%] right-[17%]" },
];

export default function IdeasPage() {
  return <main className="min-h-screen overflow-hidden bg-[#050505] px-6 py-7 text-paper sm:px-10">
    <nav className="mx-auto flex max-w-7xl items-center justify-between border-b archive-rule pb-6"><Link className="font-display text-xl" href="/">F·D</Link><span className="text-[10px] uppercase tracking-museum text-ash">Ideas / radial map</span></nav>
    <section className="relative mx-auto mt-10 max-w-5xl py-12 text-center md:mt-16 md:py-20">
      <p className="text-[10px] uppercase tracking-museum text-ash">The Worldview of Dostoevsky · reading map</p>
      <h1 className="mt-5 font-display text-5xl sm:text-7xl">思想地图</h1>
      <div className="relative mx-auto mt-16 aspect-square max-w-3xl">
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[70%] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-paper/20" />
        <div className="absolute left-1/2 top-1/2 h-[1px] w-[70%] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-paper/20" />
        <Link className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-paper bg-[#141412] font-display text-4xl shadow-[0_0_80px_rgba(230,225,210,.16)] transition hover:scale-105 hover:bg-paper hover:text-ink sm:h-48 sm:w-48 sm:text-5xl" href="/ideas/suffering">苦难</Link>
        {nodes.map((node) => <Link className={`absolute flex h-24 w-24 items-center justify-center rounded-full border border-paper/45 bg-[#0b0b0a] text-sm transition hover:scale-110 hover:bg-paper hover:text-ink sm:h-32 sm:w-32 ${node.position}`} href={node.href} key={node.href}>{node.label}</Link>)}
      </div>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-paper/55">以“苦难”为中心，并不意味着美化痛苦；它指向人格在罪恶、爱、自由与信仰之间必须作出的回应。选择一个节点，进入专题阅读。</p>
    </section>
  </main>;
}
