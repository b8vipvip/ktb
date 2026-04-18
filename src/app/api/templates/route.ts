import { NextResponse } from "next/server";
import { templateService } from "@/services/template.service";
import { TemplateCategory } from "@/types/domain";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") as TemplateCategory | null;
  return NextResponse.json({ data: templateService.list(category ?? undefined) });
}
