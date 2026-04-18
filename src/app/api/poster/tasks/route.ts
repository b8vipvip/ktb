import { NextResponse } from "next/server";
import { z } from "zod";
import { requireUserId } from "@/lib/auth/require-user";
import { posterTaskService } from "@/services/poster/poster-task.service";

const createTaskSchema = z.object({
  providerKey: z.string().default("mock-poster"),
  industry: z.string().min(1),
  title: z.string().min(2),
  subtitle: z.string().default(""),
  shopName: z.string().min(1),
  phone: z.string().min(3),
  address: z.string().min(3),
  activity: z.string().min(2),
  style: z.enum(["清新简约", "高饱和促销", "商务招聘"]),
  primaryColor: z.string().min(4),
  outputCount: z.number().int().min(1).max(6),
  templateKey: z.enum(["milk-tea", "restaurant-sale", "recruitment"]),
});

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    const json = await request.json();
    const payload = createTaskSchema.parse(json);

    const task = await posterTaskService.createTask(userId, payload, payload.providerKey);

    return NextResponse.json({ data: { taskId: task.id } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "创建任务失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
