import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useLanguage } from "@/contexts/LanguageContext";
import type { PerformanceDistributionRow } from "@/lib/database/repositories/stats";

interface Props {
  data: PerformanceDistributionRow[];
}

export default function PerformanceBarChart({ data }: Props) {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        {t.charts.noData}
      </div>
    );
  }

  const chartConfig: ChartConfig = {
    count: { label: t.charts.performance.sessions, color: "#14b8a6" },
  };

  return (
    <div dir="ltr">
      <ChartContainer config={chartConfig} className="h-[250px] w-full">
        <BarChart data={data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="rating" fontSize={12} />
          <YAxis fontSize={12} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
