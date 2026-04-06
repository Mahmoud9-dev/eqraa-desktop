import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { type Student } from "./types";

interface StudentDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  onConfirm: () => void;
}

export function StudentDeleteDialog({
  open,
  onOpenChange,
  selectedStudent,
  onConfirm,
}: StudentDeleteDialogProps) {
  const { t } = useLanguage();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.students.confirmDelete}</DialogTitle>
          <DialogDescription>
            {t.students.deleteConfirmMessage.replace(
              "{{name}}",
              selectedStudent?.name ?? ""
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.students.actions.cancel}
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            {t.students.actions.delete}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
