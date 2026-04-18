import Link from "next/link";

export function TopNav() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="font-semibold text-brand-dark">
          快图帮
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/dashboard" className="text-slate-600 hover:text-brand">
            工作台
          </Link>
          <Link
            href="/login"
            className="rounded border px-3 py-1.5 text-slate-700 hover:bg-slate-100"
          >
            登录
          </Link>
        </div>
      </div>
    </header>
  );
}
