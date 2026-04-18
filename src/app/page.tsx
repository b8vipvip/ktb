import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border bg-white p-8">
        <h1 className="text-3xl font-bold text-slate-900">快图帮 SaaS（阶段 1）</h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-600">
          面向广告店、图文店、喷绘店、门头店的中文化 AI
          设计工作台。当前已打通账号、工作台、模板中心、项目列表的基础闭环。
        </p>
        <div className="mt-5 flex gap-3">
          <Link href="/login" className="rounded bg-brand px-4 py-2 text-sm text-white">
            登录工作台
          </Link>
          <Link href="/register" className="rounded border px-4 py-2 text-sm">
            注册账号
          </Link>
        </div>
      </div>
    </section>
  );
}
