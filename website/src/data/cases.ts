export type CaseFeature = {
  label: string;
  value: string;
};

export type MobileBrief = {
  audience: string;
  businessGoal: string;
  requiredSections: string[];
  near: string;
  middle: string;
  far: string;
  defaultDirection: string[];
  songstyleDirection: string[];
};

export type CaseStudy = {
  id: "baiting" | "qingxu";
  brand: string;
  position: string;
  headline: string;
  description: string;
  action: string;
  image: string;
  imageAlt: string;
  businessGoal: string;
  features: CaseFeature[];
  mobileBrief: MobileBrief;
  songMappings: string[];
};

export const comparisonInvariants = [
  "same brief",
  "same copy",
  "same image",
  "same CTA",
  "same goal"
] as const;

export const baitingCase: CaseStudy = {
  id: "baiting",
  brand: "白汀 Baiting",
  position: "日常饮水器物",
  headline: "让水回到桌面，安静地成为日常。",
  description:
    "一只 1.2 L 高硼硅玻璃水壶，薄而稳的壶口，容易清洁的宽口结构，以及适合每日使用的温润手感。",
  action: "查看器物与购买信息",
  image: "/assets/cases/baiting-carafe.webp",
  imageAlt: "自然光下置于当代居家桌面的透明玻璃水壶",
  businessGoal: "让玻璃水壶显得值得信任、容易理解、适合日常购买，而不是制造虚假的奢侈感。",
  features: [
    { label: "材质", value: "高硼硅玻璃" },
    { label: "容量", value: "1.2 L" },
    { label: "维护", value: "宽口易清洁" }
  ],
  mobileBrief: {
    audience: "正在为家中餐桌选择长期使用饮水器物的移动端访客。",
    businessGoal: "建立材料可信度、日常使用想象和清楚购买路径。",
    requiredSections: ["器物介绍", "材料规格", "日常使用", "购买行动"],
    near: "水壶本身、主标题和查看信息行动。",
    middle: "材质、容量和维护方式。",
    far: "安静、可信、可长期使用的日常生活气质。",
    defaultDirection: ["渐变叠图", "徽章与强按钮", "三张等权规格卡", "重复强调生活精选"],
    songstyleDirection: ["器物留白", "题跋式规格", "纸瓷质感", "行动在停顿后出现"]
  },
  songMappings: ["格物致知", "宋版书", "汝窑与墨分五彩", "留白生意", "器以载道"]
};

export const qingxuCase: CaseStudy = {
  id: "qingxu",
  brand: "清序 Qingxu",
  position: "AI 研究工作台",
  headline: "从来源到叙事，让研究过程清楚可见。",
  description:
    "收集可信来源，综合带引用的发现，并与团队共同整理一条可以被理解和复核的研究叙事。",
  action: "开始试用",
  image: "/assets/cases/qingxu-research.webp",
  imageAlt: "研究者在自然光工作空间中整理来源与研究资料",
  businessGoal: "让 AI 研究产品显得可信、安静、可复核，并适合真实团队协作。",
  features: [
    { label: "01", value: "收集来源" },
    { label: "02", value: "综合发现" },
    { label: "03", value: "分享叙事" }
  ],
  mobileBrief: {
    audience: "需要用 AI 整理研究资料并向团队说明判断过程的移动端访客。",
    businessGoal: "解释研究工作流，建立可信感，并引导开始试用。",
    requiredSections: ["研究承诺", "来源整理", "发现综合", "叙事分享"],
    near: "当前研究任务、主标题和开始试用行动。",
    middle: "来源、发现、引用关系和团队复核路径。",
    far: "从信息到叙事的长期理解能力。",
    defaultDirection: ["深色科技渐变", "AI POWERED 徽章", "发光按钮", "仪表盘式叠层"],
    songstyleDirection: ["三远法叙事", "纸墨工作台", "细线关系", "留白建立可信"]
  },
  songMappings: ["三远法", "格物致知", "宋版书", "汝窑与墨分五彩", "留白生意"]
};
