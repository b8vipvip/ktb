import Link from "next/link";
import { TemplateCategory } from "@/types/domain";
import { templateService } from "@/services/template.service";
import { TemplateCard } from "@/modules/template/template-card";

const categories: Array<TemplateCategory | "全部"> = ["全部", "海报", "招聘", "门头", "宣传单"];

export default async function TemplatePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: TemplateCategory }>;
}) {
  const resolved = await searchParams;
  const category = resolved.category;
  const templates = templateService.list(category);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border bg-white p-4">
        <h2 className="text-lg font-semibold">模板中心</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {categories.map((item) => (
            <Link
              key={item}
              href={
                item === "全部" ? "/dashboard/templates" : `/dashboard/templates?category=${item}`
              }
              className="rounded border px-3 py-1 text-sm hover:bg-slate-50"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {templates.map((item) => (
          <TemplateCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
