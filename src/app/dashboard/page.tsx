import Link from "next/link";
import { dashboardService } from "@/services/dashboard.service";

const quickActions = [
  { href: "/dashboard/poster/create", label: "生成海报" },
  { href: "/dashboard/create?scene=招聘图", label: "生成招聘图" },
  { href: "/dashboard/create?scene=门头图", label: "生成门头图" },
  { href: "/dashboard/templates", label: "模板中心" },
  { href: "/dashboard/projects", label: "我的项目" },
  { href: "/dashboard/batch", label: "批量出图" },
];

export default function DashboardHomePage() {
  const overview = dashboardService.getOverview();

  return (
    <section className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <article className="rounded-lg border bg-white p-4">
          <p className="text-sm text-slate-500">当前套餐</p>
          <p className="mt-2 text-2xl font-semibold">{overview.planName}</p>
          <p className="mt-1 text-xs text-slate-500">到期时间：{overview.expireAt}</p>
        </article>
        <article className="rounded-lg border bg-white p-4">
          <p className="text-sm text-slate-500">剩余额度</p>
          <p className="mt-2 text-2xl font-semibold">
            {overview.remainQuota}/{overview.totalQuota}
          </p>
          <p className="mt-1 text-xs text-slate-500">可用于 AI 出图次数</p>
        </article>
        <article className="rounded-lg border bg-white p-4">
          <p className="text-sm text-slate-500">处理中任务</p>
          <p className="mt-2 text-2xl font-semibold">{overview.processingTasks}</p>
          <p className="mt-1 text-xs text-slate-500">今日新增：{overview.todayGenerated}</p>
        </article>
      </div>

      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-base font-semibold">快捷入口</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded border px-4 py-3 text-sm hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
