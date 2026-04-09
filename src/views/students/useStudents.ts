import { useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { exportCSV } from "@/lib/export/csv";
import { exportPDF } from "@/lib/export/pdf";
import { Department } from "@/types";
import {
  getStudentsWithTeachers,
  addStudent,
  updateStudent,
  deleteStudent,
} from "@/lib/database/repositories/students";
import {
  getAllStudentNotes,
  deleteStudentNote,
} from "@/lib/database/repositories/student-notes";
import { getTeachers, type Teacher } from "@/lib/database/repositories/teachers";
import { logger } from "@/lib/logger";
import {
  getStudentsByDepartment,
  type DepartmentCountRow,
} from "@/lib/database/repositories/stats";
import {
  type Student,
  type StudentNote,
  type StudentFormData,
  INITIAL_FORM_DATA,
  EMPTY_IMAGES,
  MOCK_STUDENT_GRADES,
} from "./types";

export function useStudents() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<Department | "all">("all");
  const [activeTab, setActiveTab] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState<Student[]>([]);
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const [deptData, setDeptData] = useState<DepartmentCountRow[]>([]);
  const [studentsNotes, setStudentsNotes] = useState<Record<string, StudentNote[]>>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditImagesDialogOpen, setIsEditImagesDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedNote, setSelectedNote] = useState<StudentNote | null>(null);
  const [editingImageType, setEditingImageType] = useState<"new" | "recent" | "distant">("new");
  const [isExporting, setIsExporting] = useState(false);
  const [newNote, setNewNote] = useState({
    type: "\u0625\u064A\u062C\u0627\u0628\u064A" as "\u0625\u064A\u062C\u0627\u0628\u064A" | "\u0633\u0644\u0628\u064A",
    content: "",
    date: new Date().toISOString().split("T")[0],
    teacher: "\u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u062D\u0627\u0644\u064A",
  });
  const [newStudent, setNewStudent] = useState<StudentFormData>({ ...INITIAL_FORM_DATA });
  const { toast } = useToast();
  const { t, isRTL } = useLanguage();

  // --- Data loading ---
  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getStudentsWithTeachers();
      const transformedStudents: Student[] = data.map((s) => ({
        ...s,
        parsedImages: (() => {
          try {
            return typeof s.images === "string" && s.images ? JSON.parse(s.images) : {};
          } catch { return {}; }
        })(),
        teacherId: s.teacher_id || "",
        partsMemorized: s.parts_memorized ?? 0,
        currentProgress: s.current_progress || "",
        previousProgress: s.previous_progress || "",
        parentName: s.parent_name || "",
        parentPhone: s.parent_phone || "",
        isActive: s.is_active === 1,
        createdAt: s.created_at ? new Date(s.created_at) : new Date(),
      }));
      setStudents(transformedStudents);
    } catch (error) {
      logger.error("Error loading students:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const loadStudentNotes = useCallback(async () => {
    try {
      const data = await getAllStudentNotes();
      const notesMap: Record<string, StudentNote[]> = {};
      data.forEach((note) => {
        const studentId = note.student_id;
        if (!notesMap[studentId]) { notesMap[studentId] = []; }
        notesMap[studentId].push({
          id: note.id,
          student_id: note.student_id,
          type: note.type as "\u0625\u064A\u062C\u0627\u0628\u064A" | "\u0633\u0644\u0628\u064A",
          content: note.content,
          note_date: note.note_date,
          teacher_name: note.teacher_name,
        });
      });
      setStudentsNotes(notesMap);
    } catch (error) {
      logger.error("Error loading student notes:", error);
    }
  }, []);

  useEffect(() => {
    loadStudents();
    getTeachers()
      .then(setTeachersList)
      .catch((err: unknown) => logger.error("Failed to fetch teachers list", err));
    getStudentsByDepartment()
      .then(setDeptData)
      .catch((err: unknown) => logger.error("Failed to fetch department data", err));
  }, [loadStudents]);

  useEffect(() => { loadStudentNotes(); }, [loadStudentNotes]);

  // --- Filtering (memoized) ---
  const filteredStudents = useMemo(() =>
    students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (student.teacher_name || "").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDepartment =
        filterDepartment === "all" || student.department === filterDepartment;
      return matchesSearch && matchesDepartment;
    }),
    [students, searchTerm, filterDepartment],
  );

  // --- Helpers ---
  const getDepartmentName = useCallback((dept: Department | string) => {
    switch (dept) {
      case "quran": return t.students.departments.quran;
      case "tajweed": return t.students.departments.tajweed;
      case "tarbawi": return t.students.departments.tarbawi;
      default: return dept;
    }
  }, [t]);

  const getAttendanceColor = useCallback((attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  }, []);

  const getGradeColor = useCallback((grade: number) => {
    if (grade >= 90) return "bg-green-100 text-green-800";
    if (grade >= 80) return "bg-blue-100 text-blue-800";
    if (grade >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }, []);

  const getNoteTypeColor = useCallback((type: string) => {
    return type === "\u0625\u064A\u062C\u0627\u0628\u064A"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  }, []);

  const getLocalDateStamp = useCallback(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  }, []);

  const resetFormData = useCallback(() => {
    setNewStudent({ ...INITIAL_FORM_DATA, images: { ...EMPTY_IMAGES } });
  }, []);

  // --- Export ---
  const studentReportHeaders = useMemo(() => [
    t.students.table.name, t.students.table.age, t.students.table.grade,
    t.students.table.department, t.students.table.teacher,
    t.students.table.partsMemorized, t.students.table.status,
  ], [t]);

  const getStudentReportRows = useCallback(() =>
    filteredStudents.map((s) => [
      s.name, String(s.age ?? ""), s.grade ?? "",
      getDepartmentName(s.department), s.teacher_name ?? "",
      String(s.parts_memorized ?? 0),
      s.is_active === 1 || s.isActive ? t.students.status.active : t.students.status.inactive,
    ]),
    [filteredStudents, getDepartmentName, t],
  );

  const handleExportCSV = useCallback(async () => {
    setIsExporting(true);
    try {
      const result = await exportCSV(
        `students-${getLocalDateStamp()}.csv`, studentReportHeaders, getStudentReportRows()
      );
      if (result) { toast({ title: t.export.exportSuccess }); }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    } finally { setIsExporting(false); }
  }, [getLocalDateStamp, studentReportHeaders, getStudentReportRows, toast, t]);

  const handleExportPDF = useCallback(async () => {
    setIsExporting(true);
    try {
      const result = await exportPDF(
        `students-${getLocalDateStamp()}.pdf`,
        `${t.export.reportTitle} — ${t.export.students}`,
        studentReportHeaders, getStudentReportRows(), { isRTL }
      );
      if (result) { toast({ title: t.export.exportSuccess }); }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    } finally { setIsExporting(false); }
  }, [getLocalDateStamp, studentReportHeaders, getStudentReportRows, toast, t, isRTL]);

  // --- CRUD ---
  const handleAddStudent = useCallback(async () => {
    if (!newStudent.name || !newStudent.grade || !newStudent.teacherId) {
      toast({ title: t.students.toast.error, description: t.students.toast.fillRequired, variant: "destructive" });
      return;
    }
    try {
      await addStudent({
        name: newStudent.name || "", age: newStudent.age || 0,
        grade: newStudent.grade || "", department: newStudent.department || "quran",
        teacher_id: newStudent.teacherId || null,
        parts_memorized: newStudent.partsMemorized || 0,
        current_progress: newStudent.currentProgress || "",
        previous_progress: newStudent.previousProgress || "",
        parent_name: newStudent.parentName || undefined,
        parent_phone: newStudent.parentPhone || undefined,
        is_active: newStudent.isActive ?? true,
      });
      await loadStudents();
      resetFormData();
      setIsAddDialogOpen(false);
      toast({ title: t.students.toast.addSuccess, description: t.students.toast.addSuccessDesc });
    } catch (error) {
      logger.error("Error adding student:", error);
      toast({ title: t.students.toast.error, description: t.students.toast.addError, variant: "destructive" });
    }
  }, [newStudent, toast, t, loadStudents, resetFormData]);

  const handleEditStudent = useCallback(async () => {
    if (!selectedStudent || !newStudent.name || !newStudent.grade || !newStudent.teacherId) {
      toast({ title: t.students.toast.error, description: t.students.toast.fillRequired, variant: "destructive" });
      return;
    }
    try {
      await updateStudent(selectedStudent.id, {
        name: newStudent.name, age: newStudent.age,
        grade: newStudent.grade, department: newStudent.department,
        teacher_id: newStudent.teacherId || null,
        parts_memorized: newStudent.partsMemorized,
        current_progress: newStudent.currentProgress,
        previous_progress: newStudent.previousProgress,
        attendance: newStudent.attendance,
        parent_name: newStudent.parentName || null,
        parent_phone: newStudent.parentPhone || null,
        is_active: newStudent.isActive ? 1 : 0,
        images: newStudent.images ? JSON.stringify(newStudent.images) : "{}",
      });
      await loadStudents();
      setIsEditDialogOpen(false);
      setSelectedStudent(null);
      resetFormData();
      toast({ title: t.students.toast.editSuccess, description: t.students.toast.editSuccessDesc });
    } catch (error) {
      logger.error("Error updating student:", error);
      toast({ title: t.students.toast.error, description: t.students.toast.editError, variant: "destructive" });
    }
  }, [selectedStudent, newStudent, toast, t, loadStudents, resetFormData]);

  const handleDeleteStudent = useCallback(async () => {
    if (!selectedStudent) return;
    try {
      await deleteStudent(selectedStudent.id);
      await loadStudents();
      setIsDeleteDialogOpen(false);
      setSelectedStudent(null);
      toast({ title: t.students.toast.deleteSuccess, description: t.students.toast.deleteSuccessDesc });
    } catch (error) {
      logger.error("Error deleting student:", error);
      toast({ title: t.students.toast.error, description: t.students.toast.deleteError, variant: "destructive" });
    }
  }, [selectedStudent, toast, t, loadStudents]);

  const handleEditImages = useCallback(async () => {
    if (!selectedStudent) return;
    try {
      await updateStudent(selectedStudent.id, {
        images: newStudent.images ? JSON.stringify(newStudent.images) : "{}",
      });
      await loadStudents();
      setIsEditImagesDialogOpen(false);
      setSelectedStudent(null);
      toast({ title: t.students.toast.imageEditSuccess, description: t.students.toast.imageEditSuccessDesc });
    } catch (error) {
      logger.error("Error updating images:", error);
      toast({ title: t.students.toast.error, description: t.students.toast.imageEditError, variant: "destructive" });
    }
  }, [selectedStudent, newStudent.images, toast, t, loadStudents]);

  const handleDeleteNote = useCallback(async (_studentId: string, noteId: string) => {
    try {
      await deleteStudentNote(noteId);
      await loadStudentNotes();
      toast({ title: t.students.toast.noteDeleteSuccess, description: t.students.toast.noteDeleteSuccessDesc });
    } catch (error) {
      logger.error("Error deleting note:", error);
      toast({ title: t.students.toast.error, description: t.students.toast.noteDeleteError, variant: "destructive" });
    }
  }, [toast, t, loadStudentNotes]);

  // --- Dialog openers ---
  const openEditDialog = useCallback((student: Student) => {
    setSelectedStudent(student);
    setNewStudent({
      name: student.name, age: student.age, grade: student.grade,
      department: student.department, teacherId: student.teacher_id || "",
      partsMemorized: student.parts_memorized ?? 0,
      currentProgress: student.current_progress || "",
      previousProgress: student.previous_progress || "",
      attendance: student.attendance ?? 0,
      parentName: student.parent_name || "", parentPhone: student.parent_phone || "",
      isActive: student.is_active === 1,
      images: student.parsedImages || { ...EMPTY_IMAGES },
    });
    setIsEditDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((student: Student) => {
    setSelectedStudent(student);
    setIsDeleteDialogOpen(true);
  }, []);

  const openEditImagesDialog = useCallback((student: Student, imageType: "new" | "recent" | "distant") => {
    setSelectedStudent(student);
    setEditingImageType(imageType);
    setNewStudent((prev) => ({ ...prev, images: student.parsedImages || { ...EMPTY_IMAGES } }));
    setIsEditImagesDialogOpen(true);
  }, []);

  const openAddNoteDialog = useCallback((student: Student) => {
    setSelectedStudent(student);
    setNewNote({
      type: "\u0625\u064A\u062C\u0627\u0628\u064A", content: "",
      date: new Date().toISOString().split("T")[0],
      teacher: "\u0627\u0644\u0645\u0639\u0644\u0645 \u0627\u0644\u062D\u0627\u0644\u064A",
    });
  }, []);

  const openEditNoteDialog = useCallback((student: Student, note: StudentNote) => {
    setSelectedStudent(student);
    setSelectedNote(note);
    setNewNote({ type: note.type, content: note.content, date: note.note_date, teacher: note.teacher_name });
  }, []);

  return {
    searchTerm, setSearchTerm, filterDepartment, setFilterDepartment,
    activeTab, setActiveTab, isLoading, students, teachersList, deptData,
    studentsNotes, studentsGrades: MOCK_STUDENT_GRADES, filteredStudents,
    isAddDialogOpen, setIsAddDialogOpen, isEditDialogOpen, setIsEditDialogOpen,
    isDeleteDialogOpen, setIsDeleteDialogOpen,
    isEditImagesDialogOpen, setIsEditImagesDialogOpen,
    selectedStudent, selectedNote, editingImageType, isExporting,
    newNote, setNewNote, newStudent, setNewStudent,
    getDepartmentName, getAttendanceColor, getGradeColor, getNoteTypeColor,
    handleExportCSV, handleExportPDF, handleAddStudent, handleEditStudent,
    handleDeleteStudent, handleEditImages, handleDeleteNote,
    openEditDialog, openDeleteDialog, openEditImagesDialog,
    openAddNoteDialog, openEditNoteDialog,
    t, isRTL,
  };
}
