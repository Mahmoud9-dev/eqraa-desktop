import { useState, useEffect } from "react";
import { getStudentCount, getAttendanceAverage } from "@/lib/database/repositories/students";
import { getTeacherCount } from "@/lib/database/repositories/teachers";
import { getUpcomingMeetingCount } from "@/lib/database/repositories/meetings";
import { logger } from "@/lib/logger";

interface HomeStats {
  totalStudents: number;
  attendancePercentage: number;
  activeCircles: number;
  upcomingExams: number;
}

async function fetchHomeStats(): Promise<HomeStats> {
  const [totalStudents, attendancePercentage, activeCircles, upcomingExams] =
    await Promise.all([
      getStudentCount(),
      getAttendanceAverage(),
      getTeacherCount(),
      getUpcomingMeetingCount(),
    ]);

  return {
    totalStudents,
    attendancePercentage,
    activeCircles,
    upcomingExams,
  };
}

export function useHomeStats() {
  const [data, setData] = useState<HomeStats | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchHomeStats()
      .then(setData)
      .catch((err: unknown) => logger.error("Failed to fetch home stats", err))
      .finally(() => setIsLoading(false));
  }, []);

  return { data, isLoading };
}
