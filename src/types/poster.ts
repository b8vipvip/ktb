export type PosterStyle = "清新简约" | "高饱和促销" | "商务招聘";

export type PosterTemplateKey = "milk-tea" | "restaurant-sale" | "recruitment";

export type PosterGenerateInput = {
  industry: string;
  title: string;
  subtitle: string;
  shopName: string;
  phone: string;
  address: string;
  activity: string;
  style: PosterStyle;
  primaryColor: string;
  outputCount: number;
  templateKey: PosterTemplateKey;
};

export type PosterCandidate = {
  id: string;
  imageUrl: string;
  templateKey: PosterTemplateKey;
  title: string;
  subtitle: string;
  phone: string;
  address: string;
};

export type PosterEditorState = {
  title: string;
  subtitle: string;
  phone: string;
  address: string;
  backgroundUrl: string;
  positions: {
    title: { x: number; y: number };
    subtitle: { x: number; y: number };
    phone: { x: number; y: number };
    address: { x: number; y: number };
  };
};
