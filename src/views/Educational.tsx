
import PageHeader from "@/components/PageHeader";
import { useState, useEffect, useCallback } from "react";
import { getStudentsByDept, addStudent } from "@/lib/database/repositories/students";
import { getTeachersByDept } from "@/lib/database/repositories/teachers";
import { getEducationalSessionsPaginated, addEducationalSession } from "@/lib/database/repositories/educational-sessions";
import { usePagination } from "@/hooks/usePagination";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import IconButton from "@/components/IconButton";
import { BookOpen, HandHeart, Target, Star, Users, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { logger } from "@/lib/logger";
import { formatDate } from "@/lib/i18n";

interface Teacher {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
}

interface EducationalSession {
  id: string;
  student_id: string;
  teacher_id: string | null;
  topic: string;
  description: string;
  performance_rating: number | null;
  session_date: string;
  student_name: string | null;
  teacher_name: string | null;
}

const Educational = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [sessions, setSessions] = useState<EducationalSession[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [topic, setTopic] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("5");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { t, languageMeta } = useLanguage();
  const { page, pageSize, nextPage, prevPage } = usePagination({ initialPageSize: 10 });

  const ed = t.educational.main;
  const icons = t.educational.iconLabels;

  const loadData = useCallback(async () => {
    try {
      const studentsData = await getStudentsByDept("tarbawi");
      setStudents(studentsData);
    } catch {
      logger.error("Failed to load students");
    }

    try {
      const teachersData = await getTeachersByDept("tarbawi");
      setTeachers(teachersData);
    } catch {
      logger.error("Failed to load teachers");
    }

    try {
      const result = await getEducationalSessionsPaginated({ page, pageSize });
      setSessions(result.data as EducationalSession[]);
      setTotalRecords(result.total);
      setTotalPages(result.totalPages);
    } catch {
      logger.error("Failed to load sessions");
    }
  }, [page, pageSize]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
  }, [loadData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !age || !grade) return;

    setIsLoading(true);
    try {
      await addStudent({
        name,
        age: parseInt(age),
        grade,
        department: "tarbawi",
        parts_memorized: 0,
        current_progress: "\u0645\u0633\u062C\u0644 \u0641\u064A \u0627\u0644\u0628\u0631\u0646\u0627\u0645\u062C \u0627\u0644\u062A\u0631\u0628\u0648\u064A",
        previous_progress: "",
      });
      toast({ title: ed.toast.addStudentSuccess });
      setName("");
      setAge("");
      setGrade("");
      loadData();
    } catch {
      toast({ title: ed.toast.addStudentError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !selectedTeacher || !topic || !description) return;

    setIsLoading(true);
    try {
      await addEducationalSession({
        student_id: selectedStudent,
        teacher_id: selectedTeacher,
        topic,
        description,
        performance_rating: parseInt(rating),
      });
      toast({ title: ed.toast.addSessionSuccess });
      setSelectedStudent("");
      setSelectedTeacher("");
      setTopic("");
      setDescription("");
      setRating("5");
      loadData();
    } catch {
      toast({ title: ed.toast.addSessionError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={ed.pageTitle} />
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <div className="mb-6 sm:mb-8 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-[var(--shadow-soft)]">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">
            {ed.banner.title}
          </h2>
          <p className="text-sm sm:text-base md:text-lg opacity-90">
            {ed.banner.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8">
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">
                  {ed.sessionForm.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddSession} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.sessionForm.student}
                    </label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background text-base sm:text-sm"
                      required
                    >
                      <option value="">{ed.sessionForm.studentPlaceholder}</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.id}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.sessionForm.teacher}
                    </label>
                    <select
                      value={selectedTeacher}
                      onChange={(e) => setSelectedTeacher(e.target.value)}
                      className="w-full p-2 border rounded-md bg-background text-base sm:text-sm"
                      required
                    >
                      <option value="">{ed.sessionForm.teacherPlaceholder}</option>
                      {teachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.sessionForm.topic}
                    </label>
                    <Input
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={ed.sessionForm.topicPlaceholder}
                      className="text-base sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.sessionForm.description}
                    </label>
                    <Textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder={ed.sessionForm.descriptionPlaceholder}
                      className="text-base sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.sessionForm.rating} {rating}
                    </label>
                    <input
                      type="range"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      min="1"
                      max="10"
                      className="w-full"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-base sm:text-sm py-3 sm:py-2"
                  >
                    {isLoading ? ed.sessionForm.submitting : ed.sessionForm.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl text-primary">
                  {ed.studentForm.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.studentForm.name}
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={ed.studentForm.namePlaceholder}
                      className="text-base sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.studentForm.age}
                    </label>
                    <Input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder={ed.studentForm.agePlaceholder}
                      min="5"
                      max="100"
                      className="text-base sm:text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {ed.studentForm.grade}
                    </label>
                    <Input
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      placeholder={ed.studentForm.gradePlaceholder}
                      className="text-base sm:text-sm"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-base sm:text-sm py-3 sm:py-2"
                  >
                    {isLoading ? ed.studentForm.submitting : ed.studentForm.submit}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
                {ed.registeredStudents.title}
              </h3>
              {students.length === 0 ? (
                <Card>
                  <CardContent className="p-4 sm:p-6 md:p-8 text-center text-muted-foreground">
                    {ed.registeredStudents.empty}
                  </CardContent>
                </Card>
              ) : (
                students.map((student) => (
                  <Card
                    key={student.id}
                    className="border-r-4 border-r-primary"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <h4 className="font-bold text-base sm:text-lg">
                        {student.name}
                      </h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {ed.registeredStudents.ageLabel} {student.age} {ed.registeredStudents.yearUnit} - {student.grade}
                      </p>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary">
              {ed.registeredSessions.title}
            </h3>
            {sessions.length === 0 ? (
              <Card>
                <CardContent className="p-4 sm:p-6 md:p-8 text-center text-muted-foreground">
                  {ed.registeredSessions.empty}
                </CardContent>
              </Card>
            ) : (
              sessions.map((session) => (
                <Card key={session.id} className="border-r-4 border-r-primary">
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2">
                      <div>
                        <h4 className="font-bold text-base sm:text-lg mb-2 sm:mb-0">
                          {session.topic}
                        </h4>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {ed.registeredSessions.studentLabel} {session.student_name}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">
                          {ed.registeredSessions.teacherLabel} {session.teacher_name}
                        </p>
                      </div>
                      <span className="text-xs sm:text-sm bg-primary/10 px-3 py-1 rounded-full">
                        {session.performance_rating}/10
                      </span>
                    </div>
                    <p className="text-muted-foreground text-xs sm:text-sm mt-2">
                      {session.description}
                    </p>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-2">
                      {formatDate(new Date(session.session_date), languageMeta.code)}
                    </p>
                  </CardContent>
                </Card>
              ))
            )}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-muted-foreground">
                  {t.common.showingResults
                    .replace('{count}', String(sessions.length))
                    .replace('{total}', String(totalRecords))}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={prevPage} disabled={page <= 1}>
                    {t.common.previous}
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {t.common.pageOf
                      .replace('{page}', String(page))
                      .replace('{totalPages}', String(totalPages))}
                  </span>
                  <Button variant="outline" size="sm" onClick={nextPage} disabled={page >= totalPages}>
                    {t.common.next}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          <IconButton
            to="/educational/islamic-lessons"
            icon={BookOpen}
            iconBgColor="bg-emerald-50 dark:bg-emerald-900/20"
            iconColor="text-emerald-500"
            label={icons.islamicLessons}
            aria-label={icons.islamicLessons}
          />

          <IconButton
            to="/educational/ethics-behavior"
            icon={HandHeart}
            iconBgColor="bg-pink-50 dark:bg-pink-900/20"
            iconColor="text-pink-500"
            label={icons.ethicsBehavior}
            aria-label={icons.ethicsBehavior}
          />

          <IconButton
            to="/educational/life-skills"
            icon={Target}
            iconBgColor="bg-blue-50 dark:bg-blue-900/20"
            iconColor="text-blue-500"
            label={icons.lifeSkills}
            aria-label={icons.lifeSkills}
          />

          <IconButton
            to="/educational/student-activities"
            icon={Star}
            iconBgColor="bg-yellow-50 dark:bg-yellow-900/20"
            iconColor="text-yellow-500"
            label={icons.studentActivities}
            aria-label={icons.studentActivities}
          />

          <IconButton
            to="/educational/family-programs"
            icon={Users}
            iconBgColor="bg-purple-50 dark:bg-purple-900/20"
            iconColor="text-purple-500"
            label={icons.familyPrograms}
            aria-label={icons.familyPrograms}
          />

          <IconButton
            to="/educational/guidance-counseling"
            icon={Lightbulb}
            iconBgColor="bg-amber-50 dark:bg-amber-900/20"
            iconColor="text-amber-500"
            label={icons.guidanceCounseling}
            aria-label={icons.guidanceCounseling}
          />
        </div>
      </main>
    </div>
  );
};

export default Educational;
