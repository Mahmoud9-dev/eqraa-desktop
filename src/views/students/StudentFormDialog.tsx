import { Button } from "@/components/ui/button";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLanguage } from "@/contexts/LanguageContext";
import { Department } from "@/types";
import { type Teacher } from "@/lib/database/repositories/teachers";
import { type StudentFormData } from "./types";

interface StudentFormDialogProps {
  mode: "add" | "edit";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: StudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>;
  teachersList: Teacher[];
  onSubmit: () => void;
}

export function StudentFormDialog({
  mode,
  open,
  onOpenChange,
  formData,
  setFormData,
  teachersList,
  onSubmit,
}: StudentFormDialogProps) {
  const { t } = useLanguage();

  const isAdd = mode === "add";
  const title = isAdd ? t.students.dialog.addTitle : t.students.dialog.editTitle;
  const description = isAdd
    ? t.students.dialog.addDescription
    : t.students.dialog.editDescription;
  const submitLabel = isAdd
    ? t.students.actions.addStudent
    : t.students.actions.saveChanges;

  const content = (
    <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="text-lg sm:text-base">{title}</DialogTitle>
        <DialogDescription className="text-sm sm:text-xs">
          {description}
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
        {/* Name */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-name`} className="text-right sm:text-sm">
            {t.students.form.name}
          </Label>
          <Input
            id={`${mode}-name`}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="col-span-1 sm:col-span-3 text-base sm:text-sm"
          />
        </div>
        {/* Age */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-age`} className="text-right sm:text-sm">
            {t.students.form.age}
          </Label>
          <Input
            id={`${mode}-age`}
            type="number"
            value={formData.age}
            onChange={(e) =>
              setFormData({ ...formData, age: parseInt(e.target.value) || 0 })
            }
            className="col-span-1 sm:col-span-3 text-base sm:text-sm"
          />
        </div>
        {/* Grade */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-grade`} className="text-right sm:text-sm">
            {t.students.form.grade}
          </Label>
          <Input
            id={`${mode}-grade`}
            value={formData.grade}
            onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
            className="col-span-1 sm:col-span-3 text-base sm:text-sm"
          />
        </div>
        {/* Department */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-department`} className="text-right sm:text-sm">
            {t.students.form.department}
          </Label>
          <Select
            value={formData.department}
            onValueChange={(value) =>
              setFormData({ ...formData, department: value as Department })
            }
          >
            <SelectTrigger className="col-span-1 sm:col-span-3 text-base sm:text-sm">
              <SelectValue placeholder={t.students.form.selectDepartment} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quran">{t.students.departments.quran}</SelectItem>
              <SelectItem value="tajweed">{t.students.departments.tajweed}</SelectItem>
              <SelectItem value="tarbawi">{t.students.departments.tarbawi}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Teacher */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-teacherId`} className="text-right sm:text-sm">
            {t.students.form.teacher}
          </Label>
          <Select
            value={formData.teacherId || undefined}
            onValueChange={(value) => setFormData({ ...formData, teacherId: value })}
          >
            <SelectTrigger className="col-span-1 sm:col-span-3 text-base sm:text-sm">
              <SelectValue placeholder={t.students.form.selectTeacher} />
            </SelectTrigger>
            <SelectContent>
              {teachersList.map((teacher) => (
                <SelectItem key={teacher.id} value={teacher.id}>
                  {teacher.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Parent Name */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-parentName`} className="text-right sm:text-sm">
            {t.students.form.parentName}
          </Label>
          <Input
            id={`${mode}-parentName`}
            value={formData.parentName}
            onChange={(e) =>
              setFormData({ ...formData, parentName: e.target.value })
            }
            className="col-span-1 sm:col-span-3 text-base sm:text-sm"
          />
        </div>
        {/* Parent Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
          <Label htmlFor={`${mode}-parentPhone`} className="text-right sm:text-sm">
            {t.students.form.parentPhone}
          </Label>
          <Input
            id={`${mode}-parentPhone`}
            value={formData.parentPhone}
            onChange={(e) =>
              setFormData({ ...formData, parentPhone: e.target.value })
            }
            className="col-span-1 sm:col-span-3 text-base sm:text-sm"
          />
        </div>

        {/* Edit-only fields */}
        {!isAdd && (
          <>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                {t.students.form.partsMemorized}
              </Label>
              <Input
                type="number"
                value={formData.partsMemorized}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    partsMemorized: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                {t.students.form.currentProgress}
              </Label>
              <Input
                value={formData.currentProgress}
                onChange={(e) =>
                  setFormData({ ...formData, currentProgress: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                {t.students.form.previousProgress}
              </Label>
              <Input
                value={formData.previousProgress}
                onChange={(e) =>
                  setFormData({ ...formData, previousProgress: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-medium">
                {t.students.form.attendanceRate}
              </Label>
              <Input
                type="number"
                value={formData.attendance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    attendance: parseInt(e.target.value) || 0,
                  })
                }
                className="col-span-3"
              />
            </div>
          </>
        )}

        {/* Image fields */}
        <ImageFields formData={formData} setFormData={setFormData} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={() => onOpenChange(false)} className="text-sm">
          {t.students.actions.cancel}
        </Button>
        <Button onClick={onSubmit} className="text-sm">
          {submitLabel}
        </Button>
      </DialogFooter>
    </DialogContent>
  );

  if (isAdd) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button className="bg-primary text-primary-foreground w-full sm:w-auto text-sm">
            {t.students.actions.addNewStudent}
          </Button>
        </DialogTrigger>
        {content}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {content}
    </Dialog>
  );
}

// --- Image fields sub-component (kept private to this file) ---

function ImageFields({
  formData,
  setFormData,
}: {
  formData: StudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<StudentFormData>>;
}) {
  const { t } = useLanguage();

  const updateImage = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      images: { ...prev.images, [key]: value },
    }));
  };

  return (
    <>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right font-medium">{t.students.images.newSurah}</Label>
        <div className="col-span-3 space-y-2">
          <Input
            placeholder={t.students.images.newSurahPlaceholder}
            value={formData.images?.new || ""}
            onChange={(e) => updateImage("new", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right font-medium">{t.students.images.recentPast}</Label>
        <div className="col-span-3 space-y-2">
          <Input
            placeholder={t.students.images.recentPastPlaceholder}
            value={formData.images?.recent1 || ""}
            onChange={(e) => updateImage("recent1", e.target.value)}
          />
          <Input
            placeholder={t.students.images.recentPastPlaceholder}
            value={formData.images?.recent2 || ""}
            onChange={(e) => updateImage("recent2", e.target.value)}
          />
          <Input
            placeholder={t.students.images.recentPastPlaceholder}
            value={formData.images?.recent3 || ""}
            onChange={(e) => updateImage("recent3", e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label className="text-right font-medium">{t.students.images.distantPast}</Label>
        <div className="col-span-3 space-y-2">
          <Input
            placeholder={t.students.images.distantPastPlaceholder}
            value={formData.images?.distant1 || ""}
            onChange={(e) => updateImage("distant1", e.target.value)}
          />
          <Input
            placeholder={t.students.images.distantPastPlaceholder}
            value={formData.images?.distant2 || ""}
            onChange={(e) => updateImage("distant2", e.target.value)}
          />
          <Input
            placeholder={t.students.images.distantPastPlaceholder}
            value={formData.images?.distant3 || ""}
            onChange={(e) => updateImage("distant3", e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
