import Link from "next/link";

type TimelineItem = {
  title: string;
  detail?: string;
  meta?: string;
  important?: boolean;
};

type LetterPreview = {
  id: string;
  date: string;
  recipient: string;
  title: string;
  summary: string;
  important?: boolean;
};

type TimelineRow = {
  year: string;
  works?: TimelineItem[];
  life?: TimelineItem[];
  letters?: LetterPreview[];
  important?: boolean;
};

const timeline: TimelineRow[] = [
  {
    year: "1821",
    important: true,
    life: [
      {
        title: "出生于莫斯科",
        meta: "11月11日 / 俄历10月30日",
        detail:
          "费奥多尔·米哈伊洛维奇·陀思妥耶夫斯基出生在马林贫民医院旁的医生家庭，是七个孩子中的次子。贫困、疾病与人的尊严自幼进入他的视野。",
        important: true,
      },
    ],
  },
  {
    year: "1831",
    life: [
      {
        title: "达罗沃耶庄园",
        detail:
          "父亲购入图拉省达罗沃耶小庄园。此后数年，费奥多尔在乡间度过夏季，接触农民生活、民间故事与宗教传统。",
      },
    ],
  },
  {
    year: "1833–1834",
    life: [
      { title: "开始正规学习", meta: "1833", detail: "与哥哥米哈伊尔进入德拉舒索夫寄宿学校学习。" },
      {
        title: "切尔马克寄宿学校",
        meta: "1834",
        detail:
          "转入莫斯科切尔马克私立寄宿学校，系统学习语言、历史与文学，并大量阅读普希金、果戈里、席勒和雨果。",
      },
    ],
  },
  {
    year: "1837",
    important: true,
    life: [
      {
        title: "母亲去世",
        meta: "2月",
        detail: "母亲玛丽亚·费奥多罗芙娜病逝，家庭生活发生剧变。",
        important: true,
      },
      {
        title: "赴圣彼得堡备考",
        meta: "5月—夏季",
        detail: "与哥哥前往圣彼得堡，在科斯托马罗夫预备寄宿学校学习，准备军事工程学校入学考试。",
      },
    ],
    letters: [
      {
        id: "letter-1837-father",
        date: "1837年9月27日",
        recipient: "致父亲 米哈伊尔·安德烈耶维奇",
        title: "考试、名次与九百五十卢布",
        summary:
          "哥哥向父亲报告费奥多尔的入学考试：几何、历史、法语与《圣经》等科成绩优异，却因公费名额和不公正的录取规则面临高昂学费。这封早期家书把求学、贫困和尊严同时放在读者面前。",
      },
    ],
  },
  {
    year: "1838",
    life: [
      {
        title: "进入军事工程学校",
        meta: "1月",
        detail:
          "通过考核后进入圣彼得堡工程学校第三学员班，住进工程城堡；工程课程之外，他将大量时间用于阅读与写作。",
      },
    ],
    letters: [
      {
        id: "letter-1838-father",
        date: "1838年2月4日",
        recipient: "致父亲 米哈伊尔·安德烈耶维奇",
        title: "穿上制服后的第一封信",
        summary:
          "刚入工程学校的少年描述从早到晚的课程、队列操练、击剑、舞蹈、唱歌和值勤。他为迟迟未能回信道歉，也流露出对封闭军校生活和同学关系的最初不适。",
      },
    ],
  },
  {
    year: "1839",
    life: [
      {
        title: "父亲猝逝",
        meta: "6月",
        detail:
          "父亲米哈伊尔·安德烈耶维奇在达罗沃耶去世。关于其死因长期流传着被农奴杀害的说法，但史料并无定论。",
      },
    ],
    letters: [
      {
        id: "letter-1839-brother",
        date: "1839年8月16日",
        recipient: "致哥哥 米哈伊尔·米哈伊洛维奇",
        title: "人是一个谜",
        summary:
          "父亲去世后的信里，他把认识人当作终身课题：人的内心不能被简单公式穷尽。这个尚属少年的判断，后来成为全部小说创作的基本方向。",
        important: true,
      },
    ],
  },
  {
    year: "1841–1842",
    life: [
      {
        title: "通过课程考试，晋升军官",
        meta: "1841年8月",
        detail: "完成工程学校主要课程后被授予野战工兵准尉军衔，继续接受军官训练。",
      },
      { title: "晋升少尉", meta: "1842年8月", detail: "通过后续考核，获少尉军衔。" },
    ],
  },
  {
    year: "1843",
    life: [
      {
        title: "毕业并任军事工程师",
        meta: "6月",
        detail: "从工程学校毕业，进入工程部制图室服役，负责军事工程图纸。",
      },
    ],
    works: [
      {
        title: "《欧也妮·葛朗台》俄译本",
        meta: "译作",
        detail: "翻译巴尔扎克小说，成为其由工程师转向文学职业的重要准备。",
      },
    ],
  },
  {
    year: "1844",
    important: true,
    life: [
      {
        title: "辞去军职，投身文学",
        meta: "10月",
        detail: "正式退役，放弃稳定的工程师生涯，开始依靠稿酬与翻译生活。",
        important: true,
      },
    ],
    works: [
      {
        title: "开始写作《穷人》",
        meta: "第一部长篇",
        detail: "以书信体书写贫困小人物的尊严与情感。",
      },
    ],
  },
  {
    year: "1846",
    important: true,
    life: [
      {
        title: "进入彼得堡文坛",
        detail:
          "涅克拉索夫将《穷人》推荐给别林斯基，作品获得热烈评价；陀思妥耶夫斯基迅速成名，随后也与别林斯基产生思想分歧。",
      },
    ],
    works: [
      {
        title: "《穷人》",
        meta: "1月 · 成名作",
        detail: "发表于《彼得堡文集》，确立“小人物”与都市贫困主题。",
        important: true,
      },
      { title: "《双重人格》", detail: "以分裂的自我和官僚城市为中心，预告其后期心理小说。" },
      { title: "《普罗哈尔钦先生》", meta: "短篇" },
    ],
    letters: [
      {
        id: "letter-1846-brother",
        date: "1846年2月1日",
        recipient: "致哥哥 米哈伊尔·米哈伊洛维奇",
        title: "成名之后的兴奋与不安",
        summary:
          "《穷人》获得成功后，他向哥哥谈起别林斯基、涅克拉索夫和突然展开的文学生活。自信、敏感、虚荣与对下一部作品的焦虑在同一封信中并存。",
      },
    ],
  },
  {
    year: "1847–1848",
    important: true,
    life: [
      {
        title: "参加彼得拉舍夫斯基小组",
        meta: "1847年起",
        detail:
          "开始参加周五聚会，讨论空想社会主义、农奴制、出版自由与被禁书籍；逐渐远离别林斯基圈子。",
        important: true,
      },
      {
        title: "接近斯佩什涅夫秘密小组",
        meta: "1848",
        detail: "在小组内部更激进的圈层中参与建立秘密印刷与传播政治文本的设想。",
      },
    ],
    works: [
      { title: "《女房东》", meta: "1847" },
      { title: "《脆弱的心》", meta: "1848" },
      { title: "《白夜》", meta: "1848", detail: "以彼得堡夏夜写孤独、相遇与短暂幻梦。" },
    ],
  },
  {
    year: "1849",
    important: true,
    life: [
      {
        title: "朗读《别林斯基致果戈里书》",
        meta: "4月15日",
        detail: "在聚会中朗读被禁政治文本，成为日后审判的重要罪名之一。",
      },
      {
        title: "被捕并单独监禁",
        meta: "4月23日",
        detail:
          "与彼得拉舍夫斯基小组成员一同被捕，在彼得保罗要塞阿列克谢耶夫棱堡接受约八个月审讯和单独监禁。",
        important: true,
      },
      {
        title: "模拟处决与最后一刻改判",
        meta: "12月22日",
        detail:
          "在谢苗诺夫广场被宣读死刑判决、穿上殓衣并等待枪决；行刑前才宣布沙皇赦令，改判四年苦役及此后服兵役。这一瞬间彻底改变了他对时间、死亡与生命价值的理解。",
        important: true,
      },
      { title: "戴镣启程前往西伯利亚", meta: "12月25日" },
    ],
    works: [{ title: "《涅朵奇卡》", meta: "未完成长篇", detail: "因被捕而中断连载。" }],
    letters: [
      {
        id: "letter-1849-brother",
        date: "1849年12月22日",
        recipient: "致哥哥 米哈伊尔·米哈伊洛维奇",
        title: "从刑场回来：生命是礼物",
        summary:
          "模拟处决结束后数小时，他把等待枪决、最后告别和突然改判的经历写给哥哥。信的重心不是控诉，而是获得第二次生命后的决心：珍惜每一分钟，并继续写作。",
        important: true,
      },
    ],
  },
  {
    year: "1850–1854",
    important: true,
    life: [
      {
        title: "鄂木斯克苦役",
        meta: "四年",
        detail:
          "在西伯利亚鄂木斯克监狱与刑事犯共同生活，长期戴镣、从事重体力劳动，私人阅读受到严格限制。",
        important: true,
      },
      {
        title: "获赠《新约》",
        meta: "1850年1月 · 托博尔斯克",
        detail:
          "途经托博尔斯克时，十二月党人之妻赠予一本《新约》；这是他苦役期间获准保留的核心读物。",
      },
      {
        title: "宗教与政治思想转折",
        detail: "极端处境中的共同生活使其重新理解罪、苦难、民众与信仰，构成后期创作的精神底层。",
      },
    ],
    works: [
      {
        title: "监狱笔记与记忆素材",
        meta: "创作中断",
        detail: "苦役经验后来转化为《死屋手记》，并渗入《罪与罚》《卡拉马佐夫兄弟》等作品。",
      },
    ],
  },
  {
    year: "1854–1856",
    life: [
      {
        title: "塞米巴拉金斯克服役",
        meta: "1854年3月起",
        detail: "苦役期满后被编入西伯利亚第七线列营，从普通士兵做起，仍处于流放与监控之中。",
      },
      {
        title: "结识玛丽亚·伊萨耶娃",
        meta: "1854年春",
        detail: "认识已婚的玛丽亚及其丈夫；丈夫去世后，陀思妥耶夫斯基向她求婚。",
      },
      {
        title: "恢复军衔",
        meta: "1855—1856",
        detail: "先晋升士官，后获准成为准尉，生活条件逐步改善。",
      },
    ],
    letters: [
      {
        id: "letter-1854-brother",
        date: "1854年2月22日",
        recipient: "致哥哥 米哈伊尔·米哈伊洛维奇",
        title: "苦役之后重新与世界联系",
        summary:
          "离开鄂木斯克监狱后，他第一次较完整地回顾四年苦役，谈囚犯、疾病、孤独和重新获得书籍的渴望，也开始思考如何把记忆转化为文学。",
      },
      {
        id: "letter-1854-fonvizina",
        date: "1854年2月下旬",
        recipient: "致娜塔莉娅·冯维辛娜",
        title: "怀疑、信仰与基督",
        summary:
          "写给曾在托博尔斯克赠予《新约》的十二月党人之妻。陀思妥耶夫斯基承认自己始终在怀疑与渴望信仰之间受苦，并说明基督形象为何成为他精神上的最高尺度。",
        important: true,
      },
    ],
  },
  {
    year: "1857",
    important: true,
    life: [
      {
        title: "第一次结婚",
        meta: "2月6日 · 库兹涅茨克",
        detail:
          "与玛丽亚·德米特里耶芙娜·伊萨耶娃成婚，并承担继子帕维尔的生活。婚姻长期受疾病、经济压力与性格冲突困扰。",
        important: true,
      },
      {
        title: "恢复公民权与贵族身份",
        meta: "4月",
        detail: "获准恢复彼得拉舍夫斯基案后被剥夺的权利。",
      },
    ],
  },
  {
    year: "1859",
    important: true,
    life: [
      {
        title: "结束军旅与流放",
        meta: "3月—12月",
        detail: "因健康原因退役，先获准迁居特维尔，年底终于返回圣彼得堡；仍受到秘密警察监视。",
        important: true,
      },
    ],
    works: [
      { title: "《舅舅的梦》", meta: "中篇" },
      { title: "《斯捷潘奇科沃村及其居民》", meta: "长篇" },
    ],
  },
  {
    year: "1861–1862",
    life: [
      {
        title: "创办《时代》杂志",
        meta: "与哥哥米哈伊尔",
        detail: "兄弟二人以杂志参与思想论争，提出扎根民众与本土文化的“土壤主义”立场。",
      },
      {
        title: "第一次欧洲旅行",
        meta: "1862年夏",
        detail: "访问德国、法国、英国、瑞士与意大利；在伦敦会见赫尔岑，也开始接触欧洲赌场。",
      },
    ],
    works: [
      { title: "《被侮辱与被损害的》", meta: "1861 · 连载" },
      {
        title: "《死屋手记》",
        meta: "1861—1862",
        detail: "将鄂木斯克苦役经验改写为复调的监狱见证。",
        important: true,
      },
    ],
  },
  {
    year: "1863",
    life: [
      { title: "《时代》被查禁", detail: "因刊登一篇涉及波兰问题的文章而遭关闭，经济压力骤增。" },
      {
        title: "与阿波利娜里娅·苏斯洛娃的关系",
        detail: "第二次赴欧期间与苏斯洛娃共同旅行；这段复杂关系进入《赌徒》等作品的人物塑造。",
      },
      {
        title: "陷入轮盘赌博",
        detail: "在威斯巴登等地反复赌博并负债，此后多年在写作期限、债务与赌瘾间挣扎。",
      },
    ],
    works: [
      {
        title: "《冬天记的夏日印象》",
        meta: "旅行札记",
        detail: "反思西欧现代性、自由与城市文明。",
      },
    ],
  },
  {
    year: "1864",
    important: true,
    life: [
      { title: "第一任妻子去世", meta: "4月15日", detail: "玛丽亚因肺结核病逝。", important: true },
      {
        title: "哥哥米哈伊尔去世",
        meta: "7月10日",
        detail: "兄长兼出版伙伴突然去世；陀思妥耶夫斯基承担家庭与杂志债务，陷入严重经济危机。",
        important: true,
      },
      {
        title: "创办《时代》后继刊《纪元》",
        detail: "与哥哥创办的《纪元》延续至次年，最终因经营和债务问题停刊。",
      },
    ],
    works: [
      {
        title: "《地下室手记》",
        meta: "思想转折之作",
        detail: "以反理性主义的地下室人挑战“可计算的幸福”，开启成熟期创作。",
        important: true,
      },
    ],
  },
  {
    year: "1865–1866",
    important: true,
    life: [
      {
        title: "签下苛刻出版合同",
        meta: "1865年7月",
        detail:
          "为偿还债务，与出版商斯捷洛夫斯基签约：若不能在1866年11月前交付新作，将失去未来多年作品版权。",
      },
      {
        title: "结识速记员安娜·斯尼特金娜",
        meta: "1866年10月4日",
        detail: "为赶写《赌徒》聘请20岁的安娜速记；两人在不到一个月内完成书稿。",
      },
      {
        title: "向安娜求婚",
        meta: "1866年11月8日",
        detail: "借虚构人物试探感情后正式求婚，得到同意。",
      },
    ],
    works: [
      {
        title: "《罪与罚》",
        meta: "1866 · 连载",
        detail: "以越界、良知与救赎确立其世界文学地位。",
        important: true,
      },
      { title: "《赌徒》", meta: "26天口述完成", detail: "按期交稿，保住作品版权。" },
    ],
    letters: [
      {
        id: "letter-1865-katkov",
        date: "1865年9月上半月",
        recipient: "致米哈伊尔·卡特科夫",
        title: "《罪与罚》的最初构想",
        summary:
          "在经济绝境中写给《俄国导报》主编的创作提案。他概述一个年轻人受某种观念驱使犯罪、随后在心理与道德上崩溃的故事，小说最初的骨架由此可见。",
        important: true,
      },
      {
        id: "letter-1866-lyubimov",
        date: "1866年11月2日",
        recipient: "致尼古拉·柳比莫夫",
        title: "期限、口述与两部小说",
        summary:
          "刚按期完成《赌徒》，同时仍在推进《罪与罚》。信中可见债务合同如何直接塑造写作节奏，也能看到他在巨大压力下对作品结构和交稿安排的精确计算。",
      },
    ],
  },
  {
    year: "1867",
    important: true,
    life: [
      {
        title: "第二次结婚",
        meta: "2月15日",
        detail:
          "与安娜·格里戈里耶芙娜·斯尼特金娜成婚。安娜此后管理财务、速记、出版和版权，成为其晚年创作最稳定的合作者。",
        important: true,
      },
      {
        title: "离开俄国，旅居欧洲",
        meta: "4月起 · 四年多",
        detail:
          "为躲避债权人，夫妇辗转德累斯顿、日内瓦、米兰与佛罗伦萨；癫痫发作频繁，赌博与贫困仍在持续。",
      },
    ],
    letters: [
      {
        id: "letter-1867-anna",
        date: "1867年8月5日",
        recipient: "致妻子 安娜·格里戈里耶芙娜",
        title: "分别中的婚姻书信",
        summary:
          "婚后旅欧期间写给安娜的信。热烈的称呼之外，是对钱、健康、行程和彼此误解的细密解释；爱情在这些书信里不是抽象抒情，而是一种共同承担生活的实践。",
        important: true,
      },
    ],
  },
  {
    year: "1868–1869",
    life: [
      {
        title: "长女索菲娅出生后夭折",
        meta: "1868年2月—5月",
        detail: "第一个孩子索菲娅出生于日内瓦，约三个月后去世，夫妇遭受沉重打击。",
      },
      { title: "女儿柳博芙出生", meta: "1869年9月 · 德累斯顿" },
      {
        title: "构思《群魔》",
        meta: "1869",
        detail: "涅恰耶夫案使他重新审视革命组织、虚无主义与思想暴力。",
      },
    ],
    works: [
      {
        title: "《白痴》",
        meta: "1868—1869",
        detail: "尝试塑造一个“绝对美好的人”，让梅诗金进入欲望与权力纠缠的社会。",
        important: true,
      },
    ],
  },
  {
    year: "1870–1871",
    life: [
      { title: "最后一次赌博", meta: "1871年4月 · 威斯巴登", detail: "此后彻底戒除轮盘赌博。" },
      {
        title: "返回圣彼得堡",
        meta: "1871年7月",
        detail: "结束四年多欧洲生活，家庭与写作逐渐稳定。",
      },
      { title: "长子费奥多尔出生", meta: "1871年7月" },
    ],
    works: [
      { title: "《永远的丈夫》", meta: "1870" },
      { title: "《群魔》开始连载", meta: "1871" },
    ],
    letters: [
      {
        id: "letter-1871-anna",
        date: "1871年4月28日",
        recipient: "致妻子 安娜·格里戈里耶芙娜",
        title: "告别轮盘",
        summary:
          "威斯巴登最后一次赌博之后，他向安娜报告失败与羞愧，并承诺结束多年的赌瘾。此后他没有再回到赌桌，家庭财务也逐渐由安娜稳定下来。",
      },
    ],
  },
  {
    year: "1872–1874",
    life: [
      {
        title: "佩罗夫绘制作家肖像",
        meta: "1872",
        detail: "这幅著名肖像成为陀思妥耶夫斯基最具代表性的公共形象。",
      },
      {
        title: "主编《公民》",
        meta: "1873—1874",
        detail: "担任保守派周刊编辑，并以《作家日记》专栏直接评论司法、社会、宗教与国际政治。",
      },
      { title: "结束主编工作", meta: "1874年4月", detail: "因健康与编辑压力辞职。" },
    ],
    works: [
      {
        title: "《群魔》",
        meta: "1872 · 完成",
        detail: "追踪思想如何在精神真空中变为组织暴力。",
        important: true,
      },
      { title: "《鲍勃克》", meta: "1873 · 短篇" },
    ],
  },
  {
    year: "1875–1877",
    life: [
      { title: "次子阿列克谢出生", meta: "1875年8月" },
      {
        title: "独立出版《作家日记》",
        meta: "1876—1877",
        detail:
          "集新闻评论、小说、回忆与思想随笔于一体，发行量持续增长，使他成为全国性公共知识人物。",
      },
      {
        title: "在旧鲁萨建立家庭居所",
        meta: "1870年代中后期",
        detail: "一家长期在旧鲁萨度夏，后来购置房产；这座小城为《卡拉马佐夫兄弟》的空间提供原型。",
      },
      { title: "当选科学院通讯院士", meta: "1877年11月", detail: "获俄国语言文学领域的正式承认。" },
    ],
    works: [
      { title: "《少年》", meta: "1875" },
      { title: "《温顺的女性》", meta: "1876 · 短篇" },
      { title: "《一个荒唐人的梦》", meta: "1877 · 短篇" },
      { title: "开始《卡拉马佐夫兄弟》", meta: "1877年底" },
    ],
    letters: [
      {
        id: "letter-1875-anna",
        date: "1875年2月",
        recipient: "致妻子 安娜·格里戈里耶芙娜",
        title: "《约伯记》与创作中的苦难",
        summary:
          "在外就医期间，他向安娜谈到重读《约伯记》带来的强烈震动。无辜者的苦难、质问与信仰，将继续进入《卡拉马佐夫兄弟》的精神结构。",
      },
    ],
  },
  {
    year: "1878",
    important: true,
    life: [
      {
        title: "幼子阿列克谢去世",
        meta: "5月16日",
        detail: "三岁的阿廖沙在癫痫发作后去世；陀思妥耶夫斯基深感自责与悲痛。",
        important: true,
      },
      {
        title: "前往奥普京修道院",
        meta: "6月",
        detail:
          "与哲学家弗拉基米尔·索洛维约夫同行，拜访长老安弗罗西；这次哀悼之旅进入佐西马长老和小说修道院章节。",
      },
      {
        title: "迁入铁匠巷寓所",
        meta: "10月",
        detail: "在此完成《卡拉马佐夫兄弟》，并居住至去世。",
      },
    ],
  },
  {
    year: "1879–1880",
    important: true,
    life: [
      { title: "公共声望达到顶点", detail: "被推举进入国际文学团体，小说连载引发广泛讨论。" },
      {
        title: "普希金演说",
        meta: "1880年6月8日",
        detail:
          "在莫斯科普希金纪念活动发表著名演说，提出俄国文学的普世使命；现场反响轰动，成为其最后一次重大公共胜利。",
        important: true,
      },
    ],
    works: [
      {
        title: "《卡拉马佐夫兄弟》",
        meta: "1879—1880",
        detail: "围绕弑父、自由、信仰、怀疑与共同责任展开；原计划只是更大创作的第一部。",
        important: true,
      },
    ],
    letters: [
      {
        id: "letter-1879-lyubimov",
        date: "1879年8月19日",
        recipient: "致尼古拉·柳比莫夫",
        title: "解释《宗教大法官》",
        summary:
          "在与编辑讨论《卡拉马佐夫兄弟》连载时，他解释小说中反对上帝的论证为何必须写到最强，也说明佐西马长老的回应将承担全书的正面思想重量。",
        important: true,
      },
      {
        id: "letter-1880-anna",
        date: "1880年5月25—26日",
        recipient: "致妻子 安娜·格里戈里耶芙娜",
        title: "普希金庆典前夕",
        summary:
          "赴莫斯科参加普希金纪念活动时写给安娜，记录旅途、会面、身体状况与演说准备。私人报告与即将到来的公共胜利在信中交错。",
      },
    ],
  },
  {
    year: "1881",
    important: true,
    life: [
      {
        title: "在圣彼得堡去世",
        meta: "2月9日 / 俄历1月28日",
        detail:
          "因肺部出血恶化去世，终年59岁。葬于亚历山大·涅夫斯基修道院季赫温公墓；送葬人群成为彼得堡罕见的公众纪念场面。",
        important: true,
      },
    ],
    works: [
      {
        title: "《作家日记》最后一期",
        meta: "1月",
        detail: "晚年仍计划续写《卡拉马佐夫兄弟》，但未能动笔。",
      },
    ],
  },
];

const navigation = [
  ["首页", "/"],
  ["生平", "/timeline"],
  ["作品", "/works"],
  ["思想地图", "/ideas"],
  ["人物", "/characters"],
  ["阅读指南", "/reading"],
];

const letterIndex = timeline.flatMap((row) => row.letters ?? []);

function TimelineCard({ item, align }: { item: TimelineItem; align: "left" | "right" }) {
  return (
    <article
      className={`${align === "left" ? "text-right" : "text-left"} ${item.important ? "border-paper/45 text-paper" : "border-paper/10 text-paper/75"} border-t pt-4`}
    >
      {item.meta && (
        <p className="mb-2 text-[9px] uppercase tracking-[0.15em] text-[#7d848e] sm:text-[10px]">
          {item.meta}
        </p>
      )}
      <h3
        className={`${item.important ? "text-xl text-paper sm:text-2xl" : "text-base text-paper/90 sm:text-lg"} leading-tight tracking-[-0.02em]`}
      >
        {item.title}
      </h3>
      {item.detail && (
        <p className="mt-3 text-[11px] leading-[1.65] text-[#8f949d] sm:text-[13px] sm:leading-[1.7]">
          {item.detail}
        </p>
      )}
    </article>
  );
}

function LetterCard({ letter }: { letter: LetterPreview }) {
  return (
    <article
      className={`${letter.important ? "border-[#c9ccd1]/55" : "border-[#40444b]"} scroll-mt-8 border bg-[#09090a] p-4 target:border-paper target:bg-[#111113] sm:p-5`}
      id={letter.id}
    >
      <div className="flex items-center justify-between gap-4 text-[8px] uppercase tracking-[0.16em] text-[#626872] sm:text-[9px]">
        <span>Letter preview</span>
        <span>{letter.date}</span>
      </div>
      <p className="mt-4 text-[9px] tracking-[0.1em] text-[#7d848e] sm:text-[10px]">
        {letter.recipient}
      </p>
      <h3
        className={`${letter.important ? "text-xl text-paper sm:text-2xl" : "text-base text-paper/90 sm:text-lg"} mt-3 leading-tight tracking-[-0.02em]`}
      >
        {letter.title}
      </h3>
      <p className="mt-3 text-[11px] leading-[1.65] text-[#8f949d] sm:text-[13px] sm:leading-[1.7]">
        {letter.summary}
      </p>
      <a
        className="mt-4 inline-flex items-center gap-2 text-[8px] uppercase tracking-[0.14em] text-[#767d88] transition-colors hover:text-paper"
        href="#letters-index"
      >
        <span className="h-px w-5 bg-current" />
        前往书信索引
      </a>
    </article>
  );
}

export default function TimelinePage() {
  return (
    <main className="min-h-screen bg-[#030303] px-4 py-6 text-paper sm:px-10 sm:py-8">
      <nav className="mx-auto flex max-w-[1500px] items-center justify-between border-b border-[#27272a] pb-5">
        <Link className="font-display text-xl tracking-[0.12em]" href="/">
          F·D
        </Link>
        <span className="hidden text-[10px] uppercase tracking-museum text-[#767d88] sm:block">
          Dostoevsky · Life & works
        </span>
        <span className="text-[10px] tracking-[0.16em] text-[#767d88] sm:hidden">生平年表</span>
      </nav>

      <div className="mx-auto max-w-[1500px] py-12 sm:py-16 lg:grid lg:grid-cols-[155px_minmax(0,1fr)] lg:gap-12">
        <aside className="mb-12 lg:mb-0">
          <p className="text-[10px] tracking-museum text-[#767d88]">01 / CHRONOLOGY</p>
          <div className="archive-sidebar-nav mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[#767d88] lg:grid lg:gap-y-5">
            {navigation.map(([label, href]) => (
              <Link
                className={`transition-colors hover:text-paper ${href === "/timeline" ? "text-paper" : ""}`}
                href={href}
                key={href}
              >
                {label}
              </Link>
            ))}
          </div>
        </aside>

        <section>
          <header className="border-b border-[#27272a] pb-12 sm:flex sm:items-end sm:justify-between sm:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-museum text-[#767d88]">
                A life under pressure · 1821—1881
              </p>
              <h1 className="mt-5 text-6xl leading-[.88] tracking-[-0.045em] sm:text-8xl">
                生平年表
              </h1>
            </div>
            <div className="mt-7 max-w-md sm:mt-0">
              <p className="text-sm leading-7 text-[#8f949d]">
                左侧是作品与出版，右侧是生命、家庭和时代。两条轨道相互照见：小说并非传记的注脚，而是生活在精神内部留下的压力痕迹。
              </p>
              <p className="mt-3 text-[9px] leading-5 tracking-[0.08em] text-[#626872]">
                俄国当时使用儒略历；重要出生与去世日期同时标注现行公历。
              </p>
            </div>
          </header>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_46px_minmax(0,1fr)] items-end gap-x-3 border-b border-[#27272a] pb-5 sm:grid-cols-[minmax(0,1fr)_88px_minmax(0,1.1fr)] sm:gap-x-7">
            <div className="text-right">
              <p className="text-sm uppercase tracking-[0.18em] text-[#c9ccd1] sm:text-base">
                作品年表
              </p>
              <p className="mt-1 hidden text-[9px] uppercase tracking-[0.12em] text-[#626872] sm:block">
                Works / publications
              </p>
            </div>
            <div className="text-center text-[9px] tracking-[0.15em] text-[#626872]">YEAR</div>
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-[#c9ccd1] sm:text-base">
                生平事件
              </p>
              <p className="mt-1 hidden text-[9px] uppercase tracking-[0.12em] text-[#626872] sm:block">
                Life / history
              </p>
            </div>
          </div>

          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-[#27272a]"
            />
            {timeline.map((row) => (
              <div
                className={`${row.important ? "py-12 sm:py-16" : "py-8 sm:py-10"} relative grid scroll-mt-8 grid-cols-[minmax(0,1fr)_46px_minmax(0,1fr)] gap-x-3 border-b border-[#171719] sm:grid-cols-[minmax(0,1fr)_88px_minmax(0,1.1fr)] sm:gap-x-7`}
                id={`year-${row.year.replace("–", "-")}`}
                key={row.year}
              >
                <div className="space-y-6">
                  {row.works?.map((item) => (
                    <TimelineCard align="left" item={item} key={`${row.year}-${item.title}`} />
                  ))}
                  {!row.works && (
                    <span className="block pt-2 text-right text-[9px] tracking-[0.14em] text-[#363a40]">
                      —
                    </span>
                  )}
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <span
                    className={`${row.important ? "h-4 w-4 border-paper bg-[#030303]" : "h-2.5 w-2.5 border-[#626872] bg-[#030303]"} block rounded-full border`}
                  />
                  <span
                    className={`${row.important ? "mt-4 text-sm text-paper sm:text-lg" : "mt-3 text-[10px] text-[#767d88] sm:text-xs"} max-w-[82px] bg-[#030303] px-1 text-center leading-tight tracking-[-0.02em]`}
                  >
                    {row.year}
                  </span>
                  {row.important && <span className="mt-2 h-5 w-px bg-paper/40" />}
                </div>

                <div className="space-y-6">
                  {row.life?.map((item) => (
                    <TimelineCard align="right" item={item} key={`${row.year}-${item.title}`} />
                  ))}
                  {row.letters?.map((letter) => (
                    <LetterCard key={letter.id} letter={letter} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <section className="border-b border-[#27272a] py-10 sm:py-12" id="letters-index">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-[0.18em] text-[#767d88]">
                  Letters across a life
                </p>
                <h2 className="mt-3 text-3xl leading-none tracking-[-0.03em] sm:text-4xl">
                  书信索引
                </h2>
              </div>
              <p className="max-w-md text-[10px] leading-5 text-[#626872] sm:text-right sm:text-xs">
                据《人不单靠面包活着：陀思妥耶夫斯基书信选》选取代表性书信。点击后跳转至相应年代；预览为编辑摘要，不代替书中译文。
              </p>
            </div>
            <div className="mt-7 grid grid-cols-1 border-l border-t border-[#27272a] sm:grid-cols-2 xl:grid-cols-3">
              {letterIndex.map((letter) => (
                <a
                  className="group min-h-28 border-b border-r border-[#27272a] p-4 transition-colors hover:bg-[#0c0c0d] sm:p-5"
                  href={`#${letter.id}`}
                  key={letter.id}
                >
                  <div className="flex items-center justify-between gap-3 text-[8px] uppercase tracking-[0.14em] text-[#626872]">
                    <span>{letter.date.slice(0, 4)}</span>
                    <span>↗</span>
                  </div>
                  <p className="mt-4 text-[9px] tracking-[0.08em] text-[#767d88]">
                    {letter.recipient.replace("致", "致 ")}
                  </p>
                  <p className="mt-2 text-sm leading-5 text-[#c9ccd1] transition-colors group-hover:text-paper">
                    {letter.title}
                  </p>
                </a>
              ))}
            </div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-[#27272a] py-8 text-[9px] uppercase tracking-[0.13em] text-[#626872] sm:flex-row sm:items-center sm:justify-between">
            <span>61 years · 2 marriages · exile & return</span>
            <span>{letterIndex.length} selected letters · 1837—1880</span>
          </footer>
        </section>
      </div>
    </main>
  );
}
