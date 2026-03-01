
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

const EducationalEthicsBehavior = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const sp = t.educational.subPages.ethicsBehavior;

  // State for lessons management
  const [lessons, setLessons] = useState([
    {
      id: "1",
      title: "آداب الطعام والشراب في الإسلام",
      description:
        "تعليم الآداب النبوية في الأكل والشرب وأهميتها في حياة المسلم",
      teacher: "الشيخ أحمد محمد",
      date: "2025-11-14",
      duration: "40 دقيقة",
      recording: "available",
      verses: "الأعراف 31-36",
    },
    {
      id: "2",
      title: "بر الوالدين وحقوقهما",
      description: "توضيح أهمية بر الوالدين والحقوق الواجبة تجاههما في الإسلام",
      teacher: "الشيخ خالد حسن",
      date: "2025-11-07",
      duration: "45 دقيقة",
      recording: "available",
      verses: "الإسراء 23-24",
    },
    {
      id: "3",
      title: "الصدق والأمانة",
      description:
        "أهمية الصدق والأمانة كقيم إسلامية أساسية وتطبيقها في الحياة",
      teacher: "الشيخ محمد سعيد",
      date: "2025-10-31",
      duration: "35 دقيقة",
      recording: "processing",
      verses: "المائدة 8-13",
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

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={sp.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-8 flex justify-between items-center">
          <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-8 rounded-2xl shadow-[var(--shadow-soft)] flex-1">
            <h2 className="text-3xl font-bold mb-3">{sp.bannerTitle}</h2>
            <p className="text-lg opacity-90">
              {sp.bannerSubtitle}
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground mr-4">
                {sp.addButton}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{sp.dialog.title}</DialogTitle>
                <DialogDescription>
                  {sp.dialog.description}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    {sp.dialog.itemTitle}
                  </Label>
                  <Input
                    id="title"
                    value={newLesson.title}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, title: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
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
                    className="col-span-3"
                    rows={3}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    {sp.dialog.teacher}
                  </Label>
                  <Input
                    id="teacher"
                    value={newLesson.teacher}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, teacher: e.target.value })
                    }
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    {sp.dialog.duration}
                  </Label>
                  <Input
                    id="duration"
                    value={newLesson.duration}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, duration: e.target.value })
                    }
                    placeholder={sp.dialog.durationPlaceholder}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="verses" className="text-right">
                    {sp.dialog.verses}
                  </Label>
                  <Input
                    id="verses"
                    value={newLesson.verses}
                    onChange={(e) =>
                      setNewLesson({ ...newLesson, verses: e.target.value })
                    }
                    placeholder={sp.dialog.versesPlaceholder}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recording" className="text-right">
                    {sp.dialog.recording}
                  </Label>
                  <Select
                    value={newLesson.recording}
                    onValueChange={(value) =>
                      setNewLesson({ ...newLesson, recording: value })
                    }
                  >
                    <SelectTrigger className="col-span-3">
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
                >
                  {sp.dialog.cancel}
                </Button>
                <Button onClick={handleAddLesson}>{sp.dialog.submit}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {lessons.map((lesson) => (
            <Card key={lesson.id} className="border-r-4 border-r-primary">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{lesson.title}</CardTitle>
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
                <p className="text-muted-foreground mb-4">
                  {lesson.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sp.card.teacher}</span>
                    <span>{lesson.teacher}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sp.card.date}</span>
                    <span>{lesson.date}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sp.card.duration}</span>
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{sp.card.verses}</span>
                    <span className="text-primary">{lesson.verses}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1">
                    {lesson.recording === "available"
                      ? sp.card.watchRecording
                      : sp.card.comingSoon}
                  </Button>
                  <Button variant="outline">{sp.card.downloadMaterial}</Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(lesson)}
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{sp.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {sp.deleteDialog.message.replace('{{title}}', selectedLesson?.title ?? '')}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {sp.deleteDialog.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteLesson}>
              {sp.deleteDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EducationalEthicsBehavior;
