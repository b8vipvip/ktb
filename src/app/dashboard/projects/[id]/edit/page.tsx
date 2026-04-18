export default async function ProjectEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <section className="rounded-lg border bg-white p-4">
      <h2 className="text-lg font-semibold">项目编辑页</h2>
      <p className="mt-2 text-sm text-slate-600">当前项目 ID：{id}</p>
      <p className="mt-2 text-sm text-slate-600">
        阶段 1 提供基础入口，阶段 2 将补充轻量画布编辑能力。
      </p>
    </section>
  );
}
