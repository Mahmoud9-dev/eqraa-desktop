import { useState, useCallback, useMemo } from "react";
import { TarbiwiProgram, TarbiwiAssignment } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  MOCK_PROGRAMS,
  MOCK_ASSIGNMENTS,
  MOCK_ASSESSMENTS,
} from "./mockData";
import type {
  ProgramFormData,
  AssignmentFormData,
  AssessmentFormData,
  Assessment,
} from "./types";

// Re-export types and mock data used by sub-components
export type { ProgramFormData, AssignmentFormData, AssessmentFormData, Assessment } from "./types";
export { STUDENTS_MAP, TEACHERS_MAP, ARTICLES, VIDEOS } from "./mockData";

// ---------- initial form values ----------

const INITIAL_PROGRAM: ProgramFormData = {
  title: "",
  description: "",
  dayOfWeek: 1,
  time: "",
  duration: 60,
  targetAge: "",
  isActive: true,
};

const INITIAL_ASSIGNMENT: AssignmentFormData = {
  title: "",
  description: "",
  type: "\u0639\u0628\u0627\u062F\u064A\u0629", // worship
  dueDate: new Date(),
  targetAge: "",
  points: 10,
  isActive: true,
};

const INITIAL_ASSESSMENT: AssessmentFormData = {
  studentId: "",
  date: new Date(),
  criteria: "",
  rating: 0,
  notes: "",
  evaluatedBy: "current_user",
};

// ---------- utility helpers ----------

export const getDayName = (dayOfWeek: number, daysArray: string[]): string => {
  return daysArray[dayOfWeek];
};

export const getAssignmentTypeColor = (type: string): string => {
  return type === "\u0639\u0628\u0627\u062F\u064A\u0629"
    ? "bg-green-100 text-green-800"
    : "bg-blue-100 text-blue-800";
};

export const getRatingColor = (rating: number): string => {
  if (rating >= 9) return "bg-green-100 text-green-800";
  if (rating >= 7) return "bg-blue-100 text-blue-800";
  if (rating >= 5) return "bg-yellow-100 text-yellow-800";
  return "bg-red-100 text-red-800";
};

// ---------- hook ----------

export function useTarbiwi() {
  const { t, tFunc, language } = useLanguage();
  const tb = t.tarbiwi;
  const { toast } = useToast();

  // Tab state
  const [activeTab, setActiveTab] = useState("programs");

  // Dialog visibility
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const [isEditProgramDialogOpen, setIsEditProgramDialogOpen] = useState(false);
  const [isDeleteProgramDialogOpen, setIsDeleteProgramDialogOpen] = useState(false);
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] = useState(false);
  const [isEditAssignmentDialogOpen, setIsEditAssignmentDialogOpen] = useState(false);
  const [isDeleteAssignmentDialogOpen, setIsDeleteAssignmentDialogOpen] = useState(false);
  const [isAddAssessmentDialogOpen, setIsAddAssessmentDialogOpen] = useState(false);

  // Selected items
  const [selectedProgram, setSelectedProgram] = useState<TarbiwiProgram | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<TarbiwiAssignment | null>(null);

  // Data
  const [programs, setPrograms] = useState(MOCK_PROGRAMS);
  const [assignments, setAssignments] = useState(MOCK_ASSIGNMENTS);
  const [assessments, setAssessments] = useState<Assessment[]>(MOCK_ASSESSMENTS);

  // Form state
  const [newProgram, setNewProgram] = useState<ProgramFormData>({ ...INITIAL_PROGRAM });
  const [newAssignment, setNewAssignment] = useState<AssignmentFormData>({ ...INITIAL_ASSIGNMENT });
  const [newAssessment, setNewAssessment] = useState<AssessmentFormData>({ ...INITIAL_ASSESSMENT });

  // Days array (translated, memoized)
  const daysArray = useMemo(() => [
    tb.days.sunday,
    tb.days.monday,
    tb.days.tuesday,
    tb.days.wednesday,
    tb.days.thursday,
    tb.days.friday,
    tb.days.saturday,
  ], [tb]);

  // Assignment type label map (memoized)
  const assignmentTypeLabels: Record<string, string> = useMemo(() => ({
    "\u0639\u0628\u0627\u062F\u064A\u0629": tb.assignments.typeLabels.worship,
    "\u0633\u0644\u0648\u0643\u064A\u0629": tb.assignments.typeLabels.behavioral,
  }), [tb]);

  // ---- Program CRUD ----

  const handleAddProgram = useCallback(() => {
    if (!newProgram.title || !newProgram.description || !newProgram.time) {
      toast({
        title: tb.programs.toast.validationError,
        description: tb.programs.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const program = {
      id: Date.now().toString(),
      ...newProgram,
      createdAt: new Date(),
    };

    setPrograms((prev) => [...prev, program]);
    setNewProgram({ ...INITIAL_PROGRAM });
    setIsAddProgramDialogOpen(false);
    toast({
      title: tb.programs.toast.addSuccess,
      description: tb.programs.toast.addSuccessDescription,
    });
  }, [newProgram, toast, tb]);

  const handleEditProgram = useCallback(() => {
    if (!selectedProgram || !newProgram.title || !newProgram.description || !newProgram.time) {
      toast({
        title: tb.programs.toast.validationError,
        description: tb.programs.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    setPrograms((prev) =>
      prev.map((program) =>
        program.id === selectedProgram.id
          ? {
              ...program,
              title: newProgram.title || program.title,
              description: newProgram.description || program.description,
              dayOfWeek: newProgram.dayOfWeek || program.dayOfWeek,
              time: newProgram.time || program.time,
              duration: newProgram.duration || program.duration,
              targetAge: newProgram.targetAge || program.targetAge,
              isActive: newProgram.isActive !== undefined ? newProgram.isActive : program.isActive,
            }
          : program
      )
    );

    setIsEditProgramDialogOpen(false);
    setSelectedProgram(null);
    setNewProgram({ ...INITIAL_PROGRAM });
    toast({
      title: tb.programs.toast.editSuccess,
      description: tb.programs.toast.editSuccessDescription,
    });
  }, [selectedProgram, newProgram, toast, tb]);

  const handleDeleteProgram = useCallback(() => {
    if (!selectedProgram) return;

    setPrograms((prev) => prev.filter((program) => program.id !== selectedProgram.id));
    setIsDeleteProgramDialogOpen(false);
    setSelectedProgram(null);
    toast({
      title: tb.programs.toast.deleteSuccess,
      description: tb.programs.toast.deleteSuccessDescription,
    });
  }, [selectedProgram, toast, tb]);

  const openEditProgramDialog = useCallback((program: TarbiwiProgram) => {
    setSelectedProgram(program);
    setNewProgram({
      title: program.title,
      description: program.description,
      dayOfWeek: program.dayOfWeek,
      time: program.time,
      duration: program.duration,
      targetAge: program.targetAge,
      isActive: program.isActive,
    });
    setIsEditProgramDialogOpen(true);
  }, []);

  const openDeleteProgramDialog = useCallback((program: TarbiwiProgram) => {
    setSelectedProgram(program);
    setIsDeleteProgramDialogOpen(true);
  }, []);

  // ---- Assignment CRUD ----

  const handleAddAssignment = useCallback(() => {
    if (!newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      toast({
        title: tb.assignments.toast.validationError,
        description: tb.assignments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const assignment = {
      id: Date.now().toString(),
      ...newAssignment,
      createdAt: new Date(),
    };

    setAssignments((prev) => [...prev, assignment]);
    setNewAssignment({ ...INITIAL_ASSIGNMENT });
    setIsAddAssignmentDialogOpen(false);
    toast({
      title: tb.assignments.toast.addSuccess,
      description: tb.assignments.toast.addSuccessDescription,
    });
  }, [newAssignment, toast, tb]);

  const handleEditAssignment = useCallback(() => {
    if (!selectedAssignment || !newAssignment.title || !newAssignment.description || !newAssignment.dueDate) {
      toast({
        title: tb.assignments.toast.validationError,
        description: tb.assignments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    setAssignments((prev) =>
      prev.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              title: newAssignment.title || assignment.title,
              description: newAssignment.description || assignment.description,
              type: newAssignment.type || assignment.type,
              dueDate: newAssignment.dueDate || assignment.dueDate,
              targetAge: newAssignment.targetAge || assignment.targetAge,
              points: newAssignment.points || assignment.points,
              isActive: newAssignment.isActive !== undefined ? newAssignment.isActive : assignment.isActive,
            }
          : assignment
      )
    );

    setIsEditAssignmentDialogOpen(false);
    setSelectedAssignment(null);
    setNewAssignment({ ...INITIAL_ASSIGNMENT });
    toast({
      title: tb.assignments.toast.editSuccess,
      description: tb.assignments.toast.editSuccessDescription,
    });
  }, [selectedAssignment, newAssignment, toast, tb]);

  const handleDeleteAssignment = useCallback(() => {
    if (!selectedAssignment) return;

    setAssignments((prev) => prev.filter((assignment) => assignment.id !== selectedAssignment.id));
    setIsDeleteAssignmentDialogOpen(false);
    setSelectedAssignment(null);
    toast({
      title: tb.assignments.toast.deleteSuccess,
      description: tb.assignments.toast.deleteSuccessDescription,
    });
  }, [selectedAssignment, toast, tb]);

  const openEditAssignmentDialog = useCallback((assignment: TarbiwiAssignment) => {
    setSelectedAssignment(assignment);
    setNewAssignment({
      title: assignment.title,
      description: assignment.description,
      type: assignment.type,
      dueDate: new Date(assignment.dueDate),
      targetAge: assignment.targetAge,
      points: assignment.points,
      isActive: assignment.isActive,
    });
    setIsEditAssignmentDialogOpen(true);
  }, []);

  const openDeleteAssignmentDialog = useCallback((assignment: TarbiwiAssignment) => {
    setSelectedAssignment(assignment);
    setIsDeleteAssignmentDialogOpen(true);
  }, []);

  // ---- Assessment CRUD ----

  const handleAddAssessment = useCallback(() => {
    if (!newAssessment.studentId || !newAssessment.criteria || newAssessment.rating === 0) {
      toast({
        title: tb.assessments.toast.validationError,
        description: tb.assessments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const assessment: Assessment = {
      id: Date.now().toString(),
      ...newAssessment,
    };

    setAssessments((prev) => [...prev, assessment]);
    setNewAssessment({ ...INITIAL_ASSESSMENT });
    setIsAddAssessmentDialogOpen(false);
    toast({
      title: tb.assessments.toast.addSuccess,
      description: tb.assessments.toast.addSuccessDescription,
    });
  }, [newAssessment, toast, tb]);

  return {
    // i18n
    tb,
    tFunc,
    language,

    // Tab
    activeTab,
    setActiveTab,

    // Programs
    programs,
    newProgram,
    setNewProgram,
    selectedProgram,
    isAddProgramDialogOpen,
    setIsAddProgramDialogOpen,
    isEditProgramDialogOpen,
    setIsEditProgramDialogOpen,
    isDeleteProgramDialogOpen,
    setIsDeleteProgramDialogOpen,
    handleAddProgram,
    handleEditProgram,
    handleDeleteProgram,
    openEditProgramDialog,
    openDeleteProgramDialog,

    // Assignments
    assignments,
    newAssignment,
    setNewAssignment,
    selectedAssignment,
    isAddAssignmentDialogOpen,
    setIsAddAssignmentDialogOpen,
    isEditAssignmentDialogOpen,
    setIsEditAssignmentDialogOpen,
    isDeleteAssignmentDialogOpen,
    setIsDeleteAssignmentDialogOpen,
    handleAddAssignment,
    handleEditAssignment,
    handleDeleteAssignment,
    openEditAssignmentDialog,
    openDeleteAssignmentDialog,
    assignmentTypeLabels,

    // Assessments
    assessments,
    newAssessment,
    setNewAssessment,
    isAddAssessmentDialogOpen,
    setIsAddAssessmentDialogOpen,
    handleAddAssessment,

    // Helpers
    daysArray,
  };
}
