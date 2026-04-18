import { NextResponse } from "next/server";
import { z } from "zod";
import { projectService } from "@/services/project.service";
import { requireUserId } from "@/lib/auth/require-user";

const updateSchema = z.object({
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
  selectedImageUrl: z.string().url(),
});

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId();
    const { id } = await params;
    const project = await projectService.detail(id, userId);

    if (!project) {
      return NextResponse.json({ error: "项目不存在" }, { status: 404 });
    }

    return NextResponse.json({ data: project });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "查询失败" },
      { status: 401 },
    );
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId();
    const { id } = await params;
    const json = await request.json();
    const payload = updateSchema.parse(json);

    await projectService.updateEditor(id, userId, payload.editorState, payload.selectedImageUrl);

    return NextResponse.json({ data: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "更新失败";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const userId = await requireUserId();
    const { id } = await params;
    await projectService.delete(id, userId);
    return NextResponse.json({ data: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "删除失败" },
      { status: 401 },
    );
  }
}
