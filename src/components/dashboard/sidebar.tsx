"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { dashboardMenu } from "@/hooks/use-dashboard-menu";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 border-r bg-white p-4">
      <p className="mb-4 text-sm font-semibold text-slate-500">功能菜单</p>
      <nav className="space-y-1">
        {dashboardMenu.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block rounded px-3 py-2 text-sm ${
                active ? "bg-teal-50 text-brand-dark" : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
