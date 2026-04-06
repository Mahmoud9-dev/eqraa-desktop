import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Department } from "@/types";
import { type Student, type StudentFormData } from "./types";

interface StudentImagesTabProps {
  filteredStudents: Student[];
  getDepartmentName: (dept: Department | string) => string;
  openEditImagesDialog: (student: Student, imageType: "new" | "recent" | "distant") => void;
  /** Edit-images dialog state */
  isEditImagesDialogOpen: boolean;
  setIsEditImagesDialogOpen: (open: boolean) => void;
  selectedStudent: Student | null;
  editingImageType: "new" | "recent" | "distant";
  newStudent: StudentFormData;
  setNewStudent: React.Dispatch<React.SetStateAction<StudentFormData>>;
  handleEditImages: () => void;
}

export function StudentImagesTab({
  filteredStudents,
  getDepartmentName,
  openEditImagesDialog,
  isEditImagesDialogOpen,
  setIsEditImagesDialogOpen,
  selectedStudent,
  editingImageType,
  newStudent,
  setNewStudent,
  handleEditImages,
}: StudentImagesTabProps) {
  const { t } = useLanguage();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{t.students.images.title}</CardTitle>
          <CardDescription>{t.students.images.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredStudents.map((student) => (
              <div key={student.id} className="p-4 border rounded-lg">
                <h3 className="font-medium mb-4 flex items-center gap-2">
                  {student.name}
                  <Badge variant="outline" className="text-xs">
                    {getDepartmentName(student.department)}
                  </Badge>
                </h3>

                {student.parsedImages && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* New Surah */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-green-700 bg-green-50 p-2 rounded border border-green-200">
                          {t.students.images.newSurah}
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditImagesDialog(student, "new")}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {t.students.actions.edit}
                        </Button>
                      </div>
                      <div className="p-3 bg-green-100 rounded border border-green-300 min-h-[60px]">
                        <p className="text-sm text-green-800">
                          {student.parsedImages.new || t.students.images.noNewImage}
                        </p>
                      </div>
                    </div>

                    {/* Recent Past */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-blue-700 bg-blue-50 p-2 rounded border border-blue-200">
                          {t.students.images.recentPast}
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditImagesDialog(student, "recent")}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {t.students.actions.edit}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(["recent1", "recent2", "recent3"] as const).map((key, i) => (
                          <div key={key} className="p-2 bg-blue-100 rounded border border-blue-300">
                            <p className="text-xs text-blue-600">{i + 1}:</p>
                            <p className="text-sm text-blue-800">
                              {student.parsedImages?.[key] || t.students.images.noData}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Distant Past */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-semibold text-orange-700 bg-orange-50 p-2 rounded border border-orange-200">
                          {t.students.images.distantPast}
                        </h4>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditImagesDialog(student, "distant")}
                          className="text-xs px-2 py-1 h-6"
                        >
                          {t.students.actions.edit}
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {(["distant1", "distant2", "distant3"] as const).map((key, i) => (
                          <div key={key} className="p-2 bg-orange-100 rounded border border-orange-300">
                            <p className="text-xs text-orange-600">{i + 1}:</p>
                            <p className="text-sm text-orange-800">
                              {student.parsedImages?.[key] || t.students.images.noData}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {!student.parsedImages && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>{t.students.images.noImagesForStudent}</p>
                  </div>
                )}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <span>
                      {t.students.images.totalPartsMemorized}: {student.parts_memorized ?? 0}
                    </span>
                    <span>
                      {t.students.images.currentProgressLabel}: {student.current_progress || ""}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Edit Images Dialog */}
      <EditImagesDialog
        open={isEditImagesDialogOpen}
        onOpenChange={setIsEditImagesDialogOpen}
        selectedStudent={selectedStudent}
        editingImageType={editingImageType}
        newStudent={newStudent}
        setNewStudent={setNewStudent}
        onSubmit={handleEditImages}
      />
    </>
  );
}

// --- Edit images dialog (private to this file) ---

function EditImagesDialog({
  open,
  onOpenChange,
  selectedStudent,
  editingImageType,
  newStudent,
  setNewStudent,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedStudent: Student | null;
  editingImageType: "new" | "recent" | "distant";
  newStudent: StudentFormData;
  setNewStudent: React.Dispatch<React.SetStateAction<StudentFormData>>;
  onSubmit: () => void;
}) {
  const { t } = useLanguage();

  const updateImage = (key: string, value: string) => {
    setNewStudent((prev) => ({
      ...prev,
      images: { ...prev.images, [key]: value },
    }));
  };

  const typeLabel =
    editingImageType === "new"
      ? t.students.images.newSurah
      : editingImageType === "recent"
        ? t.students.images.recentPast
        : t.students.images.distantPast;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-base">
            {t.students.images.editTitle}
          </DialogTitle>
          <DialogDescription className="text-sm sm:text-xs">
            {t.students.images.editDescription.replace(
              "{{name}}",
              selectedStudent?.name ?? ""
            )}
            {" - "}
            {typeLabel}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
          {editingImageType === "new" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-new" className="text-right">
                {t.students.images.newSurah}
              </Label>
              <Input
                id="edit-new"
                value={newStudent.images?.new || ""}
                onChange={(e) => updateImage("new", e.target.value)}
                className="col-span-3"
              />
            </div>
          )}

          {editingImageType === "recent" &&
            (["recent1", "recent2", "recent3"] as const).map((key, i) => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`edit-${key}`} className="text-right">
                  {t.students.images.recentPast} {i + 1}
                </Label>
                <Input
                  id={`edit-${key}`}
                  value={newStudent.images?.[key] || ""}
                  onChange={(e) => updateImage(key, e.target.value)}
                  className="col-span-3"
                />
              </div>
            ))}

          {editingImageType === "distant" &&
            (["distant1", "distant2", "distant3"] as const).map((key, i) => (
              <div key={key} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={`edit-${key}`} className="text-right">
                  {t.students.images.distantPast} {i + 1}
                </Label>
                <Input
                  id={`edit-${key}`}
                  value={newStudent.images?.[key] || ""}
                  onChange={(e) => updateImage(key, e.target.value)}
                  className="col-span-3"
                />
              </div>
            ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="text-sm"
          >
            {t.students.actions.cancel}
          </Button>
          <Button onClick={onSubmit} className="text-sm">
            {t.students.actions.saveChanges}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
