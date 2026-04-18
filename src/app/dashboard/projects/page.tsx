"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  status: string;
  updatedAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  const load = async () => {
    const response = await fetch("/api/projects");
    const json = await response.json();
    setProjects(json.data);
  };

  useEffect(() => {
    void load();
  }, []);

  const remove = async (id: string) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    await load();
  };

  return (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">我的项目</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b text-left text-slate-500">
              <th className="py-2">项目名称</th>
              <th className="py-2">状态</th>
              <th className="py-2">更新时间</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="py-3">{project.name}</td>
                <td className="py-3">{project.status}</td>
                <td className="py-3">{project.updatedAt}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/poster/editor/project/${project.id}`}
                      className="rounded border px-2 py-1 text-xs"
                    >
                      进入编辑
                    </Link>
                    <button
                      onClick={() => remove(project.id)}
                      className="rounded border px-2 py-1 text-xs text-red-600"
                    >
                      删除
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
