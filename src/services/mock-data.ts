import { ProjectStatus, TemplateCategory } from "@/types/domain";

export type TemplateItem = {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  previewUrl: string;
  tags: string[];
  templateKey?: "milk-tea" | "restaurant-sale" | "recruitment";
};

export type ProjectItem = {
  id: string;
  name: string;
  status: ProjectStatus;
  templateId?: string;
  updatedAt: string;
};

export const mockTemplates: TemplateItem[] = [
  {
    id: "tpl-milk-tea",
    name: "奶茶活动海报",
    category: "海报",
    description: "清新活力，适合奶茶新品和第二杯半价活动。",
    previewUrl:
      "https://dummyimage.com/600x400/f59e0b/ffffff&text=%E5%A5%B6%E8%8C%B6%E6%B4%BB%E5%8A%A8%E6%B5%B7%E6%8A%A5",
    tags: ["奶茶", "活动", "高频"],
    templateKey: "milk-tea",
  },
  {
    id: "tpl-restaurant-sale",
    name: "餐馆促销海报",
    category: "海报",
    description: "醒目促销风格，适合午市、晚市限时折扣。",
    previewUrl:
      "https://dummyimage.com/600x400/dc2626/ffffff&text=%E9%A4%90%E9%A6%86%E4%BF%83%E9%94%80%E6%B5%B7%E6%8A%A5",
    tags: ["餐馆", "促销"],
    templateKey: "restaurant-sale",
  },
  {
    id: "tpl-recruitment",
    name: "招聘海报",
    category: "招聘",
    description: "岗位信息突出，适合门店招聘营业员/收银员。",
    previewUrl:
      "https://dummyimage.com/600x400/0f172a/ffffff&text=%E6%8B%9B%E8%81%98%E6%B5%B7%E6%8A%A5",
    tags: ["招聘", "门店"],
    templateKey: "recruitment",
  },
];

let projectList: ProjectItem[] = [
  {
    id: "mock-prj-001",
    name: "幸福奶茶开业海报",
    status: "已完成",
    templateId: "tpl-milk-tea",
    updatedAt: "2026-04-18 10:20",
  },
];

export const mockPlanInfo = {
  planName: "标准版",
  remainQuota: 86,
  totalQuota: 200,
  expireAt: "2026-05-01",
};

export function getProjects() {
  return projectList;
}

export function deleteProject(projectId: string) {
  projectList = projectList.filter((item) => item.id !== projectId);
  return projectList;
}
