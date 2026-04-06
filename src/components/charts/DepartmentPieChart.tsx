import { memo } from "react";
import { Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useLanguage } from "@/contexts/LanguageContext";
import type { DepartmentCountRow } from "@/lib/database/repositories/stats";

interface Props {
  data: DepartmentCountRow[];
}

const DEPT_COLORS: Record<string, string> = {
  quran: "#10b981",
  tajweed: "#ef4444",
  tarbawi: "#06b6d4",
};

const DepartmentPieChart = memo(({ data }: Props) => {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        {t.charts.noData}
      </div>
    );
  }

  const deptLabels: Record<string, string> = {
    quran: t.charts.departments.quran,
    tajweed: t.charts.departments.tajweed,
    tarbawi: t.charts.departments.tarbawi,
  };

  const chartConfig: ChartConfig = {
    quran: { label: deptLabels.quran, color: DEPT_COLORS.quran },
    tajweed: { label: deptLabels.tajweed, color: DEPT_COLORS.tajweed },
    tarbawi: { label: deptLabels.tarbawi, color: DEPT_COLORS.tarbawi },
  };

  const pieData = data.map((d) => ({
    name: d.department,
    value: d.count,
    fill: DEPT_COLORS[d.department] ?? "#8884d8",
  }));

  return (
    <div dir="ltr">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
          <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={90}
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
});

DepartmentPieChart.displayName = "DepartmentPieChart";

export default DepartmentPieChart;
