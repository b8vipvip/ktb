"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function CreatePage() {
  const query = useSearchParams();
  const scene = query.get("scene") || "海报";
  const [title, setTitle] = useState("");
  const [resultUrl, setResultUrl] = useState("");

  const generate = async () => {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        providerKey: "mock",
        scene: scene === "门头图" ? "门头效果图" : scene,
        title,
        size: "竖版",
      }),
    });

    const json = await res.json();
    if (res.ok) {
      setResultUrl(json.data.imageUrl);
    }
  };

  return (
    <section className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold">生成{scene}</h2>
        <label className="mt-4 block text-sm">
          <span>标题文案</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="请输入宣传语"
          />
        </label>
        <button onClick={generate} className="mt-4 rounded bg-brand px-3 py-2 text-sm text-white">
          立即生成
        </button>
      </div>
      <div className="rounded-lg border bg-white p-4">
        <h3 className="font-medium">结果预览</h3>
        {resultUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={resultUrl} alt="结果图" className="mt-3 w-full rounded border" />
        ) : (
          <p className="mt-3 text-sm text-slate-500">生成结果将显示在这里。</p>
        )}
      </div>
    </section>
  );
}
