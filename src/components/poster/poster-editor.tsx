"use client";

import { useRef, useState } from "react";
import { mockBackgroundPool } from "@/services/poster/mock-catalog";
import { PosterEditorState } from "@/types/poster";

type DragKey = "title" | "subtitle" | "phone" | "address" | null;

export function PosterEditor({
  initialState,
  onSave,
  saveText,
}: {
  initialState: PosterEditorState;
  onSave: (state: PosterEditorState) => Promise<void>;
  saveText: string;
}) {
  const boardRef = useRef<HTMLDivElement | null>(null);
  const [state, setState] = useState<PosterEditorState>(initialState);
  const [dragging, setDragging] = useState<DragKey>(null);
  const [saving, setSaving] = useState(false);

  const startDrag = (key: DragKey) => setDragging(key);
  const stopDrag = () => setDragging(null);

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging || !boardRef.current) {
      return;
    }

    const rect = boardRef.current.getBoundingClientRect();
    const x = Math.max(0, event.clientX - rect.left);
    const y = Math.max(0, event.clientY - rect.top);

    setState((prev) => ({
      ...prev,
      positions: {
        ...prev.positions,
        [dragging]: { x, y },
      },
    }));
  };

  const exportPng = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1600;
    const context = canvas.getContext("2d");

    if (!context) {
      return;
    }

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = state.backgroundUrl;
    await new Promise((resolve) => {
      image.onload = resolve;
      image.onerror = resolve;
    });

    context.drawImage(image, 0, 0, 1080, 1600);
    context.fillStyle = "#ffffff";

    context.font = "bold 72px sans-serif";
    context.fillText(state.title, state.positions.title.x * 2, state.positions.title.y * 2);

    context.font = "48px sans-serif";
    context.fillText(
      state.subtitle,
      state.positions.subtitle.x * 2,
      state.positions.subtitle.y * 2,
    );

    context.font = "36px sans-serif";
    context.fillText(
      `电话：${state.phone}`,
      state.positions.phone.x * 2,
      state.positions.phone.y * 2,
    );
    context.fillText(
      `地址：${state.address}`,
      state.positions.address.x * 2,
      state.positions.address.y * 2,
    );

    const link = document.createElement("a");
    link.download = `poster-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const save = async () => {
    setSaving(true);
    await onSave(state);
    setSaving(false);
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="space-y-4 rounded-lg border bg-white p-4">
        <h3 className="text-base font-semibold">编辑内容</h3>
        <label className="block text-sm">
          标题
          <input
            value={state.title}
            onChange={(e) => setState((v) => ({ ...v, title: e.target.value }))}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          副标题
          <input
            value={state.subtitle}
            onChange={(e) => setState((v) => ({ ...v, subtitle: e.target.value }))}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          电话
          <input
            value={state.phone}
            onChange={(e) => setState((v) => ({ ...v, phone: e.target.value }))}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          地址
          <input
            value={state.address}
            onChange={(e) => setState((v) => ({ ...v, address: e.target.value }))}
            className="mt-1 w-full rounded border px-3 py-2"
          />
        </label>

        <label className="block text-sm">
          背景图
          <select
            value={state.backgroundUrl}
            onChange={(e) => setState((v) => ({ ...v, backgroundUrl: e.target.value }))}
            className="mt-1 w-full rounded border px-3 py-2"
          >
            {[state.backgroundUrl, ...mockBackgroundPool]
              .filter((url, index, arr) => arr.indexOf(url) === index)
              .map((url) => (
                <option key={url} value={url}>
                  {url}
                </option>
              ))}
          </select>
        </label>

        <div className="flex flex-wrap gap-2">
          <button onClick={exportPng} className="rounded border px-3 py-2 text-sm">
            导出 PNG
          </button>
          <button
            onClick={save}
            disabled={saving}
            className="rounded bg-brand px-3 py-2 text-sm text-white disabled:bg-slate-400"
          >
            {saving ? "保存中..." : saveText}
          </button>
        </div>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <p className="mb-2 text-sm text-slate-600">提示：拖动文字可调整位置。</p>
        <div
          ref={boardRef}
          className="relative mx-auto h-[800px] w-[540px] cursor-move overflow-hidden rounded border bg-cover bg-center"
          style={{ backgroundImage: `url(${state.backgroundUrl})` }}
          onMouseMove={onMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          <p
            className="absolute text-3xl font-bold text-white drop-shadow"
            style={{ left: state.positions.title.x, top: state.positions.title.y }}
            onMouseDown={() => startDrag("title")}
          >
            {state.title}
          </p>
          <p
            className="absolute text-xl text-white drop-shadow"
            style={{ left: state.positions.subtitle.x, top: state.positions.subtitle.y }}
            onMouseDown={() => startDrag("subtitle")}
          >
            {state.subtitle}
          </p>
          <p
            className="absolute text-base text-white"
            style={{ left: state.positions.phone.x, top: state.positions.phone.y }}
            onMouseDown={() => startDrag("phone")}
          >
            电话：{state.phone}
          </p>
          <p
            className="absolute text-base text-white"
            style={{ left: state.positions.address.x, top: state.positions.address.y }}
            onMouseDown={() => startDrag("address")}
          >
            地址：{state.address}
          </p>
        </div>
      </div>
    </section>
  );
}
