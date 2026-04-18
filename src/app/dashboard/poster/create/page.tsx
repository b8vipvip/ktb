"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

const templateOptions = [
  { key: "milk-tea", label: "奶茶活动海报" },
  { key: "restaurant-sale", label: "餐馆促销海报" },
  { key: "recruitment", label: "招聘海报" },
] as const;

export default function PosterCreatePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    industry: "餐饮",
    title: "开业大促 全场 8 折",
    subtitle: "限时三天，进店有礼",
    shopName: "幸福奶茶铺",
    phone: "138-0000-0000",
    address: "朝阳路 88 号",
    activity: "第二杯半价",
    style: "清新简约" as const,
    primaryColor: "#0f766e",
    outputCount: 3,
    templateKey:
      (searchParams.get("templateKey") as "milk-tea" | "restaurant-sale" | "recruitment") ||
      "milk-tea",
  });

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const response = await fetch("/api/poster/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, providerKey: "mock-poster" }),
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error || "创建任务失败");
      setLoading(false);
      return;
    }

    router.push(`/dashboard/poster/tasks/${json.data.taskId}`);
  };

  return (
    <section className="rounded-lg border bg-white p-5">
      <h2 className="text-lg font-semibold">生成海报</h2>
      <p className="mt-1 text-sm text-slate-600">
        填写信息后创建生成任务，系统将返回多个候选方案。
      </p>

      <form onSubmit={submit} className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="text-sm">
          行业
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.industry}
            onChange={(e) => setForm((v) => ({ ...v, industry: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          标题
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.title}
            onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          副标题
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.subtitle}
            onChange={(e) => setForm((v) => ({ ...v, subtitle: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          店名
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.shopName}
            onChange={(e) => setForm((v) => ({ ...v, shopName: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          电话
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.phone}
            onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          地址
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.address}
            onChange={(e) => setForm((v) => ({ ...v, address: e.target.value }))}
          />
        </label>
        <label className="text-sm md:col-span-2">
          活动内容
          <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.activity}
            onChange={(e) => setForm((v) => ({ ...v, activity: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          风格
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.style}
            onChange={(e) => setForm((v) => ({ ...v, style: e.target.value as typeof form.style }))}
          >
            <option value="清新简约">清新简约</option>
            <option value="高饱和促销">高饱和促销</option>
            <option value="商务招聘">商务招聘</option>
          </select>
        </label>
        <label className="text-sm">
          主色调
          <input
            type="color"
            className="mt-1 h-10 w-full rounded border px-1 py-1"
            value={form.primaryColor}
            onChange={(e) => setForm((v) => ({ ...v, primaryColor: e.target.value }))}
          />
        </label>
        <label className="text-sm">
          输出数量
          <input
            type="number"
            min={1}
            max={6}
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.outputCount}
            onChange={(e) => setForm((v) => ({ ...v, outputCount: Number(e.target.value) || 1 }))}
          />
        </label>
        <label className="text-sm">
          模板
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={form.templateKey}
            onChange={(e) =>
              setForm((v) => ({ ...v, templateKey: e.target.value as typeof form.templateKey }))
            }
          >
            {templateOptions.map((item) => (
              <option key={item.key} value={item.key}>
                {item.label}
              </option>
            ))}
          </select>
        </label>

        {error ? <p className="md:col-span-2 text-sm text-red-600">{error}</p> : null}

        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="rounded bg-brand px-4 py-2 text-sm text-white disabled:bg-slate-400"
          >
            {loading ? "正在创建任务..." : "提交并生成"}
          </button>
        </div>
      </form>
    </section>
  );
}
