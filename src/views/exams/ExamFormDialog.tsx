import { Button } from "@/components/ui/button";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Exam, ExamType } from "@/types";

interface ExamFormDialogProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  isDeleteDialogOpen: boolean;
  setIsDeleteDialogOpen: (open: boolean) => void;
  selectedExam: Exam | null;
  newExam: Partial<Exam>;
  setNewExam: (exam: Partial<Exam>) => void;
  handleAddExam: () => void;
  handleEditExam: () => void;
  handleDeleteExam: () => void;
  t: Record<string, unknown>;
}

const ExamFormDialog = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
  isEditDialogOpen,
  setIsEditDialogOpen,
  isDeleteDialogOpen,
  setIsDeleteDialogOpen,
  selectedExam,
  newExam,
  setNewExam,
  handleAddExam,
  handleEditExam,
  handleDeleteExam,
  t,
}: ExamFormDialogProps) => {
  const tt = t as {
    common: { cancel: string; delete: string };
    exams: {
      addDialog: { title: string; description: string };
      editDialog: { title: string; description: string };
      deleteDialog: { title: string; description: string };
      form: {
        typeLabel: string;
        selectType: string;
        titleLabel: string;
        descriptionLabel: string;
        dateLabel: string;
        durationLabel: string;
        totalMarksLabel: string;
        passingMarksLabel: string;
      };
      examTypes: { quran: string; tajweed: string; educational: string };
      actions: { createExam: string; saveChanges: string };
    };
  };

  const examFormFields = (idPrefix: string) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-type`} className="text-end">
          {tt.exams.form.typeLabel}
        </Label>
        <Select
          value={newExam.type}
          onValueChange={(value) =>
            setNewExam({ ...newExam, type: value as ExamType })
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={tt.exams.form.selectType} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="\u0642\u0631\u0622\u0646">{tt.exams.examTypes.quran}</SelectItem>
            <SelectItem value="\u062a\u062c\u0648\u064a\u062f">{tt.exams.examTypes.tajweed}</SelectItem>
            <SelectItem value="\u062a\u0631\u0628\u0648\u064a">{tt.exams.examTypes.educational}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-title`} className="text-end">
          {tt.exams.form.titleLabel}
        </Label>
        <Input
          id={`${idPrefix}-title`}
          value={newExam.title}
          onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-description`} className="text-end">
          {tt.exams.form.descriptionLabel}
        </Label>
        <Textarea
          id={`${idPrefix}-description`}
          value={newExam.description}
          onChange={(e) =>
            setNewExam({ ...newExam, description: e.target.value })
          }
          className="col-span-3"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-date`} className="text-end">
          {tt.exams.form.dateLabel}
        </Label>
        <Input
          id={`${idPrefix}-date`}
          type="date"
          value={newExam.date?.toISOString().split("T")[0]}
          onChange={(e) =>
            setNewExam({ ...newExam, date: new Date(e.target.value) })
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-duration`} className="text-end">
          {tt.exams.form.durationLabel}
        </Label>
        <Input
          id={`${idPrefix}-duration`}
          type="number"
          value={newExam.duration}
          onChange={(e) =>
            setNewExam({
              ...newExam,
              duration: parseInt(e.target.value) || 60,
            })
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-totalMarks`} className="text-end">
          {tt.exams.form.totalMarksLabel}
        </Label>
        <Input
          id={`${idPrefix}-totalMarks`}
          type="number"
          value={newExam.totalMarks}
          onChange={(e) =>
            setNewExam({
              ...newExam,
              totalMarks: parseInt(e.target.value) || 100,
            })
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-passingMarks`} className="text-end">
          {tt.exams.form.passingMarksLabel}
        </Label>
        <Input
          id={`${idPrefix}-passingMarks`}
          type="number"
          value={newExam.passingMarks}
          onChange={(e) =>
            setNewExam({
              ...newExam,
              passingMarks: parseInt(e.target.value) || 60,
            })
          }
          className="col-span-3"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Add Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tt.exams.addDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.addDialog.description}
            </DialogDescription>
          </DialogHeader>
          {examFormFields("add")}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button onClick={handleAddExam}>
              {tt.exams.actions.createExam}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tt.exams.editDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.editDialog.description}
            </DialogDescription>
          </DialogHeader>
          {examFormFields("edit")}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button onClick={handleEditExam}>
              {tt.exams.actions.saveChanges}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tt.exams.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.deleteDialog.description.replace(
                "{{title}}",
                selectedExam?.title || "",
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteExam}>
              {tt.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ExamFormDialog };
