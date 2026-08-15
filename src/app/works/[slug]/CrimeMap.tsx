"use client";

import Link from "next/link";
import { useState } from "react";

type MapMode = "novel" | "mind";

const places = [
  { id: "raskolnikov-house", name: "拉斯柯尔尼科夫故居", chapter: "第一部第1章", people: "拉斯柯尔尼科夫", keywords: "五层公寓 · 后楼梯 · 闷热", x: 54, y: 59, icon: "garret" },
  { id: "tavern", name: "酒馆", chapter: "第一部第2章", people: "拉斯柯尔尼科夫、马尔梅拉多夫", keywords: "苦难 · 索尼娅 · 倾听", x: 38, y: 63, icon: "tavern" },
  { id: "kokushkin", name: "科库什金桥", chapter: "第一部第1、2、5章", people: "拉斯柯尔尼科夫、陌生人", keywords: "运河 · 穿越 · 眩晕", x: 67, y: 68, icon: "bridge" },
  { id: "yusupov-garden", name: "尤苏波夫花园", chapter: "第一部第7章", people: "拉斯柯尔尼科夫", keywords: "绕行 · 花园 · 临界", x: 38, y: 84, icon: "garden" },
  { id: "pawnbroker", name: "放债老太婆故居", chapter: "第一部第1、7章", people: "拉斯柯尔尼科夫、阿廖娜、丽莎韦塔", keywords: "踩点 · 越界 · 犯罪", x: 20, y: 51, icon: "pawnbroker" },
  { id: "sonya", name: "索尼娅·马尔梅拉多娃故居", chapter: "第四部第4章、第五部", people: "拉斯柯尔尼科夫、索尼娅", keywords: "拉撒路 · 告白 · 陪伴", x: 48, y: 68, icon: "sonya" },
  { id: "spasskaya-police", name: "斯帕斯卡娅警察分局旧会见所", chapter: "第二部第1章", people: "拉斯柯尔尼科夫、警员", keywords: "传唤 · 恐惧 · 良知", x: 14, y: 85, icon: "police" },
];

const mindStages = [
  { label: "观念", detail: "把人分为平凡与非凡，试图用理论跨越道德。", x: 12, y: 68 },
  { label: "试探", detail: "第一次踩点，把犯罪路线伪装成冷静的计算。", x: 29, y: 37 },
  { label: "越界", detail: "第二次抵达，理论在意外的第二条生命前崩解。", x: 47, y: 55 },
  { label: "隔绝", detail: "发热、游荡、逃避；惩罚先于法律发生。", x: 64, y: 31 },
  { label: "承认", detail: "在索尼娅面前说出犯罪，重新进入他者的世界。", x: 80, y: 62 },
  { label: "新生", detail: "西伯利亚不是结论，而是漫长责任的开端。", x: 89, y: 28 },
];

export function CrimeMap() {
  const [mode, setMode] = useState<MapMode>("novel");
  const [activePlace, setActivePlace] = useState<string | null>(null);
  const [route, setRoute] = useState<"visit" | "murder" | null>(null);
  const active = places.find((place) => place.id === activePlace);
  const routePoints = route === "visit" ? [places[0], places[2], places[4]] : [places[0], places[2], places[3], places[4]];
  const linePoints = routePoints.map((place) => `${place.x},${place.y}`).join(" ");

  const changeMode = (next: MapMode) => {
    setMode(next);
    setActivePlace(null);
    setRoute(null);
  };

  return (
    <main className="min-h-screen bg-[#12100d] text-[#ece6d8]">
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-[#c7b794]/25 bg-[#15120e]/90 px-5 py-5 backdrop-blur-md sm:px-10">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">F·D</Link>
        <div className="flex items-center gap-5 text-[9px] uppercase tracking-[0.16em] text-[#c9bea8] sm:gap-8"><Link className="transition-colors hover:text-white" href="/works">返回作品展厅</Link><span className="hidden sm:inline">Crime and Punishment · 1866</span></div>
      </nav>

      <aside className="fixed bottom-4 left-4 z-40 flex gap-1 border border-[#c5b48d]/30 bg-[#17130e]/90 p-1 shadow-2xl backdrop-blur sm:bottom-auto sm:left-8 sm:top-1/2 sm:block sm:-translate-y-1/2">
        {([ ["novel", "小说地图"], ["mind", "精神地图"] ] as const).map(([key, label]) => <button className={`px-4 py-3 text-[9px] tracking-[0.14em] transition sm:block sm:w-full sm:text-left ${mode === key ? "bg-[#b39863] text-[#17120c]" : "text-[#d7cbb5] hover:bg-white/10"}`} key={key} onClick={() => changeMode(key)} type="button">{label}</button>)}
      </aside>

      <section className="relative min-h-[100svh] overflow-hidden px-5 pb-8 pt-28 sm:px-10 sm:pb-10 sm:pt-32">
        <header className="relative z-20 max-w-xl">
          <p className="text-[9px] uppercase tracking-[0.22em] text-[#bda978]">1860s Saint Petersburg · {mode === "novel" ? "小说地图" : "精神地图"}</p>
          <h1 className="mt-4 font-display text-6xl leading-[.88] tracking-[-0.04em] sm:text-8xl">罪与罚</h1>
          <p className="mt-5 text-sm leading-7 text-[#d1c7b5]">{mode === "novel" ? "悬停或轻触节点可查看章节、人物与地点关键词；选择老太婆家可展开两次抵达的路线。" : "从自我授权到认罪，再到尚未完成的新生：拉斯柯尔尼科夫的心理路线并不与城市路线重合。"}</p>
        </header>

        {mode === "novel" && <NovelLayer active={active} activePlace={activePlace} linePoints={linePoints} route={route} setActivePlace={setActivePlace} setRoute={setRoute} />}
        {mode === "mind" && <MindLayer />}
      </section>
    </main>
  );
}

function NovelLayer({ active, activePlace, linePoints, route, setActivePlace, setRoute }: { active: typeof places[number] | undefined; activePlace: string | null; linePoints: string; route: "visit" | "murder" | null; setActivePlace: (id: string | null) => void; setRoute: (route: "visit" | "murder" | null) => void }) {
  return <div className="relative mt-8 aspect-[3/2] overflow-hidden border border-[#b9a877]/55 bg-[#b39a6d] shadow-[0_24px_80px_rgba(0,0,0,.45)] sm:mt-10">
    <MapIllustration />
    <StreetLabels />
    <svg aria-hidden="true" className="absolute inset-0 z-10 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">{route && <polyline fill="none" points={linePoints} stroke="#9b2c25" strokeDasharray="2 1.7" strokeLinecap="round" strokeWidth="1" />}</svg>
    {places.map((place) => <button className={`group absolute z-20 -translate-x-1/2 -translate-y-1/2 focus:outline-none ${activePlace === place.id ? "z-30" : ""}`} key={place.id} onClick={() => { setActivePlace(place.id); if (place.id !== "pawnbroker") setRoute(null); }} onMouseEnter={() => setActivePlace(place.id)} style={{ left: `${place.x}%`, top: `${place.y}%` }} type="button"><span className={place.id === "pawnbroker" ? "block drop-shadow-[0_0_12px_rgba(154,44,37,.7)]" : "block"}><BuildingIcon kind={place.icon} active={place.id === activePlace} interactive /></span><span className="pointer-events-none absolute left-1/2 top-full mt-3 w-52 -translate-x-1/2 border border-[#665640]/50 bg-[#17130e]/95 p-3 text-left opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-within:opacity-100"><strong className="block text-xs font-normal text-[#ede3cc]">{place.name}</strong><span className="mt-2 block text-[9px] leading-4 text-[#c3b79f]">{place.chapter}<br />{place.people}<br /><em className="not-italic text-[#d0ab64]">{place.keywords}</em></span></span></button>)}
    {active?.id === "pawnbroker" && <div className="absolute bottom-5 left-5 z-40 w-[min(92%,410px)] border border-[#c8aa69]/60 bg-[#17140f]/95 p-5 shadow-2xl"><p className="text-[8px] tracking-[.16em] text-[#c8aa69]">放债老太婆家 · 两次抵达</p><h2 className="mt-3 font-display text-3xl">{route === "murder" ? "第二次：真正杀人" : "第一次：踩点"}</h2><p className="mt-3 text-xs leading-6 text-[#c9c2b4]">{route === "murder" ? "拉斯柯尔尼科夫故居 → 科库什金桥 → 尤苏波夫花园 → 放债老太婆家。这次绕行使计划拉长，也让临界前的犹疑变得可见。" : "拉斯柯尔尼科夫故居 → 科库什金桥 → 放债老太婆家。他以看表、问路和观察门铃把暴力伪装成一项可控制的测试。"}</p><div className="mt-5 flex gap-2"><button className={`border px-3 py-2 text-[9px] tracking-[.12em] ${route !== "murder" ? "border-[#c8aa69] text-[#e2c47e]" : "border-white/20 text-white/55"}`} onClick={() => setRoute("visit")} type="button">第一次踩点</button><button className={`border px-3 py-2 text-[9px] tracking-[.12em] ${route === "murder" ? "border-[#c8aa69] text-[#e2c47e]" : "border-white/20 text-white/55"}`} onClick={() => setRoute("murder")} type="button">第二次真正杀人</button></div></div>}
    <p className="absolute right-5 top-5 z-20 text-[8px] tracking-[.15em] text-[#584a36]">HOVER / TAP · PLACE DOSSIER</p>
  </div>;
}

function MapIllustration() {
  return <><div aria-hidden="true" className="absolute inset-0 bg-contain bg-center bg-no-repeat" style={{ backgroundImage: "url(/images/maps/crime-punishment-petersburg-map.webp)" }} /><div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,31,16,.04),rgba(45,31,16,.18))]" /></>;
}

function StreetLabels() {
  return <>
    <div className="pointer-events-none absolute left-[16%] top-[17%] -rotate-8 text-[8px] tracking-[0.13em] text-[#3d3426]">涅瓦河</div>
    <div className="pointer-events-none absolute left-[31%] top-[38%] -rotate-2 text-[8px] tracking-[0.1em] text-[#3d3426]">莫伊卡河</div>
    <div className="pointer-events-none absolute left-[83%] top-[51%] rotate-[72deg] text-[8px] tracking-[0.1em] text-[#3d3426]">叶卡捷琳娜运河</div>
    <div className="pointer-events-none absolute left-[47%] top-[61%] -rotate-12 text-[8px] tracking-[0.1em] text-[#3d3426]">中梅尚斯卡娅街</div>
    <div className="pointer-events-none absolute left-[59%] top-[70%] rotate-[72deg] text-[8px] tracking-[0.1em] text-[#3d3426]">木匠巷</div>
    <div className="pointer-events-none absolute left-[26%] top-[82%] -rotate-5 text-[8px] tracking-[0.1em] text-[#3d3426]">萨多瓦娅街</div>
    <div className="pointer-events-none absolute left-[10%] top-[76%] -rotate-[62deg] text-[8px] tracking-[0.1em] text-[#3d3426]">沃兹涅先斯基大街</div>
    <div className="pointer-events-none absolute left-[63%] top-[64%] text-[8px] tracking-[0.1em] text-[#3d3426]">科库什金桥</div>
  </>;
}

const buildingIcons: Record<string, string> = {
  garret: "/images/maps/icons/crime-raskolnikov-house.webp",
  tavern: "/images/maps/icons/crime-tavern.png",
  bridge: "/images/maps/icons/crime-bridge.png",
  garden: "/images/maps/icons/crime-yusupov-garden.webp",
  pawnbroker: "/images/maps/icons/crime-pawnbroker.png",
  police: "/images/maps/icons/crime-police.png",
  sonya: "/images/maps/icons/crime-sonya.png",
};

function BuildingIcon({ kind, active = false, interactive = false }: { kind: string; active?: boolean; interactive?: boolean }) {
  const source = buildingIcons[kind];

  return <span className="relative grid h-14 w-16 place-items-center sm:h-[4.7rem] sm:w-[5.5rem]">
    {interactive && <span aria-hidden="true" className={`absolute -inset-1 z-0 rounded-[18px] border-2 border-[#7b2823] bg-[#e3bd67]/15 shadow-[0_0_0_2px_rgba(246,220,151,.52),0_0_18px_rgba(100,30,26,.52)] transition duration-200 ${active ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"}`} />}
    <span aria-hidden="true" className="relative z-10 block h-full w-full bg-contain bg-center bg-no-repeat drop-shadow-[0_5px_4px_rgba(40,25,11,.42)]" style={{ backgroundImage: `url(${source})` }} />
  </span>;
}

function MindLayer() {
  return <div className="relative mt-8 min-h-[62vh] overflow-hidden border border-[#705c65]/50 bg-[#151014] shadow-[0_24px_80px_rgba(0,0,0,.45)] sm:mt-10 sm:min-h-[66vh]">
    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(101,51,55,.42),transparent_35%),radial-gradient(circle_at_82%_20%,rgba(70,91,103,.36),transparent_36%)]" />
    <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M9 70 C20 53 27 25 42 55 S57 80 67 34 S79 39 90 29" fill="none" stroke="#a98b71" strokeWidth=".7" strokeDasharray="2 2" /></svg>
    {mindStages.map((stage, index) => <div className="absolute -translate-x-1/2 -translate-y-1/2" key={stage.label} style={{ left: `${stage.x}%`, top: `${stage.y}%` }}><div className={`grid h-14 w-14 place-items-center rounded-full border text-[9px] tracking-[.12em] shadow-xl sm:h-20 sm:w-20 ${index === 2 ? "border-[#c6a76b] bg-[#34221e] text-[#e3c889]" : "border-[#a79599]/50 bg-[#21181e] text-[#d5c8ca]"}`}>{String(index + 1).padStart(2, "0")}</div><div className="mt-3 w-36 text-center"><p className="text-xs tracking-[.12em] text-[#e0d4d5]">{stage.label}</p><p className="mt-2 text-[9px] leading-4 text-[#a99ba0]">{stage.detail}</p></div></div>)}
    <p className="absolute bottom-5 left-5 max-w-sm text-xs leading-6 text-[#b8a9ad]">心理地图不是诊断，而是小说如何让观念、身体、羞耻与他人关系相互作用的阅读路径。</p>
  </div>;
}
