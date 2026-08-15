import Link from "next/link";
import { workAnchorId } from "../../lib/archive-links";
import { workMaps } from "./data";

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
];

export default function WorksPage() {
  return (
    <main className="min-h-screen bg-[#0d0d0c] px-5 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-paper/20 pb-5">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">
          F·D
        </Link>
        <span className="hidden text-[10px] uppercase tracking-museum text-ash sm:block">
          Dostoevsky · Selected works
        </span>
        <span className="text-[10px] tracking-[0.16em] text-ash sm:hidden">作品展厅</span>
      </nav>

      <div className="mx-auto max-w-[1500px] py-12 sm:py-16 lg:grid lg:grid-cols-[155px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-12 lg:mb-0">
          <p className="text-[10px] tracking-museum text-ash">02 / ARCHIVE</p>
          <div className="archive-sidebar-nav mt-7 flex flex-wrap gap-x-5 gap-y-3 text-ash lg:grid lg:gap-y-5">
            {navigation.map(([label, href]) => (
              <Link
                className={`transition-colors hover:text-paper ${href === "/works" ? "text-paper" : ""}`}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </aside>

        <section>
          <div className="border-b border-paper/20 pb-12 sm:flex sm:items-end sm:justify-between sm:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-museum text-ash">
                A cabinet of moral weather
              </p>
              <h1 className="mt-5 font-display text-6xl leading-[.85] tracking-[-0.04em] sm:text-8xl">
                作品展厅
              </h1>
            </div>
            <p className="mt-7 max-w-sm text-sm leading-7 text-paper/60 sm:mt-0">
              小说不是答案的陈列，而是灵魂在暗处的实验。请从一部作品开始，在思想与命运之间缓慢行走。
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-7 sm:mt-10 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-9 lg:gap-x-12">
            {workMaps.map((work, index) => (
              <Link
                aria-label={`打开《${work.title}》空间地图`}
                className="work-card group relative isolate aspect-[16/10] scroll-mt-6 focus:outline-none"
                href={`/works/${work.slug}`}
                id={workAnchorId(work.title)}
                key={work.title}
              >
                <div className="work-card__frame absolute inset-0 overflow-hidden">
                  <div
                    aria-label={`${work.title} 场景图`}
                    className="work-card__media relative overflow-hidden bg-cover bg-center"
                    role="img"
                    style={{ backgroundImage: `url(${work.image})` }}
                  >
                    <div
                      aria-hidden="true"
                      className="work-card__image-wash absolute inset-0"
                      style={work.overlay ? { background: work.overlay } : undefined}
                    />
                  </div>

                  <div className="work-card__copy relative">
                    <div className="work-card__folio text-[8px] tracking-museum text-ash sm:text-[9px]">
                      <span>{String(index + 1).padStart(2, "0")} / 12</span>
                      <span aria-hidden="true" className="work-card__folio-rule" />
                      <span className="work-card__year">{work.year}</span>
                    </div>
                    <div className="work-card__heading">
                      <p className="work-card__theme text-[9px] tracking-[0.18em] text-[#c7ad72] sm:text-[10px]">
                        {work.theme}
                      </p>
                      <h2 className="work-card__title font-display text-paper">{work.title}</h2>
                    </div>
                    <div className="work-card__excerpt">
                      <span aria-hidden="true" className="work-card__excerpt-rule" />
                      <p className="work-card__detail text-paper/60">{work.detail}</p>
                      <span
                        aria-hidden="true"
                        className="work-card__arrow text-paper/0 transition duration-300 group-hover:translate-x-0.5 group-hover:text-paper/80"
                      >
                        ↗
                      </span>
                    </div>
                  </div>

                  <span aria-hidden="true" className="work-card__gutter absolute" />
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-10 border-t border-paper/15 pt-5 text-[10px] tracking-[0.14em] text-ash">
            SELECTED WORKS · 12 NOVELS · 1846—1880
          </p>
        </section>
      </div>
    </main>
  );
}
