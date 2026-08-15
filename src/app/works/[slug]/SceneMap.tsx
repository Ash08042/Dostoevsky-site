"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { WorkMap } from "../data";

const nodePositions = [
  { left: "12%", top: "58%" },
  { left: "25%", top: "29%" },
  { left: "41%", top: "65%" },
  { left: "58%", top: "24%" },
  { left: "74%", top: "61%" },
  { left: "88%", top: "34%" },
  { left: "88%", top: "72%" },
];

export function SceneMap({ work }: { work: WorkMap }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"scenes" | "journey">("scenes");
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeStopIndex, setActiveStopIndex] = useState(0);
  const activeScene = activeIndex === null ? null : work.scenes[activeIndex];
  const journeyDays = work.journey ?? [];
  const activeDay = journeyDays[activeDayIndex] ?? null;
  const activeStop = activeDay?.stops[activeStopIndex] ?? null;

  const selectView = (mode: "scenes" | "journey") => {
    setActiveIndex(null);
    setViewMode(mode);
  };

  const selectDay = (index: number) => {
    setActiveDayIndex(index);
    setActiveStopIndex(0);
  };

  useEffect(() => {
    if (activeIndex === null) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [activeIndex]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#060606] text-paper">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/15 bg-black/55 px-5 py-5 backdrop-blur-md sm:px-10">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">F·D</Link>
        <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.16em] text-white/55 sm:gap-8">
          <Link className="transition-colors hover:text-white" href="/works">返回作品展厅</Link>
          <span className="hidden sm:inline">Spatial narrative · {work.year}</span>
        </div>
      </nav>

      <section className={`relative overflow-hidden ${viewMode === "journey" ? "min-h-[900px] sm:min-h-[100svh]" : "min-h-[100svh]"}`}>
        <div
          aria-label={`${work.title}空间地图底图`}
          className="absolute inset-0 bg-contain bg-center bg-no-repeat"
          role="img"
          style={{ backgroundImage: `url(${work.image})` }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(10,10,8,.05),rgba(5,5,5,.62)_70%,rgba(3,3,3,.94)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,3,3,.65)_0%,rgba(3,3,3,.06)_30%,rgba(3,3,3,.14)_64%,rgba(3,3,3,.9)_100%)]" />

        <header className="absolute left-5 top-28 z-30 max-w-3xl sm:left-10 sm:top-32">
          <p className="text-[9px] uppercase tracking-[0.22em] text-white/55">{work.theme} · {viewMode === "journey" ? "人物动线" : "空间地图"}</p>
          <h1 className="mt-4 font-display text-5xl leading-[.9] tracking-[-0.035em] drop-shadow-[0_4px_18px_rgba(0,0,0,.85)] sm:text-7xl">{work.title}</h1>
          {journeyDays.length > 0 && (
            <div aria-label="地图视图" className="mt-6 inline-grid grid-cols-2 border border-[#c8ae73]/70 bg-black/85 p-1 shadow-[0_12px_30px_rgba(0,0,0,.68),0_0_0_1px_rgba(255,255,255,.08)] backdrop-blur-md" role="group">
              <button aria-pressed={viewMode === "scenes"} className={`min-w-[108px] whitespace-nowrap px-3 py-2.5 text-[9px] font-medium tracking-[0.12em] transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0d99e] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-w-[128px] sm:px-5 sm:text-[10px] ${viewMode === "scenes" ? "bg-[#c8ae73] text-[#100d08] shadow-[inset_0_0_0_1px_rgba(255,248,220,.36)]" : "text-white/72 hover:bg-white/10 hover:text-white"}`} onClick={() => selectView("scenes")} type="button">小说场景</button>
              <button aria-pressed={viewMode === "journey"} className={`min-w-[136px] whitespace-nowrap px-3 py-2.5 text-[9px] font-medium tracking-[0.12em] transition duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f0d99e] focus-visible:ring-offset-2 focus-visible:ring-offset-black sm:min-w-[158px] sm:px-5 sm:text-[10px] ${viewMode === "journey" ? "bg-[#c8ae73] text-[#100d08] shadow-[inset_0_0_0_1px_rgba(255,248,220,.36)]" : "text-white/72 hover:bg-white/10 hover:text-white"}`} onClick={() => selectView("journey")} type="button">阿辽沙三日动线</button>
            </div>
          )}
          {viewMode === "journey" && activeDay && (
            <div className="mt-3 sm:hidden">
              <div aria-label="选择阿辽沙动线日期" className="flex border-b border-white/20" role="tablist">
                {journeyDays.map((day, index) => (
                  <button aria-selected={activeDayIndex === index} className={`border-b px-3 py-2 text-[9px] tracking-[0.14em] transition ${activeDayIndex === index ? "border-[#c7a96b] text-[#e0c98f]" : "border-transparent text-white/42"}`} key={day.id} onClick={() => selectDay(index)} role="tab" type="button">{day.label}</button>
                ))}
              </div>
              <p className="mt-3 text-[8px] uppercase tracking-[0.14em] text-white/42">{activeDay.range}</p>
              <p className="mt-1 text-xs text-white/68">{activeDay.title}</p>
            </div>
          )}
        </header>

        {viewMode === "scenes" && (
          <div className="absolute inset-x-5 bottom-7 z-20 flex items-end justify-between gap-5 sm:inset-x-10 sm:bottom-9">
            <p className="max-w-xl text-xs leading-6 text-white/58 sm:text-sm sm:leading-7">点击地图中的图片节点，打开对应场景。</p>
            <p className="hidden text-[9px] uppercase tracking-[0.18em] text-white/45 sm:block">{String(work.scenes.length).padStart(2, "0")} scenes · route 01—{String(work.scenes.length).padStart(2, "0")}</p>
          </div>
        )}

        {viewMode === "scenes" && (
          <div aria-label="剧情场景路线" className={`absolute inset-x-3 bottom-24 z-20 sm:inset-x-8 sm:bottom-28 ${journeyDays.length > 0 ? "top-[20rem] sm:top-[21rem]" : "top-48 sm:top-52"}`}>
            <div aria-hidden="true" className="absolute left-[8%] right-[7%] top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            {work.scenes.map((scene, index) => {
              const position = nodePositions[index] ?? nodePositions[nodePositions.length - 1];
              const featured = scene.featured;
              return (
                <button
                  aria-label={`打开场景：${scene.location}，${scene.title}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 text-left focus:outline-none"
                  key={scene.id}
                  onClick={() => setActiveIndex(index)}
                  style={position}
                  type="button"
                >
                  <span className={`relative block aspect-[4/3] w-[76px] overflow-hidden border bg-[#111] shadow-[0_16px_40px_rgba(0,0,0,.7)] transition duration-300 group-hover:-translate-y-1 group-hover:scale-105 group-focus-visible:-translate-y-1 group-focus-visible:scale-105 sm:w-[132px] ${featured ? "border-2 border-[#c7a96b] shadow-[0_0_0_1px_rgba(199,169,107,.35),0_18px_42px_rgba(0,0,0,.8)]" : "border-white/30 group-hover:border-white/70"}`}>
                    <span aria-hidden="true" className="absolute inset-0 scale-110 bg-cover bg-center grayscale-[35%] transition duration-500 group-hover:scale-100 group-hover:grayscale-0" style={{ backgroundImage: `url(${scene.image ?? work.image})` }} />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/75" />
                    <span className="absolute left-2 top-2 grid h-6 w-6 place-items-center border border-white/35 bg-black/65 text-[8px] tracking-[0.1em] text-white/75 backdrop-blur">{scene.order}</span>
                  </span>
                  <span className="mt-2 block max-w-[148px] text-[10px] leading-4 tracking-[0.07em] text-white/76 drop-shadow-[0_2px_8px_rgba(0,0,0,.9)] sm:text-[11px]">{scene.location}</span>
                </button>
              );
            })}
          </div>
        )}

        {viewMode === "journey" && activeDay && activeStop && (
          <>
            <div className="absolute inset-x-10 top-[20.5rem] z-30 hidden sm:block">
              <div className="flex items-end justify-between gap-6">
                <div aria-label="选择阿辽沙动线日期" className="flex border-b border-white/20" role="tablist">
                  {journeyDays.map((day, index) => (
                    <button aria-selected={activeDayIndex === index} className={`border-b px-3 py-2 text-[9px] tracking-[0.14em] transition sm:px-5 ${activeDayIndex === index ? "border-[#c7a96b] text-[#e0c98f]" : "border-transparent text-white/42 hover:text-white/75"}`} key={day.id} onClick={() => selectDay(index)} role="tab" type="button">{day.label}</button>
                  ))}
                </div>
                <div className="hidden max-w-md text-right sm:block">
                  <p className="text-[9px] uppercase tracking-[0.16em] text-white/42">{activeDay.range}</p>
                  <p className="mt-2 text-sm text-white/72">{activeDay.title}</p>
                </div>
              </div>
            </div>

            <div aria-label={`${activeDay.label}阿辽沙动线`} className="absolute inset-x-8 bottom-[12.5rem] top-[24.5rem] z-20 hidden sm:block" role="tabpanel">
              <svg aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                <polyline fill="none" points={activeDay.stops.map((stop) => `${stop.x},${stop.y}`).join(" ")} stroke="rgba(216,189,127,.55)" strokeDasharray="1.2 1.4" strokeLinecap="round" strokeLinejoin="round" strokeWidth=".34" vectorEffect="non-scaling-stroke" />
              </svg>
              {activeDay.stops.map((stop, index) => (
                <button
                  aria-label={`${stop.order}，${stop.location}：${stop.title}`}
                  aria-pressed={activeStopIndex === index}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 text-left focus:outline-none"
                  key={stop.id}
                  onClick={() => setActiveStopIndex(index)}
                  style={{ left: `${stop.x}%`, top: `${stop.y}%` }}
                  type="button"
                >
                  <span className={`grid h-10 w-10 place-items-center border bg-black/75 text-[9px] tracking-[0.1em] shadow-[0_10px_30px_rgba(0,0,0,.8)] backdrop-blur-sm transition duration-200 group-hover:-translate-y-1 group-focus-visible:-translate-y-1 ${activeStopIndex === index ? "border-[#d8bd7f] text-[#ead8a8] shadow-[0_0_0_3px_rgba(168,139,82,.14),0_12px_30px_rgba(0,0,0,.85)]" : "border-white/32 text-white/62 group-hover:border-white/65"}`}>{stop.order}</span>
                  <span className={`mt-2 block w-40 text-[11px] leading-4 tracking-[0.05em] drop-shadow-[0_2px_8px_rgba(0,0,0,.95)] ${activeStopIndex === index ? "text-white" : "text-white/68"}`}>{stop.location}</span>
                </button>
              ))}
            </div>

            <div aria-label={`${activeDay.label}阿辽沙动线`} className="absolute inset-x-5 bottom-7 top-[26rem] z-20 overflow-y-auto border-l border-white/16 pl-4 sm:hidden" role="tabpanel">
              <ol className="space-y-3 pb-4">
                {activeDay.stops.map((stop, index) => (
                  <li className="relative" key={stop.id}>
                    <span aria-hidden="true" className={`absolute -left-[21px] top-4 h-2 w-2 rounded-full border bg-[#080808] ${activeStopIndex === index ? "border-[#d8bd7f]" : "border-white/35"}`} />
                    <button aria-pressed={activeStopIndex === index} className={`w-full border p-4 text-left transition ${activeStopIndex === index ? "border-[#a88b52]/70 bg-black/70" : "border-white/14 bg-black/45"}`} onClick={() => setActiveStopIndex(index)} type="button">
                      <span className="flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.13em] text-white/42"><span>{stop.order} · {stop.location}</span><span>{stop.chapter}</span></span>
                      <span className="mt-2 block text-base text-white/88">{stop.title}</span>
                      {activeStopIndex === index && <span className="mt-3 block text-xs leading-6 text-white/58">{stop.summary}</span>}
                    </button>
                  </li>
                ))}
              </ol>
            </div>

            <div className="absolute inset-x-10 bottom-8 z-30 hidden items-end justify-between gap-10 sm:flex">
              <article aria-live="polite" className="max-w-2xl border-l border-[#b79a5f] bg-black/55 py-3 pl-5 pr-6 backdrop-blur-sm">
                <p className="text-[8px] uppercase tracking-[0.16em] text-[#cdb374]">{activeStop.order} · {activeStop.location} · {activeStop.chapter}</p>
                <h2 className="mt-3 font-display text-2xl leading-tight text-white/92">{activeStop.title}</h2>
                <p className="mt-3 text-xs leading-6 text-white/58">{activeStop.summary}</p>
              </article>
              <p className="max-w-sm text-right text-[10px] leading-5 text-white/42">{activeDay.summary}</p>
            </div>
          </>
        )}
      </section>

      {activeScene && (
        <div aria-labelledby="scene-dialog-title" aria-modal="true" className="fixed inset-0 z-[70] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onMouseDown={(event) => { if (event.currentTarget === event.target) setActiveIndex(null); }} role="dialog">
          <article className={`relative grid max-h-[88svh] w-full max-w-5xl overflow-y-auto border bg-[#0a0a09] shadow-[0_30px_100px_rgba(0,0,0,.9)] md:grid-cols-[1.15fr_.85fr] ${activeScene.featured ? "border-2 border-[#a88b52]" : "border-white/20"}`}>
            <div className="relative min-h-[280px] overflow-hidden md:min-h-[620px]">
              <div aria-label={`${activeScene.title}场景图`} className="absolute inset-0 scale-105 bg-cover bg-center" role="img" style={{ backgroundImage: `url(${activeScene.image ?? work.image})` }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/12 to-black/25" />
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between text-[9px] uppercase tracking-[0.16em] text-white/65 sm:bottom-7 sm:left-7 sm:right-7">
                <span>{activeScene.location}</span><span>{activeScene.order} / {String(work.scenes.length).padStart(2, "0")}</span>
              </div>
            </div>
            <div className="flex flex-col justify-between p-6 sm:p-9">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-[9px] uppercase tracking-[0.18em] text-white/45">{activeScene.chapter}</span>
                  {activeScene.featured && <span className="border border-[#a88b52] px-3 py-1.5 text-[8px] tracking-[0.14em] text-[#d8bd7f]">本书名场景</span>}
                </div>
                <h2 className="mt-8 font-display text-4xl leading-[1.05] tracking-[-0.03em] sm:text-5xl" id="scene-dialog-title">{activeScene.title}</h2>
                <p className="mt-7 text-sm leading-8 text-white/64">{activeScene.summary}</p>
                {activeScene.excerpt && <blockquote className="mt-7 whitespace-pre-line border-l border-[#b79a5f] pl-4 font-jinghua text-sm leading-7 text-[#d9ccb2]">{activeScene.excerpt}</blockquote>}
              </div>
              <div className="mt-10 border-t border-white/15 pt-5 text-[9px] uppercase tracking-[0.14em] text-white/45">人物 · {activeScene.characters}</div>
            </div>
            <button aria-label="关闭场景" className="absolute right-4 top-4 grid h-9 w-9 place-items-center border border-white/30 bg-black/55 text-lg text-white/75 backdrop-blur transition hover:border-white hover:text-white" onClick={() => setActiveIndex(null)} type="button">×</button>
          </article>
        </div>
      )}
    </main>
  );
}
