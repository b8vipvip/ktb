import Link from "next/link";
import { notFound } from "next/navigation";
import { templateService } from "@/services/template.service";

export default async function TemplateDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const detail = templateService.detail(id);

  if (!detail) {
    notFound();
  }

  const templateKey = detail.templateKey ?? "milk-tea";

  return (
    <section className="rounded-lg border bg-white p-4">
      <p className="text-xs text-brand">{detail.category}</p>
      <h2 className="mt-1 text-xl font-semibold">{detail.name}</h2>
      <p className="mt-3 text-sm text-slate-600">{detail.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {detail.tags.map((tag) => (
          <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <Link
          href={`/dashboard/poster/create?templateKey=${templateKey}`}
          className="rounded bg-brand px-3 py-2 text-sm text-white"
        >
          使用此模板
        </Link>
        <Link href="/dashboard/templates" className="rounded border px-3 py-2 text-sm">
          返回模板中心
        </Link>
      </div>
    </section>
  );
}
