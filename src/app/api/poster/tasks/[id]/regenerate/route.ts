import { NextResponse } from "next/server";
import { requireUserId } from "@/lib/auth/require-user";
import { posterTaskService } from "@/services/poster/poster-task.service";

export async function POST(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId();
    const { id } = await params;

    const task = await posterTaskService.getTask(id, false);
    if (!task || task.userId !== userId) {
      return NextResponse.json({ error: "任务不存在" }, { status: 404 });
    }

    const updated = await posterTaskService.processTask(id);
    return NextResponse.json({ data: updated });
  } catch (error) {
    const message = error instanceof Error ? error.message : "重生成失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
