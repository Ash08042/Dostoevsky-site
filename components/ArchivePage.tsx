import Link from "next/link";

type ArchivePageProps = {
  index: string;
  eyebrow: string;
  title: string;
  intro: string;
  entries: { title: string; detail: string; meta?: string; image?: string }[];
};

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
  ["评论", "/journal"],
];

export function ArchivePage({ index, eyebrow, title, intro, entries }: ArchivePageProps) {
  return (
    <main className="min-h-screen bg-ink px-6 py-7 text-paper sm:px-10">
      <nav className="mx-auto flex max-w-7xl items-center justify-between border-b archive-rule pb-6">
        <Link className="font-display text-xl" href="/">F·D</Link>
        <span className="text-[10px] uppercase tracking-museum text-ash">Dostoevsky Archive</span>
      </nav>
      <div className="mx-auto grid max-w-7xl gap-12 py-16 md:grid-cols-[220px_1fr] md:py-24">
        <aside className="text-[10px] tracking-museum text-ash">
          <p className="mb-7">{index} / ARCHIVE</p>
          <div className="grid gap-x-8 gap-y-4">
            {navigation.map(([label, href]) => <Link className="transition hover:text-paper" href={href} key={href}>{label}</Link>)}
          </div>
        </aside>
        <section>
          <p className="text-[10px] uppercase tracking-museum text-ash">{eyebrow}</p>
          <h1 className="mt-6 font-display text-6xl leading-none sm:text-8xl">{title}</h1>
          <p className="mt-8 max-w-2xl text-base leading-8 text-paper/70">{intro}</p>
          <div className="mt-16 grid border-t archive-rule md:grid-cols-2">
            {entries.map((entry, i) => (
              <article className="border-b archive-rule py-8 md:pr-8 md:odd:border-r md:even:pl-8" key={entry.title}>
                <div className="flex justify-between text-[10px] tracking-museum text-ash"><span>{String(i + 1).padStart(2, "0")}</span><span>{entry.meta}</span></div>
                {entry.image && <div aria-label={`${entry.title} 档案影像`} className="mt-7 aspect-[16/9] bg-cover bg-center grayscale" role="img" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.45)), url(${entry.image})` }} />}
                <h2 className="mt-12 font-display text-4xl">{entry.title}</h2>
                <p className="mt-4 text-sm leading-7 text-paper/65">{entry.detail}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
