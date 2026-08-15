"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { workHref } from "../../../lib/archive-links";
import { thinkerProfiles } from "../data";

export default function ThemeConnections({ works, thinkers }: { works: string[]; thinkers: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const profile = selected ? thinkerProfiles[selected] : null;

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  const move = (direction: -1 | 1) => {
    if (!selected) return;
    const index = thinkers.indexOf(selected);
    setSelected(thinkers[(index + direction + thinkers.length) % thinkers.length]);
  };

  return (
    <>
      <p className="text-[9px] uppercase tracking-[0.17em] text-[#626872]">小说坐标</p>
      <div className="mt-4 flex flex-wrap gap-2 md:grid md:gap-3">
        {works.map((work) => (
          <Link className="group inline-flex items-center justify-between gap-3 border-b border-transparent py-1 text-xs text-[#a7abb2] transition-colors hover:border-[#626872] hover:text-paper" href={workHref(work)} key={work}>
            <span>{work}</span><span className="text-[9px] text-[#555b64] transition-transform group-hover:translate-x-0.5">↗</span>
          </Link>
        ))}
      </div>

      <p className="mt-9 text-[9px] uppercase tracking-[0.17em] text-[#626872]">延伸对话</p>
      <div className="mt-4 flex flex-wrap gap-2 md:grid md:gap-2">
        {thinkers.map((thinker) => (
          <button className="group flex items-center justify-between gap-3 py-1 text-left text-xs text-[#767d88] transition-colors hover:text-paper" key={thinker} onClick={() => setSelected(thinker)} type="button">
            <span>{thinker}</span><span className="text-[10px] text-[#555b64] transition-transform group-hover:rotate-90">＋</span>
          </button>
        ))}
      </div>

      {profile && (
        <div aria-labelledby="thinker-dialog-title" aria-modal="true" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm sm:p-8" onMouseDown={(event) => { if (event.currentTarget === event.target) setSelected(null); }} role="dialog">
          <section className="flex max-h-[86vh] w-full max-w-3xl flex-col border border-[#626872] bg-[#09090a]">
            <header className="flex shrink-0 items-start justify-between gap-6 border-b border-[#27272a] p-5 sm:p-7">
              <div>
                <p className="text-[8px] uppercase tracking-[0.18em] text-[#626872]">Philosophical dialogue · {String(thinkers.indexOf(selected!) + 1).padStart(2, "0")}/{String(thinkers.length).padStart(2, "0")}</p>
                <h2 className="mt-4 text-3xl tracking-[-0.04em] text-paper sm:text-5xl" id="thinker-dialog-title">{profile.name}</h2>
                <p className="mt-2 text-[10px] tracking-[0.08em] text-[#767d88]">{profile.original} · {profile.years}</p>
              </div>
              <button aria-label="关闭思想介绍" className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#40444b] text-lg text-[#8f949d] transition-colors hover:border-paper hover:text-paper" onClick={() => setSelected(null)} ref={closeButtonRef} type="button">×</button>
            </header>

            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-8">
              <div className="flex flex-wrap gap-2">
                {profile.concepts.map((concept) => <span className="border border-[#27272a] px-3 py-1.5 text-[9px] tracking-[0.1em] text-[#767d88]" key={concept}>{concept}</span>)}
              </div>
              <div className="mt-9 grid gap-8 sm:grid-cols-[130px_minmax(0,1fr)]">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#626872]">思想简述</p>
                <p className="text-sm leading-8 text-[#a7abb2]">{profile.introduction}</p>
              </div>
              <div className="mt-9 grid gap-8 border-t border-[#27272a] pt-8 sm:grid-cols-[130px_minmax(0,1fr)]">
                <p className="text-[9px] uppercase tracking-[0.17em] text-[#626872]">与陀氏的联系</p>
                <p className="text-sm leading-8 text-[#a7abb2]">{profile.connection}</p>
              </div>
              <blockquote className="mt-9 border-l border-[#767d88] py-1 pl-5 text-base leading-8 text-[#c9ccd1]">{profile.tension}</blockquote>
              <p className="mt-8 text-[8px] uppercase tracking-[0.14em] text-[#4f545c]">向上滑动继续阅读 · Esc 关闭</p>
            </div>

            <footer className="grid shrink-0 grid-cols-2 border-t border-[#27272a]">
              <button className="border-r border-[#27272a] p-4 text-left text-[9px] uppercase tracking-[0.14em] text-[#767d88] transition-colors hover:bg-[#111113] hover:text-paper" onClick={() => move(-1)} type="button">← 上一位</button>
              <button className="p-4 text-right text-[9px] uppercase tracking-[0.14em] text-[#767d88] transition-colors hover:bg-[#111113] hover:text-paper" onClick={() => move(1)} type="button">下一位 →</button>
            </footer>
          </section>
        </div>
      )}
    </>
  );
}
