import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import type { AssignmentFormData } from "./useTarbiwi";

interface AssignmentFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: AssignmentFormData;
  onFormChange: (data: AssignmentFormData) => void;
  onSubmit: () => void;
  mode: "add" | "edit";
  tb: Record<string, unknown>;
}

export function AssignmentFormDialog({
  open,
  onOpenChange,
  formData,
  onFormChange,
  onSubmit,
  mode,
  tb,
}: AssignmentFormDialogProps) {
  const assignments = tb.assignments as Record<string, unknown>;
  const form = assignments.form as Record<string, string>;
  const typeLabels = assignments.typeLabels as Record<string, string>;
  const common = tb.common as Record<string, string>;

  const title = mode === "add"
    ? (assignments.addDialogTitle as string)
    : (assignments.editDialogTitle as string);
  const description = mode === "add"
    ? (assignments.addDialogDescription as string)
    : (assignments.editDialogDescription as string);
  const submitLabel = mode === "add"
    ? (assignments.addSubmitButton as string)
    : (assignments.saveButton as string);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-title`} className="text-right">
              {form.title}
            </Label>
            <Input
              id={`${mode}-assignment-title`}
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-type`} className="text-right">
              {form.type}
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => onFormChange({ ...formData, type: value })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={form.typePlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"\u0639\u0628\u0627\u062F\u064A\u0629"}>{typeLabels.worship}</SelectItem>
                <SelectItem value={"\u0633\u0644\u0648\u0643\u064A\u0629"}>{typeLabels.behavioral}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-description`} className="text-right">
              {form.description}
            </Label>
            <Textarea
              id={`${mode}-assignment-description`}
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-dueDate`} className="text-right">
              {form.dueDate}
            </Label>
            <Input
              id={`${mode}-assignment-dueDate`}
              type="date"
              value={formData.dueDate?.toISOString().split("T")[0]}
              onChange={(e) => onFormChange({ ...formData, dueDate: new Date(e.target.value) })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-targetAge`} className="text-right">
              {form.targetAge}
            </Label>
            <Input
              id={`${mode}-assignment-targetAge`}
              value={formData.targetAge}
              onChange={(e) => onFormChange({ ...formData, targetAge: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-assignment-points`} className="text-right">
              {form.points}
            </Label>
            <Input
              id={`${mode}-assignment-points`}
              type="number"
              value={formData.points}
              onChange={(e) => onFormChange({ ...formData, points: parseInt(e.target.value) || 10 })}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {common.cancel}
          </Button>
          <Button onClick={onSubmit}>{submitLabel}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
