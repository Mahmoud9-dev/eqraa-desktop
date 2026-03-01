
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { ExamType, Exam, ExamResult } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

type TabType = ExamType | "results";

const Exams = () => {
  const [activeTab, setActiveTab] = useState<TabType>("قرآن");
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

  // Mock data - will be replaced with actual data from Supabase
  const [exams, setExams] = useState<Exam[]>([
    {
      id: "1",
      type: "قرآن",
      title: "اختبار حفظ سورة البقرة",
      description: "اختبار حفظ سورة البقرة من الآية 1 إلى 100",
      date: new Date("2025-11-10"),
      duration: 60,
      totalMarks: 100,
      passingMarks: 60,
      createdBy: "teacher1",
      isActive: true,
      createdAt: new Date("2025-11-01"),
    },
    {
      id: "2",
      type: "قرآن",
      title: "اختبار مراجعة الجزء الأول",
      description: "اختبار شامل للجزء الأول من القرآن",
      date: new Date("2025-11-15"),
      duration: 90,
      totalMarks: 100,
      passingMarks: 70,
      createdBy: "teacher2",
      isActive: true,
      createdAt: new Date("2025-11-02"),
    },
    {
      id: "3",
      type: "تجويد",
      title: "اختبار أحكام النون الساكنة",
      description: "اختبار في أحكام النون الساكنة والتنوين",
      date: new Date("2025-11-12"),
      duration: 45,
      totalMarks: 50,
      passingMarks: 35,
      createdBy: "teacher1",
      isActive: true,
      createdAt: new Date("2025-11-03"),
    },
    {
      id: "4",
      type: "تربوي",
      title: "اختبار الآداب الإسلامية",
      description: "اختبار في الآداب الإسلامية العامة",
      date: new Date("2025-11-08"),
      duration: 60,
      totalMarks: 100,
      passingMarks: 60,
      createdBy: "teacher3",
      isActive: true,
      createdAt: new Date("2025-11-01"),
    },
  ]);

  const [examResults, setExamResults] = useState<ExamResult[]>([
    {
      id: "1",
      examId: "1",
      studentId: "student1",
      marks: 85,
      percentage: 85,
      status: "ناجح",
      notes: "أداء ممتاز",
      evaluatedBy: "teacher1",
      evaluatedAt: new Date("2025-11-10"),
    },
    {
      id: "2",
      examId: "1",
      studentId: "student2",
      marks: 45,
      percentage: 45,
      status: "راسب",
      notes: "يحتاج للمزيد من المراجعة",
      evaluatedBy: "teacher1",
      evaluatedAt: new Date("2025-11-10"),
    },
    {
      id: "3",
      examId: "3",
      studentId: "student3",
      marks: 40,
      percentage: 80,
      status: "ناجح",
      notes: "فهم جيد للأحكام",
      evaluatedBy: "teacher1",
      evaluatedAt: new Date("2025-11-12"),
    },
  ]);

  // Mock student data
  const students = {
    student1: "أحمد محمد علي",
    student2: "عمر خالد حسن",
    student3: "محمد سعيد أحمد",
  };

  // Mock teacher data
  const teachers = {
    teacher1: "الشيخ أحمد محمد",
    teacher2: "الشيخ خالد حسن",
    teacher3: "الشيخ محمد سعيد",
  };

  // Form state
  const [newExam, setNewExam] = useState<Partial<Exam>>({
    type: "قرآن",
    title: "",
    description: "",
    date: new Date(),
    duration: 60,
    totalMarks: 100,
    passingMarks: 60,
    isActive: true,
  });

  const [newResult, setNewResult] = useState<Partial<ExamResult>>({
    examId: "",
    studentId: "",
    marks: 0,
    percentage: 0,
    status: "ناجح",
    notes: "",
  });

  const filteredExams = exams.filter((exam) => exam.type === activeTab);
  const filteredResults = activeTab === "results"
    ? examResults
    : examResults.filter((result) => {
        const exam = exams.find((e) => e.id === result.examId);
        return exam && exam.type === activeTab;
      });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ناجح":
        return "bg-green-100 text-green-800";
      case "راسب":
        return "bg-red-100 text-red-800";
      case "غائب":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExamStatusColor = (exam: Exam) => {
    const examDate = new Date(exam.date);
    const today = new Date();
    if (examDate < today) return "bg-gray-100 text-gray-800";
    if (examDate.toDateString() === today.toDateString())
      return "bg-blue-100 text-blue-800";
    return "bg-yellow-100 text-yellow-800";
  };

  const getExamStatusText = (exam: Exam) => {
    const examDate = new Date(exam.date);
    const today = new Date();
    if (examDate < today) return t.exams.status.completed;
    if (examDate.toDateString() === today.toDateString()) return t.exams.status.today;
    return t.exams.status.upcoming;
  };

  const getExamTypeLabel = (type: ExamType): string => {
    const typeMap: Record<ExamType, string> = {
      'قرآن': t.exams.examTypes.quran,
      'تجويد': t.exams.examTypes.tajweed,
      'تربوي': t.exams.examTypes.educational,
    };
    return typeMap[type] || type;
  };

  const getResultStatusLabel = (status: string): string => {
    const statusMap: Record<string, string> = {
      'ناجح': t.exams.status.passed,
      'راسب': t.exams.status.failed,
      'غائب': t.exams.status.absent,
    };
    return statusMap[status] || status;
  };

  const examStatusFilters = [
    { key: "upcoming" as const, filter: (d: Date, now: Date) => d > now },
    { key: "today" as const, filter: (d: Date, now: Date) => d.toDateString() === now.toDateString() },
    { key: "completed" as const, filter: (d: Date, now: Date) => d < now },
  ];

  // CRUD functions
  const handleAddExam = () => {
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
      createdBy: "current_user", // Will be replaced with actual user ID
      isActive: newExam.isActive || true,
      createdAt: new Date(),
    };

    setExams([...exams, exam]);
    setNewExam({
      type: "قرآن",
      title: "",
      description: "",
      date: new Date(),
      duration: 60,
      totalMarks: 100,
      passingMarks: 60,
      isActive: true,
    });
    setIsAddDialogOpen(false);
    toast({
      title: t.exams.toasts.addSuccess,
      description: t.exams.toasts.addSuccessDescription,
    });
  };

  const handleEditExam = () => {
    if (
      !selectedExam ||
      !newExam.title ||
      !newExam.description ||
      !newExam.date
    ) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    setExams(
      exams.map((exam) =>
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
              isActive:
                newExam.isActive !== undefined
                  ? newExam.isActive
                  : exam.isActive,
            }
          : exam
      )
    );

    setIsEditDialogOpen(false);
    setSelectedExam(null);
    setNewExam({
      type: "قرآن",
      title: "",
      description: "",
      date: new Date(),
      duration: 60,
      totalMarks: 100,
      passingMarks: 60,
      isActive: true,
    });
    toast({
      title: t.exams.toasts.editSuccess,
      description: t.exams.toasts.editSuccessDescription,
    });
  };

  const handleDeleteExam = () => {
    if (!selectedExam) return;

    setExams(exams.filter((exam) => exam.id !== selectedExam.id));
    setIsDeleteDialogOpen(false);
    setSelectedExam(null);
    toast({
      title: t.exams.toasts.deleteSuccess,
      description: t.exams.toasts.deleteSuccessDescription,
    });
  };

  const handleAddResult = () => {
    if (
      !newResult.examId ||
      !newResult.studentId ||
      newResult.marks === undefined
    ) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const exam = exams.find((e) => e.id === newResult.examId);
    if (!exam) return;

    const percentage = Math.round((newResult.marks / exam.totalMarks) * 100);
    const status = percentage >= exam.passingMarks ? "ناجح" : "راسب";

    const result: ExamResult = {
      id: Date.now().toString(),
      examId: newResult.examId,
      studentId: newResult.studentId,
      marks: newResult.marks,
      percentage,
      status,
      notes: newResult.notes,
      evaluatedBy: "current_user", // Will be replaced with actual user ID
      evaluatedAt: new Date(),
    };

    setExamResults([...examResults, result]);
    setNewResult({
      examId: "",
      studentId: "",
      marks: 0,
      percentage: 0,
      status: "ناجح",
      notes: "",
    });
    setIsResultDialogOpen(false);
    toast({
      title: t.exams.toasts.resultAddSuccess,
      description: t.exams.toasts.resultAddSuccessDescription,
    });
  };

  const openEditDialog = (exam: Exam) => {
    setSelectedExam(exam);
    setNewExam({
      type: exam.type,
      title: exam.title,
      description: exam.description,
      date: exam.date,
      duration: exam.duration,
      totalMarks: exam.totalMarks,
      passingMarks: exam.passingMarks,
      isActive: exam.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (exam: Exam) => {
    setSelectedExam(exam);
    setIsDeleteDialogOpen(true);
  };

  const openResultDialog = (examId: string) => {
    setNewResult({ ...newResult, examId });
    setIsResultDialogOpen(true);
  };

  const openEditResultDialog = (result: ExamResult) => {
    setSelectedResult(result);
    setNewResult({
      examId: result.examId,
      studentId: result.studentId,
      marks: result.marks,
      percentage: result.percentage,
      status: result.status,
      notes: result.notes,
    });
    setIsEditResultDialogOpen(true);
  };

  const openDeleteResultDialog = (result: ExamResult) => {
    setSelectedResult(result);
    setIsDeleteResultDialogOpen(true);
  };

  const handleEditResult = () => {
    if (!selectedResult || !newResult.marks) {
      toast({
        title: t.exams.toasts.error,
        description: t.exams.toasts.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const exam = exams.find((e) => e.id === selectedResult.examId);
    if (!exam) return;

    const percentage = Math.round((newResult.marks / exam.totalMarks) * 100);
    const status = percentage >= (exam.passingMarks / exam.totalMarks * 100) ? "ناجح" : "راسب";

    setExamResults(
      examResults.map((r) =>
        r.id === selectedResult.id
          ? {
              ...r,
              marks: newResult.marks!,
              percentage,
              status,
              notes: newResult.notes,
            }
          : r
      )
    );

    setIsEditResultDialogOpen(false);
    setSelectedResult(null);
    setNewResult({
      examId: "",
      studentId: "",
      marks: 0,
      percentage: 0,
      status: "ناجح",
      notes: "",
    });
    toast({
      title: t.exams.toasts.resultEditSuccess,
      description: t.exams.toasts.resultEditSuccessDescription,
    });
  };

  const handleDeleteResult = () => {
    if (!selectedResult) return;

    setExamResults(examResults.filter((r) => r.id !== selectedResult.id));
    setIsDeleteResultDialogOpen(false);
    setSelectedResult(null);
    toast({
      title: t.exams.toasts.resultDeleteSuccess,
      description: t.exams.toasts.resultDeleteSuccessDescription,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.exams.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">📝 {t.exams.heading}</h2>
          <p className="text-muted-foreground mb-6">
            {t.exams.headingDescription}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <Input placeholder={t.exams.searchPlaceholder} className="w-full sm:w-64" />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  {t.exams.actions.createExam}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t.exams.addDialog.title}</DialogTitle>
                  <DialogDescription>
                    {t.exams.addDialog.description}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      {t.exams.form.typeLabel}
                    </Label>
                    <Select
                      value={newExam.type}
                      onValueChange={(value) =>
                        setNewExam({ ...newExam, type: value as ExamType })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t.exams.form.selectType} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="قرآن">{t.exams.examTypes.quran}</SelectItem>
                        <SelectItem value="تجويد">{t.exams.examTypes.tajweed}</SelectItem>
                        <SelectItem value="تربوي">{t.exams.examTypes.educational}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      {t.exams.form.titleLabel}
                    </Label>
                    <Input
                      id="title"
                      value={newExam.title}
                      onChange={(e) =>
                        setNewExam({ ...newExam, title: e.target.value })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      {t.exams.form.descriptionLabel}
                    </Label>
                    <Textarea
                      id="description"
                      value={newExam.description}
                      onChange={(e) =>
                        setNewExam({ ...newExam, description: e.target.value })
                      }
                      className="col-span-3"
                      rows={3}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      {t.exams.form.dateLabel}
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newExam.date?.toISOString().split("T")[0]}
                      onChange={(e) =>
                        setNewExam({
                          ...newExam,
                          date: new Date(e.target.value),
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="duration" className="text-right">
                      {t.exams.form.durationLabel}
                    </Label>
                    <Input
                      id="duration"
                      type="number"
                      value={newExam.duration}
                      onChange={(e) =>
                        setNewExam({
                          ...newExam,
                          duration: parseInt(e.target.value) || 60,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="totalMarks" className="text-right">
                      {t.exams.form.totalMarksLabel}
                    </Label>
                    <Input
                      id="totalMarks"
                      type="number"
                      value={newExam.totalMarks}
                      onChange={(e) =>
                        setNewExam({
                          ...newExam,
                          totalMarks: parseInt(e.target.value) || 100,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="passingMarks" className="text-right">
                      {t.exams.form.passingMarksLabel}
                    </Label>
                    <Input
                      id="passingMarks"
                      type="number"
                      value={newExam.passingMarks}
                      onChange={(e) =>
                        setNewExam({
                          ...newExam,
                          passingMarks: parseInt(e.target.value) || 60,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    {t.common.cancel}
                  </Button>
                  <Button onClick={handleAddExam}>{t.exams.actions.createExam}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-4 gap-1 p-1">
              <TabsTrigger value="قرآن" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                {t.exams.tabs.quranExams}
              </TabsTrigger>
              <TabsTrigger value="تجويد" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                {t.exams.tabs.tajweedExams}
              </TabsTrigger>
              <TabsTrigger value="تربوي" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                {t.exams.tabs.educationalExams}
              </TabsTrigger>
              <TabsTrigger value="results" className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                {t.exams.tabs.resultsAndStats}
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="قرآن" className="mt-6">
            <div className="space-y-6">
              {/* عرض الامتحانات حسب الحالة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examStatusFilters.map(({ key, filter }) => {
                  const statusExams = filteredExams.filter((exam) =>
                    filter(new Date(exam.date), new Date())
                  );

                  if (statusExams.length === 0) return null;

                  return (
                    <Card
                      key={key}
                      className="border-r-4 border-r-primary/20"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{t.exams.cards.examsStatus.replace('{{status}}', t.exams.status[key])}</span>
                          <Badge variant="outline">
                            {t.exams.cards.examCount.replace('{{count}}', String(statusExams.length))}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {statusExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="p-3 border rounded-lg bg-muted/30"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-sm">
                                {exam.title}
                              </h5>
                              <Badge className={getExamStatusColor(exam)}>
                                {getExamStatusText(exam)}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {exam.description}
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                              <span>
                                📅 {formatDate(exam.date, language)}
                              </span>
                              <span>⏱️ {exam.duration} {t.exams.cards.minute}</span>
                              <span>📊 {exam.totalMarks} {t.exams.cards.mark}</span>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                                className="text-xs"
                              >
                                {t.exams.actions.result}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* عرض جميع الامتحانات في جدول */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.exams.cards.allExamsOfType.replace('{{type}}', getExamTypeLabel(activeTab as ExamType))}</CardTitle>
                  <CardDescription>
                    {t.exams.cards.allExamsTable}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.exams.table.examTitle}</TableHead>
                        <TableHead>{t.exams.table.date}</TableHead>
                        <TableHead>{t.exams.table.duration}</TableHead>
                        <TableHead>{t.exams.table.totalMarks}</TableHead>
                        <TableHead>{t.exams.table.status}</TableHead>
                        <TableHead>{t.exams.table.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">
                            {exam.title}
                          </TableCell>
                          <TableCell>
                            {formatDate(exam.date, language)}
                          </TableCell>
                          <TableCell>{exam.duration} {t.exams.cards.minute}</TableCell>
                          <TableCell>{exam.totalMarks}</TableCell>
                          <TableCell>
                            <Badge className={getExamStatusColor(exam)}>
                              {getExamStatusText(exam)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                              >
                                {t.exams.actions.addResult}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="تجويد" className="mt-6">
            <div className="space-y-6">
              {/* عرض الامتحانات حسب الحالة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examStatusFilters.map(({ key, filter }) => {
                  const statusExams = filteredExams.filter((exam) =>
                    filter(new Date(exam.date), new Date())
                  );

                  if (statusExams.length === 0) return null;

                  return (
                    <Card
                      key={key}
                      className="border-r-4 border-r-primary/20"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{t.exams.cards.examsStatus.replace('{{status}}', t.exams.status[key])}</span>
                          <Badge variant="outline">
                            {t.exams.cards.examCount.replace('{{count}}', String(statusExams.length))}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {statusExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="p-3 border rounded-lg bg-muted/30"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-sm">
                                {exam.title}
                              </h5>
                              <Badge className={getExamStatusColor(exam)}>
                                {getExamStatusText(exam)}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {exam.description}
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                              <span>
                                📅 {formatDate(exam.date, language)}
                              </span>
                              <span>⏱️ {exam.duration} {t.exams.cards.minute}</span>
                              <span>📊 {exam.totalMarks} {t.exams.cards.mark}</span>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                                className="text-xs"
                              >
                                {t.exams.actions.result}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* عرض جميع الامتحانات في جدول */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.exams.cards.allExamsOfType.replace('{{type}}', t.exams.examTypes.tajweed)}</CardTitle>
                  <CardDescription>
                    {t.exams.cards.allExamsTable}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.exams.table.examTitle}</TableHead>
                        <TableHead>{t.exams.table.date}</TableHead>
                        <TableHead>{t.exams.table.duration}</TableHead>
                        <TableHead>{t.exams.table.totalMarks}</TableHead>
                        <TableHead>{t.exams.table.status}</TableHead>
                        <TableHead>{t.exams.table.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">
                            {exam.title}
                          </TableCell>
                          <TableCell>
                            {formatDate(exam.date, language)}
                          </TableCell>
                          <TableCell>{exam.duration} {t.exams.cards.minute}</TableCell>
                          <TableCell>{exam.totalMarks}</TableCell>
                          <TableCell>
                            <Badge className={getExamStatusColor(exam)}>
                              {getExamStatusText(exam)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                              >
                                {t.exams.actions.addResult}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="تربوي" className="mt-6">
            <div className="space-y-6">
              {/* عرض الامتحانات حسب الحالة */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {examStatusFilters.map(({ key, filter }) => {
                  const statusExams = filteredExams.filter((exam) =>
                    filter(new Date(exam.date), new Date())
                  );

                  if (statusExams.length === 0) return null;

                  return (
                    <Card
                      key={key}
                      className="border-r-4 border-r-primary/20"
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center justify-between">
                          <span>{t.exams.cards.examsStatus.replace('{{status}}', t.exams.status[key])}</span>
                          <Badge variant="outline">
                            {t.exams.cards.examCount.replace('{{count}}', String(statusExams.length))}
                          </Badge>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {statusExams.map((exam) => (
                          <div
                            key={exam.id}
                            className="p-3 border rounded-lg bg-muted/30"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-sm">
                                {exam.title}
                              </h5>
                              <Badge className={getExamStatusColor(exam)}>
                                {getExamStatusText(exam)}
                              </Badge>
                            </div>
                            <div className="text-xs text-muted-foreground mb-2">
                              {exam.description}
                            </div>
                            <div className="flex justify-between items-center text-xs text-muted-foreground mb-3">
                              <span>
                                📅 {formatDate(exam.date, language)}
                              </span>
                              <span>⏱️ {exam.duration} {t.exams.cards.minute}</span>
                              <span>📊 {exam.totalMarks} {t.exams.cards.mark}</span>
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                                className="text-xs"
                              >
                                {t.exams.actions.result}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                                className="text-xs"
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* عرض جميع الامتحانات في جدول */}
              <Card>
                <CardHeader>
                  <CardTitle>{t.exams.cards.allExamsOfType.replace('{{type}}', t.exams.examTypes.educational)}</CardTitle>
                  <CardDescription>
                    {t.exams.cards.allExamsTable}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.exams.table.examTitle}</TableHead>
                        <TableHead>{t.exams.table.date}</TableHead>
                        <TableHead>{t.exams.table.duration}</TableHead>
                        <TableHead>{t.exams.table.totalMarks}</TableHead>
                        <TableHead>{t.exams.table.status}</TableHead>
                        <TableHead>{t.exams.table.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredExams.map((exam) => (
                        <TableRow key={exam.id}>
                          <TableCell className="font-medium">
                            {exam.title}
                          </TableCell>
                          <TableCell>
                            {formatDate(exam.date, language)}
                          </TableCell>
                          <TableCell>{exam.duration} {t.exams.cards.minute}</TableCell>
                          <TableCell>{exam.totalMarks}</TableCell>
                          <TableCell>
                            <Badge className={getExamStatusColor(exam)}>
                              {getExamStatusText(exam)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openResultDialog(exam.id)}
                              >
                                {t.exams.actions.addResult}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(exam)}
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(exam)}
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="results" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.exams.results.title}</CardTitle>
                  <CardDescription>
                    {t.exams.results.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredResults.map((result) => {
                      const exam = exams.find((e) => e.id === result.examId);
                      return (
                        <div key={result.id} className="p-4 border rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium">
                              {
                                students[
                                  result.studentId as keyof typeof students
                                ]
                              }
                            </h4>
                            <Badge className={getStatusColor(result.status)}>
                              {getResultStatusLabel(result.status)}
                            </Badge>
                          </div>
                          <div className="text-sm text-muted-foreground mb-2">
                            {exam?.title} • {result.percentage}%
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-sm">
                              {t.exams.results.scoreLabel} {result.marks}/{exam?.totalMarks}
                            </div>
                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditResultDialog(result)}
                              >
                                {t.exams.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteResultDialog(result)}
                              >
                                {t.exams.actions.delete}
                              </Button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.exams.stats.title}</CardTitle>
                  <CardDescription>{t.exams.stats.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{t.exams.stats.passRate}</h4>
                      <div className="text-2xl font-bold text-green-600">
                        {filteredResults.length > 0
                          ? Math.round(
                              (filteredResults.filter((r) => r.status === "ناجح")
                                .length /
                                filteredResults.length) *
                                100
                            )
                          : 0}
                        %
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{t.exams.stats.averageScore}</h4>
                      <div className="text-2xl font-bold text-blue-600">
                        {filteredResults.length > 0
                          ? Math.round(
                              filteredResults.reduce(
                                (acc, r) => acc + r.percentage,
                                0
                              ) / filteredResults.length
                            )
                          : 0}
                        %
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-medium mb-2">{t.exams.stats.totalExams}</h4>
                      <div className="text-2xl font-bold text-purple-600">
                        {exams.length}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.exams.editDialog.title}</DialogTitle>
            <DialogDescription>{t.exams.editDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                {t.exams.form.typeLabel}
              </Label>
              <Select
                value={newExam.type}
                onValueChange={(value) =>
                  setNewExam({ ...newExam, type: value as ExamType })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t.exams.form.selectType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="قرآن">{t.exams.examTypes.quran}</SelectItem>
                  <SelectItem value="تجويد">{t.exams.examTypes.tajweed}</SelectItem>
                  <SelectItem value="تربوي">{t.exams.examTypes.educational}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                {t.exams.form.titleLabel}
              </Label>
              <Input
                id="edit-title"
                value={newExam.title}
                onChange={(e) =>
                  setNewExam({ ...newExam, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                {t.exams.form.descriptionLabel}
              </Label>
              <Textarea
                id="edit-description"
                value={newExam.description}
                onChange={(e) =>
                  setNewExam({ ...newExam, description: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                {t.exams.form.dateLabel}
              </Label>
              <Input
                id="edit-date"
                type="date"
                value={newExam.date?.toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewExam({ ...newExam, date: new Date(e.target.value) })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">
                {t.exams.form.durationLabel}
              </Label>
              <Input
                id="edit-duration"
                type="number"
                value={newExam.duration}
                onChange={(e) =>
                  setNewExam({
                    ...newExam,
                    duration: parseInt(e.target.value) || 60,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-totalMarks" className="text-right">
                {t.exams.form.totalMarksLabel}
              </Label>
              <Input
                id="edit-totalMarks"
                type="number"
                value={newExam.totalMarks}
                onChange={(e) =>
                  setNewExam({
                    ...newExam,
                    totalMarks: parseInt(e.target.value) || 100,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-passingMarks" className="text-right">
                {t.exams.form.passingMarksLabel}
              </Label>
              <Input
                id="edit-passingMarks"
                type="number"
                value={newExam.passingMarks}
                onChange={(e) =>
                  setNewExam({
                    ...newExam,
                    passingMarks: parseInt(e.target.value) || 60,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              {t.common.cancel}
            </Button>
            <Button onClick={handleEditExam}>{t.exams.actions.saveChanges}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.exams.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {t.exams.deleteDialog.description.replace('{{title}}', selectedExam?.title || '')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteExam}>
              {t.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Result Dialog */}
      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.exams.resultDialog.title}</DialogTitle>
            <DialogDescription>{t.exams.resultDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="student" className="text-right">
                {t.exams.table.student}
              </Label>
              <Select
                value={newResult.studentId}
                onValueChange={(value) =>
                  setNewResult({ ...newResult, studentId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t.exams.form.selectStudent} />
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
                {t.exams.form.marksLabel}
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
                {t.exams.form.notesLabel}
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
              {t.common.cancel}
            </Button>
            <Button onClick={handleAddResult}>{t.exams.actions.addResult}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Result Dialog */}
      <Dialog open={isEditResultDialogOpen} onOpenChange={setIsEditResultDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.exams.editResultDialog.title}</DialogTitle>
            <DialogDescription>{t.exams.editResultDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-marks" className="text-right">
                {t.exams.form.marksLabel}
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
                {t.exams.form.notesLabel}
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
              {t.common.cancel}
            </Button>
            <Button onClick={handleEditResult}>{t.exams.actions.saveChanges}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Result Dialog */}
      <Dialog open={isDeleteResultDialogOpen} onOpenChange={setIsDeleteResultDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.exams.deleteResultDialog.title}</DialogTitle>
            <DialogDescription>
              {t.exams.deleteResultDialog.description}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteResultDialogOpen(false)}
            >
              {t.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteResult}>
              {t.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exams;
