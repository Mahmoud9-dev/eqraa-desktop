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
import { ExamResult } from "@/types";

interface ResultFormDialogProps {
  isResultDialogOpen: boolean;
  setIsResultDialogOpen: (open: boolean) => void;
  isEditResultDialogOpen: boolean;
  setIsEditResultDialogOpen: (open: boolean) => void;
  isDeleteResultDialogOpen: boolean;
  setIsDeleteResultDialogOpen: (open: boolean) => void;
  newResult: Partial<ExamResult>;
  setNewResult: (result: Partial<ExamResult>) => void;
  students: Record<string, string>;
  handleAddResult: () => void;
  handleEditResult: () => void;
  handleDeleteResult: () => void;
  t: Record<string, unknown>;
}

const ResultFormDialog = ({
  isResultDialogOpen,
  setIsResultDialogOpen,
  isEditResultDialogOpen,
  setIsEditResultDialogOpen,
  isDeleteResultDialogOpen,
  setIsDeleteResultDialogOpen,
  newResult,
  setNewResult,
  students,
  handleAddResult,
  handleEditResult,
  handleDeleteResult,
  t,
}: ResultFormDialogProps) => {
  const tt = t as {
    common: { cancel: string; delete: string };
    exams: {
      resultDialog: { title: string; description: string };
      editResultDialog: { title: string; description: string };
      deleteResultDialog: { title: string; description: string };
      table: { student: string };
      form: {
        selectStudent: string;
        marksLabel: string;
        notesLabel: string;
      };
      actions: { addResult: string; saveChanges: string };
    };
  };

  return (
    <>
      {/* Add Result Dialog */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tt.exams.resultDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.resultDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="student" className="text-right">
                {tt.exams.table.student}
              </Label>
              <Select
                value={newResult.studentId}
                onValueChange={(value) =>
                  setNewResult({ ...newResult, studentId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={tt.exams.form.selectStudent} />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(students).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="marks" className="text-right">
                {tt.exams.form.marksLabel}
              </Label>
              <Input
                id="marks"
                type="number"
                value={newResult.marks}
                onChange={(e) =>
                  setNewResult({
                    ...newResult,
                    marks: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="notes" className="text-right">
                {tt.exams.form.notesLabel}
              </Label>
              <Textarea
                id="notes"
                value={newResult.notes}
                onChange={(e) =>
                  setNewResult({ ...newResult, notes: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsResultDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button onClick={handleAddResult}>
              {tt.exams.actions.addResult}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Result Dialog */}
      <Dialog
        open={isEditResultDialogOpen}
        onOpenChange={setIsEditResultDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tt.exams.editResultDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.editResultDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-marks" className="text-right">
                {tt.exams.form.marksLabel}
              </Label>
              <Input
                id="edit-marks"
                type="number"
                value={newResult.marks}
                onChange={(e) =>
                  setNewResult({
                    ...newResult,
                    marks: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-right">
                {tt.exams.form.notesLabel}
              </Label>
              <Textarea
                id="edit-notes"
                value={newResult.notes}
                onChange={(e) =>
                  setNewResult({ ...newResult, notes: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditResultDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button onClick={handleEditResult}>
              {tt.exams.actions.saveChanges}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Result Dialog */}
      <Dialog
        open={isDeleteResultDialogOpen}
        onOpenChange={setIsDeleteResultDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tt.exams.deleteResultDialog.title}</DialogTitle>
            <DialogDescription>
              {tt.exams.deleteResultDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteResultDialogOpen(false)}
            >
              {tt.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteResult}>
              {tt.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export { ResultFormDialog };
