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
import type { ProgramFormData } from "./useTarbiwi";

interface ProgramFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: ProgramFormData;
  onFormChange: (data: ProgramFormData) => void;
  onSubmit: () => void;
  mode: "add" | "edit";
  tb: Record<string, unknown>;
}

export function ProgramFormDialog({
  open,
  onOpenChange,
  formData,
  onFormChange,
  onSubmit,
  mode,
  tb,
}: ProgramFormDialogProps) {
  // Access nested i18n properties safely
  const programs = tb.programs as Record<string, unknown>;
  const form = programs.form as Record<string, string>;
  const days = tb.days as Record<string, string>;
  const common = tb.common as Record<string, string>;

  const title = mode === "add"
    ? (programs.addDialogTitle as string)
    : (programs.editDialogTitle as string);
  const description = mode === "add"
    ? (programs.addDialogDescription as string)
    : (programs.editDialogDescription as string);
  const submitLabel = mode === "add"
    ? (programs.createButton as string)
    : (programs.saveButton as string);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-title`} className="text-end">
              {form.title}
            </Label>
            <Input
              id={`${mode}-program-title`}
              value={formData.title}
              onChange={(e) => onFormChange({ ...formData, title: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-description`} className="text-end">
              {form.description}
            </Label>
            <Textarea
              id={`${mode}-program-description`}
              value={formData.description}
              onChange={(e) => onFormChange({ ...formData, description: e.target.value })}
              className="col-span-3"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-day`} className="text-end">
              {form.day}
            </Label>
            <Select
              value={formData.dayOfWeek.toString()}
              onValueChange={(value) => onFormChange({ ...formData, dayOfWeek: parseInt(value) })}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={form.dayPlaceholder} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">{days.sunday}</SelectItem>
                <SelectItem value="1">{days.monday}</SelectItem>
                <SelectItem value="2">{days.tuesday}</SelectItem>
                <SelectItem value="3">{days.wednesday}</SelectItem>
                <SelectItem value="4">{days.thursday}</SelectItem>
                <SelectItem value="5">{days.friday}</SelectItem>
                <SelectItem value="6">{days.saturday}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-time`} className="text-end">
              {form.time}
            </Label>
            <Input
              id={`${mode}-program-time`}
              type="time"
              value={formData.time}
              onChange={(e) => onFormChange({ ...formData, time: e.target.value })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-duration`} className="text-end">
              {form.durationMinutes}
            </Label>
            <Input
              id={`${mode}-program-duration`}
              type="number"
              value={formData.duration}
              onChange={(e) => onFormChange({ ...formData, duration: parseInt(e.target.value) || 60 })}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor={`${mode}-program-targetAge`} className="text-end">
              {form.targetAge}
            </Label>
            <Input
              id={`${mode}-program-targetAge`}
              value={formData.targetAge}
              onChange={(e) => onFormChange({ ...formData, targetAge: e.target.value })}
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
