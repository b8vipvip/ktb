import { MockImageProvider } from "@/lib/services/providers/mock-provider";
import { ImageProvider, GenerateInput, GenerateResult } from "@/lib/services/providers/types";

/**
 * 模型调度服务：统一管理可用模型，避免前端直接耦合供应商。
 */
export class ModelDispatcherService {
  private readonly providers: Map<string, ImageProvider>;

  constructor() {
    const mockProvider = new MockImageProvider();
    this.providers = new Map([[mockProvider.key, mockProvider]]);
  }

  getProviderKeys() {
    return Array.from(this.providers.values()).map((provider) => ({
      key: provider.key,
      name: provider.displayName,
    }));
  }

  async generate(providerKey: string, input: GenerateInput): Promise<GenerateResult> {
    const provider = this.providers.get(providerKey);

    if (!provider) {
      throw new Error(`未找到模型提供商：${providerKey}`);
    }

    return provider.generate(input);
  }
}

export const modelDispatcherService = new ModelDispatcherService();
