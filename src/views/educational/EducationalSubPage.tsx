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

/**
 * Shape of each item managed by an educational sub-page.
 * All six sub-page entity types share the same structure.
 */
export interface EducationalItem {
  id: string;
  title: string;
  description: string;
  teacher: string;
  date: string;
  duration: string;
  recording: string;
  verses: string;
}

/**
 * Translation shape that every educational sub-page provides.
 * Mirrors the SubPageTranslations interface from the i18n layer.
 */
export interface SubPageTranslations {
  pageTitle: string;
  bannerTitle: string;
  bannerSubtitle: string;
  addButton: string;
  dialog: {
    title: string;
    description: string;
    itemTitle: string;
    itemDescription: string;
    teacher: string;
    duration: string;
    durationPlaceholder: string;
    verses: string;
    versesPlaceholder: string;
    recording: string;
    recordingPlaceholder: string;
    recordingAvailable: string;
    recordingProcessing: string;
    cancel: string;
    submit: string;
  };
  card: {
    teacher: string;
    date: string;
    duration: string;
    verses: string;
    recordingAvailable: string;
    recordingProcessing: string;
    watchRecording: string;
    comingSoon: string;
    downloadMaterial: string;
    delete: string;
  };
  deleteDialog: {
    title: string;
    message: string;
    cancel: string;
    confirm: string;
  };
  toast: {
    addSuccess: string;
    addSuccessDescription: string;
    deleteSuccess: string;
    deleteSuccessDescription: string;
    validationError: string;
    validationErrorDescription: string;
    openRecording: string;
    openRecordingDescription: string;
    recordingUnavailable: string;
    recordingUnavailableDescription: string;
    downloadMaterial: string;
    downloadMaterialDescription: string;
  };
}

export interface EducationalSubPageProps {
  /** Sub-page translations (e.g. t.educational.subPages.islamicLessons) */
  translations: SubPageTranslations;
  /** Initial mock data to seed state */
  initialData: EducationalItem[];
}

const EducationalSubPage = ({ translations: sp, initialData }: EducationalSubPageProps) => {
  const { toast } = useToast();

  const [items, setItems] = useState<EducationalItem[]>(initialData);

  // Dialog states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EducationalItem | null>(null);

  // Form state for new item
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    teacher: "",
    duration: "",
    verses: "",
    recording: "processing",
  });

  const resetForm = () => {
    setNewItem({
      title: "",
      description: "",
      teacher: "",
      duration: "",
      verses: "",
      recording: "processing",
    });
  };

  const handleAdd = () => {
    if (
      !newItem.title ||
      !newItem.description ||
      !newItem.teacher ||
      !newItem.duration ||
      !newItem.verses
    ) {
      toast({
        title: sp.toast.validationError,
        description: sp.toast.validationErrorDescription,
        variant: "destructive",
      });
      return;
    }

    const item: EducationalItem = {
      id: Date.now().toString(),
      title: newItem.title,
      description: newItem.description,
      teacher: newItem.teacher,
      date: new Date().toISOString().split("T")[0],
      duration: newItem.duration,
      verses: newItem.verses,
      recording: newItem.recording,
    };

    setItems([...items, item]);
    resetForm();
    setIsAddDialogOpen(false);
    toast({
      title: sp.toast.addSuccess,
      description: sp.toast.addSuccessDescription,
    });
  };

  const handleDelete = () => {
    if (!selectedItem) return;

    setItems(items.filter((item) => item.id !== selectedItem.id));
    setIsDeleteDialogOpen(false);
    setSelectedItem(null);
    toast({
      title: sp.toast.deleteSuccess,
      description: sp.toast.deleteSuccessDescription,
    });
  };

  const openDeleteDialog = (item: EducationalItem) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const handleViewRecording = (item: EducationalItem) => {
    if (item.recording === "available") {
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

  const handleDownloadMaterial = (item: EducationalItem) => {
    toast({
      title: sp.toast.downloadMaterial,
      description: sp.toast.downloadMaterialDescription,
    });
    const link = document.createElement("a");
    link.href = "#";
    link.download = `${item.title}.pdf`;
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
                    value={newItem.title}
                    onChange={(e) =>
                      setNewItem({ ...newItem, title: e.target.value })
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
                    value={newItem.description}
                    onChange={(e) =>
                      setNewItem({
                        ...newItem,
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
                    value={newItem.teacher}
                    onChange={(e) =>
                      setNewItem({ ...newItem, teacher: e.target.value })
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
                    value={newItem.duration}
                    onChange={(e) =>
                      setNewItem({ ...newItem, duration: e.target.value })
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
                    value={newItem.verses}
                    onChange={(e) =>
                      setNewItem({ ...newItem, verses: e.target.value })
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
                    value={newItem.recording}
                    onValueChange={(value) =>
                      setNewItem({ ...newItem, recording: value })
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
                <Button onClick={handleAdd} className="text-sm">
                  {sp.dialog.submit}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {items.map((item) => (
            <Card key={item.id} className="border-r-4 border-r-primary">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                  <CardTitle className="text-lg sm:text-xl">
                    {item.title}
                  </CardTitle>
                  <Badge
                    variant={
                      item.recording === "available" ? "default" : "secondary"
                    }
                  >
                    {item.recording === "available"
                      ? sp.card.recordingAvailable
                      : sp.card.recordingProcessing}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 text-sm sm:text-base">
                  {item.description}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.teacher}</span>
                    <span>{item.teacher}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.date}</span>
                    <span>{item.date}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.duration}</span>
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex justify-between text-xs sm:text-sm">
                    <span className="font-medium">{sp.card.verses}</span>
                    <span className="text-primary">{item.verses}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button
                    className="flex-1 text-sm"
                    onClick={() => handleViewRecording(item)}
                  >
                    {item.recording === "available"
                      ? sp.card.watchRecording
                      : sp.card.comingSoon}
                  </Button>
                  <Button
                    variant="outline"
                    className="text-sm"
                    onClick={() => handleDownloadMaterial(item)}
                  >
                    {sp.card.downloadMaterial}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => openDeleteDialog(item)}
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
              {sp.deleteDialog.message.replace('{{title}}', selectedItem?.title ?? '')}
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
              onClick={handleDelete}
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

export { EducationalSubPage };
