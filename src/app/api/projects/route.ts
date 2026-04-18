import { NextResponse } from "next/server";
import { z } from "zod";
import { projectService } from "@/services/project.service";
import { requireUserId } from "@/lib/auth/require-user";

const saveProjectSchema = z.object({
  taskId: z.string(),
  name: z.string().min(1),
  selectedImageUrl: z.string().url(),
  editorState: z.object({
    title: z.string(),
    subtitle: z.string(),
    phone: z.string(),
    address: z.string(),
    backgroundUrl: z.string().url(),
    positions: z.object({
      title: z.object({ x: z.number(), y: z.number() }),
      subtitle: z.object({ x: z.number(), y: z.number() }),
      phone: z.object({ x: z.number(), y: z.number() }),
      address: z.object({ x: z.number(), y: z.number() }),
    }),
  }),
});

export async function GET() {
  try {
    const userId = await requireUserId();
    const data = await projectService.list(userId);
    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "加载失败" },
      { status: 401 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const userId = await requireUserId();
    const json = await request.json();
    const payload = saveProjectSchema.parse(json);

    const project = await projectService.createFromEditor({
      userId,
      taskId: payload.taskId,
      name: payload.name,
      selectedImageUrl: payload.selectedImageUrl,
      editorState: payload.editorState,
    });

    return NextResponse.json({ data: { id: project.id } });
  } catch (error) {
    const message = error instanceof Error ? error.message : "保存失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
