
import { Department } from "@/types";
import PageHeader from "@/components/PageHeader";
import { useState, useEffect, useCallback } from "react";
import { getTeachers, addTeacher, type Teacher } from "@/lib/database/repositories/teachers";
import { getStudents, type Student } from "@/lib/database/repositories/students";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { teacherSchema } from "@/lib/validations";
import { useLanguage } from "@/contexts/LanguageContext";
import { getDepartmentLabel } from "@/lib/labels";

const Admin = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [department, setDepartment] = useState<"quran" | "tajweed" | "tarbawi">(
    "quran"
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const loadData = useCallback(async () => {
    try {
      const [teachersData, studentsData] = await Promise.all([
        getTeachers(),
        getStudents(),
      ]);
      setTeachers(teachersData);
      setStudents(studentsData);
    } catch (err) {
      toast({
        title: t.admin.toast.validationError,
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    }
  }, [toast, t]);

  useEffect(() => {
    // data fetch on mount — setState after await is safe, rule false-positives
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleAddTeacher = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    const validation = teacherSchema.safeParse({
      name: teacherName,
      specialization,
      department,
      email: email || "",
      phone: phone || "",
    });

    if (!validation.success) {
      const errors = validation.error.issues.map((e) => e.message).join(", ");
      toast({
        title: t.admin.toast.validationError,
        description: errors,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await addTeacher({
        name: validation.data.name,
        specialization: validation.data.specialization,
        department: validation.data.department,
        email: validation.data.email || undefined,
        phone: validation.data.phone || undefined,
      });
      toast({ title: t.admin.toast.addTeacherSuccess });
      setTeacherName("");
      setSpecialization("");
      setEmail("");
      setPhone("");
      loadData();
    } catch (err) {
      toast({
        title: t.admin.toast.addTeacherError,
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    }
    setIsLoading(false);
  };

  const totalStudents = students.length;
  const totalTeachers = teachers.length;
  const quranStudents = students.filter((s) => s.department === "quran").length;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.admin.pageTitle} />
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-3 md:p-6">
              <div className="text-2xl md:text-4xl mb-1 md:mb-2">👥</div>
              <h3 className="text-sm md:text-lg font-semibold mb-0.5 md:mb-1">{t.admin.stats.totalStudents}</h3>
              <p className="text-2xl md:text-4xl font-bold">{totalStudents}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
            <CardContent className="p-3 md:p-6">
              <div className="text-2xl md:text-4xl mb-1 md:mb-2">👨‍🏫</div>
              <h3 className="text-sm md:text-lg font-semibold mb-0.5 md:mb-1">{t.admin.stats.totalTeachers}</h3>
              <p className="text-2xl md:text-4xl font-bold">{totalTeachers}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-accent to-accent/80">
            <CardContent className="p-3 md:p-6">
              <div className="text-2xl md:text-4xl mb-1 md:mb-2">📖</div>
              <h3 className="text-sm md:text-lg font-semibold mb-0.5 md:mb-1">{t.admin.stats.quranStudents}</h3>
              <p className="text-2xl md:text-4xl font-bold">{quranStudents}</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="teachers" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="teachers">{t.admin.tabs.teachers}</TabsTrigger>
            <TabsTrigger value="students">{t.admin.tabs.students}</TabsTrigger>
          </TabsList>

          <TabsContent value="teachers">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {t.admin.teacherForm.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddTeacher} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.admin.teacherForm.name}
                      </label>
                      <Input
                        value={teacherName}
                        onChange={(e) => setTeacherName(e.target.value)}
                        placeholder={t.admin.teacherForm.namePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.admin.teacherForm.specialization}
                      </label>
                      <Input
                        value={specialization}
                        onChange={(e) => setSpecialization(e.target.value)}
                        placeholder={t.admin.teacherForm.specializationPlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.admin.teacherForm.department}
                      </label>
                      <Select
                        value={department}
                        onValueChange={(v) => setDepartment(v as Department)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="quran">{t.admin.departments.quran}</SelectItem>
                          <SelectItem value="tajweed">{t.admin.departments.tajweed}</SelectItem>
                          <SelectItem value="tarbawi">{t.admin.departments.tarbawi}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.admin.teacherForm.emailOptional}
                      </label>
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="teacher@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.admin.teacherForm.phoneOptional}
                      </label>
                      <Input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="05xxxxxxxx"
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? t.admin.teacherForm.submitting : t.admin.teacherForm.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  {t.admin.teacherList.title}
                </h3>
                {teachers.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {t.admin.teacherList.empty}
                    </CardContent>
                  </Card>
                ) : (
                  teachers.map((teacher) => (
                    <Card
                      key={teacher.id}
                      className="border-r-4 border-r-primary"
                    >
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-1">
                          {teacher.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-1">
                          {teacher.specialization}
                        </p>
                        <p className="text-sm text-primary font-medium mb-2">
                          {t.admin.teacherList.departmentPrefix} {getDepartmentLabel(teacher.department, t)}
                        </p>
                        {teacher.email && (
                          <p className="text-sm text-muted-foreground">
                            📧 {teacher.email}
                          </p>
                        )}
                        {teacher.phone && (
                          <p className="text-sm text-muted-foreground">
                            📱 {teacher.phone}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary mb-4">
                {t.admin.studentList.title}
              </h3>
              {students.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center text-muted-foreground">
                    {t.admin.studentList.empty}
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {students.map((student) => (
                    <Card
                      key={student.id}
                      className="border-r-4 border-r-secondary"
                    >
                      <CardContent className="p-6">
                        <h4 className="font-bold text-lg mb-1">
                          {student.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {t.admin.studentList.age.replace('{age}', String(student.age))}
                        </p>
                        <p className="text-sm text-primary font-medium mb-1">
                          {getDepartmentLabel(student.department, t)}
                        </p>
                        {student.department === "quran" && (
                          <p className="text-sm text-muted-foreground">
                            {t.admin.studentList.partsMemorized.replace('{parts}', String(student.parts_memorized))}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
