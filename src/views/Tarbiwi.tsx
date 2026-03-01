
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

const Tarbiwi = () => {
  const { t, tFunc, language } = useLanguage();
  const tb = t.tarbiwi;

  const [activeTab, setActiveTab] = useState("programs");
  const [isAddProgramDialogOpen, setIsAddProgramDialogOpen] = useState(false);
  const [isEditProgramDialogOpen, setIsEditProgramDialogOpen] = useState(false);
  const [isDeleteProgramDialogOpen, setIsDeleteProgramDialogOpen] =
    useState(false);
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] =
    useState(false);
  const [isEditAssignmentDialogOpen, setIsEditAssignmentDialogOpen] =
    useState(false);
  const [isDeleteAssignmentDialogOpen, setIsDeleteAssignmentDialogOpen] =
    useState(false);
  const [isAddAssessmentDialogOpen, setIsAddAssessmentDialogOpen] =
    useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<any>(null);
  const { toast } = useToast();

  // Mock data - will be replaced with actual data from Supabase
  const [programs, setPrograms] = useState([
    {
      id: "1",
      title: "برنامج الآداب الإسلامية",
      description: "برنامج أسبوعي لتعليم الآداب الإسلامية والسلوكيات الحميدة",
      dayOfWeek: 1, // Sunday
      time: "09:00",
      duration: 60,
      targetAge: "6-12",
      isActive: true,
      createdAt: new Date("2025-09-01"),
    },
    {
      id: "2",
      title: "برنامج القيم والأخلاق",
      description: "برنامج لغرس القيم الإسلامية والأخلاق الحميدة",
      dayOfWeek: 3, // Tuesday
      time: "10:00",
      duration: 45,
      targetAge: "13-18",
      isActive: true,
      createdAt: new Date("2025-09-15"),
    },
    {
      id: "3",
      title: "برنامج العبادات اليومية",
      description: "برنامج لتعزيز العبادات اليومية والالتزام بها",
      dayOfWeek: 5, // Thursday
      time: "11:00",
      duration: 30,
      targetAge: "جميع الأعمار",
      isActive: true,
      createdAt: new Date("2025-10-01"),
    },
  ]);

  const [assignments, setAssignments] = useState([
    {
      id: "1",
      title: "حفظ سورة الفاتحة مع معانيها",
      description: "حفظ سورة الفاتحة وفهم معانيها وتطبيقها في الحياة",
      type: "عبادية",
      dueDate: new Date("2025-11-10"),
      targetAge: "6-12",
      points: 10,
      isActive: true,
      createdAt: new Date("2025-11-01"),
    },
    {
      id: "2",
      title: "بر الوضوء والصلاة",
      description: "الالتزام بالوضوء والصلاة في أوقاتها وتسجيل ذلك",
      type: "عبادية",
      dueDate: new Date("2025-11-15"),
      targetAge: "جميع الأعمار",
      points: 15,
      isActive: true,
      createdAt: new Date("2025-11-02"),
    },
    {
      id: "3",
      title: "مساعدة الوالدين",
      description: "مساعدة الوالدين في أعمال المنزل وتقدير جهودهم",
      type: "سلوكية",
      dueDate: new Date("2025-11-08"),
      targetAge: "جميع الأعمار",
      points: 20,
      isActive: true,
      createdAt: new Date("2025-11-03"),
    },
  ]);

  const [assessments, setAssessments] = useState([
    {
      id: "1",
      studentId: "student1",
      date: new Date("2025-11-01"),
      criteria: "الالتزام بالصلاة",
      rating: 9,
      notes: "ممتاز في الالتزام بالصلاة في أوقاتها",
      evaluatedBy: "teacher1",
    },
    {
      id: "2",
      studentId: "student2",
      date: new Date("2025-11-02"),
      criteria: "حسن الخلق",
      rating: 8,
      notes: "أخلاق جيدة ولكن يحتاج لتحسين في التعامل مع الآخرين",
      evaluatedBy: "teacher1",
    },
    {
      id: "3",
      studentId: "student3",
      date: new Date("2025-11-03"),
      criteria: "الصدق",
      rating: 10,
      notes: "ممتاز في الصدق والأمانة",
      evaluatedBy: "teacher2",
    },
  ]);

  // Mock data for display
  const students = {
    student1: "أحمد محمد علي",
    student2: "عمر خالد حسن",
    student3: "محمد سعيد أحمد",
  };

  const teachers = {
    teacher1: "الشيخ أحمد محمد",
    teacher2: "الشيخ خالد حسن",
    teacher3: "الشيخ محمد سعيد",
  };

  // Label map for assignment types (DB canonical values stay Arabic)
  const assignmentTypeLabels: Record<string, string> = {
    'عبادية': tb.assignments.typeLabels.worship,
    'سلوكية': tb.assignments.typeLabels.behavioral,
  };

  // Form state
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    dayOfWeek: 1,
    time: "",
    duration: 60,
    targetAge: "",
    isActive: true,
  });

  const [newAssignment, setNewAssignment] = useState({
    title: "",
    description: "",
    type: "عبادية",
    dueDate: new Date(),
    targetAge: "",
    points: 10,
    isActive: true,
  });

  const [newAssessment, setNewAssessment] = useState({
    studentId: "",
    date: new Date(),
    criteria: "",
    rating: 0,
    notes: "",
    evaluatedBy: "current_user",
  });

  const daysArray = [
    tb.days.sunday,
    tb.days.monday,
    tb.days.tuesday,
    tb.days.wednesday,
    tb.days.thursday,
    tb.days.friday,
    tb.days.saturday,
  ];

  const getDayName = (dayOfWeek: number) => {
    return daysArray[dayOfWeek];
  };

  const getAssignmentTypeColor = (type: string) => {
    return type === "عبادية"
      ? "bg-green-100 text-green-800"
      : "bg-blue-100 text-blue-800";
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 9) return "bg-green-100 text-green-800";
    if (rating >= 7) return "bg-blue-100 text-blue-800";
    if (rating >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  // CRUD functions
  const handleAddProgram = () => {
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
      title: newProgram.title,
      description: newProgram.description,
      dayOfWeek: newProgram.dayOfWeek,
      time: newProgram.time,
      duration: newProgram.duration,
      targetAge: newProgram.targetAge,
      isActive: newProgram.isActive,
      createdAt: new Date(),
    };

    setPrograms([...programs, program]);
    setNewProgram({
      title: "",
      description: "",
      dayOfWeek: 1,
      time: "",
      duration: 60,
      targetAge: "",
      isActive: true,
    });
    setIsAddProgramDialogOpen(false);
    toast({
      title: tb.programs.toast.addSuccess,
      description: tb.programs.toast.addSuccessDescription,
    });
  };

  const handleEditProgram = () => {
    if (
      !selectedProgram ||
      !newProgram.title ||
      !newProgram.description ||
      !newProgram.time
    ) {
      toast({
        title: tb.programs.toast.validationError,
        description: tb.programs.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    setPrograms(
      programs.map((program) =>
        program.id === selectedProgram.id
          ? {
              ...program,
              title: newProgram.title || program.title,
              description: newProgram.description || program.description,
              dayOfWeek: newProgram.dayOfWeek || program.dayOfWeek,
              time: newProgram.time || program.time,
              duration: newProgram.duration || program.duration,
              targetAge: newProgram.targetAge || program.targetAge,
              isActive:
                newProgram.isActive !== undefined
                  ? newProgram.isActive
                  : program.isActive,
            }
          : program
      )
    );

    setIsEditProgramDialogOpen(false);
    setSelectedProgram(null);
    setNewProgram({
      title: "",
      description: "",
      dayOfWeek: 1,
      time: "",
      duration: 60,
      targetAge: "",
      isActive: true,
    });
    toast({
      title: tb.programs.toast.editSuccess,
      description: tb.programs.toast.editSuccessDescription,
    });
  };

  const handleDeleteProgram = () => {
    if (!selectedProgram) return;

    setPrograms(
      programs.filter((program) => program.id !== selectedProgram.id)
    );
    setIsDeleteProgramDialogOpen(false);
    setSelectedProgram(null);
    toast({
      title: tb.programs.toast.deleteSuccess,
      description: tb.programs.toast.deleteSuccessDescription,
    });
  };

  const handleAddAssignment = () => {
    if (
      !newAssignment.title ||
      !newAssignment.description ||
      !newAssignment.dueDate
    ) {
      toast({
        title: tb.assignments.toast.validationError,
        description: tb.assignments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const assignment = {
      id: Date.now().toString(),
      title: newAssignment.title,
      description: newAssignment.description,
      type: newAssignment.type,
      dueDate: newAssignment.dueDate,
      targetAge: newAssignment.targetAge,
      points: newAssignment.points,
      isActive: newAssignment.isActive,
      createdAt: new Date(),
    };

    setAssignments([...assignments, assignment]);
    setNewAssignment({
      title: "",
      description: "",
      type: "عبادية",
      dueDate: new Date(),
      targetAge: "",
      points: 10,
      isActive: true,
    });
    setIsAddAssignmentDialogOpen(false);
    toast({
      title: tb.assignments.toast.addSuccess,
      description: tb.assignments.toast.addSuccessDescription,
    });
  };

  const handleEditAssignment = () => {
    if (
      !selectedAssignment ||
      !newAssignment.title ||
      !newAssignment.description ||
      !newAssignment.dueDate
    ) {
      toast({
        title: tb.assignments.toast.validationError,
        description: tb.assignments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    setAssignments(
      assignments.map((assignment) =>
        assignment.id === selectedAssignment.id
          ? {
              ...assignment,
              title: newAssignment.title || assignment.title,
              description: newAssignment.description || assignment.description,
              type: newAssignment.type || assignment.type,
              dueDate: newAssignment.dueDate || assignment.dueDate,
              targetAge: newAssignment.targetAge || assignment.targetAge,
              points: newAssignment.points || assignment.points,
              isActive:
                newAssignment.isActive !== undefined
                  ? newAssignment.isActive
                  : assignment.isActive,
            }
          : assignment
      )
    );

    setIsEditAssignmentDialogOpen(false);
    setSelectedAssignment(null);
    setNewAssignment({
      title: "",
      description: "",
      type: "عبادية",
      dueDate: new Date(),
      targetAge: "",
      points: 10,
      isActive: true,
    });
    toast({
      title: tb.assignments.toast.editSuccess,
      description: tb.assignments.toast.editSuccessDescription,
    });
  };

  const handleDeleteAssignment = () => {
    if (!selectedAssignment) return;

    setAssignments(
      assignments.filter(
        (assignment) => assignment.id !== selectedAssignment.id
      )
    );
    setIsDeleteAssignmentDialogOpen(false);
    setSelectedAssignment(null);
    toast({
      title: tb.assignments.toast.deleteSuccess,
      description: tb.assignments.toast.deleteSuccessDescription,
    });
  };

  const handleAddAssessment = () => {
    if (
      !newAssessment.studentId ||
      !newAssessment.criteria ||
      newAssessment.rating === 0
    ) {
      toast({
        title: tb.assessments.toast.validationError,
        description: tb.assessments.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const assessment = {
      id: Date.now().toString(),
      studentId: newAssessment.studentId,
      date: newAssessment.date,
      criteria: newAssessment.criteria,
      rating: newAssessment.rating,
      notes: newAssessment.notes,
      evaluatedBy: newAssessment.evaluatedBy,
    };

    setAssessments([...assessments, assessment]);
    setNewAssessment({
      studentId: "",
      date: new Date(),
      criteria: "",
      rating: 0,
      notes: "",
      evaluatedBy: "current_user",
    });
    setIsAddAssessmentDialogOpen(false);
    toast({
      title: tb.assessments.toast.addSuccess,
      description: tb.assessments.toast.addSuccessDescription,
    });
  };

  const openEditProgramDialog = (program: any) => {
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
  };

  const openDeleteProgramDialog = (program: any) => {
    setSelectedProgram(program);
    setIsDeleteProgramDialogOpen(true);
  };

  const openEditAssignmentDialog = (assignment: any) => {
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
  };

  const openDeleteAssignmentDialog = (assignment: any) => {
    setSelectedAssignment(assignment);
    setIsDeleteAssignmentDialogOpen(true);
  };

  // Mock content data for the content tab
  const articles = [
    {
      title: "أهمية الصلاة في حياة المسلم",
      excerpt: "الصلاة هي عماد الدين وأهم ركن من أركان الإسلام بعد الشهادتين...",
      date: "2025-11-01",
    },
    {
      title: "آداب الطعام في الإسلام",
      excerpt: "علمنا الإسلام آداب الطعام والشراب التي يجب على المسلم الالتزام بها...",
      date: "2025-11-02",
    },
    {
      title: "بر الوالدين في الإسلام",
      excerpt: "بر الوالدين من أعظم الأعمال الصالحة التي حث عليها الإسلام...",
      date: "2025-11-03",
    },
  ];

  const videos = [
    {
      title: "كيفية الوضوء الصحيح",
      description: "فيديو تعليمي يوضح خطوات الوضوء الصحيح بالتفصيل...",
      duration: "5",
    },
    {
      title: "أهمية الصدق في التعامل",
      description: "محاضرة قصيرة عن أهمية الصدق في التعامل مع الآخرين...",
      duration: "8",
    },
    {
      title: "حقوق الجار في الإسلام",
      description: "شرح لحقوق الجار في الإسلام وكيفية حسن الجوار...",
      duration: "10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={tb.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{tb.pageIcon} {tb.pageTitle}</h2>
          <p className="text-muted-foreground mb-6">
            {tb.subtitle}
          </p>

          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4 space-x-reverse">
              <Input placeholder={tb.searchPlaceholder} className="w-64" />
            </div>
            <div className="flex space-x-2 space-x-reverse">
              <Dialog
                open={isAddAssignmentDialogOpen}
                onOpenChange={setIsAddAssignmentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">{tb.assignments.addButton}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{tb.assignments.addDialogTitle}</DialogTitle>
                    <DialogDescription>
                      {tb.assignments.addDialogDescription}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignment-title" className="text-right">
                        {tb.assignments.form.title}
                      </Label>
                      <Input
                        id="assignment-title"
                        value={newAssignment.title}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            title: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignment-type" className="text-right">
                        {tb.assignments.form.type}
                      </Label>
                      <Select
                        value={newAssignment.type}
                        onValueChange={(value) =>
                          setNewAssignment({ ...newAssignment, type: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={tb.assignments.form.typePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="عبادية">{tb.assignments.typeLabels.worship}</SelectItem>
                          <SelectItem value="سلوكية">{tb.assignments.typeLabels.behavioral}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="assignment-description"
                        className="text-right"
                      >
                        {tb.assignments.form.description}
                      </Label>
                      <Textarea
                        id="assignment-description"
                        value={newAssignment.description}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="assignment-dueDate"
                        className="text-right"
                      >
                        {tb.assignments.form.dueDate}
                      </Label>
                      <Input
                        id="assignment-dueDate"
                        type="date"
                        value={
                          newAssignment.dueDate?.toISOString().split("T")[0]
                        }
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            dueDate: new Date(e.target.value),
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="assignment-targetAge"
                        className="text-right"
                      >
                        {tb.assignments.form.targetAge}
                      </Label>
                      <Input
                        id="assignment-targetAge"
                        value={newAssignment.targetAge}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            targetAge: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assignment-points" className="text-right">
                        {tb.assignments.form.points}
                      </Label>
                      <Input
                        id="assignment-points"
                        type="number"
                        value={newAssignment.points}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            points: parseInt(e.target.value) || 10,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddAssignmentDialogOpen(false)}
                    >
                      {tb.common.cancel}
                    </Button>
                    <Button onClick={handleAddAssignment}>{tb.assignments.addSubmitButton}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog
                open={isAddProgramDialogOpen}
                onOpenChange={setIsAddProgramDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground">
                    {tb.programs.addButton}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{tb.programs.addDialogTitle}</DialogTitle>
                    <DialogDescription>
                      {tb.programs.addDialogDescription}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="program-title" className="text-right">
                        {tb.programs.form.title}
                      </Label>
                      <Input
                        id="program-title"
                        value={newProgram.title}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            title: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="program-description"
                        className="text-right"
                      >
                        {tb.programs.form.description}
                      </Label>
                      <Textarea
                        id="program-description"
                        value={newProgram.description}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="program-day" className="text-right">
                        {tb.programs.form.day}
                      </Label>
                      <Select
                        value={newProgram.dayOfWeek.toString()}
                        onValueChange={(value) =>
                          setNewProgram({
                            ...newProgram,
                            dayOfWeek: parseInt(value),
                          })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={tb.programs.form.dayPlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">{tb.days.sunday}</SelectItem>
                          <SelectItem value="1">{tb.days.monday}</SelectItem>
                          <SelectItem value="2">{tb.days.tuesday}</SelectItem>
                          <SelectItem value="3">{tb.days.wednesday}</SelectItem>
                          <SelectItem value="4">{tb.days.thursday}</SelectItem>
                          <SelectItem value="5">{tb.days.friday}</SelectItem>
                          <SelectItem value="6">{tb.days.saturday}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="program-time" className="text-right">
                        {tb.programs.form.time}
                      </Label>
                      <Input
                        id="program-time"
                        type="time"
                        value={newProgram.time}
                        onChange={(e) =>
                          setNewProgram({ ...newProgram, time: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="program-duration" className="text-right">
                        {tb.programs.form.durationMinutes}
                      </Label>
                      <Input
                        id="program-duration"
                        type="number"
                        value={newProgram.duration}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            duration: parseInt(e.target.value) || 60,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="program-targetAge" className="text-right">
                        {tb.programs.form.targetAge}
                      </Label>
                      <Input
                        id="program-targetAge"
                        value={newProgram.targetAge}
                        onChange={(e) =>
                          setNewProgram({
                            ...newProgram,
                            targetAge: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddProgramDialogOpen(false)}
                    >
                      {tb.common.cancel}
                    </Button>
                    <Button onClick={handleAddProgram}>{tb.programs.createButton}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="programs">{tb.tabs.programs}</TabsTrigger>
            <TabsTrigger value="assignments">{tb.tabs.assignments}</TabsTrigger>
            <TabsTrigger value="assessments">{tb.tabs.assessments}</TabsTrigger>
            <TabsTrigger value="content">{tb.tabs.content}</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tb.programs.cardTitle}</CardTitle>
                <CardDescription>
                  {tb.programs.cardDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tb.programs.table.title}</TableHead>
                      <TableHead>{tb.programs.table.day}</TableHead>
                      <TableHead>{tb.programs.table.time}</TableHead>
                      <TableHead>{tb.programs.table.duration}</TableHead>
                      <TableHead>{tb.programs.table.targetAge}</TableHead>
                      <TableHead>{tb.programs.table.status}</TableHead>
                      <TableHead>{tb.programs.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {programs.map((program) => (
                      <TableRow key={program.id}>
                        <TableCell className="font-medium">
                          {program.title}
                        </TableCell>
                        <TableCell>{getDayName(program.dayOfWeek)}</TableCell>
                        <TableCell>{program.time}</TableCell>
                        <TableCell>{program.duration} {tb.programs.minuteUnit}</TableCell>
                        <TableCell>{program.targetAge}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              program.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {program.isActive ? tb.programs.status.active : tb.programs.status.inactive}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              {tb.programs.actions.view}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => openEditProgramDialog(program)}
                            >
                              {tb.programs.actions.edit}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => openDeleteProgramDialog(program)}
                            >
                              {tb.programs.actions.delete}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{tb.assignments.cardTitle}</CardTitle>
                <CardDescription>
                  {tb.assignments.cardDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tb.assignments.table.title}</TableHead>
                      <TableHead>{tb.assignments.table.type}</TableHead>
                      <TableHead>{tb.assignments.table.dueDate}</TableHead>
                      <TableHead>{tb.assignments.table.targetAge}</TableHead>
                      <TableHead>{tb.assignments.table.points}</TableHead>
                      <TableHead>{tb.assignments.table.status}</TableHead>
                      <TableHead>{tb.assignments.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {assignment.title}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={getAssignmentTypeColor(assignment.type)}
                          >
                            {assignmentTypeLabels[assignment.type] ?? assignment.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(new Date(assignment.dueDate), language)}
                        </TableCell>
                        <TableCell>{assignment.targetAge}</TableCell>
                        <TableCell>{assignment.points}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              assignment.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }
                          >
                            {assignment.isActive ? tb.assignments.status.active : tb.assignments.status.inactive}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              {tb.assignments.actions.view}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                openEditAssignmentDialog(assignment)
                              }
                            >
                              {tb.assignments.actions.edit}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() =>
                                openDeleteAssignmentDialog(assignment)
                              }
                            >
                              {tb.assignments.actions.delete}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-medium">{tb.assessments.sectionTitle}</h3>
              <Dialog
                open={isAddAssessmentDialogOpen}
                onOpenChange={setIsAddAssessmentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button>{tb.assessments.addButton}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{tb.assessments.addDialogTitle}</DialogTitle>
                    <DialogDescription>
                      {tb.assessments.addDialogDescription}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label
                        htmlFor="assessment-student"
                        className="text-right"
                      >
                        {tb.assessments.form.student}
                      </Label>
                      <Select
                        value={newAssessment.studentId}
                        onValueChange={(value) =>
                          setNewAssessment({
                            ...newAssessment,
                            studentId: value,
                          })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder={tb.assessments.form.studentPlaceholder} />
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
                      <Label
                        htmlFor="assessment-criteria"
                        className="text-right"
                      >
                        {tb.assessments.form.criteria}
                      </Label>
                      <Input
                        id="assessment-criteria"
                        value={newAssessment.criteria}
                        onChange={(e) =>
                          setNewAssessment({
                            ...newAssessment,
                            criteria: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assessment-rating" className="text-right">
                        {tb.assessments.form.ratingOutOf10}
                      </Label>
                      <Input
                        id="assessment-rating"
                        type="number"
                        min="1"
                        max="10"
                        value={newAssessment.rating}
                        onChange={(e) =>
                          setNewAssessment({
                            ...newAssessment,
                            rating: parseInt(e.target.value) || 0,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="assessment-notes" className="text-right">
                        {tb.assessments.form.notes}
                      </Label>
                      <Textarea
                        id="assessment-notes"
                        value={newAssessment.notes}
                        onChange={(e) =>
                          setNewAssessment({
                            ...newAssessment,
                            notes: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddAssessmentDialogOpen(false)}
                    >
                      {tb.common.cancel}
                    </Button>
                    <Button onClick={handleAddAssessment}>{tb.assessments.addSubmitButton}</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>{tb.assessments.cardTitle}</CardTitle>
                <CardDescription>
                  {tb.assessments.cardDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tb.assessments.table.student}</TableHead>
                      <TableHead>{tb.assessments.table.criteria}</TableHead>
                      <TableHead>{tb.assessments.table.rating}</TableHead>
                      <TableHead>{tb.assessments.table.date}</TableHead>
                      <TableHead>{tb.assessments.table.evaluator}</TableHead>
                      <TableHead>{tb.assessments.table.notes}</TableHead>
                      <TableHead>{tb.assessments.table.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assessments.map((assessment) => (
                      <TableRow key={assessment.id}>
                        <TableCell>
                          {
                            students[
                              assessment.studentId as keyof typeof students
                            ]
                          }
                        </TableCell>
                        <TableCell>{assessment.criteria}</TableCell>
                        <TableCell>
                          <Badge className={getRatingColor(assessment.rating)}>
                            {assessment.rating}/10
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {formatDate(new Date(assessment.date), language)}
                        </TableCell>
                        <TableCell>
                          {
                            teachers[
                              assessment.evaluatedBy as keyof typeof teachers
                            ]
                          }
                        </TableCell>
                        <TableCell>{assessment.notes}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2 space-x-reverse">
                            <Button variant="outline" size="sm">
                              {tb.assessments.actions.edit}
                            </Button>
                            <Button variant="destructive" size="sm">
                              {tb.assessments.actions.delete}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{tb.content.articles.cardTitle}</CardTitle>
                  <CardDescription>
                    {tb.content.articles.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {articles.map((article, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">
                          {article.title}
                        </h4>
                        <div className="text-sm text-muted-foreground mb-2">
                          {article.excerpt}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {tb.content.articles.publishedPrefix} {formatDate(article.date, language)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{tb.content.videos.cardTitle}</CardTitle>
                  <CardDescription>
                    {tb.content.videos.cardDescription}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {videos.map((video, idx) => (
                      <div key={idx} className="p-4 border rounded-lg">
                        <h4 className="font-medium mb-2">{video.title}</h4>
                        <div className="text-sm text-muted-foreground mb-2">
                          {video.description}
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-xs text-muted-foreground">
                            {tb.content.videos.durationPrefix} {video.duration} {tb.programs.minuteUnit}
                          </div>
                          <Button variant="outline" size="sm">
                            {tb.content.videos.watchButton}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Program Dialog */}
      <Dialog
        open={isEditProgramDialogOpen}
        onOpenChange={setIsEditProgramDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tb.programs.editDialogTitle}</DialogTitle>
            <DialogDescription>{tb.programs.editDialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-title" className="text-right">
                {tb.programs.form.title}
              </Label>
              <Input
                id="edit-program-title"
                value={newProgram.title}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-description" className="text-right">
                {tb.programs.form.description}
              </Label>
              <Textarea
                id="edit-program-description"
                value={newProgram.description}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, description: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-day" className="text-right">
                {tb.programs.form.day}
              </Label>
              <Select
                value={newProgram.dayOfWeek.toString()}
                onValueChange={(value) =>
                  setNewProgram({ ...newProgram, dayOfWeek: parseInt(value) })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={tb.programs.form.dayPlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">{tb.days.sunday}</SelectItem>
                  <SelectItem value="1">{tb.days.monday}</SelectItem>
                  <SelectItem value="2">{tb.days.tuesday}</SelectItem>
                  <SelectItem value="3">{tb.days.wednesday}</SelectItem>
                  <SelectItem value="4">{tb.days.thursday}</SelectItem>
                  <SelectItem value="5">{tb.days.friday}</SelectItem>
                  <SelectItem value="6">{tb.days.saturday}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-time" className="text-right">
                {tb.programs.form.time}
              </Label>
              <Input
                id="edit-program-time"
                type="time"
                value={newProgram.time}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, time: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-duration" className="text-right">
                {tb.programs.form.durationMinutes}
              </Label>
              <Input
                id="edit-program-duration"
                type="number"
                value={newProgram.duration}
                onChange={(e) =>
                  setNewProgram({
                    ...newProgram,
                    duration: parseInt(e.target.value) || 60,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-program-targetAge" className="text-right">
                {tb.programs.form.targetAge}
              </Label>
              <Input
                id="edit-program-targetAge"
                value={newProgram.targetAge}
                onChange={(e) =>
                  setNewProgram({ ...newProgram, targetAge: e.target.value })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditProgramDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button onClick={handleEditProgram}>{tb.programs.saveButton}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Program Dialog */}
      <Dialog
        open={isDeleteProgramDialogOpen}
        onOpenChange={setIsDeleteProgramDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tb.programs.deleteDialogTitle}</DialogTitle>
            <DialogDescription>
              {tFunc('tarbiwi.programs.deleteDialogDescription', { title: selectedProgram?.title ?? '' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteProgramDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteProgram}>
              {tb.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assignment Dialog */}
      <Dialog
        open={isEditAssignmentDialogOpen}
        onOpenChange={setIsEditAssignmentDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{tb.assignments.editDialogTitle}</DialogTitle>
            <DialogDescription>{tb.assignments.editDialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignment-title" className="text-right">
                {tb.assignments.form.title}
              </Label>
              <Input
                id="edit-assignment-title"
                value={newAssignment.title}
                onChange={(e) =>
                  setNewAssignment({ ...newAssignment, title: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignment-type" className="text-right">
                {tb.assignments.form.type}
              </Label>
              <Select
                value={newAssignment.type}
                onValueChange={(value) =>
                  setNewAssignment({ ...newAssignment, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={tb.assignments.form.typePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عبادية">{tb.assignments.typeLabels.worship}</SelectItem>
                  <SelectItem value="سلوكية">{tb.assignments.typeLabels.behavioral}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="edit-assignment-description"
                className="text-right"
              >
                {tb.assignments.form.description}
              </Label>
              <Textarea
                id="edit-assignment-description"
                value={newAssignment.description}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    description: e.target.value,
                  })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignment-dueDate" className="text-right">
                {tb.assignments.form.dueDate}
              </Label>
              <Input
                id="edit-assignment-dueDate"
                type="date"
                value={newAssignment.dueDate?.toISOString().split("T")[0]}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    dueDate: new Date(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignment-targetAge" className="text-right">
                {tb.assignments.form.targetAge}
              </Label>
              <Input
                id="edit-assignment-targetAge"
                value={newAssignment.targetAge}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    targetAge: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-assignment-points" className="text-right">
                {tb.assignments.form.points}
              </Label>
              <Input
                id="edit-assignment-points"
                type="number"
                value={newAssignment.points}
                onChange={(e) =>
                  setNewAssignment({
                    ...newAssignment,
                    points: parseInt(e.target.value) || 10,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditAssignmentDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button onClick={handleEditAssignment}>{tb.assignments.saveButton}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Assignment Dialog */}
      <Dialog
        open={isDeleteAssignmentDialogOpen}
        onOpenChange={setIsDeleteAssignmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tb.assignments.deleteDialogTitle}</DialogTitle>
            <DialogDescription>
              {tFunc('tarbiwi.assignments.deleteDialogDescription', { title: selectedAssignment?.title ?? '' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteAssignmentDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteAssignment}>
              {tb.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tarbiwi;
