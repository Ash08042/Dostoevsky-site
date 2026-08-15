import Link from "next/link";
import { coreNodes, philosopherNodes, readingPaths, themeOrder, themes } from "./data";

type Point = { x: number; y: number };

const coreEdges: [keyof typeof coreNodes, keyof typeof coreNodes][] = [
  ["suffering", "evil"],
  ["suffering", "freedom"],
  ["suffering", "love"],
  ["evil", "freedom"],
  ["evil", "faith"],
  ["freedom", "love"],
  ["freedom", "faith"],
  ["love", "faith"],
];

const outerEdges: [number, keyof typeof coreNodes][] = [
  [0, "suffering"],
  [0, "faith"],
  [0, "freedom"],
  [1, "suffering"],
  [2, "evil"],
  [2, "freedom"],
  [3, "suffering"],
  [3, "freedom"],
  [4, "faith"],
  [4, "freedom"],
  [5, "freedom"],
  [6, "evil"],
  [6, "freedom"],
  [6, "love"],
  [7, "evil"],
  [7, "love"],
  [8, "love"],
  [8, "faith"],
  [9, "suffering"],
  [9, "love"],
];

function Line({ from, to, strong = false }: { from: Point; to: Point; strong?: boolean }) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  const angle = (Math.atan2(dy, dx) * 180) / Math.PI;

  return (
    <span
      aria-hidden="true"
      className={`absolute h-px origin-left ${strong ? "bg-[#767d88]/55" : "bg-[#40444b]/55"}`}
      style={{
        left: `${from.x}%`,
        top: `${from.y}%`,
        width: `${length}%`,
        transform: `rotate(${angle}deg)`,
      }}
    />
  );
}

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
];

export default function IdeasPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] px-4 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-[#27272a] pb-5">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">
          F·D
        </Link>
        <span className="hidden text-[10px] uppercase tracking-museum text-[#767d88] sm:block">
          Dostoevsky · constellation of ideas
        </span>
        <span className="text-[10px] tracking-[0.16em] text-[#767d88] sm:hidden">思想地图</span>
      </nav>

      <div className="mx-auto max-w-[1500px] py-12 sm:py-16 lg:grid lg:grid-cols-[155px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-12 lg:mb-0">
          <p className="text-[10px] tracking-museum text-[#767d88]">03 / IDEAS</p>
          <div className="archive-sidebar-nav mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[#767d88] lg:grid lg:gap-y-5">
            {navigation.map(([label, href]) => (
              <Link
                className={`transition-colors hover:text-paper ${href === "/ideas" ? "text-paper" : ""}`}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </aside>

        <section>
          <header className="grid gap-8 border-b border-[#27272a] pb-12 md:grid-cols-[1.2fr_.8fr] md:items-end">
            <div>
              <p className="text-[10px] uppercase tracking-museum text-[#767d88]">
                Five forces · one human drama
              </p>
              <h1 className="mt-5 text-6xl leading-[.88] tracking-[-0.045em] sm:text-8xl">
                思想地图
              </h1>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#8f949d]">
              陀思妥耶夫斯基不建立封闭的哲学体系。他让观念进入人物，让自由经过罪恶，让苦难逼问信仰，再让爱尝试恢复被割裂的生活。
            </p>
          </header>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#27272a] pb-5 text-[9px] uppercase tracking-[0.15em] text-[#626872]">
            <span>核心概念可进入专题阅读</span>
            <div className="flex gap-5">
              <span className="text-[#c9ccd1]">● 核心思想</span>
              <span>○ 哲学对话</span>
            </div>
          </div>

          <div className="relative mx-auto mt-8 hidden aspect-square w-full max-w-[1050px] lg:block">
            {coreEdges.map(([a, b]) => (
              <Line from={coreNodes[a]} key={`${a}-${b}`} strong to={coreNodes[b]} />
            ))}
            {outerEdges.map(([index, theme], edgeIndex) => (
              <Line
                from={philosopherNodes[index]}
                key={`${index}-${theme}-${edgeIndex}`}
                to={coreNodes[theme]}
              />
            ))}

            {philosopherNodes.map((node) => (
              <div
                className="absolute z-10 w-40 -translate-x-1/2 -translate-y-1/2 bg-[#030303] px-3 py-2.5 text-center"
                key={node.name}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
              >
                <p className="text-sm leading-5 text-[#c9ccd1]">{node.name}</p>
                <p className="mt-1.5 text-[10px] leading-4 tracking-[0.06em] text-[#767d88]">
                  {node.note}
                </p>
              </div>
            ))}

            {themeOrder.map((slug) => {
              const theme = themes[slug];
              const point = coreNodes[slug];
              const central = slug === "suffering";
              return (
                <Link
                  className={`${central ? "h-36 w-36 border-paper bg-[#e9ecf2] text-[#030303]" : "h-28 w-28 border-[#767d88] bg-[#0b0b0c] text-paper hover:border-paper hover:bg-[#151517]"} group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border transition-all duration-300 hover:scale-105`}
                  href={`/ideas/${slug}`}
                  key={slug}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <span
                    className={`${central ? "text-[#555b64]" : "text-[#626872]"} text-[8px] tracking-[0.18em]`}
                  >
                    {theme.number}
                  </span>
                  <span className="mt-2 text-2xl tracking-[-0.03em]">{theme.title}</span>
                  <span
                    className={`${central ? "text-[#555b64]" : "text-[#626872]"} mt-2 text-[7px] uppercase tracking-[0.12em] opacity-0 transition-opacity group-hover:opacity-100`}
                  >
                    Read ↗
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 grid grid-cols-1 border-l border-t border-[#27272a] sm:grid-cols-2 lg:hidden">
            {themeOrder.map((slug) => {
              const theme = themes[slug];
              return (
                <Link
                  className="group min-h-52 border-b border-r border-[#27272a] p-5 transition-colors hover:bg-[#0c0c0d]"
                  href={`/ideas/${slug}`}
                  key={slug}
                >
                  <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.15em] text-[#626872]">
                    <span>
                      {theme.number} / {theme.english}
                    </span>
                    <span>↗</span>
                  </div>
                  <h2 className="mt-10 text-4xl tracking-[-0.04em]">{theme.title}</h2>
                  <p className="mt-4 max-w-sm text-xs leading-6 text-[#767d88]">{theme.thesis}</p>
                </Link>
              );
            })}
            <div className="border-b border-r border-[#27272a] p-5 sm:col-span-2">
              <p className="text-[9px] uppercase tracking-[0.15em] text-[#626872]">
                Philosophical dialogue
              </p>
              <p className="mt-4 text-xs leading-6 text-[#767d88]">
                {philosopherNodes.map((node) => node.name).join(" · ")}
              </p>
            </div>
          </div>

          <section className="border-y border-[#27272a] py-10 md:py-12">
            <div className="grid gap-5 md:grid-cols-[.75fr_1.25fr] md:items-end">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#767d88]">
                  Six reading coordinates
                </p>
                <h2 className="mt-3 text-3xl tracking-[-0.03em]">六条阅读路径</h2>
              </div>
              <p className="max-w-xl text-xs leading-6 text-[#626872]">
                哲学阐释、复调诗学、宗教批评、思想传记与作家阅读彼此校正，避免把陀思妥耶夫斯基缩减成一种固定答案。
              </p>
            </div>
            <div className="mt-8 grid border-l border-t border-[#27272a] sm:grid-cols-2 xl:grid-cols-3">
              {readingPaths.map((path, index) => (
                <article
                  className="min-h-56 border-b border-r border-[#27272a] p-5"
                  key={path.title}
                >
                  <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.14em] text-[#626872]">
                    <span>0{index + 1}</span>
                    <span>{path.label}</span>
                  </div>
                  <p className="mt-8 text-[10px] text-[#767d88]">{path.author}</p>
                  <h3 className="mt-3 text-lg leading-7 text-[#c9ccd1]">{path.title}</h3>
                  <p className="mt-4 text-xs leading-6 text-[#767d88]">{path.focus}</p>
                </article>
              ))}
            </div>
          </section>

          <footer className="flex flex-col gap-3 py-8 text-[9px] uppercase tracking-[0.13em] text-[#626872] sm:flex-row sm:items-center sm:justify-between">
            <span>5 themes · 10 interlocutors</span>
            <span>Suffering is the center, relation is the response</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
