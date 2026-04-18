import { randomUUID } from "crypto";
import { ImageProvider, GenerateInput, GenerateResult } from "@/lib/services/providers/types";

/**
 * Mock 模型提供商：保证本地开发可跑通闭环。
 */
export class MockImageProvider implements ImageProvider {
  key = "mock";
  displayName = "本地模拟模型";

  async generate(input: GenerateInput): Promise<GenerateResult> {
    const prompt = encodeURIComponent(`${input.scene}-${input.title}`);

    return {
      taskId: randomUUID(),
      provider: this.key,
      imageUrl: `https://dummyimage.com/1200x800/0f766e/ffffff&text=${prompt}`,
    };
  }
}
