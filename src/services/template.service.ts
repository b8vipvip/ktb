import { mockTemplates } from "@/services/mock-data";
import { TemplateCategory } from "@/types/domain";

export class TemplateService {
  list(category?: TemplateCategory) {
    return category ? mockTemplates.filter((item) => item.category === category) : mockTemplates;
  }

  detail(id: string) {
    return mockTemplates.find((item) => item.id === id) ?? null;
  }
}

export const templateService = new TemplateService();
