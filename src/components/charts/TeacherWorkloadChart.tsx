import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TeacherWorkloadRow } from "@/lib/database/repositories/stats";

interface Props {
  data: TeacherWorkloadRow[];
}

const TITLE_PREFIXES = ["الشيخ", "الأستاذة", "الأستاذ", "أستاذة", "أستاذ", "شيخة", "شيخ", "المعلمة", "المعلم", "معلمة", "معلم"];

function stripTitles(name: string): string {
  for (const prefix of TITLE_PREFIXES) {
    if (name.startsWith(prefix + " ")) return name.slice(prefix.length + 1);
  }
  return name;
}

const CustomYTick = ({ x, y, payload }: { x?: number; y?: number; payload?: { value: string } }) => {
  const name = stripTitles(payload?.value ?? "");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={-4} y={4} textAnchor="end" fontSize={12} fill="currentColor">
        {name}
      </text>
    </g>
  );
};

export default function TeacherWorkloadChart({ data }: Props) {
  const { t } = useLanguage();

  if (data.length === 0) {
    return (
      <div className="flex h-[250px] items-center justify-center text-muted-foreground">
        {t.charts.noData}
      </div>
    );
  }

  const chartConfig: ChartConfig = {
    studentCount: { label: t.charts.workload.students, color: "#f59e0b" },
  };

  const chartHeight = Math.max(250, data.length * 36);

  return (
    <div dir="ltr">
      <ChartContainer config={chartConfig} className="w-full" style={{ height: chartHeight }}>
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
          <XAxis type="number" fontSize={12} />
          <YAxis
            dataKey="teacherName"
            type="category"
            width={140}
            interval={0}
            tickLine={false}
            tick={<CustomYTick />}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="studentCount" fill="var(--color-studentCount)" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
