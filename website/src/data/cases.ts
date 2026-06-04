export type CaseFeature = {
  label: string;
  value: string;
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
  features: CaseFeature[];
};

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
  features: [
    { label: "材质", value: "高硼硅玻璃" },
    { label: "容量", value: "1.2 L" },
    { label: "维护", value: "宽口易清洁" }
  ]
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
  features: [
    { label: "01", value: "收集来源" },
    { label: "02", value: "综合发现" },
    { label: "03", value: "分享叙事" }
  ]
};
