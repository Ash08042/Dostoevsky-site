export type CharacterRelation = {
  source: string;
  target: string;
  label: string;
};

type ProfileCharacter = {
  id: string;
  name: string;
  work: string;
  conflict: readonly [string, string];
  summary: string;
};

export type SupportingCharacter = {
  id: string;
  name: string;
  work: string;
};

const supportingCharacters: readonly SupportingCharacter[] = [
  { id: "anna-fyodorovna", name: "安娜·费奥多罗夫娜", work: "穷人" },
  { id: "bykov", name: "贝科夫", work: "穷人" },
  { id: "grandmother-white-nights", name: "外祖母", work: "白夜" },
  { id: "lodger-white-nights", name: "房客", work: "白夜" },
  { id: "netochka-mother", name: "涅朵奇卡的母亲", work: "涅朵奇卡" },
  { id: "katya-netochka", name: "卡佳", work: "涅朵奇卡" },
  { id: "alyosha-valkovsky", name: "阿廖沙·瓦尔科夫斯基", work: "被侮辱与被损害的人" },
  { id: "prince-valkovsky", name: "瓦尔科夫斯基公爵", work: "被侮辱与被损害的人" },
  { id: "nikolai-ikhmenyev", name: "尼古拉·伊赫梅涅夫", work: "被侮辱与被损害的人" },
  { id: "alei", name: "阿列伊", work: "死屋手记" },
  { id: "gazin", name: "加津", work: "死屋手记" },
  { id: "petrov-prison", name: "彼得罗夫", work: "死屋手记" },
  { id: "apollon", name: "阿波隆", work: "地下室手记" },
  { id: "zverkov", name: "兹维尔科夫", work: "地下室手记" },
  { id: "porfiry", name: "波尔菲里", work: "罪与罚" },
  { id: "razumikhin", name: "拉祖米欣", work: "罪与罚" },
  { id: "luzhin", name: "卢仁", work: "罪与罚" },
  { id: "marmeladov", name: "马尔梅拉多夫", work: "罪与罚" },
  { id: "general-gambler", name: "将军", work: "赌徒" },
  { id: "de-grieux", name: "德·格里耶", work: "赌徒" },
  { id: "blanche", name: "布朗什小姐", work: "赌徒" },
  { id: "totsky", name: "托茨基", work: "白痴" },
  { id: "general-yepanchin", name: "叶潘钦将军", work: "白痴" },
  { id: "lizaveta-prokofyevna", name: "利扎韦塔·普罗科菲耶芙娜", work: "白痴" },
  { id: "liza-tushina", name: "丽莎·图希娜", work: "群魔" },
  { id: "varvara-petrovna", name: "瓦尔瓦拉·彼得罗夫娜", work: "群魔" },
  { id: "stepan-trofimovich", name: "斯捷潘·特罗菲莫维奇", work: "群魔" },
  { id: "marya-lebyadkina", name: "玛丽亚·列比亚德金娜", work: "群魔" },
  { id: "marya-shatova", name: "玛丽亚·沙托娃", work: "群魔" },
  { id: "makar-dolgoruky", name: "马卡尔·伊万诺维奇", work: "少年" },
  { id: "lambert", name: "兰伯特", work: "少年" },
  { id: "sofia-adolescent", name: "索菲娅·安德烈耶芙娜", work: "少年" },
  { id: "fyodor-karamazov", name: "费奥多尔·巴甫洛维奇", work: "卡拉马佐夫兄弟" },
  { id: "zosima", name: "佐西马长老", work: "卡拉马佐夫兄弟" },
  { id: "katerina-ivanovna", name: "卡捷琳娜·伊万诺夫娜", work: "卡拉马佐夫兄弟" },
  { id: "rakitin", name: "拉基津", work: "卡拉马佐夫兄弟" },
  { id: "ilyusha", name: "伊柳沙", work: "卡拉马佐夫兄弟" },
];

export function getSupportingCharacter(characterId: string) {
  return supportingCharacters.find((character) => character.id === characterId);
}

export const characterBiographies: Record<string, string> = {
  devushkin:
    "杰武什金是彼得堡一个年长的低级文官，住在逼仄、潮湿而彼此窥视的廉价公寓里，靠抄写文件维持生活。他把大半薪水和全部感情都寄托在瓦尔瓦拉身上，书信既是求爱的方式，也是他保存体面的隐秘房间。贫困使他对一双靴子、一件制服和同僚的目光异常敏感；读到《外套》时，他甚至觉得自己的窘迫遭到了公开展览。他愿意帮助比自己更无助的人，却常把牺牲变成自我感动，以夸张的尊严掩饰依赖。瓦尔瓦拉最终离去后，他失去的不只是一段关系，更是那个能够倾听、因而证明他并非无足轻重的人。",
  varvara:
    "瓦尔瓦拉在父亲去世后迅速从相对安稳的少女生活跌入寄居处境，母亲的病弱、安娜·费奥多罗夫娜的控制和家庭教师波克罗夫斯基之死，共同构成她过早成熟的记忆。她珍惜杰武什金的善意，也知道他的慷慨常以透支自己为代价，因此在回信中不断劝他节制。与杰武什金相比，她更清楚感情不能代替住所、收入和社会保护。接受贝科夫的求婚并非浪漫选择，而是一个贫困女子在极少选项中抓住的生存出口；她对未来已有不祥预感，却仍只能离开。她的克制使小说的悲剧格外清醒：两个人真诚相爱，却没有足以抵抗现实的力量。",
  dreamer:
    "幻想家在彼得堡生活了八年，却几乎没有真正的朋友。他熟悉街道、桥梁和房屋的表情，能够为擦肩而过的陌生人编织一生，却不敢走进任何现实关系。白夜中遇见娜斯简卡后，他第一次拥有可以倾诉的听众，也第一次把想象中的爱情投向一个具体的人。明知她等待的是另一位男子，他仍帮助传信，并在希望突然出现时迅速构想共同未来。房客归来使这场亲密在一夜之间结束，他没有报复，只把短暂相遇保存为足以照亮一生的幸福。这个温柔的结尾并不完全轻盈：他的宽恕既显示善良，也暴露他仍习惯用回忆替代持续的生活。",
  nastenka:
    "娜斯简卡自幼由失明的外祖母抚养，衣裙甚至被别针钉在外祖母身边，以防她擅自外出。寄住楼上的青年给她带来书本、戏剧和离开封闭生活的想象；当他前往莫斯科时，她主动提着包袱追上去，并得到一年后重逢的承诺。等待期满而对方迟迟不出现，她把恐惧和羞耻告诉幻想家，在他的陪伴中获得几夜自由。她一度愿意回应幻想家的爱，却在旧恋人现身时立刻奔向真正等待的人。娜斯简卡并非薄情，她只是拒绝把感激误认成爱情；婚后写来的信既请求宽恕，也诚实标明两种感情不可交换的界线。",
  netochka:
    "涅朵奇卡在一个被贫困和争吵挤压的家庭中长大，父亲叶菲莫夫不断宣称自己是遭环境埋没的音乐天才，母亲则用微薄收入支撑三个人。孩子无法理解成人的失败，便把父亲的谎言当成秘密真理，甚至幻想母亲死后能与他开始幸福生活。音乐会之夜，叶菲莫夫的自我神话崩塌，母亲死亡，父亲也在逃亡中丧命；涅朵奇卡从崇拜者瞬间成为孤儿。被收养后，她对卡佳的强烈依恋、对亚历山德拉·米哈伊洛夫娜隐秘痛苦的追问，都延续着童年寻找绝对之爱的冲动。她的成长不是忘记创伤，而是逐渐学会辨认爱与伤害并不天然相同。",
  yefimov:
    "叶菲莫夫年轻时确实表现出音乐才能，也曾从一位外国乐师那里获得小提琴和训练，但他很快把才华变成逃避检验的护身符。他拒绝稳定工作，酗酒、撒谎，把每次失败都解释为同伴嫉妒、妻子拖累或社会不懂艺术。妻子的劳动供养着他，他却让年幼的涅朵奇卡相信母亲是两人幸福的唯一障碍。听过真正卓越的演奏后，他终于意识到自己并非想象中的大师；这场迟来的清醒没有带来承担，反而摧毁了维持人格的全部谎言。他在妻子尸体旁逃离，随后死去。叶菲莫夫的悲剧不只是怀才不遇，而是宁愿牺牲亲人，也不肯让梦想接受现实尺度的审判。",
  "ivan-petrovich":
    "伊万·彼得罗维奇是一名处境拮据的青年作家，也是《被侮辱与被损害的人》的叙述者。他曾得到伊赫梅涅夫一家的接纳，深爱娜塔莎，却在她为阿廖沙离家后压下妒意，成为恋人与父母之间的传信者。面对瓦尔科夫斯基公爵的算计，他缺少决定局势的权力，只能不断奔走、倾听和揭露。收留内莉使他的角色发生变化：这个拒绝怜悯的孩子迫使他理解，善意若不尊重受助者的尊严，同样可能成为冒犯。伊万常因病弱和迟疑显得被动，但正是他的见证把几组彼此隔绝的痛苦连接起来。他没有获得爱情，却保存了那些本会被强者改写的声音。",
  natasha:
    "娜塔莎是伊赫梅涅夫家的独生女，原本与伊万·彼得罗维奇接近，却突然为了瓦尔科夫斯基公爵之子阿廖沙离开父母。她十分清楚阿廖沙善良而软弱，也看得出公爵试图用卡佳的财富拆散他们；她不是受骗的天真少女，而是明知爱情无法可靠，仍要捍卫自己选择的权利。等待、嫉妒和屈辱不断消耗她，她有时像母亲一样替阿廖沙解释，反而掩盖了两人关系的不平等。最终放手并不意味着感情消失，而是承认仅凭激情无法使另一个人成熟。内莉的故事促成她与父亲和解，然而失去的时间和信任不能完全复原。娜塔莎的勇敢与自伤始终缠在一起。",
  nelly:
    "内莉随母亲在贫困和疾病中漂泊，亲眼看见母亲因瓦尔科夫斯基公爵的遗弃而耗尽生命。外祖父拒绝宽恕女儿，使她很早便懂得血缘并不保证保护；流落街头后，她还遭到布勃诺娃的控制。伊万·彼得罗维奇救出她时，内莉对每一次照料都报以怀疑、尖刻甚至逃跑，因为接受恩惠意味着再次把尊严交给别人。她逐渐信任伊万，却仍拒绝向生父公爵求助。为促成娜塔莎与父亲和解，她讲出母亲的往事，让自己的伤口成为劝诫他人的证词。内莉最后因病去世，她没有得到童话式补偿，但她坚持不被收买的态度，使弱者第一次拥有审判强者的位置。",
  goryanchikov:
    "戈里扬奇科夫因杀妻罪被判往西伯利亚服苦役，以受过教育的贵族身份进入一个对他充满戒备的囚犯共同体。最初，他把牢狱看成统一的苦难，很快却发现其中仍有等级、交易、节庆、劳动骄傲和各自不同的罪责。强制劳动本身未必最难忍，失去独处、被持续监视以及无法自由选择同伴，才不断侵蚀人格。他观察阿列伊的温和、加津的暴力、彼得罗夫危险的亲近，也逐渐意识到不能用案卷概括一个人。叙述中仍保留贵族视角的距离，但这种距离反复被共同生活打破。出狱时，他获得的不只是自由，更是一种拒绝把任何群体简化为单一类型的认识。",
  "akim-akimych":
    "阿基姆·阿基梅奇是苦役营里少见的旧军官，因在高加索擅自处死一名地方首领而获刑。他待人礼貌，生活极有条理，能制作、修补各种物件，并认真向初入牢狱的戈里扬奇科夫解释规矩。在其他囚犯看来，他的循规蹈矩近乎可笑：节日要按程序准备，惩罚既然来自权威便似乎无需追问。然而，这种服从不是单纯愚钝，而是他在彻底失序的环境中保护自己的方式。他可以细致帮助同伴，却很少理解反抗者的愤怒；他曾以军纪之名越权杀人，如今又靠军纪维持内心安稳。人物身上并置着可靠与盲目，显示秩序既能保存尊严，也可能遮蔽责任。",
  "underground-man":
    "地下室人是一个四十岁的退职小官员，独居彼得堡，以过度清醒解释自己的停滞。他反对把人视为追求利益的理性机器，坚持人会故意选择痛苦，只为证明意志不受公式支配；然而这种自由在他身上几乎只表现为拒绝行动。他多年记恨一次街头碰撞，为参加旧同学聚会反复排练尊严，最后又用羞辱丽莎来报复自己的羞耻。丽莎真正来到地下室时，他渴望被爱，却无法忍受自己被看见，便用金钱把亲近重新定义为交易。他的洞察并非虚假，危险在于他把洞察当成免于负责的特权。地下室既是社会排斥的结果，也是他主动建造、用来避免改变的堡垒。",
  "liza-underground":
    "丽莎是地下室人在妓院遇见的年轻女子。面对陌生人的残酷说教，她先以沉默抵抗，却被关于疾病、孤独和无人哀悼的未来击中；地下室人给出的地址让她误以为自己得到了一次平等相见的邀请。她来到他的住处，恰好目睹他与仆人阿波隆争执，也看见夸张傲慢背后的贫穷和绝望。当地下室人坦白先前只是为了支配她，丽莎没有反击，而是拥抱这个正在崩溃的人。正因她的怜悯真实，他反而更感羞辱，最后塞钱试图恢复高低关系。丽莎把钱留下后离开，以一个简单动作拒绝被定义为商品，也拒绝充当他自我救赎的工具。",
  raskolnikov:
    "拉斯柯尔尼科夫是住在彼得堡阁楼中的大学肄业生，贫困、孤立和受伤的骄傲使他沉入关于“非凡人”的理论：少数创造历史者是否有权越过普通道德。他杀死放债老太婆，又意外杀害丽扎韦塔，原想验证自己属于哪一类人，犯罪后却没有获得力量，只陷入发热、恐惧和对他人目光的过敏。他一面冷酷计算，一面又把钱留给马尔梅拉多夫一家；这种矛盾说明良知并未被理论消除。波尔菲里的追问逼近逻辑漏洞，索尼娅的陪伴则让承认罪行不再只是法律失败。自首和流放并非立即完成救赎，真正的转折发生在他终于愿意把另一个人的爱视为现实，而非软弱。",
  sonya:
    "索尼娅是马尔梅拉多夫的女儿，为养活继母和年幼的孩子领取黄色身份证、走上街头。她在社会意义上被判为“堕落”，却没有用自我神圣化抵消羞辱；她仍会害怕、窘迫，也依靠福音故事理解无法解释的苦难。拉斯柯尔尼科夫向她坦白谋杀，不是因为她能替他开脱，而是因为她同样越过了社会边界，却没有把他人变成工具。她要求他到十字路口认罪，随后跟随他前往西伯利亚，在囚犯中以安静的照料获得信任。索尼娅的力量不在于被动忍受，而在于拒绝让痛苦决定自己如何对待别人；她陪伴罪人，却从未宣布罪行无关紧要。",
  svidrigailov:
    "斯维德里盖洛夫是杜尼娅从前的雇主，关于他的传闻涉及逼迫、死亡和对弱者的玩弄。他有钱、敏锐、厌倦道德解释，能够资助孤儿、安排索尼娅一家，也能把帮助变成接近杜尼娅的筹码。偶然偷听到拉斯柯尔尼科夫的秘密后，他没有立刻告发，而是把这个青年视为自己的精神近亲：两人都试图越界，但他早已生活在界线消失后的空洞中。密室里，杜尼娅宁愿开枪也不接受他的条件；他放她离开，第一次承认欲望不能制造爱。随后他分发财产，在雨夜自杀。斯维德里盖洛夫偶尔显出的善意并未抹去罪责，反而使他更难被归类，也更像主人公可能抵达的终点。",
  dunya:
    "杜尼娅是拉斯柯尔尼科夫的妹妹，曾在斯维德里盖洛夫家任家庭教师，遭到男主人的纠缠和女主人的公开羞辱。真相澄清后，她接受卢仁求婚，希望用一桩体面的婚姻保护母亲并帮助哥哥，却很快看穿卢仁需要的是一个永远感恩、便于控制的妻子。她愿意牺牲个人舒适，却不肯把牺牲等同于服从，因此在家庭会面中毅然解除婚约。面对斯维德里盖洛夫的囚禁与要挟，她开枪反抗；当她无法再次射击时，对方终于明白她绝不会爱他。此后她与拉祖米欣相守。杜尼娅并非主人公道德选择的附属，她以清醒行动展示了另一种自由：承担亲情，但拒绝被亲情出售。",
  "alexei-gambler":
    "阿列克谢是受雇于俄国将军家庭的年轻教师，跟随一群等待遗产的人滞留在德国赌城鲁列坚。他迷恋波琳娜，愿意替她冒犯男爵、接受命令，甚至把自我贬低当作爱的证明；但他的忠诚始终混杂着获胜、报复和让她震惊的愿望。第一次走近轮盘，他迅速迷上风险压缩时间的感觉：下注瞬间，身份、贫穷和未来仿佛都可被一次结果改写。替波琳娜赢得巨款后，他仍无法与她建立信任，转而跟随布朗什去巴黎挥霍。后来即使听说波琳娜爱过自己，他首先想到的仍是再赌一局。阿列克谢并非不知道自由正在流失，他只是不断把“下一次”想象成重新掌握命运的时刻。",
  polina:
    "波琳娜是将军的继女，身处一个被债务、遗产预期和体面表演维系的家庭。她与德·格里耶之间既有感情也有金钱束缚，因此很难分清对方的承诺究竟指向她还是可能继承的财产。面对阿列克谢，她时而交付秘密，时而命令他做荒唐之事，用危险试探忠诚，也借冷淡保护不愿示人的依赖。德·格里耶留下欠款离开后，她来到阿列克谢房间；阿列克谢却把刚赢得的钞票推给她，使爱情再次带上购买和偿债的意味。波琳娜把钱掷还，拒绝成为赌局的奖品。她并非反复无常的谜，而是一个在所有关系都被金钱标价时，极力守住自尊却又渴望被无条件选择的人。",
  antonida:
    "安东尼达是将军一家等待死亡的富有姑母。众人不断向俄国拍电报询问她的病情，她却坐着轮椅亲自抵达鲁列坚，以突然现身揭穿每一张关切面孔背后的遗产盘算。她头脑清楚、语言尖锐，迅速看透布朗什、德·格里耶和将军之间的利益关系，也拒绝按家人的意愿安排财产。然而，正因为所有人都想控制她的钱，她执意亲自走到轮盘前，把赌博当作主权表演；连续损失并未使她停手，劝阻反而激起更强的固执。返回俄国时，她带走了家族的希望，也暴露自己同样会被赌场的节奏攫住。她既是闹剧的裁判者，也是其中最有力量的新赌徒。",
  myshkin:
    "梅诗金公爵长期在瑞士治疗癫痫，回到俄国时几乎没有财产，也缺少社交世界需要的防御。他直率谈论死刑、疾病和恐惧，能够越过名誉判断，看见娜斯塔霞的受辱、罗果仁的危险以及伊沃尔金一家各自的羞耻。人们因此称他为“白痴”，又忍不住向他暴露秘密。梅诗金同时爱着阿格拉娅，并以拯救的怜悯接近娜斯塔霞；他不愿舍弃任何人，却迟迟不能作出会让另一方受伤的选择。善意在复杂关系中遂变成新的伤害。娜斯塔霞被杀后，他守在罗果仁身边，精神重新崩溃。小说并未否定他的纯真，而是追问：一个“绝对美好的人”若没有判断和行动的力量，能否真正阻止灾难。",
  nastassya:
    "娜斯塔霞幼年失去父母，被地主托茨基抚养，少女时期又遭其长期占有。成年后，托茨基试图用金钱和婚姻摆脱她，社交界则把施害者制造的处境当作她本人的污点。她在生日宴上焚烧巨款、嘲弄求婚者，以戏剧化的方式夺回解释自己的权力；但每一次反抗也在重复“我不配被爱”的判决。梅诗金坚持她无罪，使她短暂看见另一种生活，却又因害怕玷污他而逃向罗果仁。她在婚礼前再次出走，最终死于占有者之手。娜斯塔霞不是等待王子拯救的受难者，她敏锐地识破所有交易，只是社会羞辱已进入内心，使自由不断转化为自我惩罚。",
  rogozhin:
    "罗果仁出身富商家庭，在父亲的恐惧统治下长大，继承巨额财产后立刻把金钱和全部意志投向娜斯塔霞。他的爱情几乎没有共同生活的想象，只要求对方彻底属于自己；追逐、贿赂、等待和暴力都服务于同一个占有目标。火车上结识梅诗金后，他既把公爵视为情敌，又感觉两人被同一命运捆住，甚至交换十字架、以兄弟相称。梅诗金的怜悯无法平息他的嫉妒，反而使他更清楚自己缺少那种爱人的能力。杀死娜斯塔霞后，他没有逃离，而是在尸体旁等待梅诗金到来。两人的守夜把竞争推向可怕的共同体：一个毁灭所爱之人，另一个在理解凶手时也随之崩溃。",
  aglaya:
    "阿格拉娅是叶潘钦将军最小的女儿，在优裕而受规训的家庭中长大，对社交婚姻和庸常生活抱有强烈反感。她把梅诗金想象成既纯洁又勇敢的反叛者，用“可怜的骑士”诗篇赞美他，也用嘲讽检验他能否摆脱众人的摆布。她确实爱公爵，却希望这份爱证明自己选择了一个英雄，而不是一个只会怜悯所有人的圣徒。与娜斯塔霞会面时，两个女人都把对方当作自己可能遭受的羞辱；梅诗金本能地奔向受创更深的一方，使阿格拉娅感到被彻底否定。后来她追随一名冒充贵族的波兰人远走。她的失败来自理想化的激情：渴望自由，却仍要求现实按浪漫剧本证明她的判断。",
  stavrogin:
    "斯塔夫罗金出身优越、意志强大，回到省城前已留下决斗、侮辱和秘密婚姻等一连串传闻。沙托夫从他那里听见民族信仰，基里洛夫从他那里发展无神论，彼得·韦尔霍文斯基则想把他塑造成革命组织的神秘领袖；相反观念都能依附于他，因为他从不真正归属于任何一种。他能忍受耳光、承认婚姻，也能在关键时刻冷眼旁观他人被杀。向吉洪神父交出的忏悔揭示他对少女马特廖莎的罪行，但即使坦白也带着试验自己反应的意味。丽莎和玛丽亚的死亡切断最后联系后，他选择自缢。斯塔夫罗金的可怕不在激情过强，而在巨大自由找不到值得承担的对象。",
  kirillov:
    "基里洛夫是一名工程师，长期思考无神论若被彻底贯彻会导向什么。他相信人之所以没有成为神，是因为仍恐惧死亡；若有人在没有绝望、没有外部强迫的情况下自愿结束生命，就能证明意志超越上帝和自然。他日常生活却并不冷酷：喜欢孩子，愿意照顾生病的人，也能在清晨感到树叶与光线的美。正是这种对生命的敏感，使他的自杀计划更显悖论。彼得·韦尔霍文斯基利用这套思想，要求他死前承担组织犯下的谋杀。最后时刻，抽象从容让位于动物性的恐惧，他仍扣动扳机。基里洛夫想以死亡解放全人类，实际却把自由交给了最擅长操纵他人的人。",
  shatov:
    "沙托夫曾受斯塔夫罗金影响加入激进圈子，后来转向对俄罗斯民族和东正教使命的信仰。他说话激烈、思想尚未稳定，却比周围许多人更迫切地寻找一种可以实际生活的真理；那记打在斯塔夫罗金脸上的耳光，既是控诉，也是向昔日导师索要答案。分居的妻子玛丽亚突然回来生产时，他放下观念争辩，四处寻找接生婆和生活用品，在照顾并非自己亲生的婴儿时第一次感到新生活可能开始。他准备退出秘密组织，彼得却以防止告密为名决定清除他。沙托夫在公园被昔日同伴杀害，尸体投入池中。他的死亡显示政治阴谋如何摧毁一个刚刚从口号返回具体责任的人。",
  "pyotr-verkhovensky":
    "彼得·韦尔霍文斯基以轻浮、殷勤的姿态回到省城，实际不断散布谣言、制造误解，并让一个松散小组相信自己属于遍布全国的革命网络。他熟悉每个人的虚荣和恐惧：用理论刺激什加廖夫，用罪责捆住利普京，用自杀计划支配基里洛夫，再以共同谋杀沙托夫迫使众人结成不能退出的团体。他想把斯塔夫罗金树立为具有神秘号召力的领袖，自己则掌握操盘权。与宣称的未来制度相比，他更迷恋瓦解信任、制造服从的过程；连父亲斯捷潘也只是可供嘲弄的旧时代姿态。谋杀后他迅速逃离，把后果留给追随者承担。他所代表的“群魔”，首先是一套让普通人彼此成为人质的技术。",
  arkady:
    "阿尔卡季·多尔戈鲁基是韦尔西洛夫的私生子，法律上的父亲却是马卡尔·伊万诺维奇。寄宿学校里遭受的轻视使他把财富想象成绝对独立，秘密制定成为“罗斯柴尔德”的计划：积累金钱，不为享受，只为获得不受任何人摆布的力量。来到彼得堡后，他声称要实践计划，注意力却始终围绕韦尔西洛夫旋转；崇拜、嫉妒、揭露和渴望承认不断改变他的行动。他掌握一封可能损害卡捷琳娜名誉的信，又被兰伯特利用，第一次发现“拥有秘密”并不等于拥有自己。经历父亲失控和一系列关系崩塌后，他开始把生活写成手记。写作意味着他不再只用财富证明存在，而尝试理解自己从何而来。",
  versilov:
    "韦尔西洛夫是受过良好教育的贵族，也是阿尔卡季长期缺席的生父。他能够谈论欧洲文明、俄罗斯使命和“黄金时代”的普世和解，举止中有真正的宽容与魅力；与此同时，他让索菲娅多年处于没有名分的依附状态，又卷入与卡捷琳娜复杂而反复的感情。他有时放弃财产、表现得近乎圣徒，有时又因嫉妒和自尊突然摧毁刚刚建立的信任。阿尔卡季把他当作高贵人格的谜，越接近越发现理想与行为无法吻合。砸碎圣像及随后的自杀冲动，使他内部的分裂公开爆发。韦尔西洛夫并非简单伪君子，他真诚相信自己说出的理想，只是从未学会让日常责任服从那些宏大信念。",
  "katerina-adolescent":
    "卡捷琳娜·尼古拉耶芙娜是阿赫马科夫将军的女儿，聪明、富有，也习惯在社交关系中保持主动。她曾写信讨论父亲的监护问题，这封可能损害名誉的文件落到阿尔卡季手中，随后成为兰伯特策划勒索的核心。她与韦尔西洛夫彼此吸引，却都不愿承认自己会被对方支配；试探、误解和骄傲使感情始终与权力纠缠。面对阿尔卡季，她有时真诚亲近，有时又把他视作可以交换消息的少年，这进一步刺激了他的迷恋。最终的密室冲突让所有人精心维持的姿态崩溃。卡捷琳娜并非阴谋中的奖品，她同样在寻找行动自由，只是财富与名誉提供的控制感无法保护她免受情感伤害。",
  "dmitri-karamazov":
    "德米特里是老卡拉马佐夫的长子，自幼辗转寄养，成年后长期相信父亲侵吞了自己的遗产。金钱纠纷与两人对格鲁申卡的争夺叠在一起，使他多次公开威胁弑父。他挥霍、嫉妒、动手伤人，却又执着于一种私人荣誉：卡捷琳娜交付的三千卢布被他花去一半，剩下一半缝在身上，成为他证明自己“卑鄙但不是盗贼”的界线。案发夜他确实奔向父宅，却没有杀父；此前的言行和突然出现的钱仍使所有证据指向他。审判中，他愿意承认道德上的混乱，却拒绝接受并未犯下的罪。德米特里身上崇高与下流同时爆发，他的希望不来自清白无瑕，而来自仍愿为重建生活承担痛苦。",
  "ivan-karamazov":
    "伊万是卡拉马佐夫家的次子，受过良好教育，以冷静文章和锋利辩论同家庭的混乱保持距离。在酒馆里，他用受虐儿童的事实拒绝任何以未来和谐补偿当下痛苦的神义论，并讲述“大法官”追问自由是否超出人类承受能力。他并未简单宣称“什么都可以”，却相信没有不朽便难以奠定道德；斯乜尔加科夫捕捉到这道缝隙，把伊万离开小镇解释为默许弑父。真相揭开后，伊万一次次探访凶手，最终在罪疚和高烧中看见魔鬼——一个用庸俗口吻复述他思想的寄生者。他在法庭上试图作证，却已无法让人相信。伊万的崩溃显示思想并非谋杀命令，却也不能永远拒绝追问自身如何被他人使用。",
  "alyosha-karamazov":
    "阿辽沙是卡拉马佐夫家最小的儿子，幼年失母，在佐西马长老身边找到一种不以羞辱维系的精神秩序。他进入修道院并非厌恶世界，而是因为真诚信任；长老遗体过早腐败、众人借机嘲弄时，这份信仰第一次遭遇具体打击。格鲁申卡没有按拉基津期待的方式诱惑他，反而与他在彼此怜悯中重新站起。离开修道院后，阿辽沙穿行于父亲、兄长、卡捷琳娜和孩子们之间，很少用抽象答案压过别人的痛苦。他无法阻止弑父、误判和伊柳沙之死，却能让破裂的人暂时重新说话。坟旁演讲中，他请孩子们保存共同记忆；这不是轻易乐观，而是把信仰落实为今后仍愿彼此负责的约定。",
  smerdyakov:
    "斯乜尔加科夫是老卡拉马佐夫与“疯女”丽扎韦塔所生的私生子，由仆人格里戈里夫妇养大，却始终以厨师和下人的身份留在父亲家中。他寡言、讲究体面，对养父母、俄国和周围人的粗鄙怀有冷酷轻蔑，癫痫既是真实疾病，也被他用于制造不在场证明。他仔细听取伊万关于道德和无神论的谈话，把兄长离开切尔马什尼亚理解为行动许可；弑父后，他又坚持伊万才是“主要凶手”，迫使思想家面对暗示的后果。第三次会面中，他交出赃款，随后自杀，没有留下可供法庭使用的证词。斯乜尔加科夫既长期遭受侮辱，也主动选择了谋杀与操纵；受害经历不能替他取消责任。",
  grushenka:
    "格鲁申卡年轻时被一名波兰军官抛弃，受商人萨姆索诺夫庇护后逐渐学会用金钱、诱惑和捉弄保护自己。老卡拉马佐夫与德米特里都围绕她争斗，旁人便把她当作导致父子相残的妖妇；她有意享受这种支配，却也一直等待旧情人归来，盼望早年的羞辱能被改写。佐西马死后，拉基津带阿辽沙来见她，原想促成堕落，她却因阿辽沙的一句理解放弃游戏，讲出“葱头”的故事。莫克罗耶重逢让她看清旧情已成贪婪交易，并选择与被捕的德米特里共同承担未来。她的转变并非突然变成圣女，而是停止把受伤当作伤害别人的许可证，第一次允许自己既爱人也接受爱。",
};

export const characterRelations: readonly CharacterRelation[] = [
  { source: "devushkin", target: "varvara", label: "书信相依" },
  { source: "devushkin", target: "anna-fyodorovna", label: "寄居与轻蔑" },
  { source: "varvara", target: "anna-fyodorovna", label: "寄居与控制" },
  { source: "varvara", target: "bykov", label: "婚姻与支配" },
  { source: "dreamer", target: "nastenka", label: "倾诉与未竟爱情" },
  { source: "dreamer", target: "lodger-white-nights", label: "未曾谋面的情敌" },
  { source: "nastenka", target: "grandmother-white-nights", label: "监护与束缚" },
  { source: "nastenka", target: "lodger-white-nights", label: "等待与重逢" },
  { source: "netochka", target: "yefimov", label: "父女与创伤崇拜" },
  { source: "netochka", target: "netochka-mother", label: "母女与共苦" },
  { source: "netochka", target: "katya-netochka", label: "姐妹般的依恋" },
  { source: "yefimov", target: "netochka-mother", label: "婚姻与拖累" },
  { source: "ivan-petrovich", target: "natasha", label: "旧爱与守护" },
  { source: "ivan-petrovich", target: "nelly", label: "照料与见证" },
  { source: "ivan-petrovich", target: "prince-valkovsky", label: "对抗与揭露" },
  { source: "ivan-petrovich", target: "alyosha-valkovsky", label: "情敌与调停" },
  { source: "natasha", target: "nelly", label: "彼此映照的命运" },
  { source: "natasha", target: "alyosha-valkovsky", label: "私奔与破裂" },
  { source: "natasha", target: "nikolai-ikhmenyev", label: "父女决裂与和解" },
  { source: "nelly", target: "prince-valkovsky", label: "血缘、遗弃与控诉" },
  { source: "goryanchikov", target: "akim-akimych", label: "狱中同伴" },
  { source: "goryanchikov", target: "alei", label: "友谊与教读" },
  { source: "goryanchikov", target: "gazin", label: "观察暴力" },
  { source: "goryanchikov", target: "petrov-prison", label: "危险的亲近" },
  { source: "akim-akimych", target: "gazin", label: "秩序与失控的对照" },
  { source: "underground-man", target: "liza-underground", label: "伤害与可能的救赎" },
  { source: "underground-man", target: "apollon", label: "主仆与羞辱" },
  { source: "underground-man", target: "zverkov", label: "嫉妒与自辱" },
  { source: "raskolnikov", target: "sonya", label: "坦白、爱与救赎" },
  { source: "raskolnikov", target: "svidrigailov", label: "精神镜像" },
  { source: "raskolnikov", target: "dunya", label: "兄妹" },
  { source: "raskolnikov", target: "porfiry", label: "侦查与心理博弈" },
  { source: "raskolnikov", target: "razumikhin", label: "友谊与照料" },
  { source: "raskolnikov", target: "luzhin", label: "观念冲突" },
  { source: "sonya", target: "dunya", label: "苦难中的同盟" },
  { source: "sonya", target: "marmeladov", label: "父女与牺牲" },
  { source: "svidrigailov", target: "dunya", label: "欲望与拒绝" },
  { source: "dunya", target: "razumikhin", label: "爱情与相守" },
  { source: "dunya", target: "luzhin", label: "婚约与决裂" },
  { source: "alexei-gambler", target: "polina", label: "爱情与试探" },
  { source: "alexei-gambler", target: "antonida", label: "轮盘同行者" },
  { source: "alexei-gambler", target: "general-gambler", label: "雇佣与冲突" },
  { source: "alexei-gambler", target: "de-grieux", label: "情敌与债务" },
  { source: "polina", target: "antonida", label: "家族与金钱" },
  { source: "polina", target: "de-grieux", label: "债务与背叛" },
  { source: "antonida", target: "general-gambler", label: "姑侄与遗产" },
  { source: "general-gambler", target: "blanche", label: "婚姻与算计" },
  { source: "myshkin", target: "nastassya", label: "怜悯与拯救冲动" },
  { source: "myshkin", target: "rogozhin", label: "情敌与兄弟镜像" },
  { source: "myshkin", target: "aglaya", label: "理想化的爱情" },
  { source: "myshkin", target: "general-yepanchin", label: "投亲与信任" },
  { source: "myshkin", target: "lizaveta-prokofyevna", label: "理解与训诫" },
  { source: "nastassya", target: "rogozhin", label: "逃离与致命占有" },
  { source: "nastassya", target: "aglaya", label: "自尊的对峙" },
  { source: "nastassya", target: "totsky", label: "受害与控制" },
  { source: "aglaya", target: "lizaveta-prokofyevna", label: "母女与冲突" },
  { source: "stavrogin", target: "kirillov", label: "观念影响" },
  { source: "stavrogin", target: "shatov", label: "导师、背离与质问" },
  { source: "stavrogin", target: "pyotr-verkhovensky", label: "象征领袖与操盘者" },
  { source: "stavrogin", target: "marya-lebyadkina", label: "秘密婚姻与罪责" },
  { source: "stavrogin", target: "liza-tushina", label: "欲望与毁灭" },
  { source: "stavrogin", target: "varvara-petrovna", label: "母子与纵容" },
  { source: "kirillov", target: "pyotr-verkhovensky", label: "被利用的死亡" },
  { source: "shatov", target: "pyotr-verkhovensky", label: "脱离者与清算者" },
  { source: "shatov", target: "marya-shatova", label: "重逢与新生" },
  { source: "pyotr-verkhovensky", target: "stepan-trofimovich", label: "父子与蔑弃" },
  { source: "arkady", target: "versilov", label: "父子、崇拜与反抗" },
  { source: "arkady", target: "katerina-adolescent", label: "迷恋与权力试探" },
  { source: "arkady", target: "makar-dolgoruky", label: "名义父子与精神引导" },
  { source: "arkady", target: "lambert", label: "旧识与操纵" },
  { source: "versilov", target: "katerina-adolescent", label: "吸引与控制" },
  { source: "versilov", target: "sofia-adolescent", label: "伴侣与伤害" },
  { source: "versilov", target: "makar-dolgoruky", label: "现实与信念的镜像" },
  { source: "katerina-adolescent", target: "lambert", label: "秘密与勒索" },
  { source: "dmitri-karamazov", target: "ivan-karamazov", label: "兄弟与嫌疑" },
  { source: "dmitri-karamazov", target: "alyosha-karamazov", label: "兄弟与托付" },
  { source: "dmitri-karamazov", target: "grushenka", label: "激情与共同承担" },
  { source: "dmitri-karamazov", target: "smerdyakov", label: "替罪嫌疑" },
  { source: "dmitri-karamazov", target: "fyodor-karamazov", label: "父子冲突与嫌疑" },
  { source: "dmitri-karamazov", target: "katerina-ivanovna", label: "婚约、债务与屈辱" },
  { source: "ivan-karamazov", target: "alyosha-karamazov", label: "怀疑与信仰的对话" },
  { source: "ivan-karamazov", target: "smerdyakov", label: "观念与行动的共谋" },
  { source: "ivan-karamazov", target: "fyodor-karamazov", label: "父子疏离" },
  { source: "ivan-karamazov", target: "katerina-ivanovna", label: "爱情与审判" },
  { source: "ivan-karamazov", target: "zosima", label: "怀疑与倾听" },
  { source: "alyosha-karamazov", target: "grushenka", label: "相互唤醒的怜悯" },
  { source: "alyosha-karamazov", target: "smerdyakov", label: "同父异母兄弟" },
  { source: "alyosha-karamazov", target: "zosima", label: "师徒与信仰" },
  { source: "alyosha-karamazov", target: "fyodor-karamazov", label: "父子与怜悯" },
  { source: "alyosha-karamazov", target: "rakitin", label: "友谊与讥刺" },
  { source: "alyosha-karamazov", target: "ilyusha", label: "守护与记忆" },
  { source: "smerdyakov", target: "fyodor-karamazov", label: "私生血缘与弑父" },
  { source: "grushenka", target: "fyodor-karamazov", label: "欲望与争夺" },
  { source: "grushenka", target: "katerina-ivanovna", label: "情敌与宽恕" },
  { source: "grushenka", target: "rakitin", label: "利用与反转" },
];

export function getCharacterRelations(characterId: string) {
  return characterRelations.flatMap((relation) => {
    if (relation.source === characterId) {
      return [{ targetId: relation.target, label: relation.label }];
    }
    if (relation.target === characterId) {
      return [{ targetId: relation.source, label: relation.label }];
    }
    return [];
  });
}

export function buildCharacterBiography(character: ProfileCharacter) {
  return characterBiographies[character.id] ?? character.summary;
}
