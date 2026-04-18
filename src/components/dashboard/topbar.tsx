"use client";

import { signOut } from "next-auth/react";

export function DashboardTopbar({ userName }: { userName?: string | null }) {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      <div>
        <h1 className="text-base font-semibold text-slate-900">快图帮工作台</h1>
        <p className="text-xs text-slate-500">欢迎回来，{userName || "设计员"}</p>
      </div>
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-700 hover:bg-slate-100"
      >
        退出登录
      </button>
    </header>
  );
}
