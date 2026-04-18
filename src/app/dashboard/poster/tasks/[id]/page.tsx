"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Candidate = {
  id: string;
  imageUrl: string;
  templateKey: string;
  title: string;
  subtitle: string;
  phone: string;
  address: string;
};

type TaskResponse = {
  id: string;
  status: "PENDING" | "PROCESSING" | "SUCCESS" | "FAILED";
  resultJson?: {
    candidates: Candidate[];
  };
  errorMessage?: string;
};

export default function PosterTaskResultPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const taskId = params.id;
  const [task, setTask] = useState<TaskResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const candidates = useMemo(() => task?.resultJson?.candidates ?? [], [task]);

  const loadTask = async () => {
    const response = await fetch(`/api/poster/tasks/${taskId}`);
    const json = await response.json();
    if (response.ok) {
      setTask(json.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    void loadTask();
    const timer = setInterval(() => {
      void loadTask();
    }, 2000);
    return () => clearInterval(timer);
  }, [taskId]);

  const regenerate = async () => {
    await fetch(`/api/poster/tasks/${taskId}/regenerate`, { method: "POST" });
    await loadTask();
  };

  return (
    <section className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold">生成结果</h2>
        <p className="mt-1 text-sm text-slate-600">任务 ID：{taskId}</p>
        <p className="mt-2 text-sm">
          当前状态：
          <span className="font-medium">{task?.status ?? (loading ? "加载中" : "未知")}</span>
        </p>
        {task?.status === "FAILED" ? (
          <p className="mt-2 text-sm text-red-600">失败原因：{task.errorMessage || "未知错误"}</p>
        ) : null}
      </div>

      {task?.status === "SUCCESS" ? (
        <div className="rounded-lg border bg-white p-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold">候选海报</h3>
            <button onClick={regenerate} className="rounded border px-3 py-1 text-sm">
              重新生成
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {candidates.map((item, index) => (
              <article key={item.id} className="rounded border p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.imageUrl} alt={item.title} className="w-full rounded" />
                <p className="mt-2 text-sm font-medium">方案 {index + 1}</p>
                <p className="text-xs text-slate-500">{item.title}</p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/poster/editor/task/${taskId}?candidateId=${item.id}`)
                    }
                    className="rounded bg-brand px-3 py-1 text-xs text-white"
                  >
                    进入编辑器
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div className="rounded-lg border bg-white p-4 text-sm text-slate-600">
          系统正在生成，请稍后自动刷新查看。
        </div>
      )}

      <Link
        href="/dashboard/poster/create"
        className="inline-block text-sm text-brand hover:underline"
      >
        返回重新填写参数
      </Link>
    </section>
  );
}
