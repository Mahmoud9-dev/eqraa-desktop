import { useState, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { QuranCircle, CircleMember, MemorizationRecord } from "@/types";

const INITIAL_CIRCLE_FORM: Partial<QuranCircle> = {
  name: "",
  supervisorId: "",
  description: "",
  dailyMemorization: "",
  dailyRevision: "",
  weeklyEvaluation: "",
  isActive: true,
};

const INITIAL_MEMBER_FORM: Partial<CircleMember> = {
  circleId: "",
  studentId: "",
  isActive: true,
};

const INITIAL_RECORD_FORM: Partial<MemorizationRecord> = {
  studentId: "",
  circleId: "",
  date: new Date(),
  surahName: "",
  versesFrom: 1,
  versesTo: 1,
  memorizationType: "حفظ جديد",
  evaluation: 0,
  notes: "",
};

// Mock data for display
const students: Record<string, string> = {
  student1: "أحمد محمد علي",
  student2: "عمر خالد حسن",
  student3: "محمد سعيد أحمد",
};

const teachers: Record<string, string> = {
  teacher1: "الشيخ أحمد محمد",
  teacher2: "الشيخ خالد حسن",
  teacher3: "الشيخ محمد سعيد",
};

// Mock data - will be replaced with actual data from database
const INITIAL_CIRCLES: QuranCircle[] = [
  {
    id: "1",
    name: "حلقة حفظ القرآن الكريم - الصباحية",
    supervisorId: "teacher1",
    description: "حلقة متخصصة في حفظ القرآن الكريم للمرحلة الابتدائية",
    dailyMemorization: "صفحة واحدة يومياً",
    dailyRevision: "ربع صفحة يومياً",
    weeklyEvaluation: "اختبار شامل يوم الجمعة",
    isActive: true,
    createdAt: new Date("2025-09-01"),
  },
  {
    id: "2",
    name: "حلقة التجويد والقراءات",
    supervisorId: "teacher2",
    description: "حلقة متخصصة في تعليم أحكام التجويد والقراءات",
    dailyMemorization: "نصف صفحة مع التجويد",
    dailyRevision: "نصف صفحة مراجعة",
    weeklyEvaluation: "تقييم أداء القراءة",
    isActive: true,
    createdAt: new Date("2025-09-15"),
  },
  {
    id: "3",
    name: "حلقة المراجعة الشاملة",
    supervisorId: "teacher3",
    description: "حلقة لمراجعة ما تم حفظه من القرآن الكريم",
    dailyMemorization: "جزء واحد أسبوعياً",
    dailyRevision: "جزء واحد يومياً",
    weeklyEvaluation: "اختبار شامل للمحفوظ",
    isActive: true,
    createdAt: new Date("2025-10-01"),
  },
];

const INITIAL_MEMBERS: CircleMember[] = [
  {
    id: "1",
    circleId: "1",
    studentId: "student1",
    joinDate: new Date("2025-09-01"),
    isActive: true,
  },
  {
    id: "2",
    circleId: "1",
    studentId: "student2",
    joinDate: new Date("2025-09-05"),
    isActive: true,
  },
  {
    id: "3",
    circleId: "2",
    studentId: "student3",
    joinDate: new Date("2025-09-15"),
    isActive: true,
  },
];

const INITIAL_RECORDS: MemorizationRecord[] = [
  {
    id: "1",
    studentId: "student1",
    circleId: "1",
    date: new Date("2025-11-01"),
    surahName: "سورة البقرة",
    versesFrom: 1,
    versesTo: 10,
    memorizationType: "حفظ جديد",
    evaluation: 9,
    notes: "حفظ ممتاز وأداء جيد",
    evaluatedBy: "teacher1",
  },
  {
    id: "2",
    studentId: "student2",
    circleId: "1",
    date: new Date("2025-11-02"),
    surahName: "سورة آل عمران",
    versesFrom: 1,
    versesTo: 5,
    memorizationType: "مراجعة",
    evaluation: 8,
    notes: "مراجعة جيدة تحتاج لبعض التحسين",
    evaluatedBy: "teacher1",
  },
  {
    id: "3",
    studentId: "student3",
    circleId: "2",
    date: new Date("2025-11-03"),
    surahName: "سورة الفاتحة",
    versesFrom: 1,
    versesTo: 7,
    memorizationType: "حفظ جديد",
    evaluation: 10,
    notes: "حفظ ممتاز وتجويد متقن",
    evaluatedBy: "teacher2",
  },
];

export function useQuranCircles() {
  const { t, tFunc, language } = useLanguage();
  const qc = t.quranCircles;
  const { toast } = useToast();

  // Tab state
  const [activeTab, setActiveTab] = useState("circles");

  // Dialog visibility state
  const [isAddCircleDialogOpen, setIsAddCircleDialogOpen] = useState(false);
  const [isEditCircleDialogOpen, setIsEditCircleDialogOpen] = useState(false);
  const [isDeleteCircleDialogOpen, setIsDeleteCircleDialogOpen] =
    useState(false);
  const [isAddMemberDialogOpen, setIsAddMemberDialogOpen] = useState(false);
  const [isAddRecordDialogOpen, setIsAddRecordDialogOpen] = useState(false);

  // Selection state
  const [selectedCircle, setSelectedCircle] = useState<QuranCircle | null>(
    null
  );

  // Data state
  const [circles, setCircles] = useState<QuranCircle[]>(INITIAL_CIRCLES);
  const [circleMembers, setCircleMembers] =
    useState<CircleMember[]>(INITIAL_MEMBERS);
  const [memorizationRecords, setMemorizationRecords] =
    useState<MemorizationRecord[]>(INITIAL_RECORDS);

  // Form state
  const [newCircle, setNewCircle] =
    useState<Partial<QuranCircle>>(INITIAL_CIRCLE_FORM);
  const [newMember, setNewMember] =
    useState<Partial<CircleMember>>(INITIAL_MEMBER_FORM);
  const [newRecord, setNewRecord] =
    useState<Partial<MemorizationRecord>>(INITIAL_RECORD_FORM);

  // Label map for DB canonical memorization type values (memoized)
  const memorizationTypeLabel: Record<string, string> = useMemo(() => ({
    "حفظ جديد": qc.memorizationType.newMemorization,
    "مراجعة": qc.memorizationType.revision,
  }), [qc]);

  // Utility functions
  const getEvaluationColor = useCallback((evaluation: number) => {
    if (evaluation >= 9) return "bg-green-100 text-green-800";
    if (evaluation >= 7) return "bg-blue-100 text-blue-800";
    if (evaluation >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  }, []);

  const getMemorizationTypeColor = useCallback((type: string) => {
    return type === "حفظ جديد"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  }, []);

  const getCircleMembers = useCallback((circleId: string) => {
    return circleMembers.filter((member) => member.circleId === circleId);
  }, [circleMembers]);

  // CRUD functions
  const handleAddCircle = useCallback(() => {
    if (!newCircle.name || !newCircle.supervisorId) {
      toast({
        title: qc.toast.error,
        description: qc.toast.fillRequired,
        variant: "destructive",
      });
      return;
    }

    const circle: QuranCircle = {
      id: Date.now().toString(),
      name: newCircle.name || "",
      supervisorId: newCircle.supervisorId || "",
      description: newCircle.description,
      dailyMemorization: newCircle.dailyMemorization || "",
      dailyRevision: newCircle.dailyRevision || "",
      weeklyEvaluation: newCircle.weeklyEvaluation || "",
      isActive: newCircle.isActive || true,
      createdAt: new Date(),
    };

    setCircles((prev) => [...prev, circle]);
    setNewCircle({ ...INITIAL_CIRCLE_FORM });
    setIsAddCircleDialogOpen(false);
    toast({
      title: qc.toast.addedTitle,
      description: qc.toast.circleAdded,
    });
  }, [newCircle, toast, qc]);

  const handleEditCircle = useCallback(() => {
    if (!selectedCircle || !newCircle.name || !newCircle.supervisorId) {
      toast({
        title: qc.toast.error,
        description: qc.toast.fillRequired,
        variant: "destructive",
      });
      return;
    }

    setCircles((prev) =>
      prev.map((circle) =>
        circle.id === selectedCircle.id
          ? {
              ...circle,
              name: newCircle.name || circle.name,
              supervisorId: newCircle.supervisorId || circle.supervisorId,
              description: newCircle.description || circle.description,
              dailyMemorization:
                newCircle.dailyMemorization || circle.dailyMemorization,
              dailyRevision: newCircle.dailyRevision || circle.dailyRevision,
              weeklyEvaluation:
                newCircle.weeklyEvaluation || circle.weeklyEvaluation,
              isActive:
                newCircle.isActive !== undefined
                  ? newCircle.isActive
                  : circle.isActive,
            }
          : circle
      )
    );

    setIsEditCircleDialogOpen(false);
    setSelectedCircle(null);
    setNewCircle({ ...INITIAL_CIRCLE_FORM });
    toast({
      title: qc.toast.editedTitle,
      description: qc.toast.circleEdited,
    });
  }, [selectedCircle, newCircle, toast, qc]);

  const handleDeleteCircle = useCallback(() => {
    if (!selectedCircle) return;

    setCircles((prev) => prev.filter((circle) => circle.id !== selectedCircle.id));
    setIsDeleteCircleDialogOpen(false);
    setSelectedCircle(null);
    toast({
      title: qc.toast.deletedTitle,
      description: qc.toast.circleDeleted,
    });
  }, [selectedCircle, toast, qc]);

  const handleAddMember = useCallback(() => {
    if (!newMember.circleId || !newMember.studentId) {
      toast({
        title: qc.toast.error,
        description: qc.toast.selectCircleAndStudent,
        variant: "destructive",
      });
      return;
    }

    const member: CircleMember = {
      id: Date.now().toString(),
      circleId: newMember.circleId || "",
      studentId: newMember.studentId || "",
      joinDate: new Date(),
      isActive: newMember.isActive || true,
    };

    setCircleMembers((prev) => [...prev, member]);
    setNewMember({ ...INITIAL_MEMBER_FORM });
    setIsAddMemberDialogOpen(false);
    toast({
      title: qc.toast.addedTitle,
      description: qc.toast.memberAdded,
    });
  }, [newMember, toast, qc]);

  const handleAddRecord = useCallback(() => {
    if (!newRecord.studentId || !newRecord.circleId || !newRecord.surahName) {
      toast({
        title: qc.toast.error,
        description: qc.toast.fillRecordRequired,
        variant: "destructive",
      });
      return;
    }

    const record: MemorizationRecord = {
      id: Date.now().toString(),
      studentId: newRecord.studentId || "",
      circleId: newRecord.circleId || "",
      date: newRecord.date || new Date(),
      surahName: newRecord.surahName || "",
      versesFrom: newRecord.versesFrom || 1,
      versesTo: newRecord.versesTo || 1,
      memorizationType:
        (newRecord.memorizationType as "حفظ جديد" | "مراجعة") || "حفظ جديد",
      evaluation: newRecord.evaluation || 0,
      notes: newRecord.notes,
      evaluatedBy: "current_user",
    };

    setMemorizationRecords((prev) => [...prev, record]);
    setNewRecord({ ...INITIAL_RECORD_FORM });
    setIsAddRecordDialogOpen(false);
    toast({
      title: qc.toast.addedTitle,
      description: qc.toast.recordAdded,
    });
  }, [newRecord, toast, qc]);

  const openEditCircleDialog = useCallback((circle: QuranCircle) => {
    setSelectedCircle(circle);
    setNewCircle({
      name: circle.name,
      supervisorId: circle.supervisorId,
      description: circle.description,
      dailyMemorization: circle.dailyMemorization,
      dailyRevision: circle.dailyRevision,
      weeklyEvaluation: circle.weeklyEvaluation,
      isActive: circle.isActive,
    });
    setIsEditCircleDialogOpen(true);
  }, []);

  const openDeleteCircleDialog = useCallback((circle: QuranCircle) => {
    setSelectedCircle(circle);
    setIsDeleteCircleDialogOpen(true);
  }, []);

  return {
    // i18n
    qc,
    tFunc,
    language,
    // Lookups
    students,
    teachers,
    memorizationTypeLabel,
    // Tab
    activeTab,
    setActiveTab,
    // Data
    circles,
    circleMembers,
    memorizationRecords,
    // Dialogs
    isAddCircleDialogOpen,
    setIsAddCircleDialogOpen,
    isEditCircleDialogOpen,
    setIsEditCircleDialogOpen,
    isDeleteCircleDialogOpen,
    setIsDeleteCircleDialogOpen,
    isAddMemberDialogOpen,
    setIsAddMemberDialogOpen,
    isAddRecordDialogOpen,
    setIsAddRecordDialogOpen,
    // Selection
    selectedCircle,
    // Form state
    newCircle,
    setNewCircle,
    newMember,
    setNewMember,
    newRecord,
    setNewRecord,
    // Utilities
    getEvaluationColor,
    getMemorizationTypeColor,
    getCircleMembers,
    // CRUD handlers
    handleAddCircle,
    handleEditCircle,
    handleDeleteCircle,
    handleAddMember,
    handleAddRecord,
    openEditCircleDialog,
    openDeleteCircleDialog,
  };
}

export type UseQuranCirclesReturn = ReturnType<typeof useQuranCircles>;
