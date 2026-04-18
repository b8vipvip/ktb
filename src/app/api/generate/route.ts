import { NextResponse } from "next/server";
import { z } from "zod";
import { modelDispatcherService } from "@/lib/services/model-dispatcher.service";

const generatePayloadSchema = z.object({
  providerKey: z.string().min(1),
  scene: z.enum(["海报", "招聘图", "门头效果图", "宣传单"]),
  title: z.string().min(2, "标题至少 2 个字"),
  subtitle: z.string().optional(),
  primaryColor: z.string().optional(),
  size: z.enum(["竖版", "横版"]),
});

export async function GET() {
  return NextResponse.json({
    data: {
      providers: modelDispatcherService.getProviderKeys(),
    },
  });
}

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const payload = generatePayloadSchema.parse(json);

    const result = await modelDispatcherService.generate(payload.providerKey, payload);

    return NextResponse.json({ data: result });
  } catch (error) {
    const message = error instanceof Error ? error.message : "生成失败";

    return NextResponse.json(
      {
        error: message,
      },
      { status: 400 },
    );
  }
}
