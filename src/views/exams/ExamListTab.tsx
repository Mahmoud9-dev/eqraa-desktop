import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Exam, ExamType } from "@/types";
import { formatDate } from "@/lib/i18n";
import type { Language } from "@/lib/i18n/types";
import { examStatusFilters, getExamStatusColor } from "./useExams";

interface ExamListTabProps {
  filteredExams: Exam[];
  activeTab: ExamType;
  typeLabel: string;
  getExamStatusText: (exam: Exam) => string;
  openResultDialog: (examId: string) => void;
  openEditDialog: (exam: Exam) => void;
  openDeleteDialog: (exam: Exam) => void;
  t: Record<string, unknown>;
  language: Language;
}

const ExamListTab = ({
  filteredExams,
  typeLabel,
  getExamStatusText,
  openResultDialog,
  openEditDialog,
  openDeleteDialog,
  t,
  language,
}: ExamListTabProps) => {
  const tt = t as {
    exams: {
      cards: {
        examsStatus: string;
        examCount: string;
        minute: string;
        mark: string;
        allExamsOfType: string;
        allExamsTable: string;
      };
      status: Record<string, string>;
      actions: {
        result: string;
        edit: string;
        delete: string;
        addResult: string;
      };
      table: {
        examTitle: string;
        date: string;
        duration: string;
        totalMarks: string;
        status: string;
        actions: string;
      };
    };
  };

  return (
    <div className="space-y-6">
      {/* Exams grouped by status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {examStatusFilters.map(({ key, filter }) => {
          const statusExams = filteredExams.filter((exam) =>
            filter(new Date(exam.date), new Date()),
          );

          if (statusExams.length === 0) return null;

          return (
            <Card key={key} className="border-r-4 border-r-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>
                    {tt.exams.cards.examsStatus.replace(
                      "{{status}}",
                      tt.exams.status[key],
                    )}
                  </span>
                  <Badge variant="outline">
                    {tt.exams.cards.examCount.replace(
                      "{{count}}",
                      String(statusExams.length),
                    )}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {statusExams.map((exam) => (
                  <div
                    key={exam.id}
                    className="p-3 border rounded-lg bg-muted/30"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-sm">{exam.title}</h5>
                      <Badge className={getExamStatusColor(exam)}>
                        {getExamStatusText(exam)}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground mb-2">
                      {exam.description}
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                      <span>{formatDate(exam.date, language)}</span>
                      <span>
                        {exam.duration} {tt.exams.cards.minute}
                      </span>
                      <span>
                        {exam.totalMarks} {tt.exams.cards.mark}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openResultDialog(exam.id)}
                        className="text-xs"
                      >
                        {tt.exams.actions.result}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(exam)}
                        className="text-xs"
                      >
                        {tt.exams.actions.edit}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(exam)}
                        className="text-xs"
                      >
                        {tt.exams.actions.delete}
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* All exams table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {tt.exams.cards.allExamsOfType.replace("{{type}}", typeLabel)}
          </CardTitle>
          <CardDescription>{tt.exams.cards.allExamsTable}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{tt.exams.table.examTitle}</TableHead>
                <TableHead>{tt.exams.table.date}</TableHead>
                <TableHead>{tt.exams.table.duration}</TableHead>
                <TableHead>{tt.exams.table.totalMarks}</TableHead>
                <TableHead>{tt.exams.table.status}</TableHead>
                <TableHead>{tt.exams.table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExams.map((exam) => (
                <TableRow key={exam.id}>
                  <TableCell className="font-medium">{exam.title}</TableCell>
                  <TableCell>{formatDate(exam.date, language)}</TableCell>
                  <TableCell>
                    {exam.duration} {tt.exams.cards.minute}
                  </TableCell>
                  <TableCell>{exam.totalMarks}</TableCell>
                  <TableCell>
                    <Badge className={getExamStatusColor(exam)}>
                      {getExamStatusText(exam)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openResultDialog(exam.id)}
                      >
                        {tt.exams.actions.addResult}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(exam)}
                      >
                        {tt.exams.actions.edit}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteDialog(exam)}
                      >
                        {tt.exams.actions.delete}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export { ExamListTab };
