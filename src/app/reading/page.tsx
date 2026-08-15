"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { workHref } from "../../lib/archive-links";

type ChapterGuide = {
  range: string;
  title: string;
  detail: string;
};

type TranslationSample = {
  translator: string;
  edition: string;
  text: string;
  source?: string;
};

type ReadingWork = {
  title: string;
  year: string;
  threshold: string;
  image: string;
  cover: string;
  translation: string;
  edition: string;
  reason: string;
  translationSamples: TranslationSample[];
  introduction: string[];
  chapters: ChapterGuide[];
  prompt: string;
};

const readingWorks: ReadingWork[] = [
  {
    title: "白夜",
    year: "1848",
    threshold: "从孤独开始",
    image: "/images/works/white-nights.png",
    cover: "/images/reading/white-nights-cover.jpg",
    translation: "荣如德、周朴之、翁文达 译",
    edition: "上海译文出版社 · 陀思妥耶夫斯基文集",
    reason:
      "译文清澈而不轻佻，保留了幻想家长句中急促、自我修正的节奏；合集还可顺势阅读同一时期的中短篇，观察陀思妥耶夫斯基如何从感伤主义走向更复杂的心理写作。",
    translationSamples: [
      {
        translator: "荣如德 译",
        edition: "上海译文出版社《白夜》",
        text: "我的上帝！那是足足一分钟的欣悦啊！这难道还不够一个人受用整整一辈子吗？",
        source: "https://shihong.us/wy/baiye.pdf",
      },
      {
        translator: "臧仲伦 译",
        edition: "译林出版社《白夜》",
        text: "我的上帝！这是一整段极其快乐的时光啊！难道在人的整个一生中，哪怕就有这么一丁点儿，还嫌少吗？",
        source: "https://book.douban.com/subject/6951000/blockquotes",
      },
    ],
    introduction: [
      "《白夜》发生在彼得堡短暂而明亮的夏夜。一个没有姓名、几乎没有现实社交的“幻想家”，在运河边遇见等待恋人归来的娜斯坚卡。四个夜晚里，两人以近乎毫无防备的速度交换身世：她讲祖母、租客与被推迟的承诺，他讲自己怎样把城市、房屋和偶遇的行人编进私人生活。被倾听的经验让幻想家第一次感到自己进入了真实世界，也让他把友谊迅速理解为爱情。小说篇幅很短，情感却并不单纯；两个人都在借对方抵抗孤独，却对这段关系怀着不同期待。",
      "陀思妥耶夫斯基没有嘲笑幻想家的天真。幻想既是他的避难所，也是使他无法行动的牢笼：他能细致想象一生，却没有勇气真正生活。娜斯坚卡则比他更接近现实，她愿意倾诉、等待，也愿意在旧爱出现时立即作出选择。结尾的失落因此不只是失恋，而是幻想家短暂获得共同生活之后，再度退回独白的瞬间。作品已经显露出作者后来反复追问的问题——人是否爱具体的他者，还是只爱自己关于爱与牺牲的想象。",
      "把它作为阅读起点，是因为这里尚没有谋杀、审判和神学论辩，只有一种容易辨认的情感经验：孤独的人渴望被看见。读者可以留意叙述者语气如何从喜悦滑向夸张，又如何主动美化自己的退让。最后那句对“一瞬幸福”的肯定并非廉价安慰，它把失败保存为真实发生过的关系：幸福虽然不能取消余生的孤独，却可能改变一个人理解孤独的方式。日后读到地下室人、梅什金或阿辽沙时，这个温柔而危险的幻想家仍会以不同面目出现。",
    ],
    chapters: [
      {
        range: "第一夜",
        title: "相遇与约定",
        detail: "幻想家从城市独白走进一次真实交谈；注意他如何迅速把偶遇写成命运。",
      },
      {
        range: "第二夜—第三夜",
        title: "两份身世，两种期待",
        detail: "娜斯坚卡讲述旧爱，幻想家则坦白自己的幻想生活；两人的亲密从一开始就不对称。",
      },
      {
        range: "第四夜—早晨",
        title: "幸福的瞬间与撤回",
        detail: "告白、回应与旧人归来接连发生；结尾把失去转换为记忆，也留下爱的伦理疑问。",
      },
    ],
    prompt: "一次真实的幸福，足以照亮漫长孤独吗？",
  },
  {
    title: "地下室手记",
    year: "1864",
    threshold: "进入反叛意识",
    image: "/images/works/notes-from-underground.png",
    cover: "/images/reading/notes-underground-cover.jpg",
    translation: "曾思艺 译",
    edition: "浙江文艺出版社 · 2020",
    reason:
      "曾思艺译本保留独白中的停顿、挑衅与自我反驳，让地下室人的论辩保持口语压力，而不是被处理成平整的哲学论文；装帧清楚、篇幅轻便，适合作为进入这部作品的单行本。",
    translationSamples: [
      {
        translator: "曾思艺 译",
        edition: "《地下室手记》",
        text: "我不仅不会成为凶狠的人，甚至也不会成为任何一种人：既成不了凶狠之徒，也成不了善良之辈；既成不了流氓无赖，也成不了正人君子；既成不了英雄，也成不了虫豸。",
      },
      {
        translator: "臧仲伦 译",
        edition: "《地下室手记》",
        text: "我不仅不会变成一个心怀歹毒的人，甚至也不会变成任何人：既成不了坏人，也成不了好人，既成不了小人，也成不了君子，既成不了英雄，也成不了臭虫。",
      },
    ],
    introduction: [
      "《地下室手记》由两种截然不同的文本拼合而成。前半部是一个四十岁退休小官员对想象中听众的挑衅：他嘲讽理性利己主义、社会工程和“二二得四”的确定性，坚持人会为了证明自己不是琴键而故意选择痛苦。可他的自由并不是从容的创造，而是不断否定、推翻和羞辱自己的能力。每提出一个判断，他马上预演反驳；每声称不在乎，他又急于得到认可。语言因此像一间没有出口的房间，意识越敏锐，行动越困难。",
      "后半部回到十六年前，用三次难堪检验这些观念。地下室人执着于向一名军官报复，却只能把“撞肩”设计成宏大胜利；他闯入旧同学的告别宴，在轻蔑与讨好之间失控；最后遇见妓女丽莎，以关于堕落、疾病和死亡的残酷演说唤起她的信任。当丽莎真正来到他的地下室，他却因被看见贫穷、狼狈和渴望而恐慌，转而用金钱与羞辱恢复权力。理论至此显出后果：他捍卫不可化约的自由，却不允许另一个人以同样自由靠近自己。",
      "这部作品常被称为存在主义先声，但阅读时不必急着把地下室人当作作者代言人。他对理性乌托邦的批评锋利，却不能因此免除自身责任。最关键的不是他“说得对不对”，而是他如何把受伤转化为伤害，把自我认识转化为延迟生活的借口。从《白夜》转入这里，会看到幻想家的阴面：同样孤独、同样渴望爱，地下室人却先发制人地毁掉关系。陀思妥耶夫斯基成熟期关于自由、屈辱、权力与救赎的全部问题，都已压缩在这场不可靠的独白中。",
    ],
    chapters: [
      {
        range: "第一部 1—5章",
        title: "意识的疾病",
        detail: "地下室人建立自己的反理性立场；留意每个论断怎样被他亲手拆毁。",
      },
      {
        range: "第一部 6—11章",
        title: "自由反对水晶宫",
        detail: "“利益表格”与“二二得四”成为靶子，任性被视为人保留人格的最后证据。",
      },
      {
        range: "第二部 1—10章",
        title: "理论落到丽莎身上",
        detail: "军官、同学宴会和丽莎三段往事，把抽象的自由逐步翻译成具体的屈辱与伤害。",
      },
    ],
    prompt: "如果自由只剩拒绝，它是否会变成另一座监狱？",
  },
  {
    title: "罪与罚",
    year: "1866",
    threshold: "第一部长篇",
    image: "/images/works/crime-and-punishment-portrait.jpg",
    cover: "/images/reading/crime-punishment-cover.jpg",
    translation: "曾思艺 译",
    edition: "上海三联书店 · 世界名著名译文库",
    reason:
      "曾思艺译本的叙述节奏紧凑，能承托小说在犯罪悬念、心理独白与思想争辩之间的高速切换；人物在惊惶与自我辩解中不断变调的语气也保留得较为鲜明。",
    translationSamples: [
      {
        translator: "曾思艺 译",
        edition: "天津人民出版社《罪与罚》",
        text: "他俩都想说点什么，然而又都说不出来。他俩的眼睛里都噙着泪水，他们两人都脸色煞白，身体消瘦，然而在这两张病恹恹、白煞煞的面孔上已经闪耀着焕然一新的未来的曙光。",
        source: "https://shutiantang.com/yiben/290",
      },
      {
        translator: "朱海观、王汶 译",
        edition: "人民文学出版社《罪与罚》",
        text: "他们想谈谈，但是一句话也说不出来。他们的眼里满是泪水，他们俩都面色苍白，形容憔悴；但是在他们带有病容的苍白面孔上，已经闪现出焕然一新的未来曙光。",
        source: "https://shutiantang.com/yiben/290",
      },
      {
        translator: "汝龙 译",
        edition: "译林出版社《罪与罚》",
        text: "他们原想开口说话，却没有说成。眼泪涌上了他们的眼睛。他们俩都苍白而消瘦，可是这两张带着病容的苍白的脸却容光焕发，因为他们感到了全新的前途。",
        source: "https://shutiantang.com/yiben/290",
      },
    ],
    introduction: [
      "《罪与罚》从一次尚未实施的谋杀开始。贫困大学生拉斯柯尔尼科夫把自己封闭在狭小阁楼里，反复推演“非凡人物”理论：若拿破仑式的人能够为了新的法则跨过旧道德，那么杀死一个盘剥穷人的放债老妇、把财产用于更高目的，似乎也可被算作合理牺牲。可是犯罪同时杀死了意外出现的丽莎韦塔，所得财物被他藏起，没有用于任何计划。身体发热、意识断裂和无目的游荡表明，理论中的冷静主体从未真正存在。",
      "小说并不满足于侦破。波尔菲里的审讯像心理实验，逐渐逼迫拉斯柯尔尼科夫承认他真正想验证的不是公益，而是自己“究竟是不是虱子”。与此同时，母亲和妹妹的牺牲、拉祖米欣的友谊、马尔梅拉多夫一家的贫困，以及卢仁和斯维德里盖洛夫对他理论的不同实践，形成多重镜像。最重要的索尼娅也不是被动圣女：她在极端处境中承担家人，却拒绝把任何生命化为数字；她朗读拉撒路复活，不替罪犯免罪，而是陪他穿过认罪与流放。",
      "所谓“罚”早在法律判决前发生。犯罪切断了拉斯柯尔尼科夫同具体他人的联系，使城市变成闷热、拥挤而无处逃离的意识迷宫；惩罚则不是痛苦本身，而是重新承认自己与受害者、家人和陌生人共享一个世界。尾声的悔悟依然只是开端，作者没有用一次落泪抹去漫长责任。作品兼具悬疑动力和思想密度，适合作为第一部长篇：读者既可以跟随案件，也能看到一种抽象观念如何进入身体、语言和关系，并最终被生活中不可替代的人逐一反驳。",
    ],
    chapters: [
      {
        range: "第一—二部",
        title: "越界与崩解",
        detail: "谋杀发生后，计划立刻失效；关注炎热、梦境与游荡如何替心理分析说话。",
      },
      {
        range: "第三—四部",
        title: "镜像人物登场",
        detail: "卢仁、斯维德里盖洛夫、索尼娅和波尔菲里从不同方向测试“非凡人物”理论。",
      },
      {
        range: "第五—六部及尾声",
        title: "承认、认罪与未完成的复活",
        detail: "卡捷琳娜之死、索尼娅的陪伴和西伯利亚尾声，把法律判决推进为关系的重建。",
      },
    ],
    prompt: "观念能够让一条具体生命变得可以牺牲吗？",
  },
  {
    title: "死屋手记",
    year: "1861—1862",
    threshold: "回到苦役现场",
    image: "/images/works/notes-from-house-of-dead.png",
    cover: "/images/reading/house-dead-cover.jpg",
    translation: "耿济之 译",
    edition: "天津人民出版社 · 陀思妥耶夫斯基文集",
    reason:
      "耿济之的译文节制而朴素，适合这部由回忆、人物特写和监狱日常组成的作品；它不急于替囚犯下结论，保留叙述在观察、同情与不安之间的距离。",
    translationSamples: [
      {
        translator: "娄自良 译",
        edition: "《死屋手记》",
        text: "他自己内心的痛苦使他在受到任何惩罚之前就已经痛不欲生了。他对自己罪行的审判比任何威严的法律都更为冷酷无情。",
      },
      {
        translator: "耿济之 译",
        edition: "《死屋手记》",
        text: "他为了自己的犯罪，痛责自己，比最严厉的法律还要残酷，还要无情。",
      },
    ],
    introduction: [
      "《死屋手记》取材于陀思妥耶夫斯基在鄂木斯克四年苦役的亲历，却借虚构叙述者亚历山大·彼得罗维奇保持必要距离。作品没有单一情节，而由初到牢房的震动、劳动、医院、澡堂、节庆、演戏、争执与人物往事逐层组成。监狱被称作“死屋”，因为国家已用罪名和刑期替其中的人作出最终定义；叙述却不断发现，任何定义都不足以概括他们。残酷者会在某刻慷慨，沉默者隐藏惊人尊严，受害者也可能在更弱者身上复制暴力。",
      "书中最强烈的压迫不只来自锁链和苦工，也来自完全失去独处。贵族出身的叙述者与普通囚犯之间存在难以跨越的阶层隔膜，他必须承认同情并不会自动换来信任。与此同时，囚犯对一枚硬币、一杯酒、一只动物或一场戏剧的热情，显出人格在制度缝隙中的顽强恢复。澡堂的拥挤近似地狱，圣诞演出却暂时建立另一个共同体；医院既暴露惩罚的荒谬，也让被遮蔽的身体重新出现。这些并置使苦难不被美化为简单的净化仪式。",
      "在《罪与罚》之后阅读它，可以校正对“受苦即得救”的误解。陀思妥耶夫斯基关心苦难可能打开的认识，却同样清楚被强加的痛苦会制造仇恨、屈辱与新的暴力。作品真正珍视的是人在极端处境下仍不能被完全算尽的自由，以及叙述者学习观看他人的过程。第二卷逐渐从封闭走向季节变化、动物、请愿、潜逃与出狱，但自由并非门一开便自动完成：记忆已永久改变他理解刑罚、民众与自己的方式。后期小说里的罪犯、圣徒和受辱者，都从这座死屋获得了具体面孔。",
    ],
    chapters: [
      {
        range: "第一卷 1—6章",
        title: "进入死屋",
        detail: "从最初印象到第一个月，叙述者学习监狱的空间、等级与敌意。",
      },
      {
        range: "第一卷 7—11章",
        title: "人物、澡堂与演戏",
        detail: "彼得罗夫、伊赛·福米奇、圣诞节和剧场，让被罪名遮蔽的人格重新显形。",
      },
      {
        range: "第二卷 1—10章",
        title: "身体、季节与出狱",
        detail: "医院、动物、请愿、潜逃和自由时刻，逐渐把监狱经验推向外部世界。",
      },
    ],
    prompt: "当制度已对一个人作出最终判决，他是否仍未完成？",
  },
  {
    title: "白痴",
    year: "1868—1869",
    threshold: "观看纯善失败",
    image: "/images/works/the-idiot-confrontation.jpg",
    cover: "/images/reading/idiot-cover.jpg",
    translation: "荣如德 译",
    edition: "上海译文出版社 · 译文名著文库",
    reason:
      "荣如德能容纳人物语气从礼貌、玩笑到狂热和失序的突变，对梅什金的纯真也不作过度圣化。人物关系繁复但声音区分清楚，适合配合人物表缓慢阅读。",
    translationSamples: [
      {
        translator: "荣如德 译",
        edition: "《白痴》",
        text: "自我毁灭法则和自我保存法则在人类身上势均力敌！魔鬼同样统治着人类直到我们还不知道的时间之极限。",
      },
      {
        translator: "耿济之 译",
        edition: "《白痴》",
        text: "自己破坏的法则和自己防卫的法则在人类中是同样坚强的！魔鬼同样统治人类，到我们还不知晓的时间的界限为止。",
      },
      {
        translator: "臧仲伦 译",
        edition: "《白痴》",
        text: "自我破坏的法则和自我保存的法则，在人类中起着同样的作用！魔鬼同样统治着人类，直到我们不知道的那个时间的界限。",
      },
    ],
    introduction: [
      "《白痴》开篇让梅什金公爵从瑞士疗养院回到俄国。他患有癫痫、缺乏社交防卫，却能异常敏锐地感受他人的羞耻与恐惧。火车上与罗戈任的相遇，立刻把他带入围绕纳斯塔霞·菲利波夫娜展开的欲望网络：巨额金钱、婚姻交易、报复与自我贬低交织在一起。陀思妥耶夫斯基曾说要写一个“绝对美好的人”，但小说没有让梅什金成为无所不能的救赎者；相反，他的善意进入现实关系后，持续遭遇误读，也暴露自身的限度。",
      "纳斯塔霞被托茨基伤害后，把社会施加的耻辱变成公开表演。她既渴望被无条件接纳，又拒绝成为任何人的道德证明。梅什金对她的怜悯是真诚的，却常把她理解为等待拯救的受难者；他对阿格拉娅的爱情则不断被前一份责任牵扯。两位女性并非善与恶的对照，她们都反抗被安排的位置。罗戈任的占有欲与梅什金的拯救欲看似相反，却可能同样忽略纳斯塔霞作为自由主体的决定。小说由此把“爱一个人”与“替一个人决定何为幸福”尖锐地区分开来。",
      "中段在巴甫洛夫斯克展开的大量聚会、争吵和伊波利特的“必要说明”，让死亡意识、虚无主义与社交喜剧同时发声。梅什金癫痫发作前的澄明瞬间尤其关键：极致和谐为何紧邻身体崩溃？结局没有证明善毫无意义，而是拒绝让善绕开自由、时间和责任。梅什金能看见每个人的痛，却无法替他们完成改变；当他试图同时拯救所有人，关系反而被推向灾难。阅读这部小说，应把注意力从“谁配得到公爵”移向更困难的问题：不占有、不美化、也不取消他者选择的爱，是否可能存在。",
    ],
    chapters: [
      {
        range: "第一部",
        title: "一张钞票与一场生日宴",
        detail: "人物关系集中登场，纳斯塔霞以公开表演夺回被交易的生活。",
      },
      {
        range: "第二—三部",
        title: "巴甫洛夫斯克的众声",
        detail: "罗戈任、阿格拉娅、伊波利特与公爵的关系交错；喜剧表面不断裂开死亡阴影。",
      },
      {
        range: "第四部",
        title: "两种爱走向同一间房",
        detail: "选择、婚礼与逃离压缩成悲剧；结尾检验善意在自由他者面前的真正边界。",
      },
    ],
    prompt: "没有边界的怜悯，会不会也是一种支配？",
  },
  {
    title: "群魔",
    year: "1871—1872",
    threshold: "进入观念政治",
    image: "/images/works/demons.png",
    cover: "/images/reading/demons-cover.webp",
    translation: "臧仲伦 译",
    edition: "译林出版社 · 2002",
    reason:
      "臧仲伦译本的政治词汇、讽刺语气与多人对话层次清楚，关键章节“在季洪那里”也便于纳入整体阅读；首次阅读可先抓住斯塔夫罗金、彼得与沙托夫三条精神线索。",
    translationSamples: [],
    introduction: [
      "《群魔》以一名爱说闲话、又自认忠实的地方叙述者带领读者进入外省城。开头似乎只是斯捷潘·特罗菲莫维奇与瓦尔瓦拉夫人之间冗长而滑稽的旧式自由主义喜剧，随后年轻一代归来：彼得·韦尔霍文斯基把流言、虚荣和恐惧编织成秘密组织，斯塔夫罗金则以令人着迷的沉默成为各种观念投射的中心。小说故意让人物关系显得混乱，因为政治灾难并非从一条清晰命令开始，而从暧昧承诺、社交表演和每个人“不必由我负责”的微小退让中成形。",
      "彼得并不需要坚定信徒，他需要可以被秘密、欲望或羞耻控制的人。所谓“五人小组”让成员相信更庞大的网络存在，以组织幻觉取代个人判断。沙托夫曾迷恋民族信仰，基里洛夫试图以自杀证明人的绝对自由，什加廖夫从无限自由推导出无限专制；这些思想不是等待作者裁决的论文，而是在恐惧、友情、婚姻和暴力中互相感染。斯塔夫罗金似乎拥有不受约束的可能性，却因不能作出有责任的选择而陷入精神真空。他既能激发别人的信仰，也把别人的生命当作实验。",
      "小说后半的募捐盛会、火灾、谋杀和自杀，把观念转化为集体行动。被删改后长期置于附录的“在季洪那里”尤其重要：忏悔若仍以震撼观众、控制评价为目的，是否真正构成悔改？《群魔》当然回应涅恰耶夫事件和十九世纪俄国激进政治，却远不只是党派讽刺。它展示价值中心崩塌后，组织如何接管人的判断，审美魅力如何掩护道德空洞，以及恶怎样在无人愿意承担全部责任时完成。读者不必一次记住所有姓名，可持续追问每个人把自己的选择交给了谁。",
    ],
    chapters: [
      {
        range: "第一部",
        title: "父辈喜剧与年轻人归来",
        detail: "斯捷潘的自我神话铺开旧一代背景，斯塔夫罗金和彼得则逐步接管叙事。",
      },
      {
        range: "第二部",
        title: "观念结成组织",
        detail: "决斗、密会与“在季洪那里”并行，个人秘密开始被彼得转化为政治工具。",
      },
      {
        range: "第三部",
        title: "盛会、火灾与谋杀",
        detail: "公共表演全面失控，沙托夫之死让分散的怯懦汇成一次集体犯罪。",
      },
    ],
    prompt: "当所有人把责任交给组织，究竟是谁实施了恶？",
  },
  {
    title: "卡拉马佐夫兄弟",
    year: "1879—1880",
    threshold: "最后进入总汇",
    image: "/images/works/brothers-karamazov-trial.jpg",
    cover: "/images/reading/brothers-karamazov-cover.jpg",
    translation: "荣如德 译",
    edition: "上海译文出版社 · 陀思妥耶夫斯基文集 · 套装上下册",
    reason:
      "荣如德的译文能清晰分辨小说中层层交错的叙述与对话，让家庭冲突、宗教论辩和法庭陈述各自保有声音；上下册完整收录，适合在长篇阅读中缓慢厘清人物与思想线索。",
    translationSamples: [],
    introduction: [
      "《卡拉马佐夫兄弟》以一桩弑父案组织起家庭、宗教、法律与社会的多重审判。老卡拉马佐夫粗鄙、贪婪，三个婚生子与私生子斯麦尔佳科夫都以不同方式继承或反抗他：德米特里被欲望、债务与荣誉感撕扯；伊万以理性拒绝接受无辜儿童受苦的世界；阿辽沙在修道院学习把信仰转化为具体行动；斯麦尔佳科夫则在侮辱与旁观中，把他人的思想理解为犯罪许可。人人都曾希望父亲消失，真正动手者因此不是唯一需要回答的人。",
      "小说中部把最强的反对意见交给伊万。“反叛”不是简单否认上帝，而是拒绝以未来和谐补偿一滴无辜眼泪；“宗教大法官”进一步指控自由给人带来无法承受的重负。佐西马长老并未用逻辑击败伊万，他提出的是另一种知识：每个人对所有人负有责任，信仰必须表现为接近具体生命的“积极的爱”。但长老死后尸体迅速腐败，阿辽沙也必须经历失望。陀思妥耶夫斯基让正反声音都保持力量，不把小说降格为作者答案的讲台。",
      "后半的预审与法庭把复杂生命压缩成两套同样动人的叙事。证据、修辞和公众欲望共同制造“真相”，德米特里虽未弑父，却不能因此免除他此前的暴力与愿望。伊万的崩溃和魔鬼幻觉则让思想责任获得身体形态。结尾没有停在判决，而转向阿辽沙与孩子们对伊柳沙的记忆：共同体不能靠抽象大爱建立，只能从不忘记一个具体的人开始。它是陀思妥耶夫斯基最后完成的长篇，也是此前主题的总汇；读完仍不会得到封闭体系，只会更清楚自由为何必须与责任、爱与记忆同时存在。",
    ],
    chapters: [
      {
        range: "第一—四卷",
        title: "一个不体面的家庭",
        detail: "修道院会面、财产争执与情欲冲突，逐步建立每个人弑父的情感可能。",
      },
      {
        range: "第五—七卷",
        title: "反叛、大法官与迦拿婚宴",
        detail: "伊万提出最强控诉，佐西马之死使阿辽沙的信仰从权威依赖转向尘世行动。",
      },
      {
        range: "第八—十二卷及尾声",
        title: "犯罪、审判与记忆",
        detail: "弑父案被重建为法庭故事；伊万、德米特里与孩子们分别回应责任问题。",
      },
    ],
    prompt: "没有人完全无罪时，共同生活怎样重新开始？",
  },
  {
    title: "穷人",
    year: "1846",
    threshold: "辨认贫困中的尊严",
    image: "/images/works/poor-folk.png",
    cover: "/images/reading/poor-folk-cover.jpg",
    translation: "乔林、郭家申 译",
    edition: "河北教育出版社 · 陀思妥耶夫斯基选集",
    reason:
      "乔林、郭家申的译文语气朴素，能让杰武什金的谦卑、絮叨与突然激动保持可信；书信称谓和社会语汇处理稳定，适合与《白夜》连读，观察早期陀氏如何书写城市小人物。",
    translationSamples: [],
    introduction: [
      "《穷人》以杰武什金和瓦尔瓦拉之间的书信构成。两人住在彼得堡相隔不远的廉价住所里，却因贫困、名誉和依附关系只能借文字维系亲密。杰武什金是年长的小公务员，收入微薄，仍不断把钱、糖果和衣物寄给瓦尔瓦拉；他的信有时温柔，有时虚荣，也常用夸张的自我牺牲遮掩无力。瓦尔瓦拉则回忆童年、寄居生活和被权势者伤害的经历。通信让两个被城市忽视的人获得声音，但纸页无法真正改变他们的物质处境。",
      "小说最尖锐之处，在于贫困不仅意味着缺钱，也意味着被观看。衣服、鞋底、房间和笔迹都会泄露阶层，旁人的目光迫使杰武什金把每一次窘迫理解为尊严审判。他读普希金《驿站长》和果戈理《外套》后的不同反应尤其关键：文学让他认出自己，却也使他害怕自己只是供人怜悯的“类型”。陀思妥耶夫斯基由此反问，描写穷人究竟是在恢复其人格，还是把他再次陈列给体面读者观看。杰武什金的语言不断越出社会为他规定的位置，这种过量本身就是抵抗。",
      "结尾中，瓦尔瓦拉接受贝科夫的婚姻安排，离开彼得堡。她的选择包含现实逼迫，也保留了难以替她裁决的主动性；杰武什金则在最后几封信里逐渐失去句法和自我控制。作品没有用爱情克服贫穷，而让书信关系在金钱和权力面前断裂。紧接《白夜》阅读，会发现同样的孤独已经从抒情幻梦落到工资、房租与婚姻市场。陀氏后来的屈辱者、梦想者和自我辩护者，都能在杰武什金身上找到早期轮廓。",
    ],
    chapters: [
      {
        range: "四月—六月书信",
        title: "隔窗相望的两个人",
        detail: "通信建立亲密，也逐步暴露住所、金钱和名誉构成的距离。",
      },
      {
        range: "瓦尔瓦拉手记",
        title: "童年与被占有的过去",
        detail: "回忆补出波克罗夫斯基和贝科夫，使个人贫困进入更大的依附结构。",
      },
      {
        range: "七月—九月书信",
        title: "文学、婚姻与断信",
        detail: "杰武什金读《外套》后激烈反应，最终通信被贝科夫的求婚和离城截断。",
      },
    ],
    prompt: "当一个人的生活被贫困完全暴露，书写还能守住多少尊严？",
  },
  {
    title: "涅朵奇卡",
    year: "1849",
    threshold: "从童年创伤进入内心",
    image: "/images/works/netochka-nezvanova.png",
    cover: "/images/reading/netochka-cover.jpg",
    translation: "于大卫 译",
    edition: "山东文艺出版社 ·《涅朵奇卡：一个女人的一生》",
    reason:
      "于大卫的译文重视少女叙述中感受与判断的交替，既保留童年经验的紧张，也让成年回望的语气清楚可辨；单行本完整呈现这部未完成小说，适合连续追踪涅朵奇卡的成长与创伤记忆。",
    translationSamples: [
      {
        translator: "于大卫 译",
        edition: "《涅朵奇卡：一个女人的一生》",
        text: "你在对自己做什么？你不过是用自己的绝望毁掉自己；你既没有耐心，也没有勇气。现在沮丧发作，你就说你没有天赋。……",
      },
      {
        translator: "荣如德 译",
        edition: "《涅朵奇卡》",
        text: "你何苦自暴自弃呢？你的绝望只能毁了你自己；你既没有耐性，又没有勇气。刚才你在灰心丧气的情绪控制下说自己没有才华。……",
      },
    ],
    introduction: [
      "《涅朵奇卡》是陀思妥耶夫斯基被捕前开始连载的未完成小说，以成年后的第一人称回望童年。涅朵奇卡生活在贫困而失序的家庭：继父叶菲莫夫坚信自己是被环境埋没的音乐天才，把失败归咎于妻子、社会和所有真正成功的人；母亲以劳动维持生活，又在愤怒与病弱中耗尽。孩子无法理解成人关系，便把继父的冷漠解释成神秘魅力，甚至幻想同他一起逃走。小说精准表现儿童如何主动编造因果，以便在无法承受的家庭里继续依恋。",
      "叶菲莫夫听到真正杰出的小提琴演奏后，维系多年的自我神话瞬间崩塌；母亲死亡、继父发狂，涅朵奇卡随后被公爵家庭收养。故事并未因此转为平稳的成长叙事。她与卡佳之间的亲密混合着崇拜、竞争、占有和告别，后来又在亚历山德拉·米哈伊洛夫娜的家庭里发现一封被隐藏的信。不同家庭表面阶层悬殊，内部却都靠沉默维持秩序。涅朵奇卡从被动承受者逐渐成为秘密的阅读者，也开始辨认成人道德语言背后的恐惧。",
      "作品中断在新的冲突刚刚展开之处，因此不应寻找完整结局。它的重要性在于展示早期陀氏如何尝试女性成长、艺术天才和创伤记忆：艺术既可能开启超越经验，也可能成为自恋者逃避责任的借口；爱既保护孩子，也能让孩子替伤害者辩护。读完《穷人》再读它，会发现社会性的屈辱被推进家庭和意识内部。后来纳斯塔霞、丽莎、伊波利特等人物身上那种爱与恨纠缠、渴望被看见又拒绝被定义的张力，已在涅朵奇卡的叙述中形成。",
    ],
    chapters: [
      {
        range: "第一部 1—3章",
        title: "叶菲莫夫的天才神话",
        detail: "家庭贫困通过儿童误读呈现，艺术理想与责任逃避彼此缠绕。",
      },
      {
        range: "第一部 4—7章",
        title: "音乐会、死亡与崩塌",
        detail: "真正的演奏击碎继父幻想，涅朵奇卡的旧世界在同一夜结束。",
      },
      {
        range: "第二—三部",
        title: "卡佳与被隐藏的信",
        detail: "收养生活将创伤转化为依恋、竞争和对成人秘密的追问，故事在冲突处中断。",
      },
    ],
    prompt: "孩子对伤害者的爱，是依恋、想象，还是求生方式？",
  },
  {
    title: "赌徒",
    year: "1866",
    threshold: "观看欲望加速",
    image: "/images/works/the-gambler.png",
    cover: "/images/reading/gambler-cover.jpg",
    translation: "刘宗次 译",
    edition: "陀思妥耶夫斯基中篇心理小说经典",
    reason:
      "刘宗次译本节奏明快，能表现阿列克谢在侍从式克制与赌场狂热之间的突变。它尤其适合连续阅读，让轮盘场面的速度和第一人称自我欺骗直接发生作用。",
    translationSamples: [
      {
        translator: "于大卫 译",
        edition: "《赌徒》",
        text: "那时候我本该走的，可我心里却生出某种奇怪的感觉，某种对命运的挑衅，某种想对它甩个响指、冲它吐舌头的欲望。",
      },
      {
        translator: "刘宗次 译",
        edition: "《赌徒》",
        text: "我本当就此离开，但心中却产生了一种奇怪的感觉，一种想向命运挑战、给它一记耳光、向它示威的愿望。",
      },
    ],
    introduction: [
      "《赌徒》由阿列克谢第一人称讲述，舞台是虚构的德国温泉城鲁列滕堡。将军一家等待富有祖母去世，以遗产偿还债务并维持体面；法国人德·格里耶、英国人阿斯特利、布朗什小姐和波琳娜围绕金钱与婚姻彼此估价。阿列克谢名义上是家庭教师，实际上受制于波琳娜的命令。他把服从理解为热烈爱情，愿意用冒险、羞辱乃至自我毁灭证明忠诚。赌场尚未真正占据故事之前，人物之间已经在下注。",
      "祖母突然亲自抵达，粉碎所有人的继承计划。她以强势和清醒嘲弄亲属，却很快在轮盘前投入巨款；赌桌让意志与偶然之间的关系变得可见。阿列克谢同样相信自己能在某个瞬间识别规律，赢钱时把偶然当作天赋，输钱时又把下一次下注当作恢复自由的唯一机会。赌博不是单纯贪财，而是让他在几秒钟内体验命运被自己支配的幻觉。每一次胜利扩大下一次失败的尺度，理性则沦为替冲动补写理由的书记员。",
      "小说的写作本身也与赌债和限期相连，这种现实压力进入了文本的急促节奏。阿列克谢最终获得金钱，却不能由此建立生活；波琳娜、布朗什和赌场依次证明，他爱的常是被拒绝、被命令和骤然翻盘的强度。结尾的“明天”不断推迟改变，显示成瘾如何占领未来时态。放在《地下室手记》之后阅读，会看到反理性自由的另一种身体形式：地下室人以拒绝证明意志，赌徒则以把一切押上证明自己不受规则支配，两者最终都被重复行为控制。",
    ],
    chapters: [
      {
        range: "第1—5章",
        title: "鲁列滕堡的隐形赌局",
        detail: "遗产、债务、求婚和波琳娜的命令先于赌场建立人物间的下注关系。",
      },
      {
        range: "第6—12章",
        title: "祖母坐到轮盘前",
        detail: "所有继承幻想被打断，偶然性逐渐成为整座社交世界的法则。",
      },
      {
        range: "第13—17章",
        title: "赢钱之后仍无生活",
        detail: "阿列克谢的胜利迅速转化为新的依附，结尾的“明天”揭示成瘾循环。",
      },
    ],
    prompt: "当偶然带来自由的感觉，人是否更容易成为它的奴隶？",
  },
  {
    title: "被侮辱与被损害的人",
    year: "1861",
    threshold: "学习辨认受伤者",
    image: "/images/works/humiliated-and-insulted.png",
    cover: "/images/reading/humiliated-cover.jpg",
    translation: "臧仲伦 译",
    edition: "译林出版社 · 陀思妥耶夫斯基精选集",
    reason:
      "臧仲伦译本人物对白区分鲜明，能承托这部情节剧中不断升级的告白、误解和情绪转折；人物称谓清楚，适合初读者在复杂关系中保持方向。",
    translationSamples: [
      {
        translator: "臧仲伦 译",
        edition: "《被侮辱与被损害的人》",
        text: "她受了很大的委屈，她心中的创伤无法愈合，因此她好像存心用这种神秘莫测，用这种对我们大家的不信任来极力刺激自己的创伤似的；她好像以自己的痛苦为乐，以这种只顾自己受苦受难（如果可以这样说的话）为乐。",
      },
      {
        translator: "娄自良 译",
        edition: "《被侮辱与被损害的人》",
        text: "她受了虐待，伤口不能愈合，于是她好像故意要用古怪的举止，用不信任任何人的态度来触痛自己的伤口；好像她自己在欣赏自己的伤痛，欣赏这种痛苦中的利己主义，如果可以这样说的话。",
      },
      {
        translator: "邵荃麟 译",
        edition: "《被侮辱与被损害的人》",
        text: "她曾经被虐待过，她的创伤是不能医治的，而且她故意用这种神秘的行为，这种对我们所有人的不信任来加重她自己的创伤，似乎她想用这种“痛苦的自私”——假如我可以用这个名词表示——来享受她自己的痛苦。",
      },
    ],
    introduction: [
      "《被侮辱与被损害的》由年轻作家伊万·彼得罗维奇回忆一段已结束的故事。他爱着娜塔莎，却陪她离家投奔阿廖沙；阿廖沙的父亲瓦尔科夫斯基公爵为了财产与地位，试图让儿子迎娶卡佳，并把别人的情感当作可以计算的障碍。伊万既是参与者又是记录者，他的无私包含真实关怀，也藏着不愿面对的愿望。小说用密集会面、书信、误会和突然出现的人物推动情节，呈现受伤者如何彼此扶持，又如何在恐惧中继续伤害最亲近的人。",
      "另一条线索属于孤女涅莉。伊万从街头处境中接近她，逐渐听见她母亲受骗、流亡和死亡的往事。涅莉拒绝轻易接受帮助，因为慈善可能再次把她放在被支配的位置；她的尖刻与沉默都是保护尊严的方式。随着两条故事汇合，公爵对女性、金钱和亲情的操纵显出代际重复。作品最有力量的部分并非恶人揭面，而是受害经验之间艰难的传递：只有当涅莉愿意讲述，上一代被掩埋的屈辱才进入共同记忆。",
      "这部小说常被视为带有通俗情节剧色彩的过渡作，巧合和重病确实很多，但夸张结构也让“同情的伦理”变得可见。理解他人不是替他选择原谅，更不是以自己的牺牲换取道德优越；真正困难的是承认受伤者可以拒绝援助、可以矛盾，也可能无法被及时挽救。把它放在《赌徒》和《死屋手记》之间，阅读路径会从私人欲望转向社会性苦难，再进入制度空间。伊万作为失败作家的自我记录，也提示叙述本身是一种迟到的责任。",
    ],
    chapters: [
      {
        range: "第一部",
        title: "娜塔莎离家",
        detail: "伊万、娜塔莎与阿廖沙的三角关系建立，公爵的金钱逻辑开始介入。",
      },
      {
        range: "第二—三部",
        title: "涅莉拒绝被拯救",
        detail: "孤女的身世逐渐连接两代人的受辱经验，帮助与支配的边界变得尖锐。",
      },
      {
        range: "第四部及尾声",
        title: "秘密汇合与迟到团聚",
        detail: "公爵的操纵被揭开，家庭和解却不能挽回已经发生的死亡。",
      },
    ],
    prompt: "同情若不尊重受伤者的拒绝，是否仍然是同情？",
  },
  {
    title: "少年",
    year: "1875",
    threshold: "进入未定型的自我",
    image: "/images/works/the-adolescent.png",
    cover: "/images/reading/adolescent-cover.jpg",
    translation: "耿济之 译",
    edition: "生活·读书·新知三联书店 · 俄苏文学经典译著 · 2019",
    reason:
      "耿济之的早期全译本保留了阿尔卡季既自负又不可靠的青年口吻；面对亲缘、书信与财产关系交错的长篇，建议另配人物表阅读。",
    translationSamples: [],
    introduction: [
      "《少年》的叙述者阿尔卡季二十岁，是贵族韦尔西洛夫的私生子，却随法律上的父亲马卡尔姓多尔戈鲁基。他来到彼得堡，希望靠自己的“思想”获得绝对独立：像罗斯柴尔德那样积累财富，从而不再需要任何人的承认。可是他写下回忆的真正动力，正是对父亲的强烈依恋。韦尔西洛夫在他眼中既高贵又可疑、既代表精神自由又不断伤害亲近者。阿尔卡季越宣称不在乎，越被一个眼神、一则流言或一封信牵引。",
      "小说情节围绕遗产、债务、决斗、社交丑闻和一封可用来要挟卡捷琳娜·尼古拉耶夫娜的文件展开。阿尔卡季相信自己掌握秘密便获得力量，却不断被更老练的人利用。他的叙述也不可靠：事件顺序被情绪打乱，人物评价反复翻转，宏大宣言常在下一场会面中崩塌。这种混乱不是技术缺陷，而是“尚未定型的人”观察世界的形式。成长并非从无知走向全知，而是慢慢承认他人不会按自己的家庭小说和英雄幻想行动。",
      "马卡尔老人带来的民间信仰与韦尔西洛夫的欧洲精神形成对照，但作者没有让任何父亲成为完整答案。阿尔卡季最终开始区分独立与孤立：金钱可以减少依赖，却不能替他决定如何爱、如何承担亲缘。作品处于《群魔》和《卡拉马佐夫兄弟》之间，常被忽略，却连接了两者：秘密文件和家庭丑闻延续观念失序，父子关系与合法性问题则预演卡拉马佐夫家族。阅读时不必追求一次理清所有线索，可以抓住青年声音如何在自夸、羞耻和反省之间逐渐改变。",
    ],
    chapters: [
      {
        range: "第一部",
        title: "带着一个思想进城",
        detail: "阿尔卡季提出致富计划，却立即卷入父亲、家族与秘密文件。",
      },
      {
        range: "第二—三部",
        title: "证据、流言与父亲形象",
        detail: "叙述在丑闻和误判中反复改写韦尔西洛夫，也暴露少年的权力幻想。",
      },
      {
        range: "第四部及结语",
        title: "从孤立走向未完成的独立",
        detail: "灾难没有提供成熟证书，只让阿尔卡季开始以不同方式理解责任。",
      },
    ],
    prompt: "独立若必须被所有人看见，它究竟还是不是独立？",
  },
];

const recommendedTitles = [
  "白夜",
  "穷人",
  "涅朵奇卡",
  "地下室手记",
  "赌徒",
  "被侮辱与被损害的人",
  "死屋手记",
  "白痴",
  "罪与罚",
  "少年",
  "群魔",
  "卡拉马佐夫兄弟",
];
const readingOrder = recommendedTitles.map((title) =>
  readingWorks.find((work) => work.title === title)!,
);

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
];

const scatterLayout = [
  { x: 32, y: 108, rotate: -3.2 },
  { x: 52, y: 196, rotate: 2.4 },
  { x: 34, y: 284, rotate: 1.6 },
  { x: 52, y: 372, rotate: -3.8 },
  { x: 32, y: 460, rotate: 3.1 },
  { x: 51, y: 548, rotate: -1.8 },
  { x: 35, y: 636, rotate: 2.7 },
  { x: 52, y: 724, rotate: -2.5 },
  { x: 33, y: 812, rotate: 3.5 },
  { x: 51, y: 900, rotate: -1.4 },
  { x: 35, y: 988, rotate: 2.2 },
  { x: 51, y: 1076, rotate: -3.1 },
];

export default function ReadingPage() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const activeIndex = hoveredIndex ?? selectedIndex;
  const active = readingOrder[activeIndex];
  const orderLabel = useMemo(
    () =>
      `${String(activeIndex + 1).padStart(2, "0")} / ${String(readingOrder.length).padStart(2, "0")}`,
    [activeIndex],
  );

  return (
    <main className="min-h-screen overflow-hidden bg-[#030303] px-4 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-[#27272a] pb-5">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">
          F·D
        </Link>
        <span className="hidden text-[10px] uppercase tracking-museum text-[#767d88] sm:block">
          Dostoevsky · a reading sequence
        </span>
        <span className="text-[10px] tracking-[0.16em] text-[#767d88] sm:hidden">阅读指南</span>
      </nav>

      <div className="mx-auto max-w-[1500px] py-12 sm:py-16 lg:grid lg:grid-cols-[155px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-12 lg:mb-0">
          <p className="text-[10px] tracking-museum text-[#767d88]">05 / READING</p>
          <div className="archive-sidebar-nav mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[#767d88] lg:grid lg:gap-y-5">
            {navigation.map(([label, href]) => (
              <Link
                className={`transition-colors hover:text-paper ${href === "/reading" ? "text-paper" : ""}`}
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
                Where to begin · twelve thresholds
              </p>
              <h1 className="mt-5 text-6xl leading-[.86] tracking-[-0.05em] sm:text-8xl">
                阅读指南
              </h1>
            </div>
            <div>
              <p className="text-sm leading-7 text-[#8f949d]">
                不用从最厚的一本开始。让阅读从孤独进入反叛，再穿过罪、苦难、善与政治，最后抵达那部仍未说完的总汇。
              </p>
              <p className="mt-3 text-[9px] uppercase tracking-[0.14em] text-[#555b64]">
                移动光标预览 · 点击锁定作品
              </p>
            </div>
          </header>

          <div className="mt-8 grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <section
              aria-label="推荐阅读顺序"
              className="relative h-[1160px] overflow-hidden border border-[#27272a] bg-[#060607] xl:sticky xl:top-6"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute inset-x-4 top-4 z-40 flex items-start justify-between text-[8px] uppercase tracking-[0.16em] text-[#626872]">
                <span>
                  按推荐阅读顺序
                  <br />
                  <span className="mt-1 inline-block text-[#40444b]">
                    12 reading thresholds · top → bottom
                  </span>
                </span>
                <span className="text-[#c9ccd1]">{orderLabel}</span>
              </div>

              <div
                aria-hidden="true"
                className="absolute left-[8%] top-[19%] h-16 w-24 border border-[#171719]"
              />
              <div
                aria-hidden="true"
                className="absolute right-[7%] top-[46%] h-24 w-16 border border-[#171719]"
              />
              <div
                aria-hidden="true"
                className="absolute bottom-[7%] left-[12%] h-12 w-28 border border-[#171719]"
              />

              {readingOrder.map((work, index) => {
                const distance = Math.abs(index - activeIndex);
                const activeCard = index === activeIndex;
                const position = scatterLayout[index];
                return (
                  <motion.button
                    animate={{
                      left: activeCard ? "42%" : `${position.x}%`,
                      opacity: activeCard ? 1 : Math.max(0.45, 0.78 - distance * 0.05),
                      rotate: activeCard ? 0 : position.rotate,
                      scale: activeCard ? 1 : Math.max(0.76, 0.9 - distance * 0.025),
                      top: position.y,
                      zIndex: activeCard ? 30 : 15 - distance,
                    }}
                    aria-pressed={selectedIndex === index}
                    className={`${activeCard ? "h-[112px] w-[min(58vw,190px)] border-[#c9ccd1] bg-[#111113] sm:w-[200px]" : "h-[70px] w-[min(40vw,132px)] border-[#40444b] bg-[#09090a] sm:w-[138px]"} absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden border text-left focus:outline-none focus-visible:border-paper`}
                    initial={false}
                    key={work.title}
                    onClick={() => {
                      setSelectedIndex(index);
                      setHoveredIndex(null);
                    }}
                    onFocus={() => setHoveredIndex(index)}
                    onMouseEnter={() => setHoveredIndex(index)}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    type="button"
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center grayscale"
                      style={{ backgroundImage: `url(${work.image})` }}
                    />
                    <div
                      className={`absolute inset-0 ${activeCard ? "bg-[linear-gradient(180deg,rgba(3,3,3,.12),rgba(3,3,3,.92))]" : "bg-black/78"}`}
                    />
                    <div className="relative flex h-full flex-col justify-between p-2.5">
                      <div className="flex justify-between text-[7px] uppercase tracking-[0.12em] text-[#a7abb2]">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>{work.year}</span>
                      </div>
                      <div>
                        {activeCard && (
                          <p className="mb-1.5 text-[7px] tracking-[0.12em] text-[#a7abb2]">
                            {work.threshold}
                          </p>
                        )}
                        <h2
                          className={`${activeCard ? "text-[26px]" : "text-[15px]"} leading-none tracking-[-0.04em] text-paper`}
                        >
                          {work.title}
                        </h2>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </section>

            <motion.section
              className="border border-[#27272a] bg-[#050506]"
              key={active.title}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <header className="border-b border-[#27272a] p-5 sm:p-7">
                <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.15em] text-[#626872]">
                  <span>Reading dossier</span>
                  <span>{orderLabel}</span>
                </div>
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-[9px] tracking-[0.14em] text-[#8f949d]">
                      {active.threshold}
                    </p>
                    <h2 className="mt-2 text-5xl tracking-[-0.05em] sm:text-6xl">{active.title}</h2>
                  </div>
                  <p className="text-[10px] tracking-[0.12em] text-[#626872]">{active.year}</p>
                </div>
              </header>

              <div className="grid 2xl:grid-cols-[minmax(0,1.25fr)_minmax(280px,.75fr)]">
                <article className="border-b border-[#27272a] p-5 sm:p-7 2xl:border-b-0 2xl:border-r">
                  <p className="text-[8px] uppercase tracking-[0.15em] text-[#626872]">作品介绍</p>
                  <div className="mt-7 space-y-5 text-[13px] leading-[2] text-[#9ba0a8] sm:text-sm">
                    {active.introduction.map((paragraph) => (
                      <p key={paragraph.slice(0, 18)}>{paragraph}</p>
                    ))}
                  </div>
                  <p className="mt-8 border-l border-[#626872] pl-4 text-sm leading-7 text-[#d0d2d6]">
                    {active.prompt}
                  </p>

                  <section className="mt-10 border-t border-[#27272a] pt-7">
                    <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.15em] text-[#626872]">
                      <span>章节导读</span>
                      <span>Chapter map</span>
                    </div>
                    <div className="mt-5 divide-y divide-[#202023] border-y border-[#202023]">
                      {active.chapters.map((chapter, index) => (
                        <div
                          className="grid gap-2 py-5 sm:grid-cols-[28px_120px_minmax(0,1fr)] sm:gap-4"
                          key={chapter.range}
                        >
                          <span className="text-[8px] tracking-[0.14em] text-[#555b64]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <p className="text-[9px] leading-5 text-[#777d86]">{chapter.range}</p>
                            <h3 className="mt-1 text-sm text-[#d0d2d6]">{chapter.title}</h3>
                          </div>
                          <p className="text-xs leading-6 text-[#858b94]">{chapter.detail}</p>
                        </div>
                      ))}
                    </div>
                  </section>
                </article>

                <aside className="grid content-start">
                  <article className="p-5 sm:p-7">
                    <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.15em] text-[#626872]">
                      <span>推荐译本</span>
                      <span>Selected edition</span>
                    </div>
                    <figure className="mt-7">
                      <div className="flex h-[230px] items-center justify-center overflow-hidden bg-[#0a0a0b] sm:h-[270px]">
                        <div className="h-[190px] w-[136px] overflow-hidden bg-[#101012] drop-shadow-[0_14px_20px_rgba(0,0,0,.72)] sm:h-[225px] sm:w-[160px]">
                          <div
                            aria-label={`${active.title} 推荐译本正面封面`}
                            className="h-full w-full scale-[1.08] bg-cover bg-center bg-no-repeat"
                            role="img"
                            style={{ backgroundImage: `url(${active.cover})` }}
                          />
                        </div>
                      </div>
                      <figcaption className="mt-3 text-[8px] uppercase tracking-[0.14em] text-[#555b64]">
                        Front cover · recommended Chinese edition
                      </figcaption>
                    </figure>
                    <p className="mt-7 text-2xl leading-tight tracking-[-0.03em] text-paper">
                      {active.translation}
                    </p>
                    <p className="mt-3 text-[10px] leading-5 tracking-[0.08em] text-[#767d88]">
                      {active.edition}
                    </p>
                    <div className="mt-7 border-t border-[#27272a] pt-6">
                      <p className="text-[8px] uppercase tracking-[0.15em] text-[#626872]">
                        推荐原因
                      </p>
                      <p className="mt-4 text-sm leading-8 text-[#8f949d]">{active.reason}</p>
                    </div>
                    {active.translationSamples.length >= 2 && (
                      <section className="mt-8 border-t border-[#27272a] pt-7">
                        <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.15em] text-[#626872]">
                          <span>经典片段 · 同段出版译文对照</span>
                          <span>Same passage</span>
                        </div>
                        <div className="mt-5 divide-y divide-[#202023] border-y border-[#202023]">
                          {active.translationSamples.map((sample, index) => (
                            <blockquote className="py-5" key={`${sample.translator}-${index}`}>
                              <p className="text-sm leading-7 text-[#c7c9ce]">“{sample.text}”</p>
                              <footer className="mt-3 flex flex-col gap-1 text-[8px] leading-4 tracking-[0.1em] text-[#686e77]">
                                <span>
                                  {sample.translator} · {sample.edition}
                                </span>
                                {sample.source && (
                                  <a
                                    className="w-fit border-b border-[#3d4249] text-[#777d86] transition-colors hover:border-[#a7abb2] hover:text-[#c7c9ce]"
                                    href={sample.source}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    核对出处 ↗
                                  </a>
                                )}
                              </footer>
                            </blockquote>
                          ))}
                        </div>
                      </section>
                    )}
                    <p className="mt-6 text-[9px] leading-5 text-[#555b64]">
                      译本推荐综合文本完整性、语言风格与出版信息；不同读者也可按语言偏好选择其他全译本。
                    </p>
                    <Link
                      className="mt-8 inline-flex items-center gap-3 text-[9px] uppercase tracking-[0.14em] text-[#767d88] transition-colors hover:text-paper"
                      href={workHref(active.title)}
                    >
                      <span className="h-px w-6 bg-current" />
                      前往空间地图
                    </Link>
                  </article>
                </aside>
              </div>
            </motion.section>
          </div>

          <footer className="mt-6 flex flex-col gap-3 border-t border-[#27272a] py-8 text-[9px] uppercase tracking-[0.13em] text-[#626872] sm:flex-row sm:items-center sm:justify-between">
            <span>12 works · one possible path</span>
            <span>Read slowly · keep the questions open</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
