
import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
import { Department, Teacher } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  getTeachers,
  addTeacher as dbAddTeacher,
  updateTeacher,
  deleteTeacher as dbDeleteTeacher,
} from "@/lib/database/repositories/teachers";
import TeacherWorkloadChart from "@/components/charts/TeacherWorkloadChart";
import { getTeacherWorkload, type TeacherWorkloadRow } from "@/lib/database/repositories/stats";
import { logger } from "@/lib/logger";

const Teachers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState<Department | "all">(
    "all"
  );
  const [activeTab, setActiveTab] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const { toast } = useToast();
  const { t, tFunc } = useLanguage();

  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [workloadData, setWorkloadData] = useState<TeacherWorkloadRow[]>([]);

  const loadTeachers = useCallback(async () => {
    try {
      const data = await getTeachers();
      const transformed = data.map((t) => ({
        id: t.id,
        name: t.name,
        specialization: t.specialization,
        department: t.department as Department,
        email: t.email || "",
        phone: t.phone || "",
        experience: t.experience || 0,
        isActive: t.is_active === 1,
        createdAt: new Date(t.created_at),
      }));
      setTeachers(transformed);
    } catch (error) {
      logger.error("Error loading teachers:", error);
    }
  }, []);

  useEffect(() => {
    // data fetch on mount — setState after await is safe, rule false-positives
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadTeachers();
    getTeacherWorkload()
      .then(setWorkloadData)
      .catch((err: unknown) => logger.error("Failed to fetch teacher workload", err));
  }, [loadTeachers]);

  // Extended teacher data for display
  const teachersExtended = teachers.map((teacher) => ({
    ...teacher,
    bio:
      teacher.id === "1"
        ? "شيخ متخصص في حفظ القرآن الكريم بإجازة في القراءات العشر"
        : teacher.id === "2"
        ? "متخصص في الفقه المقارن وأصول الفقه"
        : teacher.id === "3"
        ? "باحث في السيرة النبوية وعلوم الحديث"
        : "مجاز في التجويد والقراءات السبع",
    subjects:
      teacher.id === "1"
        ? ["حفظ القرآن", "تجويد", "القراءات"]
        : teacher.id === "2"
        ? ["الفقه", "العقيدة", "أصول الفقه"]
        : teacher.id === "3"
        ? ["السيرة النبوية", "الحديث", "التربية الإسلامية"]
        : ["التجويد", "القراءات", "القرآن"],
    studentsCount:
      teacher.id === "1"
        ? 25
        : teacher.id === "2"
        ? 18
        : teacher.id === "3"
        ? 22
        : 20,
  }));

  // Form state
  const [newTeacher, setNewTeacher] = useState<Partial<Teacher>>({
    name: "",
    specialization: "",
    department: "quran",
    email: "",
    phone: "",
    experience: 0,
    isActive: true,
  });

  const filteredTeachers = teachersExtended.filter((teacher) => {
    const matchesSearch =
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || teacher.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentName = (dept: Department) => {
    const deptMap: Record<Department, string> = {
      quran: t.teachers.departments.quran,
      tajweed: t.teachers.departments.tajweed,
      tarbawi: t.teachers.departments.tarbawi,
    };
    return deptMap[dept] || dept;
  };

  const getExperienceColor = (years: number) => {
    if (years >= 15) return "bg-green-100 text-green-800";
    if (years >= 10) return "bg-blue-100 text-blue-800";
    if (years >= 5) return "bg-yellow-100 text-yellow-800";
    return "bg-gray-100 text-gray-800";
  };

  // CRUD functions
  const handleAddTeacher = async () => {
    if (
      !newTeacher.name ||
      !newTeacher.specialization ||
      !newTeacher.department
    ) {
      toast({
        title: t.teachers.toast.error,
        description: t.teachers.toast.fillRequired,
        variant: "destructive",
      });
      return;
    }

    try {
      await dbAddTeacher({
        name: newTeacher.name,
        specialization: newTeacher.specialization,
        department: newTeacher.department as string,
        email: newTeacher.email || undefined,
        phone: newTeacher.phone || undefined,
        experience: newTeacher.experience || undefined,
      });

      await loadTeachers();
      setNewTeacher({
        name: "",
        specialization: "",
        department: "quran",
        email: "",
        phone: "",
        experience: 0,
        isActive: true,
      });
      setIsAddDialogOpen(false);
      toast({
        title: t.teachers.toast.addSuccess,
        description: t.teachers.toast.addSuccessDesc,
      });
    } catch (error) {
      logger.error("Error adding teacher:", error);
      toast({
        title: t.teachers.toast.error,
        description: String(error),
        variant: "destructive",
      });
    }
  };

  const handleEditTeacher = async () => {
    if (
      !selectedTeacher ||
      !newTeacher.name ||
      !newTeacher.specialization ||
      !newTeacher.department
    ) {
      toast({
        title: t.teachers.toast.error,
        description: t.teachers.toast.fillRequired,
        variant: "destructive",
      });
      return;
    }

    try {
      await updateTeacher(selectedTeacher.id, {
        name: newTeacher.name,
        specialization: newTeacher.specialization,
        department: newTeacher.department as string,
        email: newTeacher.email || null,
        phone: newTeacher.phone || null,
        experience: newTeacher.experience || null,
      });

      await loadTeachers();
      setIsEditDialogOpen(false);
      setSelectedTeacher(null);
      setNewTeacher({
        name: "",
        specialization: "",
        department: "quran",
        email: "",
        phone: "",
        experience: 0,
        isActive: true,
      });
      toast({
        title: t.teachers.toast.editSuccess,
        description: t.teachers.toast.editSuccessDesc,
      });
    } catch (error) {
      logger.error("Error updating teacher:", error);
      toast({
        title: t.teachers.toast.error,
        description: String(error),
        variant: "destructive",
      });
    }
  };

  const handleDeleteTeacher = async () => {
    if (!selectedTeacher) return;

    try {
      await dbDeleteTeacher(selectedTeacher.id);
      await loadTeachers();
      setIsDeleteDialogOpen(false);
      setSelectedTeacher(null);
      toast({
        title: t.teachers.toast.deleteSuccess,
        description: t.teachers.toast.deleteSuccessDesc,
      });
    } catch (error) {
      logger.error("Error deleting teacher:", error);
      toast({
        title: t.teachers.toast.error,
        description: String(error),
        variant: "destructive",
      });
    }
  };

  const openEditDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setNewTeacher({
      name: teacher.name,
      specialization: teacher.specialization,
      department: teacher.department,
      email: teacher.email,
      phone: teacher.phone,
      experience: teacher.experience,
      isActive: teacher.isActive,
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.teachers.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {t.teachers.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            {t.teachers.sectionDescription}
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">{t.charts.workload.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <TeacherWorkloadChart data={workloadData} />
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 space-x-0 sm:space-x-4 space-x-reverse">
              <Input
                placeholder={t.teachers.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 text-base sm:text-sm"
              />
              <Select
                value={filterDepartment}
                onValueChange={(value) =>
                  setFilterDepartment(value as Department | "all")
                }
              >
                <SelectTrigger className="w-full sm:w-48 text-base sm:text-sm">
                  <SelectValue placeholder={t.teachers.departments.all} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.teachers.departments.all}</SelectItem>
                  <SelectItem value="quran">{t.teachers.departments.quran}</SelectItem>
                  <SelectItem value="tajweed">{t.teachers.departments.tajweed}</SelectItem>
                  <SelectItem value="tarbawi">{t.teachers.departments.tarbawi}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground w-full sm:w-auto text-sm">
                  {t.teachers.actions.addNewTeacher}
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-lg sm:text-base">
                    {t.teachers.dialog.addTitle}
                  </DialogTitle>
                  <DialogDescription className="text-sm sm:text-xs">
                    {t.teachers.dialog.addDescription}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label htmlFor="name" className="text-right sm:text-sm">
                      {t.teachers.form.name}
                    </Label>
                    <Input
                      id="name"
                      value={newTeacher.name}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, name: e.target.value })
                      }
                      className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label
                      htmlFor="specialization"
                      className="text-right sm:text-sm"
                    >
                      {t.teachers.form.specialization}
                    </Label>
                    <Input
                      id="specialization"
                      value={newTeacher.specialization}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          specialization: e.target.value,
                        })
                      }
                      className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label
                      htmlFor="department"
                      className="text-right sm:text-sm"
                    >
                      {t.teachers.form.department}
                    </Label>
                    <Select
                      value={newTeacher.department}
                      onValueChange={(value) =>
                        setNewTeacher({
                          ...newTeacher,
                          department: value as Department,
                        })
                      }
                    >
                      <SelectTrigger className="col-span-1 sm:col-span-3 text-base sm:text-sm">
                        <SelectValue placeholder={t.teachers.form.selectDepartment} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quran">{t.teachers.departments.quran}</SelectItem>
                        <SelectItem value="tajweed">{t.teachers.departments.tajweed}</SelectItem>
                        <SelectItem value="tarbawi">{t.teachers.departments.tarbawi}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label htmlFor="email" className="text-right sm:text-sm">
                      {t.teachers.form.email}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={newTeacher.email}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, email: e.target.value })
                      }
                      className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label htmlFor="phone" className="text-right sm:text-sm">
                      {t.teachers.form.phone}
                    </Label>
                    <Input
                      id="phone"
                      value={newTeacher.phone}
                      onChange={(e) =>
                        setNewTeacher({ ...newTeacher, phone: e.target.value })
                      }
                      className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-2 sm:gap-4">
                    <Label
                      htmlFor="experience"
                      className="text-right sm:text-sm"
                    >
                      {t.teachers.form.experienceYears}
                    </Label>
                    <Input
                      id="experience"
                      type="number"
                      value={newTeacher.experience}
                      onChange={(e) =>
                        setNewTeacher({
                          ...newTeacher,
                          experience: parseInt(e.target.value) || 0,
                        })
                      }
                      className="col-span-1 sm:col-span-3 text-base sm:text-sm"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setIsAddDialogOpen(false)}
                    className="text-sm"
                  >
                    {t.teachers.actions.cancel}
                  </Button>
                  <Button onClick={handleAddTeacher} className="text-sm">
                    {t.teachers.actions.addTeacher}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
            <TabsTrigger value="all">{t.teachers.tabs.allTeachers}</TabsTrigger>
            <TabsTrigger value="profile">{t.teachers.tabs.profiles}</TabsTrigger>
            <TabsTrigger value="contact">{t.teachers.tabs.contact}</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.teachers.card.teacherListTitle}</CardTitle>
                <CardDescription>
                  {t.teachers.card.teacherListDesc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs sm:text-sm">
                          {t.teachers.table.teacher}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm hidden sm:table-cell">
                          {t.teachers.table.specialization}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          {t.teachers.table.department}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm hidden md:table-cell">
                          {t.teachers.table.experience}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm hidden lg:table-cell">
                          {t.teachers.table.students}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          {t.teachers.table.status}
                        </TableHead>
                        <TableHead className="text-xs sm:text-sm">
                          {t.teachers.table.actions}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTeachers.map((teacher) => (
                        <TableRow key={teacher.id}>
                          <TableCell className="text-xs sm:text-sm">
                            <div className="flex items-center space-x-2 sm:space-x-3 space-x-reverse">
                              <Avatar className="w-6 h-6 sm:w-8 sm:h-8">
                                <AvatarImage src="" />
                                <AvatarFallback className="text-xs sm:text-sm">
                                  {teacher.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-xs sm:text-sm">
                                  {teacher.name}
                                </div>
                                <div className="text-xs text-muted-foreground hidden sm:block">
                                  {teacher.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden sm:table-cell">
                            {teacher.specialization}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <Badge variant="outline" className="text-xs">
                              {getDepartmentName(teacher.department)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden md:table-cell">
                            <Badge
                              className={getExperienceColor(teacher.experience ?? 0)}
                            >
                              {teacher.experience ?? 0} {t.teachers.profile.yearUnit}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm hidden lg:table-cell">
                            {teacher.studentsCount}
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <Badge
                              className={
                                teacher.isActive
                                  ? "bg-green-100 text-green-800 text-xs"
                                  : "bg-red-100 text-red-800 text-xs"
                              }
                            >
                              {teacher.isActive ? t.teachers.status.active : t.teachers.status.inactive}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-xs sm:text-sm">
                            <div className="flex space-x-1 space-x-reverse">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                              >
                                {t.teachers.actions.view}
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openEditDialog(teacher)}
                                className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                              >
                                {t.teachers.actions.edit}
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => openDeleteDialog(teacher)}
                                className="text-xs px-2 py-1 h-7 sm:h-8 sm:px-3"
                              >
                                {t.teachers.actions.delete}
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

          <TabsContent value="profile" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredTeachers.map((teacher) => (
                <Card key={teacher.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-3 space-x-reverse">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {teacher.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div>{teacher.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {teacher.specialization}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">{t.teachers.profile.aboutTeacher}</h4>
                        <p className="text-sm text-muted-foreground">
                          {teacher.bio}
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium mb-2">{t.teachers.profile.subjectsTeaching}</h4>
                        <div className="flex flex-wrap gap-2">
                          {teacher.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">{t.teachers.profile.experience}</h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.experience} {t.teachers.profile.yearUnit}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{t.teachers.profile.studentCount}</h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.studentsCount} {t.teachers.profile.studentUnit}
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-1">
                            {t.teachers.form.email}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.email}
                          </p>
                        </div>
                        <div>
                          <h4 className="font-medium mb-1">{t.teachers.form.phone}</h4>
                          <p className="text-sm text-muted-foreground">
                            {teacher.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          {t.teachers.actions.editProfile}
                        </Button>
                        <Button variant="outline" size="sm">
                          {t.teachers.actions.viewSchedule}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contact" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.teachers.contact.title}</CardTitle>
                <CardDescription>
                  {t.teachers.contact.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.teachers.contact.selectTeacher}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t.teachers.contact.selectTeacherPlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredTeachers.map((teacher) => (
                          <SelectItem key={teacher.id} value={teacher.id}>
                            {teacher.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.teachers.contact.questionType}
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder={t.teachers.contact.questionTypePlaceholder} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">{t.teachers.contact.questionTypeGeneral}</SelectItem>
                        <SelectItem value="academic">{t.teachers.contact.questionTypeAcademic}</SelectItem>
                        <SelectItem value="administrative">
                          {t.teachers.contact.questionTypeAdmin}
                        </SelectItem>
                        <SelectItem value="private">{t.teachers.contact.questionTypePrivate}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t.teachers.contact.question}
                    </label>
                    <Textarea placeholder={t.teachers.contact.questionPlaceholder} rows={4} />
                  </div>

                  <div className="flex space-x-2 space-x-reverse">
                    <Button className="bg-primary text-primary-foreground">
                      {t.teachers.contact.sendQuestion}
                    </Button>
                    <Button variant="outline">{t.teachers.contact.sendToAll}</Button>
                  </div>
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
            <DialogTitle>{t.teachers.dialog.editTitle}</DialogTitle>
            <DialogDescription>{t.teachers.dialog.editDescription}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                {t.teachers.form.name}
              </Label>
              <Input
                id="edit-name"
                value={newTeacher.name}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-specialization" className="text-right">
                {t.teachers.form.specialization}
              </Label>
              <Input
                id="edit-specialization"
                value={newTeacher.specialization}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    specialization: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-department" className="text-right">
                {t.teachers.form.department}
              </Label>
              <Select
                value={newTeacher.department}
                onValueChange={(value) =>
                  setNewTeacher({
                    ...newTeacher,
                    department: value as Department,
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={t.teachers.form.selectDepartment} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quran">{t.teachers.departments.quran}</SelectItem>
                  <SelectItem value="tajweed">{t.teachers.departments.tajweed}</SelectItem>
                  <SelectItem value="tarbawi">{t.teachers.departments.tarbawi}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                {t.teachers.form.email}
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={newTeacher.email}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, email: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-phone" className="text-right">
                {t.teachers.form.phone}
              </Label>
              <Input
                id="edit-phone"
                value={newTeacher.phone}
                onChange={(e) =>
                  setNewTeacher({ ...newTeacher, phone: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-experience" className="text-right">
                {t.teachers.form.experienceYears}
              </Label>
              <Input
                id="edit-experience"
                type="number"
                value={newTeacher.experience}
                onChange={(e) =>
                  setNewTeacher({
                    ...newTeacher,
                    experience: parseInt(e.target.value) || 0,
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
              {t.teachers.actions.cancel}
            </Button>
            <Button onClick={handleEditTeacher}>{t.teachers.actions.saveChanges}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.teachers.confirmDelete}</DialogTitle>
            <DialogDescription>
              {tFunc('teachers.deleteConfirmMessage', { name: selectedTeacher?.name || '' })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              {t.teachers.actions.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteTeacher}>
              {t.teachers.actions.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Teachers;
