"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type Character = {
  id: string;
  name: string;
  conflict: [string, string];
  summary: string;
  image?: string;
  imagePosition?: string;
};

type WorkGroup = {
  number: string;
  title: string;
  year: string;
  characters: Character[];
};

const workGroups: readonly WorkGroup[] = [
  {
    number: "01",
    title: "穷人",
    year: "1846",
    characters: [
      {
        id: "devushkin",
        name: "杰武什金",
        conflict: ["尊严", "贫困"],
        summary: "他以书信守护体面，却不断被匮乏逼回屈辱的现实。",
      },
      {
        id: "varvara",
        name: "瓦尔瓦拉",
        conflict: ["自主", "依附"],
        summary: "她渴望自己选择生活，又不得不接受生存所要求的依附。",
      },
    ],
  },
  {
    number: "02",
    title: "白夜",
    year: "1848",
    characters: [
      {
        id: "dreamer",
        name: "幻想家",
        conflict: ["幻梦", "现实"],
        summary: "他在想象中拥有整个世界，却难以真正进入另一个人的生活。",
        image: "/images/characters/dreamer.jpg",
        imagePosition: "50% 26%",
      },
      {
        id: "nastenka",
        name: "娜斯简卡",
        conflict: ["等待", "新生"],
        summary: "她在旧日承诺与眼前温情之间，辨认自己真正想去的方向。",
      },
    ],
  },
  {
    number: "03",
    title: "涅朵奇卡",
    year: "1849",
    characters: [
      {
        id: "netochka",
        name: "涅朵奇卡",
        conflict: ["依恋", "自我"],
        summary: "她从创伤性的崇拜中醒来，艰难学习如何成为自己。",
      },
      {
        id: "yefimov",
        name: "叶菲莫夫",
        conflict: ["天才幻觉", "失败"],
        summary: "他把未被证明的天才当作信仰，也借此逃避一生的失败。",
      },
    ],
  },
  {
    number: "04",
    title: "被侮辱与被损害的",
    year: "1861",
    characters: [
      {
        id: "ivan-petrovich",
        name: "伊万·彼得罗维奇",
        conflict: ["见证", "无力"],
        summary: "他记录并承担他人的痛苦，却无法替任何人完成选择。",
        image: "/images/characters/ivan-petrovich.jpg",
        imagePosition: "50% 18%",
      },
      {
        id: "natasha",
        name: "娜塔莎",
        conflict: ["爱情", "尊严"],
        summary: "她为爱情越过家庭边界，又在屈辱中守住人格的底线。",
        image: "/images/characters/natasha.jpg",
        imagePosition: "50% 24%",
      },
      {
        id: "nelly",
        name: "内莉",
        conflict: ["渴望被爱", "拒绝援助"],
        summary: "她渴望亲近，却用拒绝保护自己不再遭受抛弃。",
        image: "/images/characters/nelly.jpg",
        imagePosition: "50% 28%",
      },
    ],
  },
  {
    number: "05",
    title: "死屋手记",
    year: "1861—1862",
    characters: [
      {
        id: "goryanchikov",
        name: "戈里扬奇科夫",
        conflict: ["自由", "囚禁"],
        summary: "肉身被囚之后，他仍试图在观察与记忆中保留人的自由。",
      },
      {
        id: "akim-akimych",
        name: "阿基姆·阿基梅奇",
        conflict: ["秩序", "屈从"],
        summary: "他依靠规则抵抗混乱，也几乎把自己完全交给规则。",
      },
    ],
  },
  {
    number: "06",
    title: "地下室手记",
    year: "1864",
    characters: [
      {
        id: "underground-man",
        name: "地下室人",
        conflict: ["自由意志", "自我毁灭"],
        summary: "他宁愿违背自身利益，也要证明人不是可被计算的机器。",
      },
      {
        id: "liza-underground",
        name: "丽莎",
        conflict: ["尊严", "被拯救"],
        summary: "她以真诚回应怜悯，却拒绝成为他人自我感动的工具。",
      },
    ],
  },
  {
    number: "07",
    title: "罪与罚",
    year: "1866",
    characters: [
      {
        id: "raskolnikov",
        name: "拉斯柯尔尼科夫",
        conflict: ["观念", "良知"],
        summary: "他以越界证明非凡，却在与他人的联系中重新听见良知。",
        image: "/images/characters/raskolnikov.jpg",
        imagePosition: "50% 20%",
      },
      {
        id: "sonya",
        name: "索尼娅",
        conflict: ["信仰", "屈辱"],
        summary: "她承受现实的屈辱，却拒绝让苦难夺走对人的信念。",
        image: "/images/characters/sonya.jpg",
        imagePosition: "50% 34%",
      },
      {
        id: "svidrigailov",
        name: "斯维德里盖洛夫",
        conflict: ["欲望", "虚无"],
        summary: "不受约束的欲望给他无限可能，也将世界耗成空洞。",
        image: "/images/characters/svidrigailov.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "dunya",
        name: "杜尼娅",
        conflict: ["牺牲", "自主"],
        summary: "她愿为亲人承担代价，却不允许任何人占有她的意志。",
      },
    ],
  },
  {
    number: "08",
    title: "赌徒",
    year: "1866",
    characters: [
      {
        id: "alexei-gambler",
        name: "阿列克谢",
        conflict: ["爱情", "赌瘾"],
        summary: "他把冒险误认作自由，也把赢得爱情变成另一场下注。",
      },
      {
        id: "polina",
        name: "波琳娜",
        conflict: ["骄傲", "依赖"],
        summary: "她以冷峻维护尊严，却无法彻底摆脱情感与金钱的牵制。",
        image: "/images/characters/polina.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "antonida",
        name: "安东尼达",
        conflict: ["金钱", "意志"],
        summary: "她把财富当作个人意志的延伸，也在轮盘前迎战偶然。",
      },
    ],
  },
  {
    number: "09",
    title: "白痴",
    year: "1869",
    characters: [
      {
        id: "myshkin",
        name: "梅诗金",
        conflict: ["纯善", "现实"],
        summary: "他以无条件的怜悯进入世界，却无法阻止善意造成新的伤害。",
        image: "/images/characters/myshkin.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "nastassya",
        name: "娜斯塔霞",
        conflict: ["羞辱", "自由"],
        summary: "她渴望摆脱被定义的命运，却反复回到自我惩罚之中。",
        image: "/images/characters/nastassya.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "rogozhin",
        name: "罗果仁",
        conflict: ["爱欲", "毁灭"],
        summary: "他把爱推向占有的极端，最终无法区分亲近与毁灭。",
        image: "/images/characters/rogozhin.jpg",
        imagePosition: "50% 18%",
      },
      {
        id: "aglaya",
        name: "阿格拉娅",
        conflict: ["理想", "占有"],
        summary: "她向往纯粹的英雄，也希望现实中的人符合她的想象。",
        image: "/images/characters/aglaya.jpg",
        imagePosition: "50% 22%",
      },
    ],
  },
  {
    number: "10",
    title: "群魔",
    year: "1872",
    characters: [
      {
        id: "stavrogin",
        name: "斯塔夫罗金",
        conflict: ["绝对自由", "虚无"],
        summary: "他拥有越过一切边界的能力，却找不到值得选择的方向。",
        image: "/images/characters/stavrogin.jpg",
        imagePosition: "50% 20%",
      },
      {
        id: "kirillov",
        name: "基里洛夫",
        conflict: ["上帝", "自由"],
        summary: "他试图以终极的自主证明人的神性，思想也因此走向死结。",
        image: "/images/characters/kirillov.jpg",
        imagePosition: "50% 24%",
      },
      {
        id: "shatov",
        name: "沙托夫",
        conflict: ["信仰", "背叛"],
        summary: "他在曾经的观念与重新发现的信仰之间，付出回头的代价。",
        image: "/images/characters/shatov.jpg",
        imagePosition: "50% 20%",
      },
      {
        id: "pyotr-verkhovensky",
        name: "彼得·韦尔霍文斯基",
        conflict: ["革命", "操控"],
        summary: "他借理想组织众人，真正迷恋的却是支配与混乱。",
      },
    ],
  },
  {
    number: "11",
    title: "少年",
    year: "1875",
    characters: [
      {
        id: "arkady",
        name: "阿尔卡季",
        conflict: ["独立", "父亲"],
        summary: "他以孤独和财富想象独立，却始终绕不开对父亲的渴望。",
        image: "/images/characters/arkady.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "versilov",
        name: "韦尔西洛夫",
        conflict: ["信仰", "分裂"],
        summary: "高尚理想与自我放纵同时存在，使他始终无法成为完整的人。",
        image: "/images/characters/versilov.jpg",
        imagePosition: "50% 22%",
      },
      {
        id: "katerina-adolescent",
        name: "卡捷琳娜",
        conflict: ["欲望", "权力"],
        summary: "她把感情与筹码交织在一起，试图掌握一段失控的关系。",
      },
    ],
  },
  {
    number: "12",
    title: "卡拉马佐夫兄弟",
    year: "1880",
    characters: [
      {
        id: "dmitri-karamazov",
        name: "德米特里",
        conflict: ["欲望", "责任"],
        summary: "他在激情中越界，却也执拗地追求一种能够承担罪责的荣誉。",
        image: "/images/characters/dmitri-karamazov.jpg",
        imagePosition: "50% 24%",
      },
      {
        id: "ivan-karamazov",
        name: "伊万",
        conflict: ["上帝", "自由"],
        summary: "他拒绝以无辜者的苦难换取和谐，也被自己的逻辑逼入裂隙。",
        image: "/images/characters/ivan-karamazov.jpg",
        imagePosition: "50% 28%",
      },
      {
        id: "alyosha-karamazov",
        name: "阿辽沙",
        conflict: ["信仰", "尘世"],
        summary: "他不是离开尘世保存信仰，而是把信仰带回混乱的人群。",
        image: "/images/characters/alyosha-karamazov.jpg",
        imagePosition: "62% 24%",
      },
      {
        id: "smerdyakov",
        name: "斯乜尔加科夫",
        conflict: ["观念", "行动"],
        summary: "他把他人的思想解释为许可，并把隐秘怨恨变成现实行动。",
      },
      {
        id: "grushenka",
        name: "格鲁申卡",
        conflict: ["复仇", "怜悯"],
        summary: "她以报复保护受伤的自尊，也在被理解时重新发现怜悯。",
        image: "/images/characters/grushenka.jpg",
        imagePosition: "48% 22%",
      },
    ],
  },
] as const;

export const characters = workGroups.flatMap((work) =>
  work.characters.map((character) => ({ ...character, work: work.title, year: work.year })),
);

type SvgPlacement = {
  id: string;
  x: number;
  y: number;
  rotate?: number;
};

const svgPlacements: readonly SvgPlacement[] = [
  // 上方竖臂
  { id: "dreamer", x: 500, y: 60 },
  { id: "nastenka", x: 500, y: 112 },
  { id: "devushkin", x: 500, y: 164 },
  { id: "netochka", x: 500, y: 216 },
  { id: "yefimov", x: 395, y: 160, rotate: -90 },
  { id: "antonida", x: 605, y: 160, rotate: 90 },
  { id: "polina", x: 500, y: 270 },

  // 中部横臂与交叉核心
  { id: "kirillov", x: 185, y: 330 },
  { id: "nastassya", x: 415, y: 335 },
  { id: "stavrogin", x: 710, y: 335 },
  { id: "underground-man", x: 185, y: 400 },
  { id: "raskolnikov", x: 515, y: 400 },
  { id: "sonya", x: 835, y: 400 },
  { id: "rogozhin", x: 155, y: 470 },
  { id: "myshkin", x: 315, y: 470 },
  { id: "ivan-karamazov", x: 470, y: 470 },
  { id: "alyosha-karamazov", x: 630, y: 470 },
  { id: "dmitri-karamazov", x: 820, y: 470 },
  { id: "natasha", x: 350, y: 545 },
  { id: "svidrigailov", x: 575, y: 545 },

  // 下方竖臂
  { id: "grushenka", x: 500, y: 635 },
  { id: "smerdyakov", x: 500, y: 690 },
  { id: "alexei-gambler", x: 500, y: 745 },
  { id: "goryanchikov", x: 500, y: 800 },
  { id: "ivan-petrovich", x: 365, y: 805, rotate: -90 },
  { id: "akim-akimych", x: 635, y: 805, rotate: 90 },
  { id: "versilov", x: 500, y: 855 },
  { id: "arkady", x: 500, y: 910 },
  { id: "varvara", x: 500, y: 965 },
  { id: "pyotr-verkhovensky", x: 370, y: 1045, rotate: -90 },
  { id: "liza-underground", x: 440, y: 1008 },
  { id: "nelly", x: 560, y: 1008 },
  { id: "shatov", x: 438, y: 1052 },
  { id: "aglaya", x: 562, y: 1052 },
  { id: "dunya", x: 440, y: 1096 },
  { id: "katerina-adolescent", x: 560, y: 1096 },
];

// 视觉层级依据普通读者中的人物熟知度与受欢迎程度，而非所属作品或剧情权重。
const readerPopularity: Record<string, number> = {
  raskolnikov: 3,
  myshkin: 3,
  "ivan-karamazov": 3,
  "underground-man": 3,
  sonya: 3,
  "alyosha-karamazov": 3,
  nastassya: 3,
  stavrogin: 3,
  rogozhin: 2,
  "dmitri-karamazov": 2,
  grushenka: 2,
  smerdyakov: 2,
  dreamer: 2,
  nastenka: 2,
  kirillov: 2,
  svidrigailov: 2,
  dunya: 2,
  devushkin: 2,
  netochka: 2,
  polina: 2,
  "alexei-gambler": 2,
  arkady: 2,
  natasha: 2,
  aglaya: 2,
  "pyotr-verkhovensky": 1,
  goryanchikov: 1,
  "ivan-petrovich": 1,
  versilov: 1,
  "liza-underground": 1,
  shatov: 1,
  nelly: 1,
  varvara: 1,
  antonida: 0,
  yefimov: 0,
  "akim-akimych": 0,
  "katerina-adolescent": 0,
};

const svgFontSizes = [22, 29, 40, 55] as const;
const compactTailIds = new Set([
  "pyotr-verkhovensky",
  "liza-underground",
  "nelly",
  "shatov",
  "aglaya",
  "dunya",
  "katerina-adolescent",
]);

export default function HomeCharacterPortraits() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState("raskolnikov");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeCharacter =
    characters.find((character) => character.id === activeId) ?? characters[0];
  const hoveredWork = characters.find((character) => character.id === hoveredId)?.work ?? null;

  return (
    <section
      className="archive-rule relative border-b bg-[#0b0c0e] px-5 py-20 sm:px-10 sm:py-24"
      id="character-portraits"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_22%_25%,rgba(119,91,54,.08),transparent_24%),radial-gradient(circle_at_74%_68%,rgba(69,79,94,.09),transparent_28%)]"
      />

      <div className="relative mx-auto max-w-7xl">
        <header className="archive-rule grid gap-6 border-t pt-6 md:grid-cols-[1fr_2fr]">
          <p className="text-[10px] uppercase tracking-museum text-ash">
            Thirty-six figures · one field
          </p>
          <div className="flex items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl leading-none sm:text-5xl">人物群像</h2>
              <p className="text-paper/42 mt-4 text-[10px] tracking-[0.13em]">
                跨越十二部作品 · 三十六种精神裂隙
              </p>
            </div>
            <p className="text-paper/42 hidden text-[10px] tracking-[0.12em] sm:block">
              悬停人物 · 显示内心冲突
            </p>
          </div>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,.65fr)] lg:items-start lg:gap-12">
          <div
            aria-label="主要人物精神冲突群像"
            className="relative w-full max-w-[520px] justify-self-center"
          >
            <svg
              aria-labelledby="character-cross-title character-cross-description"
              className="h-auto w-full overflow-visible font-display"
              role="img"
              viewBox="0 0 1000 1160"
            >
              <title id="character-cross-title">陀思妥耶夫斯基人物名字十字架词云</title>
              <desc id="character-cross-description">
                三十六个人物姓名组成一个边缘略不规则的十字架，字号表示人物的读者熟知度。
              </desc>
              <g>
                {svgPlacements.map((placement) => {
                  const character = characters.find((item) => item.id === placement.id)!;
                  const popularity = readerPopularity[character.id] ?? 1;
                  const isHovered = character.id === hoveredId;
                  const isRelated = Boolean(hoveredWork && character.work === hoveredWork);
                  const opacity = hoveredWork
                    ? isHovered
                      ? 1
                      : isRelated
                        ? 0.82
                        : 0.16
                    : [0.34, 0.5, 0.72, 0.94][popularity];
                  const fill = isHovered
                    ? "#d4b979"
                    : isRelated
                      ? "#e0d8c7"
                      : popularity >= 3
                        ? "#e5e0d4"
                        : popularity === 2
                          ? "#c7c0b1"
                          : "#aaa397";

                  return (
                    <Link
                      aria-label={`查看${character.name}人物详情`}
                      href={`/characters/${character.id}`}
                      key={character.id}
                      onBlur={() => setHoveredId(null)}
                      onFocus={() => {
                        setActiveId(character.id);
                        setHoveredId(character.id);
                      }}
                      onMouseEnter={() => {
                        setActiveId(character.id);
                        setHoveredId(character.id);
                      }}
                      onMouseLeave={() => setHoveredId(null)}
                      tabIndex={0}
                    >
                      <text
                        dominantBaseline="middle"
                        fill={fill}
                        fontSize={svgFontSizes[popularity]}
                        letterSpacing={compactTailIds.has(character.id) ? -2.5 : undefined}
                        opacity={opacity}
                        style={{
                          transition: prefersReducedMotion
                            ? "none"
                            : "fill 180ms ease, opacity 180ms ease",
                        }}
                        textAnchor="middle"
                        transform={
                          placement.rotate
                            ? `rotate(${placement.rotate} ${placement.x} ${placement.y})`
                            : undefined
                        }
                        x={placement.x}
                        y={placement.y}
                      >
                        {character.name}
                      </text>
                    </Link>
                  );
                })}
              </g>
            </svg>
          </div>

          <aside
            aria-live="polite"
            className="archive-rule sticky top-4 z-20 order-first overflow-hidden border bg-[#111214]/95 shadow-[0_20px_55px_rgba(0,0,0,.32)] backdrop-blur-md lg:order-last lg:bg-[#0e0f11] lg:shadow-none"
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.article
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-[118px_minmax(0,1fr)] items-start sm:grid-cols-[136px_minmax(0,1fr)] lg:grid-cols-[minmax(150px,.78fr)_minmax(0,1fr)]"
                exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -8 }}
                initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
                key={activeCharacter.id}
                transition={{ duration: prefersReducedMotion ? 0.1 : 0.28 }}
              >
                <div className="relative aspect-[3/4] overflow-hidden border-r border-paper/10 bg-[#08090a]">
                  {activeCharacter.image ? (
                    <Image
                      alt={`${activeCharacter.name}人物插图`}
                      className="object-contain brightness-[.72] contrast-[.94] saturate-[.5] sepia-[.06]"
                      fill
                      sizes="(max-width: 639px) 118px, (max-width: 1023px) 136px, 180px"
                      src={activeCharacter.image}
                      style={{ objectPosition: activeCharacter.imagePosition }}
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(circle_at_center,rgba(183,151,91,.09),transparent_45%),linear-gradient(145deg,#131416,#08090a)]">
                      <span className="font-display text-6xl text-paper/[.045] lg:text-8xl">
                        {activeCharacter.name.slice(0, 1)}
                      </span>
                    </div>
                  )}
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-[#0e0f11]/35 via-transparent to-black/5"
                  />
                  <p className="text-paper/42 absolute bottom-3 left-3 hidden text-[7px] uppercase tracking-[0.16em] lg:block">
                    {activeCharacter.image
                      ? "Character illustration"
                      : "No individual illustration"}
                  </p>
                </div>

                <div className="flex min-w-0 flex-col justify-center p-4 sm:p-5 lg:min-h-full lg:justify-start lg:p-6">
                  <p className="text-[8px] uppercase tracking-[0.16em] text-[#bca36c]">
                    《{activeCharacter.work}》 · {activeCharacter.year}
                  </p>
                  <h3 className="mt-2 font-display text-2xl tracking-[-0.02em] text-paper lg:mt-4 lg:text-3xl">
                    {activeCharacter.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-3 lg:mt-6 lg:gap-4">
                    <span className="text-sm text-paper/80 lg:text-base">
                      {activeCharacter.conflict[0]}
                    </span>
                    <span aria-hidden="true" className="h-px flex-1 bg-paper/20" />
                    <span className="text-sm text-paper/80 lg:text-base">
                      {activeCharacter.conflict[1]}
                    </span>
                  </div>

                  <p className="text-paper/52 mt-4 line-clamp-3 text-[11px] leading-5 lg:mt-5 lg:line-clamp-none lg:text-sm lg:leading-7">
                    {activeCharacter.summary}
                  </p>

                  <p className="text-paper/28 mt-6 hidden border-t border-paper/10 pt-5 text-[8px] uppercase tracking-[0.15em] lg:block">
                    Hover / focus / touch a name
                  </p>
                </div>
              </motion.article>
            </AnimatePresence>
          </aside>
        </div>
      </div>
    </section>
  );
}
