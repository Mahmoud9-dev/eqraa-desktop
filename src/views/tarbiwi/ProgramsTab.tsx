import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { TarbiwiProgram } from "@/types";
import { getDayName } from "./useTarbiwi";

interface ProgramsTabProps {
  programs: Array<{
    id: string;
    title: string;
    description: string;
    dayOfWeek: number;
    time: string;
    duration: number;
    targetAge: string;
    isActive: boolean;
    createdAt: Date;
  }>;
  daysArray: string[];
  onEdit: (program: TarbiwiProgram) => void;
  onDelete: (program: TarbiwiProgram) => void;
  tb: Record<string, unknown>;
}

export function ProgramsTab({ programs, daysArray, onEdit, onDelete, tb }: ProgramsTabProps) {
  const p = tb.programs as Record<string, unknown>;
  const table = p.table as Record<string, string>;
  const status = p.status as Record<string, string>;
  const actions = p.actions as Record<string, string>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{p.cardTitle as string}</CardTitle>
        <CardDescription>{p.cardDescription as string}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{table.title}</TableHead>
              <TableHead>{table.day}</TableHead>
              <TableHead>{table.time}</TableHead>
              <TableHead>{table.duration}</TableHead>
              <TableHead>{table.targetAge}</TableHead>
              <TableHead>{table.status}</TableHead>
              <TableHead>{table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programs.map((program) => (
              <TableRow key={program.id}>
                <TableCell className="font-medium">{program.title}</TableCell>
                <TableCell>{getDayName(program.dayOfWeek, daysArray)}</TableCell>
                <TableCell>{program.time}</TableCell>
                <TableCell>{program.duration} {p.minuteUnit as string}</TableCell>
                <TableCell>{program.targetAge}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      program.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {program.isActive ? status.active : status.inactive}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(program as TarbiwiProgram)}
                    >
                      {actions.view}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(program as TarbiwiProgram)}
                    >
                      {actions.edit}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(program as TarbiwiProgram)}
                    >
                      {actions.delete}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
