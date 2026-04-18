import { ProjectStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { PosterEditorState } from "@/types/poster";

export class ProjectService {
  async list(userId: string) {
    const projects = await prisma.project.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });

    return projects.map((item) => ({
      id: item.id,
      name: item.name,
      status: item.status,
      updatedAt: item.updatedAt.toISOString().slice(0, 16).replace("T", " "),
    }));
  }

  async delete(id: string, userId: string) {
    await prisma.project.deleteMany({ where: { id, userId } });
  }

  async createFromEditor(params: {
    userId: string;
    taskId: string;
    name: string;
    selectedImageUrl: string;
    editorState: PosterEditorState;
  }) {
    return prisma.project.create({
      data: {
        userId: params.userId,
        sourceTaskId: params.taskId,
        name: params.name,
        sceneType: "海报",
        status: ProjectStatus.COMPLETED,
        selectedImageUrl: params.selectedImageUrl,
        contentJson: params.editorState,
      },
    });
  }

  async detail(projectId: string, userId: string) {
    return prisma.project.findFirst({ where: { id: projectId, userId } });
  }

  async updateEditor(
    projectId: string,
    userId: string,
    editorState: PosterEditorState,
    selectedImageUrl: string,
  ) {
    return prisma.project.updateMany({
      where: { id: projectId, userId },
      data: {
        contentJson: editorState,
        selectedImageUrl,
      },
    });
  }
}

export const projectService = new ProjectService();
