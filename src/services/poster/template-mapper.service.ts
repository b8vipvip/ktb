import { PosterEditorState, PosterGenerateInput } from "@/types/poster";
import { mockPosterTemplates } from "@/services/poster/mock-catalog";

/**
 * 模板映射服务：将用户输入结构映射为模板可消费的编辑状态。
 */
export class PosterTemplateMapperService {
  mapToEditorState(input: PosterGenerateInput): PosterEditorState {
    const template = mockPosterTemplates[input.templateKey];

    return {
      title: input.title,
      subtitle: input.subtitle || input.activity,
      phone: input.phone,
      address: input.address,
      backgroundUrl: template.defaultBackground,
      positions: {
        title: template.defaultTitlePos,
        subtitle: template.defaultSubtitlePos,
        phone: { x: 80, y: 1360 },
        address: { x: 80, y: 1430 },
      },
    };
  }
}

export const posterTemplateMapperService = new PosterTemplateMapperService();
