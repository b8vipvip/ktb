"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PosterEditor } from "@/components/poster/poster-editor";
import { PosterEditorState } from "@/types/poster";

export default function ProjectPosterEditorPage() {
  const params = useParams<{ projectId: string }>();
  const projectId = params.projectId;
  const [editorState, setEditorState] = useState<PosterEditorState | null>(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  useEffect(() => {
    const load = async () => {
      const response = await fetch(`/api/projects/${projectId}`);
      const json = await response.json();
      if (!response.ok) {
        return;
      }

      setSelectedImageUrl(json.data.selectedImageUrl || "");
      setEditorState(json.data.contentJson as PosterEditorState);
    };

    void load();
  }, [projectId]);

  const saveProject = async (state: PosterEditorState) => {
    await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        editorState: state,
        selectedImageUrl,
      }),
    });
  };

  if (!editorState) {
    return <p className="text-sm text-slate-600">正在加载项目...</p>;
  }

  return <PosterEditor initialState={editorState} onSave={saveProject} saveText="保存项目" />;
}
