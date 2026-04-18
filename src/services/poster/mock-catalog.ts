import { PosterTemplateKey } from "@/types/poster";

export const mockPosterTemplates: Record<
  PosterTemplateKey,
  {
    key: PosterTemplateKey;
    name: string;
    scene: string;
    defaultBackground: string;
    defaultTitlePos: { x: number; y: number };
    defaultSubtitlePos: { x: number; y: number };
  }
> = {
  "milk-tea": {
    key: "milk-tea",
    name: "奶茶活动海报",
    scene: "奶茶店活动",
    defaultBackground:
      "https://dummyimage.com/1080x1600/f59e0b/ffffff&text=%E5%A5%B6%E8%8C%B6%E6%B4%BB%E5%8A%A8",
    defaultTitlePos: { x: 80, y: 220 },
    defaultSubtitlePos: { x: 80, y: 330 },
  },
  "restaurant-sale": {
    key: "restaurant-sale",
    name: "餐馆促销海报",
    scene: "餐馆促销",
    defaultBackground:
      "https://dummyimage.com/1080x1600/dc2626/ffffff&text=%E9%A4%90%E9%A6%86%E4%BF%83%E9%94%80",
    defaultTitlePos: { x: 72, y: 210 },
    defaultSubtitlePos: { x: 72, y: 322 },
  },
  recruitment: {
    key: "recruitment",
    name: "招聘海报",
    scene: "门店招聘",
    defaultBackground:
      "https://dummyimage.com/1080x1600/0f172a/ffffff&text=%E6%8B%9B%E8%81%98%E6%B5%B7%E6%8A%A5",
    defaultTitlePos: { x: 86, y: 230 },
    defaultSubtitlePos: { x: 86, y: 344 },
  },
};

export const mockBackgroundPool = [
  "https://dummyimage.com/1080x1600/065f46/ffffff&text=%E7%BB%BF%E8%89%B2%E8%83%8C%E6%99%AF",
  "https://dummyimage.com/1080x1600/1d4ed8/ffffff&text=%E8%93%9D%E8%89%B2%E8%83%8C%E6%99%AF",
  "https://dummyimage.com/1080x1600/7c3aed/ffffff&text=%E7%B4%AB%E8%89%B2%E8%83%8C%E6%99%AF",
];
