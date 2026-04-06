import { useState, useEffect } from "react";
import {
  getAttendanceTrend,
  getStudentsByDepartment,
  getPerformanceDistribution,
  getTeacherWorkload,
  type AttendanceTrendRow,
  type DepartmentCountRow,
  type PerformanceDistributionRow,
  type TeacherWorkloadRow,
} from "@/lib/database/repositories/stats";
import { logger } from "@/lib/logger";

export interface ChartStats {
  attendanceTrend: AttendanceTrendRow[];
  departmentDistribution: DepartmentCountRow[];
  performanceDistribution: PerformanceDistributionRow[];
  teacherWorkload: TeacherWorkloadRow[];
}

async function fetchChartStats(): Promise<ChartStats> {
  const [attendanceTrend, departmentDistribution, performanceDistribution, teacherWorkload] =
    await Promise.all([
      getAttendanceTrend(30),
      getStudentsByDepartment(),
      getPerformanceDistribution(),
      getTeacherWorkload(),
    ]);

  return { attendanceTrend, departmentDistribution, performanceDistribution, teacherWorkload };
}

export function useChartStats() {
  const [data, setData] = useState<ChartStats | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChartStats()
      .then(setData)
      .catch((err: unknown) => logger.error("Failed to fetch chart stats", err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
