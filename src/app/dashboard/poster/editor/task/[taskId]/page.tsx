"use client";

import { useRouter, useSearchParams, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PosterEditor } from "@/components/poster/poster-editor";
import { PosterEditorState } from "@/types/poster";

export default function TaskPosterEditorPage() {
  const router = useRouter();
  const params = useParams<{ taskId: string }>();
  const search = useSearchParams();
  const candidateId = search.get("candidateId");
  const taskId = params.taskId;

  const [editorState, setEditorState] = useState<PosterEditorState | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/poster/tasks/${taskId}`);
      const json = await response.json();
      const result = json.data?.resultJson;
      if (!result) {
        return;
      }

      const candidate =
        (result.candidates || []).find((item: { id: string }) => item.id === candidateId) ||
        result.candidates?.[0];

      if (!candidate) {
        return;
      }

      setSelectedImageUrl(candidate.imageUrl);
      setEditorState({
        ...result.editorPreset,
        title: candidate.title,
        subtitle: candidate.subtitle,
        phone: candidate.phone,
        address: candidate.address,
        backgroundUrl: candidate.imageUrl,
      });
    };

    void load();
  }, [taskId, candidateId]);

  const saveProject = async (state: PosterEditorState) => {
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        taskId,
        name: state.title,
        selectedImageUrl,
        editorState: state,
      }),
    });

    const json = await response.json();
    if (response.ok) {
      router.push(`/dashboard/poster/editor/project/${json.data.id}`);
    }
  };

  if (!editorState) {
    return <p className="text-sm text-slate-600">正在加载编辑器...</p>;
  }

  return (
    <PosterEditor initialState={editorState} onSave={saveProject} saveText="保存为项目并继续编辑" />
  );
}
