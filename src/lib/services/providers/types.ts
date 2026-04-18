export type GenerateInput = {
  scene: "海报" | "招聘图" | "门头效果图" | "宣传单";
  title: string;
  subtitle?: string;
  primaryColor?: string;
  size: "竖版" | "横版";
};

export type GenerateResult = {
  taskId: string;
  imageUrl: string;
  provider: string;
};

export interface ImageProvider {
  key: string;
  displayName: string;
  generate(input: GenerateInput): Promise<GenerateResult>;
}
