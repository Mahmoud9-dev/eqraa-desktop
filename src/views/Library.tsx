
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
import { LibraryResource, ResourceType } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

const Library = () => {
  const [activeTab, setActiveTab] = useState("books");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedResource, setSelectedResource] =
    useState<LibraryResource | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { toast } = useToast();
  const { t, tFunc, languageMeta } = useLanguage();

  // Label maps for DB canonical values → translated display labels
  const typeLabelMap: Record<string, string> = {
    "PDF": t.library.typeLabels.pdf,
    "صوت": t.library.typeLabels.audio,
    "فيديو": t.library.typeLabels.video,
    "رابط": t.library.typeLabels.link,
  };

  const categoryLabelMap: Record<string, string> = {
    "تفسير": t.library.categoryLabels.tafsir,
    "حديث": t.library.categoryLabels.hadith,
    "فقه": t.library.categoryLabels.fiqh,
    "عقيدة": t.library.categoryLabels.aqeedah,
    "سيرة": t.library.categoryLabels.seerah,
    "تجويد": t.library.categoryLabels.tajweed,
    "أصول الفقه": t.library.categoryLabels.usulFiqh,
    "أخلاق": t.library.categoryLabels.akhlaq,
    "تاريخ الإسلام": t.library.categoryLabels.islamicHistory,
  };

  // Mock data - will be replaced with actual data from Supabase
  const [resources, setResources] = useState<LibraryResource[]>([
    {
      id: "1",
      title: "تفسير ابن كثير",
      author: "ابن كثير الدمشقي",
      description: "تفسير كامل للقرآن الكريم من أشهر كتب التفسير بالمأثور",
      type: "PDF",
      category: "تفسير",
      url: "https://example.com/ibn-kathir.pdf",
      isActive: true,
      createdAt: new Date("2025-09-01"),
    },
    {
      id: "2",
      title: "صحيح البخاري",
      author: "الإمام البخاري",
      description: "أصحح كتب الحديث النبوي بعد القرآن الكريم",
      type: "PDF",
      category: "حديث",
      url: "https://example.com/bukhari.pdf",
      isActive: true,
      createdAt: new Date("2025-09-05"),
    },
    {
      id: "3",
      title: "دروس في التجويد",
      author: "الشيخ محمد محمود",
      description: "سلسلة دروس صوتية في أحكام التجويد",
      type: "صوت",
      category: "تجويد",
      url: "https://example.com/tajweed-lessons.mp3",
      isActive: true,
      createdAt: new Date("2025-09-10"),
    },
    {
      id: "4",
      title: "سيرة النبي صلى الله عليه وسلم",
      author: "ابن هشام",
      description: "سيرة نبوية شاملة من مصادر موثوقة",
      type: "فيديو",
      category: "سيرة",
      url: "https://example.com/seerah-video.mp4",
      isActive: true,
      createdAt: new Date("2025-09-15"),
    },
    {
      id: "5",
      title: "موسوعة الفقه الإسلامي",
      author: "مجموعة من العلماء",
      description: "موسوعة شاملة في الفقه الإسلامي وأدلته",
      type: "رابط",
      category: "فقه",
      url: "https://example.com/islamic-fiqh-encyclopedia.com",
      isActive: true,
      createdAt: new Date("2025-09-20"),
    },
    {
      id: "6",
      title: "شرح الأربعين النووية",
      author: "الشيخ عبد الله بن جبرين",
      description: "شرح مفصل للأحاديث الأربعين النووية",
      type: "صوت",
      category: "حديث",
      url: "https://example.com/arbaeen-explanation.mp3",
      isActive: true,
      createdAt: new Date("2025-10-01"),
    },
    {
      id: "7",
      title: "العقيدة الطحاوية",
      author: "ابن أبي العز الحنفي",
      description: "من أهم متون العقيدة السلفية",
      type: "PDF",
      category: "عقيدة",
      url: "https://example.com/tahawiyyah.pdf",
      isActive: true,
      createdAt: new Date("2025-10-05"),
    },
    {
      id: "8",
      title: "دروس في أصول الفقه",
      author: "الشيخ محمد العثيمين",
      description: "سلسلة دروس في أصول الفقه الإسلامي",
      type: "فيديو",
      category: "أصول الفقه",
      url: "https://example.com/usul-fiqh.mp4",
      isActive: true,
      createdAt: new Date("2025-10-10"),
    },
  ]);

  // Form state
  const [newResource, setNewResource] = useState<Partial<LibraryResource>>({
    title: "",
    author: "",
    description: "",
    type: "PDF",
    category: "",
    url: "",
    isActive: true,
  });

  const categories = [
    "all",
    "تفسير",
    "حديث",
    "فقه",
    "عقيدة",
    "سيرة",
    "تجويد",
    "أصول الفقه",
    "أخلاق",
    "تاريخ الإسلام",
  ];

  const getTypeColor = (type: ResourceType) => {
    switch (type) {
      case "PDF":
        return "bg-red-100 text-red-800";
      case "صوت":
        return "bg-blue-100 text-blue-800";
      case "فيديو":
        return "bg-green-100 text-green-800";
      case "رابط":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: ResourceType) => {
    switch (type) {
      case "PDF":
        return "📄";
      case "صوت":
        return "🎵";
      case "فيديو":
        return "🎥";
      case "رابط":
        return "🔗";
      default:
        return "📄";
    }
  };

  const getTypeActionLabel = (type: ResourceType) => {
    switch (type) {
      case "PDF":
        return t.library.actions.download;
      case "صوت":
        return t.library.actions.listen;
      case "فيديو":
        return t.library.actions.watch;
      case "رابط":
        return t.library.actions.visit;
      default:
        return t.library.actions.view;
    }
  };

  // CRUD functions
  const handleAddResource = () => {
    if (!newResource.title || !newResource.type || !newResource.category) {
      toast({
        title: t.library.toast.errorTitle,
        description: t.library.toast.requiredFields,
        variant: "destructive",
      });
      return;
    }

    const resource: LibraryResource = {
      id: Date.now().toString(),
      title: newResource.title || "",
      author: newResource.author,
      description: newResource.description,
      type: newResource.type as ResourceType,
      category: newResource.category || "",
      url: newResource.url,
      isActive: newResource.isActive || true,
      createdAt: new Date(),
    };

    setResources([...resources, resource]);
    setNewResource({
      title: "",
      author: "",
      description: "",
      type: "PDF",
      category: "",
      url: "",
      isActive: true,
    });
    setIsAddDialogOpen(false);
    toast({
      title: t.library.toast.addedTitle,
      description: t.library.toast.addedDescription,
    });
  };

  const handleEditResource = () => {
    if (
      !selectedResource ||
      !newResource.title ||
      !newResource.type ||
      !newResource.category
    ) {
      toast({
        title: t.library.toast.errorTitle,
        description: t.library.toast.requiredFields,
        variant: "destructive",
      });
      return;
    }

    setResources(
      resources.map((resource) =>
        resource.id === selectedResource.id
          ? {
              ...resource,
              title: newResource.title || resource.title,
              author: newResource.author || resource.author,
              description: newResource.description || resource.description,
              type: (newResource.type as ResourceType) || resource.type,
              category: newResource.category || resource.category,
              url: newResource.url || resource.url,
              isActive:
                newResource.isActive !== undefined
                  ? newResource.isActive
                  : resource.isActive,
            }
          : resource
      )
    );

    setIsEditDialogOpen(false);
    setSelectedResource(null);
    setNewResource({
      title: "",
      author: "",
      description: "",
      type: "PDF",
      category: "",
      url: "",
      isActive: true,
    });
    toast({
      title: t.library.toast.editedTitle,
      description: t.library.toast.editedDescription,
    });
  };

  const handleDeleteResource = () => {
    if (!selectedResource) return;

    setResources(
      resources.filter((resource) => resource.id !== selectedResource.id)
    );
    setIsDeleteDialogOpen(false);
    setSelectedResource(null);
    toast({
      title: t.library.toast.deletedTitle,
      description: t.library.toast.deletedDescription,
    });
  };

  const openEditDialog = (resource: LibraryResource) => {
    setSelectedResource(resource);
    setNewResource({
      title: resource.title,
      author: resource.author,
      description: resource.description,
      type: resource.type,
      category: resource.category,
      url: resource.url,
      isActive: resource.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (resource: LibraryResource) => {
    setSelectedResource(resource);
    setIsDeleteDialogOpen(true);
  };

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getResourcesByType = (type: ResourceType) => {
    return filteredResources.filter((resource) => resource.type === type);
  };

  // Shared resource card renderer to avoid repetition across tabs
  const renderResourceCard = (resource: LibraryResource) => (
    <Card
      key={resource.id}
      className="hover:shadow-md transition-shadow"
    >
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-2xl shrink-0">{getTypeIcon(resource.type)}</span>
            <CardTitle className="text-base truncate">
              {resource.title}
            </CardTitle>
          </div>
          <Badge className={`${getTypeColor(resource.type)} shrink-0 text-xs`}>
            {typeLabelMap[resource.type] || resource.type}
          </Badge>
        </div>
        <CardDescription>
          {resource.author && <span className="block">{t.library.card.authorLabel} {resource.author}</span>}
          <span className="block">{t.library.card.categoryLabel} {categoryLabelMap[resource.category] || resource.category}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {resource.description}
        </p>
        <div className="text-xs text-muted-foreground mb-3">
          {t.library.card.addedLabel} {formatDate(resource.createdAt, languageMeta.code)}
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" className="flex-1 min-w-[70px] text-xs">
            {getTypeActionLabel(resource.type)}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 min-w-[70px] text-xs"
            onClick={() => openEditDialog(resource)}
          >
            {t.library.actions.edit}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            className="flex-1 min-w-[70px] text-xs"
            onClick={() => openDeleteDialog(resource)}
          >
            {t.library.actions.delete}
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Shared form fields renderer for add/edit dialogs
  const renderFormFields = (idPrefix: string) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-title`} className="text-end">
          {t.library.form.titleLabel}
        </Label>
        <Input
          id={`${idPrefix}-title`}
          value={newResource.title}
          onChange={(e) =>
            setNewResource({
              ...newResource,
              title: e.target.value,
            })
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-author`} className="text-end">
          {t.library.form.authorLabel}
        </Label>
        <Input
          id={`${idPrefix}-author`}
          value={newResource.author}
          onChange={(e) =>
            setNewResource({
              ...newResource,
              author: e.target.value,
            })
          }
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-type`} className="text-end">
          {t.library.form.typeLabel}
        </Label>
        <Select
          value={newResource.type}
          onValueChange={(value) =>
            setNewResource({
              ...newResource,
              type: value as ResourceType,
            })
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={t.library.form.typePlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PDF">{typeLabelMap["PDF"]}</SelectItem>
            <SelectItem value="صوت">{typeLabelMap["صوت"]}</SelectItem>
            <SelectItem value="فيديو">{typeLabelMap["فيديو"]}</SelectItem>
            <SelectItem value="رابط">{typeLabelMap["رابط"]}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-category`} className="text-end">
          {t.library.form.categoryLabel}
        </Label>
        <Select
          value={newResource.category}
          onValueChange={(value) =>
            setNewResource({ ...newResource, category: value })
          }
        >
          <SelectTrigger className="col-span-3">
            <SelectValue placeholder={t.library.form.categoryPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            {categories
              .filter((c) => c !== "all")
              .map((category) => (
                <SelectItem key={category} value={category}>
                  {categoryLabelMap[category] || category}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-description`} className="text-end">
          {t.library.form.descriptionLabel}
        </Label>
        <Textarea
          id={`${idPrefix}-description`}
          value={newResource.description}
          onChange={(e) =>
            setNewResource({
              ...newResource,
              description: e.target.value,
            })
          }
          className="col-span-3"
          rows={3}
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor={`${idPrefix}-url`} className="text-end">
          {t.library.form.urlLabel}
        </Label>
        <Input
          id={`${idPrefix}-url`}
          value={newResource.url}
          onChange={(e) =>
            setNewResource({ ...newResource, url: e.target.value })
          }
          className="col-span-3"
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.library.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.library.pageTitle}</h2>
          <p className="text-muted-foreground mb-6">
            {t.library.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Input
                placeholder={t.library.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64"
              />
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder={t.library.allCategories} />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category === "all" ? t.library.allCategories : (categoryLabelMap[category] || category)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  {t.library.actions.addResource}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>{t.library.form.addTitle}</DialogTitle>
                  <DialogDescription>
                    {t.library.form.addDescription}
                  </DialogDescription>
                </DialogHeader>
                {renderFormFields("add")}
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    {t.library.actions.cancel}
                  </Button>
                  <Button onClick={handleAddResource}>{t.library.actions.addResource}</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-5 gap-1">
              <TabsTrigger value="books" className="text-xs sm:text-sm whitespace-nowrap">{t.library.tabs.books}</TabsTrigger>
              <TabsTrigger value="audio" className="text-xs sm:text-sm whitespace-nowrap">{t.library.tabs.audio}</TabsTrigger>
              <TabsTrigger value="video" className="text-xs sm:text-sm whitespace-nowrap">{t.library.tabs.video}</TabsTrigger>
              <TabsTrigger value="links" className="text-xs sm:text-sm whitespace-nowrap">{t.library.tabs.links}</TabsTrigger>
              <TabsTrigger value="all" className="text-xs sm:text-sm whitespace-nowrap">{t.library.tabs.all}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="books" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("PDF").map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="audio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("صوت").map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="video" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("فيديو").map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="links" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getResourcesByType("رابط").map(renderResourceCard)}
            </div>
          </TabsContent>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.library.card.allResourcesTitle}</CardTitle>
                <CardDescription>
                  {t.library.card.allResourcesDescription}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mobile Card View */}
                <div className="block md:hidden space-y-4">
                  {filteredResources.map((resource) => (
                    <div key={resource.id} className="p-4 border rounded-lg space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xl shrink-0">{getTypeIcon(resource.type)}</span>
                          <h4 className="font-medium text-sm truncate">{resource.title}</h4>
                        </div>
                        <Badge className={`${getTypeColor(resource.type)} text-xs shrink-0`}>
                          {typeLabelMap[resource.type] || resource.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-muted-foreground space-y-1">
                        {resource.author && <div>{t.library.card.authorLabel} {resource.author}</div>}
                        <div>{t.library.card.categoryLabel} {categoryLabelMap[resource.category] || resource.category}</div>
                        <div>{t.library.card.addedLabel} {formatDate(resource.createdAt, languageMeta.code)}</div>
                      </div>
                      <div className="flex gap-2 pt-2 border-t">
                        <Button variant="outline" size="sm" className="flex-1 text-xs">
                          {t.library.actions.view}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => openEditDialog(resource)}
                        >
                          {t.library.actions.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="flex-1 text-xs"
                          onClick={() => openDeleteDialog(resource)}
                        >
                          {t.library.actions.delete}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.library.table.title}</TableHead>
                        <TableHead className="hidden lg:table-cell">{t.library.table.author}</TableHead>
                        <TableHead>{t.library.table.type}</TableHead>
                        <TableHead className="hidden lg:table-cell">{t.library.table.category}</TableHead>
                        <TableHead className="hidden lg:table-cell">{t.library.table.addedDate}</TableHead>
                        <TableHead>{t.library.table.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredResources.map((resource) => (
                        <TableRow key={resource.id}>
                          <TableCell className="font-medium max-w-[200px]">
                            <div className="flex items-center gap-2">
                              <span className="shrink-0">{getTypeIcon(resource.type)}</span>
                              <span className="truncate">{resource.title}</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{resource.author}</TableCell>
                          <TableCell>
                            <Badge className={getTypeColor(resource.type)}>
                              {typeLabelMap[resource.type] || resource.type}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">{categoryLabelMap[resource.category] || resource.category}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            {formatDate(resource.createdAt, languageMeta.code)}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button variant="outline" size="sm" className="text-xs px-2">
                                {t.library.actions.view}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2"
                                onClick={() => openEditDialog(resource)}
                              >
                                {t.library.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                className="text-xs px-2"
                                onClick={() => openDeleteDialog(resource)}
                              >
                                {t.library.actions.delete}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{t.library.form.editTitle}</DialogTitle>
            <DialogDescription>{t.library.form.editDescription}</DialogDescription>
          </DialogHeader>
          {renderFormFields("edit")}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              {t.library.actions.cancel}
            </Button>
            <Button onClick={handleEditResource}>{t.library.actions.saveChanges}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.library.deleteDialog.title}</DialogTitle>
            <DialogDescription>
              {tFunc('library.deleteDialog.description', { title: selectedResource?.title || '' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t.library.actions.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteResource}>
              {t.library.actions.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Library;
