
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import PageHeader from "@/components/PageHeader";
import {
  Subject,
  ResourceType,
  SubjectData,
  Lesson,
  Assignment,
} from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

const Subjects = () => {
  const [activeSubject, setActiveSubject] = useState<Subject>("عقيدة");
  const [isAddSubjectDialogOpen, setIsAddSubjectDialogOpen] = useState(false);
  const [isAddLessonDialogOpen, setIsAddLessonDialogOpen] = useState(false);
  const [isAddAssignmentDialogOpen, setIsAddAssignmentDialogOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState<Lesson | Assignment | null>(null);
  const { toast } = useToast();
  const { t, language } = useLanguage();

  /** Label map for DB Arabic subject name values */
  const subjectNameLabelMap: Record<string, string> = {
    'عقيدة': t.subjects.subjectNameLabels.aqeedah,
    'فقه': t.subjects.subjectNameLabels.fiqh,
    'سيرة': t.subjects.subjectNameLabels.seerah,
    'تفسير': t.subjects.subjectNameLabels.tafseer,
    'حديث': t.subjects.subjectNameLabels.hadith,
    'تربية': t.subjects.subjectNameLabels.tarbiyah,
    'لغة عربية': t.subjects.subjectNameLabels.arabic,
  };

  /** Label map for DB Arabic resource type values */
  const resourceTypeLabelMap: Record<string, string> = {
    'فيديو': t.subjects.resourceTypeLabels.video,
    'صوت': t.subjects.resourceTypeLabels.audio,
    'PDF': t.subjects.resourceTypeLabels.pdf,
    'رابط': t.subjects.resourceTypeLabels.link,
  };

  /** Category display name for lesson type groupings (e.g., "الدروس المرئية") */
  const lessonCategoryMap: Record<string, string> = {
    'فيديو': t.subjects.lessonCategories.video,
    'صوت': t.subjects.lessonCategories.audio,
    'PDF': t.subjects.lessonCategories.pdf,
    'رابط': t.subjects.lessonCategories.link,
  };

  // Mock data - will be replaced with actual data from Supabase
  const [subjects, setSubjects] = useState<SubjectData[]>([
    {
      id: "1",
      name: "عقيدة" as Subject,
      description: "دراسة أصول العقيدة الإسلامية",
      teacherId: "teacher1",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "فقه" as Subject,
      description: "دراسة أحكام الفقه الإسلامي",
      teacherId: "teacher2",
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "3",
      name: "سيرة" as Subject,
      description: "دراسة سيرة النبي صلى الله عليه وسلم",
      teacherId: "teacher3",
      isActive: true,
      createdAt: new Date(),
    },
  ]);

  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "1",
      subjectId: "1",
      title: "مقدمة في العقيدة",
      description: "مقدمة شاملة لعلم العقيدة",
      type: "فيديو" as ResourceType,
      contentUrl: "#",
      order: 1,
      isActive: true,
      createdAt: new Date(),
    },
    {
      id: "2",
      subjectId: "1",
      title: "أركان الإيمان",
      description: "شرح أركان الإيمان الستة",
      type: "PDF" as ResourceType,
      contentUrl: "#",
      order: 2,
      isActive: true,
      createdAt: new Date(),
    },
  ]);

  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: "1",
      subjectId: "1",
      title: "بحث في أسماء الله الحسنى",
      description: "بحث مفصل عن أسماء الله الحسنى وصفاتها",
      dueDate: new Date("2025-11-15"),
      totalMarks: 100,
      isActive: true,
      createdAt: new Date(),
    },
  ]);

  // Mock teacher data
  const teachers = {
    teacher1: "الشيخ أحمد محمد",
    teacher2: "الشيخ خالد علي",
    teacher3: "الشيخ محمد حسن",
  };

  // Form states
  const [newSubject, setNewSubject] = useState<Partial<SubjectData>>({
    name: "عقيدة",
    description: "",
    teacherId: "",
    isActive: true,
  });

  const [newLesson, setNewLesson] = useState<Partial<Lesson>>({
    title: "",
    description: "",
    type: "فيديو",
    contentUrl: "",
    order: 1,
    isActive: true,
  });

  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    dueDate: new Date(),
    totalMarks: 100,
    isActive: true,
  });

  const currentSubject = subjects.find((s) => s.name === activeSubject);
  const currentLessons = lessons.filter(
    (l) => l.subjectId === currentSubject?.id
  );
  const currentAssignments = assignments.filter(
    (a) => a.subjectId === currentSubject?.id
  );

  const getResourceIcon = (type: ResourceType) => {
    switch (type) {
      case "فيديو":
        return "\uD83C\uDFA5";
      case "صوت":
        return "\uD83C\uDFB5";
      case "PDF":
        return "\uD83D\uDCC4";
      case "رابط":
        return "\uD83D\uDD17";
      default:
        return "\uD83D\uDCC4";
    }
  };

  const getResourceColor = (type: ResourceType) => {
    switch (type) {
      case "فيديو":
        return "bg-blue-100 text-blue-800";
      case "صوت":
        return "bg-green-100 text-green-800";
      case "PDF":
        return "bg-red-100 text-red-800";
      case "رابط":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.subjects.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.subjects.heading}</h2>
          <p className="text-muted-foreground mb-6">
            {t.subjects.subtitle}
          </p>

          <div className="flex justify-between items-center mb-6">
            <Dialog
              open={isAddSubjectDialogOpen}
              onOpenChange={setIsAddSubjectDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  {t.subjects.subjectForm.addSubject}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t.subjects.subjectForm.addSubjectTitle}</DialogTitle>
                  <DialogDescription>
                    {t.subjects.subjectForm.addSubjectDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject-name" className="text-end">
                      {t.subjects.subjectForm.subjectName}
                    </Label>
                    <Select
                      value={newSubject.name}
                      onValueChange={(value) =>
                        setNewSubject({ ...newSubject, name: value as Subject })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t.subjects.subjectForm.subjectNamePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="عقيدة">{subjectNameLabelMap['عقيدة']}</SelectItem>
                        <SelectItem value="فقه">{subjectNameLabelMap['فقه']}</SelectItem>
                        <SelectItem value="سيرة">{subjectNameLabelMap['سيرة']}</SelectItem>
                        <SelectItem value="تفسير">{subjectNameLabelMap['تفسير']}</SelectItem>
                        <SelectItem value="حديث">{subjectNameLabelMap['حديث']}</SelectItem>
                        <SelectItem value="تربية">{subjectNameLabelMap['تربية']}</SelectItem>
                        <SelectItem value="لغة عربية">{subjectNameLabelMap['لغة عربية']}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject-description" className="text-end">
                      {t.subjects.subjectForm.description}
                    </Label>
                    <Textarea
                      id="subject-description"
                      value={newSubject.description}
                      onChange={(e) =>
                        setNewSubject({
                          ...newSubject,
                          description: e.target.value,
                        })
                      }
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="subject-teacher" className="text-end">
                      {t.subjects.subjectForm.teacher}
                    </Label>
                    <Select
                      value={newSubject.teacherId}
                      onValueChange={(value) =>
                        setNewSubject({ ...newSubject, teacherId: value })
                      }
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder={t.subjects.subjectForm.teacherPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="teacher1">
                          الشيخ أحمد محمد
                        </SelectItem>
                        <SelectItem value="teacher2">الشيخ خالد علي</SelectItem>
                        <SelectItem value="teacher3">الشيخ محمد حسن</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddSubjectDialogOpen(false)}
                  >
                    {t.subjects.subjectForm.cancel}
                  </Button>
                  <Button
                    onClick={() => {
                      if (newSubject.name && newSubject.teacherId) {
                        const subject: SubjectData = {
                          id: Date.now().toString(),
                          name: newSubject.name as Subject,
                          description: newSubject.description || "",
                          teacherId: newSubject.teacherId,
                          isActive: newSubject.isActive || true,
                          createdAt: new Date(),
                        };
                        setSubjects([...subjects, subject]);
                        setNewSubject({
                          name: "عقيدة",
                          description: "",
                          teacherId: "",
                          isActive: true,
                        });
                        setIsAddSubjectDialogOpen(false);
                        toast({
                          title: t.subjects.toast.addSubjectSuccess,
                          description: t.subjects.toast.addSubjectSuccessDescription,
                        });
                      }
                    }}
                  >
                    {t.subjects.subjectForm.submit}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeSubject}
          onValueChange={(value) => setActiveSubject(value as Subject)}
        >
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="عقيدة">{subjectNameLabelMap['عقيدة']}</TabsTrigger>
            <TabsTrigger value="فقه">{subjectNameLabelMap['فقه']}</TabsTrigger>
            <TabsTrigger value="سيرة">{subjectNameLabelMap['سيرة']}</TabsTrigger>
            <TabsTrigger value="تفسير">{subjectNameLabelMap['تفسير']}</TabsTrigger>
            <TabsTrigger value="حديث">{subjectNameLabelMap['حديث']}</TabsTrigger>
            <TabsTrigger value="تربية">{subjectNameLabelMap['تربية']}</TabsTrigger>
            <TabsTrigger value="لغة عربية">{subjectNameLabelMap['لغة عربية']}</TabsTrigger>
          </TabsList>

          <TabsContent value={activeSubject} className="mt-6">
            {currentSubject && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {subjectNameLabelMap[currentSubject.name] ?? currentSubject.name}
                      <Badge variant="outline">
                        {
                          teachers[
                            currentSubject.teacherId as keyof typeof teachers
                          ]
                        }
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {currentSubject.description}
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {t.subjects.sections.lessons}
                        <Dialog
                          open={isAddLessonDialogOpen}
                          onOpenChange={setIsAddLessonDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {t.subjects.lessonForm.addLesson}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{t.subjects.lessonForm.addLessonTitle}</DialogTitle>
                              <DialogDescription>
                                {t.subjects.lessonForm.addLessonDescription}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="lesson-title"
                                  className="text-end"
                                >
                                  {t.subjects.lessonForm.lessonTitle}
                                </Label>
                                <Input
                                  id="lesson-title"
                                  value={newLesson.title}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      title: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="lesson-description"
                                  className="text-end"
                                >
                                  {t.subjects.lessonForm.description}
                                </Label>
                                <Textarea
                                  id="lesson-description"
                                  value={newLesson.description}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      description: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="lesson-type"
                                  className="text-end"
                                >
                                  {t.subjects.lessonForm.contentType}
                                </Label>
                                <Select
                                  value={newLesson.type}
                                  onValueChange={(value) =>
                                    setNewLesson({
                                      ...newLesson,
                                      type: value as ResourceType,
                                    })
                                  }
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder={t.subjects.lessonForm.contentTypePlaceholder} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="فيديو">{resourceTypeLabelMap['فيديو']}</SelectItem>
                                    <SelectItem value="صوت">{resourceTypeLabelMap['صوت']}</SelectItem>
                                    <SelectItem value="PDF">{resourceTypeLabelMap['PDF']}</SelectItem>
                                    <SelectItem value="رابط">{resourceTypeLabelMap['رابط']}</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="lesson-url"
                                  className="text-end"
                                >
                                  {t.subjects.lessonForm.contentUrl}
                                </Label>
                                <Input
                                  id="lesson-url"
                                  value={newLesson.contentUrl}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      contentUrl: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="lesson-order"
                                  className="text-end"
                                >
                                  {t.subjects.lessonForm.order}
                                </Label>
                                <Input
                                  id="lesson-order"
                                  type="number"
                                  value={newLesson.order}
                                  onChange={(e) =>
                                    setNewLesson({
                                      ...newLesson,
                                      order: parseInt(e.target.value) || 1,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() => setIsAddLessonDialogOpen(false)}
                              >
                                {t.subjects.lessonForm.cancel}
                              </Button>
                              <Button
                                onClick={() => {
                                  if (newLesson.title && currentSubject) {
                                    const lesson: Lesson = {
                                      id: Date.now().toString(),
                                      subjectId: currentSubject.id,
                                      title: newLesson.title,
                                      description: newLesson.description || "",
                                      type: newLesson.type as ResourceType,
                                      contentUrl: newLesson.contentUrl || "",
                                      order: newLesson.order || 1,
                                      isActive: newLesson.isActive || true,
                                      createdAt: new Date(),
                                    };
                                    setLessons([...lessons, lesson]);
                                    setNewLesson({
                                      title: "",
                                      description: "",
                                      type: "فيديو",
                                      contentUrl: "",
                                      order: 1,
                                      isActive: true,
                                    });
                                    setIsAddLessonDialogOpen(false);
                                    toast({
                                      title: t.subjects.toast.addLessonSuccess,
                                      description: t.subjects.toast.addLessonSuccessDescription,
                                    });
                                  }
                                }}
                              >
                                {t.subjects.lessonForm.submit}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
                      <CardDescription>
                        {t.subjects.sections.lessonsDescription}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {/* Lessons grouped by type */}
                      <div className="space-y-6">
                        {["فيديو", "صوت", "PDF", "رابط"].map((type) => {
                          const filteredLessons = currentLessons.filter(
                            (lesson) => lesson.type === type
                          );

                          if (filteredLessons.length === 0) return null;

                          return (
                            <div key={type} className="space-y-3">
                              <div className="flex items-center space-x-2 space-x-reverse mb-3">
                                <span className="text-lg font-semibold">
                                  {getResourceIcon(type as ResourceType)}
                                </span>
                                <h4 className="text-lg font-semibold">
                                  {t.subjects.sections.lessons}{" "}
                                  {lessonCategoryMap[type]}
                                </h4>
                                <Badge
                                  className={getResourceColor(
                                    type as ResourceType
                                  )}
                                >
                                  {filteredLessons.length} {t.subjects.lessonCount}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {filteredLessons.map((lesson) => (
                                  <Card
                                    key={lesson.id}
                                    className="border-r-4 border-r-primary/20"
                                  >
                                    <CardContent className="p-4">
                                      <div className="flex justify-between items-start mb-2">
                                        <h5 className="font-medium text-sm">
                                          {lesson.title}
                                        </h5>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {t.subjects.table.order}: {lesson.order}
                                        </Badge>
                                      </div>
                                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                        {lesson.description}
                                      </p>
                                      <div className="flex justify-between items-center">
                                        <div className="flex space-x-1 space-x-reverse">
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: t.subjects.toast.viewLesson,
                                                description:
                                                  t.subjects.toast.viewLessonDescription,
                                              });
                                              window.open(
                                                lesson.contentUrl,
                                                "_blank"
                                              );
                                            }}
                                          >
                                            {t.subjects.actions.view}
                                          </Button>
                                          <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: t.subjects.toast.editLesson,
                                                description:
                                                  t.subjects.toast.editLessonDescription,
                                              });
                                            }}
                                          >
                                            {t.subjects.actions.edit}
                                          </Button>
                                          <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => {
                                              toast({
                                                title: t.subjects.toast.deleteLesson,
                                                description:
                                                  t.subjects.toast.deleteLessonDescription,
                                              });
                                              setLessons(
                                                lessons.filter(
                                                  (l) => l.id !== lesson.id
                                                )
                                              );
                                              toast({
                                                title: t.subjects.toast.deleteLessonSuccess,
                                                description:
                                                  t.subjects.toast.deleteLessonSuccessDescription,
                                              });
                                            }}
                                          >
                                            {t.subjects.actions.delete}
                                          </Button>
                                        </div>
                                        <Badge
                                          className={getResourceColor(
                                            lesson.type
                                          )}
                                        >
                                          {resourceTypeLabelMap[lesson.type] ?? lesson.type}
                                        </Badge>
                                      </div>
                                    </CardContent>
                                  </Card>
                                ))}
                              </div>
                            </div>
                          );
                        })}

                        {currentLessons.length === 0 && (
                          <div className="text-center py-8">
                            <p className="text-muted-foreground">
                              {t.subjects.empty.noLessons}
                            </p>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {t.subjects.sections.assignments}
                        <Dialog
                          open={isAddAssignmentDialogOpen}
                          onOpenChange={setIsAddAssignmentDialogOpen}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              {t.subjects.assignmentForm.addAssignment}
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>{t.subjects.assignmentForm.addAssignmentTitle}</DialogTitle>
                              <DialogDescription>
                                {t.subjects.assignmentForm.addAssignmentDescription}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="assignment-title"
                                  className="text-end"
                                >
                                  {t.subjects.assignmentForm.assignmentTitle}
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
                                <Label
                                  htmlFor="assignment-description"
                                  className="text-end"
                                >
                                  {t.subjects.assignmentForm.description}
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
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                  htmlFor="assignment-dueDate"
                                  className="text-end"
                                >
                                  {t.subjects.assignmentForm.dueDate}
                                </Label>
                                <Input
                                  id="assignment-dueDate"
                                  type="date"
                                  value={
                                    newAssignment.dueDate
                                      ?.toISOString()
                                      .split("T")[0]
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
                                  htmlFor="assignment-marks"
                                  className="text-end"
                                >
                                  {t.subjects.assignmentForm.totalMarks}
                                </Label>
                                <Input
                                  id="assignment-marks"
                                  type="number"
                                  value={newAssignment.totalMarks}
                                  onChange={(e) =>
                                    setNewAssignment({
                                      ...newAssignment,
                                      totalMarks:
                                        parseInt(e.target.value) || 100,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button
                                variant="outline"
                                onClick={() =>
                                  setIsAddAssignmentDialogOpen(false)
                                }
                              >
                                {t.subjects.assignmentForm.cancel}
                              </Button>
                              <Button
                                onClick={() => {
                                  if (newAssignment.title && currentSubject) {
                                    const assignment: Assignment = {
                                      id: Date.now().toString(),
                                      subjectId: currentSubject.id,
                                      title: newAssignment.title,
                                      description:
                                        newAssignment.description || "",
                                      dueDate:
                                        newAssignment.dueDate || new Date(),
                                      totalMarks:
                                        newAssignment.totalMarks || 100,
                                      isActive: newAssignment.isActive || true,
                                      createdAt: new Date(),
                                    };
                                    setAssignments([
                                      ...assignments,
                                      assignment,
                                    ]);
                                    setNewAssignment({
                                      title: "",
                                      description: "",
                                      dueDate: new Date(),
                                      totalMarks: 100,
                                      isActive: true,
                                    });
                                    setIsAddAssignmentDialogOpen(false);
                                    toast({
                                      title: t.subjects.toast.addAssignmentSuccess,
                                      description: t.subjects.toast.addAssignmentSuccessDescription,
                                    });
                                  }
                                }}
                              >
                                {t.subjects.assignmentForm.submit}
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </CardTitle>
                      <CardDescription>{t.subjects.sections.assignmentsDescription}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>{t.subjects.table.title}</TableHead>
                            <TableHead>{t.subjects.table.dueDate}</TableHead>
                            <TableHead>{t.subjects.table.actions}</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {currentAssignments.map((assignment) => (
                            <TableRow key={assignment.id}>
                              <TableCell className="font-medium">
                                {assignment.title}
                              </TableCell>
                              <TableCell>
                                {formatDate(assignment.dueDate, language)}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2 space-x-reverse">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: t.subjects.toast.viewAssignment,
                                        description: t.subjects.toast.viewAssignmentDescription,
                                      });
                                    }}
                                  >
                                    {t.subjects.actions.view}
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: t.subjects.toast.editAssignment,
                                        description:
                                          t.subjects.toast.editAssignmentDescription,
                                      });
                                    }}
                                  >
                                    {t.subjects.actions.edit}
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: t.subjects.toast.deleteAssignment,
                                        description:
                                          t.subjects.toast.deleteAssignmentDescription,
                                      });
                                      setAssignments(
                                        assignments.filter(
                                          (a) => a.id !== assignment.id
                                        )
                                      );
                                      toast({
                                        title: t.subjects.toast.deleteAssignmentSuccess,
                                        description:
                                          t.subjects.toast.deleteAssignmentSuccessDescription,
                                      });
                                    }}
                                  >
                                    {t.subjects.actions.delete}
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

                <Card>
                  <CardHeader>
                    <CardTitle>{t.subjects.sections.questions}</CardTitle>
                    <CardDescription>
                      {t.subjects.sections.questionsDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        {t.subjects.empty.noQuestions}
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          toast({
                            title: t.subjects.toast.askQuestion,
                            description: t.subjects.toast.askQuestionDescription,
                          });
                        }}
                      >
                        {t.subjects.actions.askNewQuestion}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Subjects;
