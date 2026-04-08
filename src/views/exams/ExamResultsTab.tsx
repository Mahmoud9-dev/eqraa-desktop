import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Exam, ExamResult } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { getStatusColor } from "./useExams";

interface ExamResultsTabProps {
  filteredResults: ExamResult[];
  exams: Exam[];
  students: Record<string, string>;
  getResultStatusLabel: (status: string) => string;
  openEditResultDialog: (result: ExamResult) => void;
  openDeleteResultDialog: (result: ExamResult) => void;
}

const ExamResultsTab = ({
  filteredResults,
  exams,
  students,
  getResultStatusLabel,
  openEditResultDialog,
  openDeleteResultDialog,
}: ExamResultsTabProps) => {
  const { t } = useLanguage();
  const tt = t;

  const passRate =
    filteredResults.length > 0
      ? Math.round(
          (filteredResults.filter((r) => r.status === "\u0646\u0627\u062c\u062d").length /
            filteredResults.length) *
            100,
        )
      : 0;

  const averageScore =
    filteredResults.length > 0
      ? Math.round(
          filteredResults.reduce((acc, r) => acc + r.percentage, 0) /
            filteredResults.length,
        )
      : 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>{tt.exams.results.title}</CardTitle>
          <CardDescription>{tt.exams.results.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredResults.map((result) => {
              const exam = exams.find((e) => e.id === result.examId);
              return (
                <div key={result.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {students[result.studentId as keyof typeof students]}
                    </h4>
                    <Badge className={getStatusColor(result.status)}>
                      {getResultStatusLabel(result.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {exam?.title} &bull; {result.percentage}%
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      {tt.exams.results.scoreLabel} {result.marks}/
                      {exam?.totalMarks}
                    </div>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditResultDialog(result)}
                      >
                        {tt.exams.actions.edit}
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDeleteResultDialog(result)}
                      >
                        {tt.exams.actions.delete}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{tt.exams.stats.title}</CardTitle>
          <CardDescription>{tt.exams.stats.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">{tt.exams.stats.passRate}</h4>
              <div className="text-2xl font-bold text-green-600">
                {passRate}%
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                {tt.exams.stats.averageScore}
              </h4>
              <div className="text-2xl font-bold text-blue-600">
                {averageScore}%
              </div>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">
                {tt.exams.stats.totalExams}
              </h4>
              <div className="text-2xl font-bold text-purple-600">
                {exams.length}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export { ExamResultsTab };
