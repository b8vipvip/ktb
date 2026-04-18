import { mockPlanInfo } from "@/services/mock-data";

export class DashboardService {
  getOverview() {
    return {
      ...mockPlanInfo,
      todayGenerated: 14,
      totalProjects: 32,
      processingTasks: 3,
    };
  }
}

export const dashboardService = new DashboardService();
