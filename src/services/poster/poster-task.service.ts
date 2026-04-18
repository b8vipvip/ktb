import { TaskStatus } from "@prisma/client";
import { prisma } from "@/lib/db";
import { posterGenerationService } from "@/services/poster/poster-generation.service";
import { posterTemplateMapperService } from "@/services/poster/template-mapper.service";
import { PosterGenerateInput } from "@/types/poster";

export class PosterTaskService {
  async createTask(userId: string, input: PosterGenerateInput, providerKey: string) {
    const task = await prisma.generateTask.create({
      data: {
        userId,
        sceneType: "海报",
        providerKey,
        prompt: `${input.industry}-${input.title}-${input.activity}`,
        inputJson: input,
        outputCount: input.outputCount,
        status: TaskStatus.PENDING,
      },
    });

    return task;
  }

  async processTask(taskId: string) {
    const task = await prisma.generateTask.findUnique({ where: { id: taskId } });
    if (!task) {
      throw new Error("任务不存在");
    }

    if (task.status === TaskStatus.SUCCESS || task.status === TaskStatus.FAILED) {
      return task;
    }

    await prisma.generateTask.update({
      where: { id: taskId },
      data: { status: TaskStatus.PROCESSING },
    });

    try {
      const input = task.inputJson as PosterGenerateInput;
      const candidates = await posterGenerationService.generatePoster(task.providerKey, input);
      const editorPreset = posterTemplateMapperService.mapToEditorState(input);

      return prisma.generateTask.update({
        where: { id: taskId },
        data: {
          status: TaskStatus.SUCCESS,
          resultJson: {
            candidates,
            editorPreset,
          },
        },
      });
    } catch (error) {
      return prisma.generateTask.update({
        where: { id: taskId },
        data: {
          status: TaskStatus.FAILED,
          errorMessage: error instanceof Error ? error.message : "生成失败",
        },
      });
    }
  }

  async getTask(taskId: string, autoProcess = true) {
    const task = await prisma.generateTask.findUnique({ where: { id: taskId } });

    if (!task) {
      return null;
    }

    if (autoProcess && task.status === TaskStatus.PENDING) {
      return this.processTask(taskId);
    }

    return task;
  }
}

export const posterTaskService = new PosterTaskService();
