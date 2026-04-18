import { NextResponse } from "next/server";
import { dashboardService } from "@/services/dashboard.service";

export async function GET() {
  return NextResponse.json({ data: dashboardService.getOverview() });
}
