import { randomUUID } from "crypto";
import { PosterCandidate, PosterGenerateInput } from "@/types/poster";
import { PosterProvider } from "@/services/poster/providers/poster-provider.types";
import { posterTemplateMapperService } from "@/services/poster/template-mapper.service";

/**
 * Mock 海报生成器：返回可预览的候选图 URL。
 */
export class MockPosterProvider implements PosterProvider {
  key = "mock-poster";
  displayName = "Mock 海报模型";

  async generatePoster(input: PosterGenerateInput): Promise<PosterCandidate[]> {
    const baseEditor = posterTemplateMapperService.mapToEditorState(input);

    return Array.from({ length: input.outputCount }).map((_, index) => {
      const text = encodeURIComponent(`${input.title}-方案${index + 1}`);
      return {
        id: randomUUID(),
        imageUrl: `https://dummyimage.com/1080x1600/${input.primaryColor.replace("#", "")}/ffffff&text=${text}`,
        templateKey: input.templateKey,
        title: baseEditor.title,
        subtitle: baseEditor.subtitle,
        phone: baseEditor.phone,
        address: baseEditor.address,
      };
    });
  }
}
