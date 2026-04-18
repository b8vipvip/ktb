import { MockPosterProvider } from "@/services/poster/providers/mock-poster.provider";
import { PosterProvider } from "@/services/poster/providers/poster-provider.types";
import { PosterCandidate, PosterGenerateInput } from "@/types/poster";

export class PosterGenerationService {
  private providers: Map<string, PosterProvider>;

  constructor() {
    const mockProvider = new MockPosterProvider();
    this.providers = new Map([[mockProvider.key, mockProvider]]);
  }

  listProviders() {
    return Array.from(this.providers.values()).map((item) => ({
      key: item.key,
      name: item.displayName,
    }));
  }

  async generatePoster(
    providerKey: string,
    input: PosterGenerateInput,
  ): Promise<PosterCandidate[]> {
    const provider = this.providers.get(providerKey);
    if (!provider) {
      throw new Error("未找到海报模型提供商");
    }

    return provider.generatePoster(input);
  }
}

export const posterGenerationService = new PosterGenerationService();
