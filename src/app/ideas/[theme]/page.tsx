import Link from "next/link";
import { notFound } from "next/navigation";
import { readingPaths, themeOrder, themes, type ThemeKey } from "../data";
import ThemeConnections from "./ThemeConnections";

export function generateStaticParams() {
  return themeOrder.map((theme) => ({ theme }));
}

export default async function ThemePage({ params }: { params: Promise<{ theme: string }> }) {
  const { theme: slug } = await params;
  if (!themeOrder.includes(slug as ThemeKey)) notFound();
  const item = themes[slug as ThemeKey];
  const currentIndex = themeOrder.indexOf(item.slug);
  const previous = themes[themeOrder[(currentIndex - 1 + themeOrder.length) % themeOrder.length]];
  const next = themes[themeOrder[(currentIndex + 1) % themeOrder.length]];

  return (
    <main className="min-h-screen bg-[#030303] px-4 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1180px] items-center justify-between border-b border-[#27272a] pb-5">
        <Link className="text-sm tracking-[0.1em] text-[#c9ccd1] transition-colors hover:text-paper" href="/ideas">← 思想地图</Link>
        <span className="text-[9px] uppercase tracking-museum text-[#767d88]">{item.number} / {item.english}</span>
      </nav>

      <article className="mx-auto max-w-[1180px]">
        <header className="grid gap-10 border-b border-[#27272a] py-14 sm:py-20 md:grid-cols-[1.2fr_.8fr] md:items-end">
          <div>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#767d88]">Dostoevsky's worldview</p>
            <h1 className="mt-5 text-[clamp(5rem,13vw,10rem)] leading-[.78] tracking-[-0.06em]">{item.title}</h1>
          </div>
          <div>
            <p className="text-lg leading-8 text-[#c9ccd1] sm:text-xl">{item.question}</p>
            <p className="mt-6 border-l border-[#767d88] pl-5 text-xs leading-6 text-[#767d88]">{item.thesis}</p>
          </div>
        </header>

        <div className="grid border-b border-[#27272a] md:grid-cols-[220px_minmax(0,1fr)]">
          <aside className="border-b border-[#27272a] py-8 md:border-b-0 md:border-r md:py-12 md:pr-8">
            <div className="md:sticky md:top-8">
              <ThemeConnections thinkers={item.thinkers} works={item.works} />
            </div>
          </aside>

          <div className="py-10 md:py-14 md:pl-12 lg:pl-20">
            <div className="max-w-[720px] space-y-7 text-[15px] leading-[2] text-[#a7abb2] sm:text-base sm:leading-[2.05]">
              {item.paragraphs.map((paragraph, index) => <p className={index === 0 ? "first-letter:float-left first-letter:mr-3 first-letter:mt-2 first-letter:text-6xl first-letter:leading-[.7] first-letter:text-paper" : ""} key={paragraph}>{paragraph}</p>)}
            </div>

            <section className="mt-14 max-w-[720px] border-t border-[#40444b] pt-7">
              <p className="text-[9px] uppercase tracking-[0.17em] text-[#626872]">参考与方法</p>
              <p className="mt-4 text-xs leading-6 text-[#767d88]">本文综合六条阅读路径：别尔嘉耶夫的精神自由论、奇乔瓦茨基的生命肯定、巴赫金的复调诗学、罗赞诺夫对“大法官”的宗教哲学阐释、约瑟夫·弗兰克的思想传记，以及纪德对文学表达与分裂人格的作家阅读。正文结合所列小说作原创综述，不替代原著与研究著作。</p>
              <ol className="mt-6 grid gap-x-6 gap-y-3 border-t border-[#27272a] pt-5 sm:grid-cols-2">
                {readingPaths.map((path, index) => <li className="text-[10px] leading-5 text-[#626872]" key={path.title}><span className="mr-2 text-[#8f949d]">0{index + 1}</span>{path.author}，{path.title}</li>)}
              </ol>
            </section>
          </div>
        </div>

        <nav aria-label="思想专题导航" className="grid grid-cols-2 border-b border-[#27272a]">
          <Link className="group border-r border-[#27272a] py-8 pr-5 transition-colors hover:bg-[#0b0b0c] sm:p-8" href={`/ideas/${previous.slug}`}>
            <span className="text-[8px] uppercase tracking-[0.15em] text-[#626872]">← Previous</span>
            <p className="mt-4 text-2xl tracking-[-0.03em] text-[#c9ccd1] group-hover:text-paper">{previous.title}</p>
          </Link>
          <Link className="group py-8 pl-5 text-right transition-colors hover:bg-[#0b0b0c] sm:p-8" href={`/ideas/${next.slug}`}>
            <span className="text-[8px] uppercase tracking-[0.15em] text-[#626872]">Next →</span>
            <p className="mt-4 text-2xl tracking-[-0.03em] text-[#c9ccd1] group-hover:text-paper">{next.title}</p>
          </Link>
        </nav>
      </article>
    </main>
  );
}
