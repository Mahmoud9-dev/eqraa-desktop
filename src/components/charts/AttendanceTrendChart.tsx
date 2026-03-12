import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useLanguage } from "@/contexts/LanguageContext";
import type { AttendanceTrendRow } from "@/lib/database/repositories/stats";

interface Props {
  data: AttendanceTrendRow[];
}

export default function AttendanceTrendChart({ data }: Props) {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        {t.charts.noData}
      </div>
    );
  }

  const chartConfig: ChartConfig = {
    present: { label: t.charts.attendance.present, color: "#22c55e" },
    absent: { label: t.charts.attendance.absent, color: "#ef4444" },
    excused: { label: t.charts.attendance.excused, color: "#f59e0b" },
  };

  return (
    <div dir="ltr">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <AreaChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={(v) => v.slice(5)}
            fontSize={12}
          />
          <YAxis fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Area
            type="monotone"
            dataKey="present"
            stackId="1"
            fill="var(--color-present)"
            stroke="var(--color-present)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="absent"
            stackId="1"
            fill="var(--color-absent)"
            stroke="var(--color-absent)"
            fillOpacity={0.4}
          />
          <Area
            type="monotone"
            dataKey="excused"
            stackId="1"
            fill="var(--color-excused)"
            stroke="var(--color-excused)"
            fillOpacity={0.4}
          />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
