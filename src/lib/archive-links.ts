const workAnchorIds: Record<string, string> = {
  穷人: "poor-folk",
  白夜: "white-nights",
  涅朵奇卡: "netochka-nezvanova",
  被侮辱与被损害的: "humiliated-and-insulted",
  被侮辱与被损害的人: "humiliated-and-insulted",
  死屋手记: "notes-from-house-of-dead",
  地下室手记: "notes-from-underground",
  罪与罚: "crime-and-punishment",
  赌徒: "the-gambler",
  白痴: "the-idiot",
  群魔: "demons",
  少年: "the-adolescent",
  卡拉马佐夫兄弟: "brothers-karamazov",
};

export function workAnchorId(title: string) {
  const normalized = title.replace(/[《》]/g, "");
  return `work-${workAnchorIds[normalized] ?? encodeURIComponent(normalized)}`;
}

export function workHref(title: string) {
  const normalized = title.replace(/[《》]/g, "");
  const slug = workAnchorIds[normalized];
  return slug ? `/works/${slug}` : `/works#${workAnchorId(normalized)}`;
}
