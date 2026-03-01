
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
import { useLanguage } from "@/contexts/LanguageContext";

const EducationalLifeSkills = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const sp = t.educational.subPages.lifeSkills;

  // State for lessons management
  const [lessons, setLessons] = useState([
    {
      id: "1",
      title: "مهارات التواصل الفعال",
      description: "تطوير مهارات التواصل مع الآخرين وفن الحوار البناء",
      teacher: "الشيخ أحمد محمد",
      date: "2025-11-13",
      duration: "50 دقيقة",
      recording: "available",
      verses: "الحجرات 11-13",
    },
    {
      id: "2",
      title: "القيادة وإدارة الفريق",
      description: "تعليم مبادئ القيادة الإسلامية وكيفية إدارة الفرق بفعالية",
      teacher: "الشيخ خالد حسن",
      date: "2025-11-06",
      duration: "45 دقيقة",
      recording: "available",
      verses: "آل عمران 159-160",
    },
    {
      id: "3",
      title: "حل المشكلات واتخاذ القرارات",
      description: "منهجية إسلامية في حل المشكلات واتخاذ القرارات الحكيمة",
      teacher: "الشيخ محمد سعيد",
      date: "2025-10-30",
      duration: "40 دقيقة",
      recording: "processing",
      verses: "الشورى 38-43",
    },
  ]);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);

  // Form state for new lesson
  const [newLesson, setNewLesson] = useState({
    title: "",
    description: "",
    teacher: "",
    duration: "",
    verses: "",
    recording: "processing",
  });

  // Functions for CRUD operations
  const handleAddLesson = () => {
    if (
      !newLesson.title ||
      !newLesson.description ||
      !newLesson.teacher ||
      !newLesson.duration ||
      !newLesson.verses
    ) {
      toast({
        title: sp.toast.validationError,
        description: sp.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const lesson = {
      id: Date.now().toString(),
      title: newLesson.title,
      description: newLesson.description,
      teacher: newLesson.teacher,
      date: new Date().toISOString().split("T")[0],
      duration: newLesson.duration,
      verses: newLesson.verses,
      recording: newLesson.recording,
    };

    setLessons([...lessons, lesson]);
    setNewLesson({
      title: "",
      description: "",
      teacher: "",
      duration: "",
      verses: "",
      recording: "processing",
    });
    setIsAddDialogOpen(false);
    toast({
      title: sp.toast.addSuccess,
      description: sp.toast.addSuccessDescription,
    });
  };

  const handleDeleteLesson = () => {
    if (!selectedLesson) return;

    setLessons(lessons.filter((lesson) => lesson.id !== selectedLesson.id));
    setIsDeleteDialogOpen(false);
    setSelectedLesson(null);
    toast({
      title: sp.toast.deleteSuccess,
      description: sp.toast.deleteSuccessDescription,
    });
  };

  const openDeleteDialog = (lesson: any) => {
    setSelectedLesson(lesson);
    setIsDeleteDialogOpen(true);
  };

  const handleViewRecording = (lesson: any) => {
    if (lesson.recording === "available") {
      toast({
        title: sp.toast.openRecording,
        description: sp.toast.openRecordingDescription,
      });
      window.open("#", "_blank");
    } else {
      toast({
        title: sp.toast.recordingUnavailable,
        description: sp.toast.recordingUnavailableDescription,
        variant: "destructive",
      });
    }
  };

  const handleDownloadMaterial = (lesson: any) => {
    toast({
      title: sp.toast.downloadMaterial,
      description: sp.toast.downloadMaterialDescription,
    });
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${lesson.title}.pdf`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={sp.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-[var(--shadow-soft)] flex-1">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
              {sp.bannerTitle}
            </h2>
            <p className="text-sm sm:text-base md:text-lg opacity-90">
              {sp.bannerSubtitle}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground w-full sm:w-auto">
                {sp.addButton}
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-lg sm:text-base">
                  {sp.dialog.title}
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-xs">
                  {sp.dialog.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="title" className="text-right sm:text-sm">
                    {sp.dialog.itemTitle}
                  </Label>
                  <Input
                    id="title"
                    value={newLesson.title}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, title: e.target.value })
                    }
                    className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-start gap-2 sm:gap-4">
                  <Label
                    htmlFor="description"
                    className="text-right sm:text-sm sm:mt-2"
                  >
                    {sp.dialog.itemDescription}
                  </Label>
                  <Textarea
                    id="description"
                    value={newLesson.description}
                    onChange={(e) =>
                      setNewLesson({
                        ...newLesson,
                        description: e.target.value,
                      })
                    }
                    className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="teacher" className="text-right sm:text-sm">
                    {sp.dialog.teacher}
                  </Label>
                  <Input
                    id="teacher"
                    value={newLesson.teacher}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, teacher: e.target.value })
                    }
                    className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="duration" className="text-right sm:text-sm">
                    {sp.dialog.duration}
                  </Label>
                  <Input
                    id="duration"
                    value={newLesson.duration}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, duration: e.target.value })
                    }
                    placeholder={sp.dialog.durationPlaceholder}
                    className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="verses" className="text-right sm:text-sm">
                    {sp.dialog.verses}
                  </Label>
                  <Input
                    id="verses"
                    value={newLesson.verses}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, verses: e.target.value })
                    }
                    placeholder={sp.dialog.versesPlaceholder}
                    className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                  <Label htmlFor="recording" className="text-right sm:text-sm">
                    {sp.dialog.recording}
                  </Label>
                  <Select
                    value={newLesson.recording}
                    onValueChange={(value) =>
                      setNewLesson({ ...newLesson, recording: value })
                    }
                  >
                    <SelectTrigger className="col-span-1 sm:col-span-3 text-base sm:text-sm">
                      <SelectValue placeholder={sp.dialog.recordingPlaceholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="available">{sp.dialog.recordingAvailable}</SelectItem>
                      <SelectItem value="processing">{sp.dialog.recordingProcessing}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsAddDialogOpen(false)}
                  className="text-sm"
                >
                  {sp.dialog.cancel}
                </Button>
                <Button onClick={handleAddLesson} className="text-sm">
                  {sp.dialog.submit}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border-r-4 border-r-primary">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <CardTitle className="text-lg sm:text-xl">
                    {lesson.title}
                  </CardTitle>
                  <Badge
                    variant={
                      lesson.recording === "available" ? "default" : "secondary"
                    }
                  >
                    {lesson.recording === "available"
                      ? sp.card.recordingAvailable
                      : sp.card.recordingProcessing}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {lesson.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.teacher}</span>
                    <span>{lesson.teacher}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.date}</span>
                    <span>{lesson.date}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.duration}</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.verses}</span>
                    <span className="text-primary">{lesson.verses}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className="flex-1 text-sm"
                    onClick={() => handleViewRecording(lesson)}
                  >
                    {lesson.recording === "available"
                      ? sp.card.watchRecording
                      : sp.card.comingSoon}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleDownloadMaterial(lesson)}
                  >
                    {sp.card.downloadMaterial}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(lesson)}
                    className="text-sm"
                  >
                    {sp.card.delete}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-lg sm:text-base">
              {sp.deleteDialog.title}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-xs">
              {sp.deleteDialog.message.replace('{{title}}', selectedLesson?.title ?? '')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="text-sm"
            >
              {sp.deleteDialog.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteLesson}
              className="text-sm"
            >
              {sp.deleteDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationalLifeSkills;
