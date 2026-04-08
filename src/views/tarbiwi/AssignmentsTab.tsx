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
import type { TarbiwiAssignment } from "@/types";
import { formatDate, type Language } from "@/lib/i18n";
import { getAssignmentTypeColor } from "./useTarbiwi";

interface AssignmentsTabProps {
  assignments: Array<{
    id: string;
    title: string;
    description: string;
    type: string;
    dueDate: Date;
    targetAge: string;
    points: number;
    isActive: boolean;
    createdAt: Date;
  }>;
  assignmentTypeLabels: Record<string, string>;
  language: Language;
  onEdit: (assignment: TarbiwiAssignment) => void;
  onDelete: (assignment: TarbiwiAssignment) => void;
  tb: Record<string, unknown>;
}

export function AssignmentsTab({
  assignments,
  assignmentTypeLabels,
  language,
  onEdit,
  onDelete,
  tb,
}: AssignmentsTabProps) {
  const a = tb.assignments as Record<string, unknown>;
  const table = a.table as Record<string, string>;
  const status = a.status as Record<string, string>;
  const actions = a.actions as Record<string, string>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{a.cardTitle as string}</CardTitle>
        <CardDescription>{a.cardDescription as string}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{table.title}</TableHead>
              <TableHead>{table.type}</TableHead>
              <TableHead>{table.dueDate}</TableHead>
              <TableHead>{table.targetAge}</TableHead>
              <TableHead>{table.points}</TableHead>
              <TableHead>{table.status}</TableHead>
              <TableHead>{table.actions}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignments.map((assignment) => (
              <TableRow key={assignment.id}>
                <TableCell className="font-medium">{assignment.title}</TableCell>
                <TableCell>
                  <Badge className={getAssignmentTypeColor(assignment.type)}>
                    {assignmentTypeLabels[assignment.type] ?? assignment.type}
                  </Badge>
                </TableCell>
                <TableCell>
                  {formatDate(new Date(assignment.dueDate), language)}
                </TableCell>
                <TableCell>{assignment.targetAge}</TableCell>
                <TableCell>{assignment.points}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      assignment.isActive
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }
                  >
                    {assignment.isActive ? status.active : status.inactive}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      {actions.view}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(assignment as TarbiwiAssignment)}
                    >
                      {actions.edit}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => onDelete(assignment as TarbiwiAssignment)}
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
