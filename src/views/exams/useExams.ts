import { useState, useMemo, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { ExamType, Exam, ExamResult } from "@/types";

export type TabType = ExamType | "results";

const students: Record<string, string> = {
  student1: "\u0623\u062d\u0645\u062f \u0645\u062d\u0645\u062f \u0639\u0644\u064a",
  student2: "\u0639\u0645\u0631 \u062e\u0627\u0644\u062f \u062d\u0633\u0646",
  student3: "\u0645\u062d\u0645\u062f \u0633\u0639\u064a\u062f \u0623\u062d\u0645\u062f",
};

const INITIAL_EXAMS: Exam[] = [
  { id: "1", type: "\u0642\u0631\u0622\u0646", title: "\u0627\u062e\u062a\u0628\u0627\u0631 \u062d\u0641\u0638 \u0633\u0648\u0631\u0629 \u0627\u0644\u0628\u0642\u0631\u0629", description: "\u0627\u062e\u062a\u0628\u0627\u0631 \u062d\u0641\u0638 \u0633\u0648\u0631\u0629 \u0627\u0644\u0628\u0642\u0631\u0629 \u0645\u0646 \u0627\u0644\u0622\u064a\u0629 1 \u0625\u0644\u0649 100", date: new Date("2025-11-10"), duration: 60, totalMarks: 100, passingMarks: 60, createdBy: "teacher1", isActive: true, createdAt: new Date("2025-11-01") },
  { id: "2", type: "\u0642\u0631\u0622\u0646", title: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0645\u0631\u0627\u062c\u0639\u0629 \u0627\u0644\u062c\u0632\u0621 \u0627\u0644\u0623\u0648\u0644", description: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0634\u0627\u0645\u0644 \u0644\u0644\u062c\u0632\u0621 \u0627\u0644\u0623\u0648\u0644 \u0645\u0646 \u0627\u0644\u0642\u0631\u0622\u0646", date: new Date("2025-11-15"), duration: 90, totalMarks: 100, passingMarks: 70, createdBy: "teacher2", isActive: true, createdAt: new Date("2025-11-02") },
  { id: "3", type: "\u062a\u062c\u0648\u064a\u062f", title: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0623\u062d\u0643\u0627\u0645 \u0627\u0644\u0646\u0648\u0646 \u0627\u0644\u0633\u0627\u0643\u0646\u0629", description: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0641\u064a \u0623\u062d\u0643\u0627\u0645 \u0627\u0644\u0646\u0648\u0646 \u0627\u0644\u0633\u0627\u0643\u0646\u0629 \u0648\u0627\u0644\u062a\u0646\u0648\u064a\u0646", date: new Date("2025-11-12"), duration: 45, totalMarks: 50, passingMarks: 35, createdBy: "teacher1", isActive: true, createdAt: new Date("2025-11-03") },
  { id: "4", type: "\u062a\u0631\u0628\u0648\u064a", title: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0627\u0644\u0622\u062f\u0627\u0628 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629", description: "\u0627\u062e\u062a\u0628\u0627\u0631 \u0641\u064a \u0627\u0644\u0622\u062f\u0627\u0628 \u0627\u0644\u0625\u0633\u0644\u0627\u0645\u064a\u0629 \u0627\u0644\u0639\u0627\u0645\u0629", date: new Date("2025-11-08"), duration: 60, totalMarks: 100, passingMarks: 60, createdBy: "teacher3", isActive: true, createdAt: new Date("2025-11-01") },
];

const INITIAL_RESULTS: ExamResult[] = [
  { id: "1", examId: "1", studentId: "student1", marks: 85, percentage: 85, status: "\u0646\u0627\u062c\u062d", notes: "\u0623\u062f\u0627\u0621 \u0645\u0645\u062a\u0627\u0632", evaluatedBy: "teacher1", evaluatedAt: new Date("2025-11-10") },
  { id: "2", examId: "1", studentId: "student2", marks: 45, percentage: 45, status: "\u0631\u0627\u0633\u0628", notes: "\u064a\u062d\u062a\u0627\u062c \u0644\u0644\u0645\u0632\u064a\u062f \u0645\u0646 \u0627\u0644\u0645\u0631\u0627\u062c\u0639\u0629", evaluatedBy: "teacher1", evaluatedAt: new Date("2025-11-10") },
  { id: "3", examId: "3", studentId: "student3", marks: 40, percentage: 80, status: "\u0646\u0627\u062c\u062d", notes: "\u0641\u0647\u0645 \u062c\u064a\u062f \u0644\u0644\u0623\u062d\u0643\u0627\u0645", evaluatedBy: "teacher1", evaluatedAt: new Date("2025-11-12") },
];

const DEFAULT_EXAM_FORM: Partial<Exam> = {
  type: "\u0642\u0631\u0622\u0646", title: "", description: "", date: new Date(),
  duration: 60, totalMarks: 100, passingMarks: 60, isActive: true,
};

const DEFAULT_RESULT_FORM: Partial<ExamResult> = {
  examId: "", studentId: "", marks: 0, percentage: 0, status: "\u0646\u0627\u062c\u062d", notes: "",
};

export const examStatusFilters = [
  { key: "upcoming" as const, filter: (d: Date, now: Date) => d > now },
  { key: "today" as const, filter: (d: Date, now: Date) => d.toDateString() === now.toDateString() },
  { key: "completed" as const, filter: (d: Date, now: Date) => d < now },
];

export function getStatusColor(status: string): string {
  switch (status) {
    case "\u0646\u0627\u062c\u062d": return "bg-green-100 text-green-800";
    case "\u0631\u0627\u0633\u0628": return "bg-red-100 text-red-800";
    case "\u063a\u0627\u0626\u0628": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

export function getExamStatusColor(exam: Exam): string {
  const examDate = new Date(exam.date);
  const today = new Date();
  if (examDate < today) return "bg-gray-100 text-gray-800";
  if (examDate.toDateString() === today.toDateString()) return "bg-blue-100 text-blue-800";
  return "bg-yellow-100 text-yellow-800";
}

/**
 * Shared pass/fail evaluation so add and edit result paths cannot drift.
 * Compares percentage against the exam's passing percentage
 * (passingMarks / totalMarks * 100), not against raw passingMarks.
 */
export function evaluateResult(
  marks: number,
  exam: Pick<Exam, "totalMarks" | "passingMarks">,
): { percentage: number; status: "\u0646\u0627\u062c\u062d" | "\u0631\u0627\u0633\u0628" } {
  const percentage = Math.round((marks / exam.totalMarks) * 100);
  const passingPercentage = (exam.passingMarks / exam.totalMarks) * 100;
  const status = percentage >= passingPercentage ? "\u0646\u0627\u062c\u062d" : "\u0631\u0627\u0633\u0628";
  return { percentage, status };
}

export function useExams() {
  const [activeTab, setActiveTab] = useState<TabType>("\u0642\u0631\u0622\u0646");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [isEditResultDialogOpen, setIsEditResultDialogOpen] = useState(false);
  const [isDeleteResultDialogOpen, setIsDeleteResultDialogOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState<Exam | null>(null);
  const [selectedResult, setSelectedResult] = useState<ExamResult | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  const [exams, setExams] = useState<Exam[]>(INITIAL_EXAMS);
  const [examResults, setExamResults] = useState<ExamResult[]>(INITIAL_RESULTS);
  const [newExam, setNewExam] = useState<Partial<Exam>>(DEFAULT_EXAM_FORM);
  const [newResult, setNewResult] = useState<Partial<ExamResult>>(DEFAULT_RESULT_FORM);

  const filteredExams = useMemo(() => {
    const byType = exams.filter((exam) => exam.type === activeTab);
    const q = searchTerm.trim().toLowerCase();
    if (!q) return byType;
    return byType.filter(
      (exam) =>
        exam.title.toLowerCase().includes(q) ||
        (exam.description ?? "").toLowerCase().includes(q),
    );
  }, [exams, activeTab, searchTerm]);

  const filteredResults = useMemo(() => {
    const base =
      activeTab === "results"
        ? examResults
        : examResults.filter((result) => {
            const exam = exams.find((e) => e.id === result.examId);
            return exam && exam.type === activeTab;
          });
    const q = searchTerm.trim().toLowerCase();
    if (!q) return base;
    return base.filter((result) => {
      const exam = exams.find((e) => e.id === result.examId);
      const studentName = students[result.studentId] ?? "";
      return (
        (exam?.title.toLowerCase().includes(q) ?? false) ||
        studentName.toLowerCase().includes(q)
      );
    });
  }, [examResults, exams, activeTab, searchTerm]);

  const getExamStatusText = useCallback(
    (exam: Exam): string => {
      const examDate = new Date(exam.date);
      const today = new Date();
      if (examDate < today) return t.exams.status.completed;
      if (examDate.toDateString() === today.toDateString()) return t.exams.status.today;
      return t.exams.status.upcoming;
    },
    [t],
  );

  const getExamTypeLabel = useCallback(
    (type: ExamType): string => {
      const typeMap: Record<ExamType, string> = {
        "\u0642\u0631\u0622\u0646": t.exams.examTypes.quran,
        "\u062a\u062c\u0648\u064a\u062f": t.exams.examTypes.tajweed,
        "\u062a\u0631\u0628\u0648\u064a": t.exams.examTypes.educational,
      };
      return typeMap[type] || type;
    },
    [t],
  );

  const getResultStatusLabel = useCallback(
    (status: string): string => {
      const statusMap: Record<string, string> = {
        "\u0646\u0627\u062c\u062d": t.exams.status.passed,
        "\u0631\u0627\u0633\u0628": t.exams.status.failed,
        "\u063a\u0627\u0626\u0628": t.exams.status.absent,
      };
      return statusMap[status] || status;
    },
    [t],
  );

  const resetExamForm = useCallback(() => {
    setNewExam(DEFAULT_EXAM_FORM);
  }, []);

  const resetResultForm = useCallback(() => {
    setNewResult(DEFAULT_RESULT_FORM);
  }, []);

  const handleAddExam = useCallback(() => {
    if (!newExam.title || !newExam.description || !newExam.date) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const exam: Exam = {
      id: Date.now().toString(),
      type: newExam.type as ExamType,
      title: newExam.title || "",
      description: newExam.description || "",
      date: newExam.date || new Date(),
      duration: newExam.duration || 60,
      totalMarks: newExam.totalMarks || 100,
      passingMarks: newExam.passingMarks || 60,
      createdBy: "current_user",
      isActive: newExam.isActive ?? true,
      createdAt: new Date(),
    };

    setExams((prev) => [...prev, exam]);
    resetExamForm();
    setIsAddDialogOpen(false);
    toast({
      title: t.exams.toasts.addSuccess,
      description: t.exams.toasts.addSuccessDescription,
    });
  }, [newExam, toast, t, resetExamForm]);

  const handleEditExam = useCallback(() => {
    if (!selectedExam || !newExam.title || !newExam.description || !newExam.date) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    setExams((prev) =>
      prev.map((exam) =>
        exam.id === selectedExam.id
          ? {
              ...exam,
              type: (newExam.type as ExamType) || exam.type,
              title: newExam.title || exam.title,
              description: newExam.description || exam.description,
              date: newExam.date || exam.date,
              duration: newExam.duration || exam.duration,
              totalMarks: newExam.totalMarks || exam.totalMarks,
              passingMarks: newExam.passingMarks || exam.passingMarks,
              isActive: newExam.isActive !== undefined ? newExam.isActive : exam.isActive,
            }
          : exam,
      ),
    );

    setIsEditDialogOpen(false);
    setSelectedExam(null);
    resetExamForm();
    toast({
      title: t.exams.toasts.editSuccess,
      description: t.exams.toasts.editSuccessDescription,
    });
  }, [selectedExam, newExam, toast, t, resetExamForm]);

  const handleDeleteExam = useCallback(() => {
    if (!selectedExam) return;
    // Cascade: drop any exam results tied to the deleted exam so the
    // results tab doesn't keep rendering orphaned rows.
    setExamResults((prev) =>
      prev.filter((result) => result.examId !== selectedExam.id),
    );
    setExams((prev) => prev.filter((exam) => exam.id !== selectedExam.id));
    setIsDeleteDialogOpen(false);
    setSelectedExam(null);
    toast({
      title: t.exams.toasts.deleteSuccess,
      description: t.exams.toasts.deleteSuccessDescription,
    });
  }, [selectedExam, toast, t]);

  const handleAddResult = useCallback(() => {
    if (!newResult.examId || !newResult.studentId || newResult.marks === undefined) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const exam = exams.find((e) => e.id === newResult.examId);
    if (!exam) return;

    const { percentage, status } = evaluateResult(newResult.marks, exam);

    const result: ExamResult = {
      id: Date.now().toString(),
      examId: newResult.examId,
      studentId: newResult.studentId,
      marks: newResult.marks,
      percentage,
      status,
      notes: newResult.notes,
      evaluatedBy: "current_user",
      evaluatedAt: new Date(),
    };

    setExamResults((prev) => [...prev, result]);
    resetResultForm();
    setIsResultDialogOpen(false);
    toast({
      title: t.exams.toasts.resultAddSuccess,
      description: t.exams.toasts.resultAddSuccessDescription,
    });
  }, [newResult, exams, toast, t, resetResultForm]);

  const handleEditResult = useCallback(() => {
    if (!selectedResult || newResult.marks === undefined) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const exam = exams.find((e) => e.id === selectedResult.examId);
    if (!exam) return;

    const marks = newResult.marks;
    const { percentage, status } = evaluateResult(marks, exam);

    setExamResults((prev) =>
      prev.map((r) =>
        r.id === selectedResult.id
          ? { ...r, marks, percentage, status, notes: newResult.notes }
          : r,
      ),
    );

    setIsEditResultDialogOpen(false);
    setSelectedResult(null);
    resetResultForm();
    toast({
      title: t.exams.toasts.resultEditSuccess,
      description: t.exams.toasts.resultEditSuccessDescription,
    });
  }, [selectedResult, newResult, exams, toast, t, resetResultForm]);

  const handleDeleteResult = useCallback(() => {
    if (!selectedResult) return;
    setExamResults((prev) => prev.filter((r) => r.id !== selectedResult.id));
    setIsDeleteResultDialogOpen(false);
    setSelectedResult(null);
    toast({
      title: t.exams.toasts.resultDeleteSuccess,
      description: t.exams.toasts.resultDeleteSuccessDescription,
    });
  }, [selectedResult, toast, t]);

  const openEditDialog = useCallback((exam: Exam) => {
    setSelectedExam(exam);
    setNewExam({
      type: exam.type, title: exam.title, description: exam.description,
      date: exam.date, duration: exam.duration, totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks, isActive: exam.isActive,
    });
    setIsEditDialogOpen(true);
  }, []);

  const openDeleteDialog = useCallback((exam: Exam) => {
    setSelectedExam(exam);
    setIsDeleteDialogOpen(true);
  }, []);

  const openResultDialog = useCallback(
    (examId: string) => {
      setNewResult({ ...newResult, examId });
      setIsResultDialogOpen(true);
    },
    [newResult],
  );

  const openEditResultDialog = useCallback((result: ExamResult) => {
    setSelectedResult(result);
    setNewResult({
      examId: result.examId, studentId: result.studentId, marks: result.marks,
      percentage: result.percentage, status: result.status, notes: result.notes,
    });
    setIsEditResultDialogOpen(true);
  }, []);

  const openDeleteResultDialog = useCallback((result: ExamResult) => {
    setSelectedResult(result);
    setIsDeleteResultDialogOpen(true);
  }, []);

  return {
    activeTab, setActiveTab, searchTerm, setSearchTerm,
    exams, examResults, filteredExams, filteredResults,
    selectedExam, selectedResult, newExam, setNewExam, newResult, setNewResult, students,
    isAddDialogOpen, setIsAddDialogOpen, isEditDialogOpen, setIsEditDialogOpen,
    isDeleteDialogOpen, setIsDeleteDialogOpen, isResultDialogOpen, setIsResultDialogOpen,
    isEditResultDialogOpen, setIsEditResultDialogOpen,
    isDeleteResultDialogOpen, setIsDeleteResultDialogOpen,
    handleAddExam, handleEditExam, handleDeleteExam,
    handleAddResult, handleEditResult, handleDeleteResult,
    openEditDialog, openDeleteDialog, openResultDialog,
    openEditResultDialog, openDeleteResultDialog,
    getExamStatusText, getExamTypeLabel, getResultStatusLabel,
    t, language,
  };
}
