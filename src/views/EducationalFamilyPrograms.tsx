
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

const EducationalFamilyPrograms = () => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const sp = t.educational.subPages.familyPrograms;

  // State for programs management
  const [programs, setPrograms] = useState([
    {
      id: "1",
      title: "برنامج الأسرة المسلمة",
      description:
        "برنامج متكامل لتعزيز قيم الأسرة المسلمة وتطوير العلاقات الأسرية",
      teacher: "الشيخ أحمد محمد",
      date: "2025-11-11",
      duration: "ساعتان",
      recording: "available",
      verses: "الروم 21",
    },
    {
      id: "2",
      title: "ورشة تربية الأبناء",
      description: "ورشة عمل عملية لآليات تربية الأبناء في ضوء الإسلام",
      teacher: "الشيخ خالد حسن",
      date: "2025-11-04",
      duration: "3 ساعات",
      recording: "available",
      verses: "الإسراء 23-25",
    },
    {
      id: "3",
      title: "لقاءات أولياء الأمور",
      description: "لقاءات دورية لمناقشة قضايا تربية الأبناء ومتابعتهم",
      teacher: "الشيخ محمد سعيد",
      date: "2025-10-28",
      duration: "ساعة ونصف",
      recording: "processing",
      verses: "التحريم 6",
    },
  ]);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<any>(null);

  // Form state for new program
  const [newProgram, setNewProgram] = useState({
    title: "",
    description: "",
    teacher: "",
    duration: "",
    verses: "",
    recording: "processing",
  });

  // Functions for CRUD operations
  const handleAddProgram = () => {
    if (
      !newProgram.title ||
      !newProgram.description ||
      !newProgram.teacher ||
      !newProgram.duration ||
      !newProgram.verses
    ) {
      toast({
        title: sp.toast.validationError,
        description: sp.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const program = {
      id: Date.now().toString(),
      title: newProgram.title,
      description: newProgram.description,
      teacher: newProgram.teacher,
      date: new Date().toISOString().split("T")[0],
      duration: newProgram.duration,
      verses: newProgram.verses,
      recording: newProgram.recording,
    };

    setPrograms([...programs, program]);
    setNewProgram({
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

  const handleDeleteProgram = () => {
    if (!selectedProgram) return;

    setPrograms(
      programs.filter((program) => program.id !== selectedProgram.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedProgram(null);
    toast({
      title: sp.toast.deleteSuccess,
      description: sp.toast.deleteSuccessDescription,
    });
  };

  const openDeleteDialog = (program: any) => {
    setSelectedProgram(program);
    setIsDeleteDialogOpen(true);
  };

  const handleViewRecording = (program: any) => {
    if (program.recording === "available") {
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

  const handleDownloadMaterial = (program: any) => {
    toast({
      title: sp.toast.downloadMaterial,
      description: sp.toast.downloadMaterialDescription,
    });
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${program.title}.pdf`;
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
                    value={newProgram.title}
                    onChange={(e) =>
                      setNewProgram({ ...newProgram, title: e.target.value })
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
                    value={newProgram.description}
                    onChange={(e) =>
                      setNewProgram({
                        ...newProgram,
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
                    value={newProgram.teacher}
                    onChange={(e) =>
                      setNewProgram({ ...newProgram, teacher: e.target.value })
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
                    value={newProgram.duration}
                    onChange={(e) =>
                      setNewProgram({ ...newProgram, duration: e.target.value })
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
                    value={newProgram.verses}
                    onChange={(e) =>
                      setNewProgram({ ...newProgram, verses: e.target.value })
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
                    value={newProgram.recording}
                    onValueChange={(value) =>
                      setNewProgram({ ...newProgram, recording: value })
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
                <Button onClick={handleAddProgram} className="text-sm">
                  {sp.dialog.submit}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="border-r-4 border-r-primary">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <CardTitle className="text-lg sm:text-xl">
                    {program.title}
                  </CardTitle>
                  <Badge
                    variant={
                      program.recording === "available"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {program.recording === "available"
                      ? sp.card.recordingAvailable
                      : sp.card.recordingProcessing}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {program.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.teacher}</span>
                    <span>{program.teacher}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.date}</span>
                    <span>{program.date}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.duration}</span>
                    <span>{program.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.verses}</span>
                    <span className="text-primary">{program.verses}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className="flex-1 text-sm"
                    onClick={() => handleViewRecording(program)}
                  >
                    {program.recording === "available"
                      ? sp.card.watchRecording
                      : sp.card.comingSoon}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleDownloadMaterial(program)}
                  >
                    {sp.card.downloadMaterial}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(program)}
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
              {sp.deleteDialog.message.replace('{{title}}', selectedProgram?.title ?? '')}
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
              onClick={handleDeleteProgram}
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

export default EducationalFamilyPrograms;
