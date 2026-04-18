import Link from "next/link";
import { TemplateItem } from "@/services/mock-data";

export function TemplateCard({ item }: { item: TemplateItem }) {
  return (
    <article className="rounded-lg border bg-white p-4 shadow-sm">
      <p className="text-xs text-brand">{item.category}</p>
      <h3 className="mt-1 font-semibold">{item.name}</h3>
      <p className="mt-2 text-sm text-slate-600">{item.description}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs text-slate-700">
            {tag}
          </span>
        ))}
      </div>
      <Link
        href={`/dashboard/templates/${item.id}`}
        className="mt-4 inline-block text-sm text-brand hover:underline"
      >
        查看详情
      </Link>
    </article>
  );
}
