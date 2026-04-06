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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate, type Language } from "@/lib/i18n";
import {
  getRatingColor,
  STUDENTS_MAP,
  TEACHERS_MAP,
  type Assessment,
  type AssessmentFormData,
} from "./useTarbiwi";

interface AssessmentsTabProps {
  assessments: Assessment[];
  newAssessment: AssessmentFormData;
  onAssessmentChange: (data: AssessmentFormData) => void;
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  onAddAssessment: () => void;
  language: Language;
  tb: Record<string, unknown>;
}

export function AssessmentsTab({
  assessments,
  newAssessment,
  onAssessmentChange,
  isAddDialogOpen,
  setIsAddDialogOpen,
  onAddAssessment,
  language,
  tb,
}: AssessmentsTabProps) {
  const a = tb.assessments as Record<string, unknown>;
  const form = a.form as Record<string, string>;
  const table = a.table as Record<string, string>;
  const actions = a.actions as Record<string, string>;
  const common = tb.common as Record<string, string>;

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">{a.sectionTitle as string}</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>{a.addButton as string}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{a.addDialogTitle as string}</DialogTitle>
              <DialogDescription>{a.addDialogDescription as string}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assessment-student" className="text-right">
                  {form.student}
                </Label>
                <Select
                  value={newAssessment.studentId}
                  onValueChange={(value) =>
                    onAssessmentChange({ ...newAssessment, studentId: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={form.studentPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(STUDENTS_MAP).map(([id, name]) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assessment-criteria" className="text-right">
                  {form.criteria}
                </Label>
                <Input
                  id="assessment-criteria"
                  value={newAssessment.criteria}
                  onChange={(e) =>
                    onAssessmentChange({ ...newAssessment, criteria: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assessment-rating" className="text-right">
                  {form.ratingOutOf10}
                </Label>
                <Input
                  id="assessment-rating"
                  type="number"
                  min="1"
                  max="10"
                  value={newAssessment.rating}
                  onChange={(e) =>
                    onAssessmentChange({
                      ...newAssessment,
                      rating: parseInt(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assessment-notes" className="text-right">
                  {form.notes}
                </Label>
                <Textarea
                  id="assessment-notes"
                  value={newAssessment.notes}
                  onChange={(e) =>
                    onAssessmentChange({ ...newAssessment, notes: e.target.value })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                {common.cancel}
              </Button>
              <Button onClick={onAddAssessment}>{a.addSubmitButton as string}</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{a.cardTitle as string}</CardTitle>
          <CardDescription>{a.cardDescription as string}</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{table.student}</TableHead>
                <TableHead>{table.criteria}</TableHead>
                <TableHead>{table.rating}</TableHead>
                <TableHead>{table.date}</TableHead>
                <TableHead>{table.evaluator}</TableHead>
                <TableHead>{table.notes}</TableHead>
                <TableHead>{table.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow key={assessment.id}>
                  <TableCell>
                    {STUDENTS_MAP[assessment.studentId as keyof typeof STUDENTS_MAP]}
                  </TableCell>
                  <TableCell>{assessment.criteria}</TableCell>
                  <TableCell>
                    <Badge className={getRatingColor(assessment.rating)}>
                      {assessment.rating}/10
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {formatDate(new Date(assessment.date), language)}
                  </TableCell>
                  <TableCell>
                    {TEACHERS_MAP[assessment.evaluatedBy as keyof typeof TEACHERS_MAP]}
                  </TableCell>
                  <TableCell>{assessment.notes}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 space-x-reverse">
                      <Button variant="outline" size="sm">
                        {actions.edit}
                      </Button>
                      <Button variant="destructive" size="sm">
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
    </>
  );
}
