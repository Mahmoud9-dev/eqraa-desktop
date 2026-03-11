
import PageHeader from "@/components/PageHeader";
import { useState, useEffect } from "react";
import { getStudentsByDept, addStudent } from "@/lib/database/repositories/students";
import { getTeachersByDept, addTeacher } from "@/lib/database/repositories/teachers";
import { getQuranSessions, addQuranSession } from "@/lib/database/repositories/quran-sessions";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown, Download, FileText, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";
import { exportCSV } from "@/lib/export/csv";
import { exportPDF } from "@/lib/export/pdf";
import PerformanceBarChart from "@/components/charts/PerformanceBarChart";
import { getPerformanceDistribution, type PerformanceDistributionRow } from "@/lib/database/repositories/stats";

interface Teacher {
  id: string;
  name: string;
}

interface Student {
  id: string;
  name: string;
  age: number;
  parts_memorized: number;
  current_progress: string;
  teacher_id: string | null;
  teacher_name: string | null;
}

interface QuranSession {
  id: string;
  student_id: string;
  surah_name: string;
  verses_from: number;
  verses_to: number;
  performance_rating: number;
  session_date: string;
  student_name: string | null;
}

const Quran = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [sessions, setSessions] = useState<QuranSession[]>([]);
  const [studentName, setStudentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [teacherSearchValue, setTeacherSearchValue] = useState("");
  const [openTeacherCombo, setOpenTeacherCombo] = useState(false);
  const [surahName, setSurahName] = useState("");
  const [versesFrom, setVersesFrom] = useState("");
  const [versesTo, setVersesTo] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [rating, setRating] = useState("5");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [isPlaying, setIsPlaying] = useState(false);
  const { toast } = useToast();
  const { t, tFunc, languageMeta, language, isRTL } = useLanguage();
  const [isExporting, setIsExporting] = useState(false);
  const [perfData, setPerfData] = useState<PerformanceDistributionRow[]>([]);

  const quranReportHeaders = [
    t.quran.sessionForm.studentLabel,
    t.quran.sessionForm.surahLabel,
    t.quran.sessionForm.fromVerse + " - " + t.quran.sessionForm.toVerse,
    t.quran.sessionForm.ratingLabel,
    t.attendance.table.date,
  ];

  const getQuranReportRows = () =>
    sessions.map((s) => [
      s.student_name || "",
      s.surah_name,
      `${s.verses_from} - ${s.verses_to}`,
      String(s.performance_rating),
      s.session_date ? formatDate(s.session_date, language) : "",
    ]);

  const getLocalDateStamp = () => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  };

  const handleExportCSV = async () => {
    setIsExporting(true);
    try {
      const result = await exportCSV(
        `quran-progress-${getLocalDateStamp()}.csv`,
        quranReportHeaders,
        getQuranReportRows()
      );
      if (result) {
        toast({ title: t.export.exportSuccess });
      }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    try {
      const result = await exportPDF(
        `quran-progress-${getLocalDateStamp()}.pdf`,
        `${t.export.reportTitle} — ${t.export.quranProgress}`,
        quranReportHeaders,
        getQuranReportRows(),
        { isRTL }
      );
      if (result) {
        toast({ title: t.export.exportSuccess });
      }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const loadData = async () => {
    try {
      const [studentsData, teachersData, sessionsData] = await Promise.all([
        getStudentsByDept("quran"),
        getTeachersByDept("quran"),
        getQuranSessions(),
      ]);
      setStudents(studentsData as Student[]);
      setTeachers(teachersData as Teacher[]);
      setSessions(sessionsData as QuranSession[]);
    } catch (error) {
      console.error("Failed to load data:", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadData();
    getPerformanceDistribution().then(setPerfData).catch(console.error);
  }, []);

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !studentAge) return;

    setIsLoading(true);

    let teacherId = selectedTeacher;

    if (!teacherId && teacherSearchValue.trim()) {
      try {
        await addTeacher({
          name: teacherSearchValue.trim(),
          department: "quran",
          specialization: "تحفيظ القرآن",
        });
        toast({ title: t.quran.toast.teacherAdded });
        // Re-fetch teachers to get the newly created teacher's id
        const updatedTeachers = await getTeachersByDept("quran");
        setTeachers(updatedTeachers as Teacher[]);
        const newTeacher = updatedTeachers.find(
          (t) => t.name === teacherSearchValue.trim()
        );
        teacherId = newTeacher?.id ?? "";
      } catch {
        toast({ title: t.quran.toast.teacherAddError, variant: "destructive" });
        setIsLoading(false);
        return;
      }
    }

    if (!teacherId) {
      toast({ title: t.quran.toast.selectTeacher, variant: "destructive" });
      setIsLoading(false);
      return;
    }

    try {
      await addStudent({
        name: studentName,
        age: parseInt(studentAge),
        grade: "تحفيظ",
        department: "quran",
        teacher_id: teacherId,
        parts_memorized: 0,
        current_progress: "بداية الحفظ",
        previous_progress: "",
      });
      toast({ title: t.quran.toast.studentAdded });
      setStudentName("");
      setStudentAge("");
      setSelectedTeacher("");
      setTeacherSearchValue("");
      loadData();
    } catch {
      toast({ title: t.quran.toast.studentAddError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const handleAddSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !surahName || !versesFrom || !versesTo) return;

    setIsLoading(true);
    try {
      await addQuranSession({
        student_id: selectedStudent,
        surah_name: surahName,
        verses_from: parseInt(versesFrom),
        verses_to: parseInt(versesTo),
        performance_rating: parseInt(rating),
      });
      toast({ title: t.quran.toast.sessionAdded });
      setSurahName("");
      setVersesFrom("");
      setVersesTo("");
      setRating("5");
      loadData();
    } catch {
      toast({ title: t.quran.toast.sessionAddError, variant: "destructive" });
    }
    setIsLoading(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: BlobPart[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      toast({ title: t.quran.toast.recordingStarted });
    } catch (error) {
      toast({
        title: t.quran.toast.recordingError,
        description: t.quran.toast.recordingErrorDescription,
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({ title: t.quran.toast.recordingStopped });
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
      setIsPlaying(true);
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
  };

  const pauseAudio = () => {
    setIsPlaying(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioUrl(url);
      setAudioBlob(file);
      toast({ title: t.quran.toast.fileUploaded });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.quran.pageTitle} />
      <main className="container mx-auto px-4 py-12">
        <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
          <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 me-1 animate-spin" /> : <Download className="h-4 w-4 me-1" />}
            {isExporting ? t.export.exporting : t.export.exportCSV}
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 me-1 animate-spin" /> : <FileText className="h-4 w-4 me-1" />}
            {isExporting ? t.export.exporting : t.export.exportPDF}
          </Button>
        </div>
        <Card className="mb-6">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{t.charts.performance.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <PerformanceBarChart data={perfData} />
          </CardContent>
        </Card>

        <Tabs defaultValue="sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="sessions">{t.quran.tabs.sessions}</TabsTrigger>
            <TabsTrigger value="students">{t.quran.tabs.students}</TabsTrigger>
          </TabsList>

          <TabsContent value="sessions">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {t.quran.sessionForm.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddSession} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.sessionForm.studentLabel}
                      </label>
                      <select
                        value={selectedStudent}
                        onChange={(e) => setSelectedStudent(e.target.value)}
                        className="w-full p-2 border rounded-md bg-background"
                        required
                      >
                        <option value="">{t.quran.sessionForm.studentPlaceholder}</option>
                        {students.map((student) => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.sessionForm.surahLabel}
                      </label>
                      <Input
                        value={surahName}
                        onChange={(e) => setSurahName(e.target.value)}
                        placeholder={t.quran.sessionForm.surahPlaceholder}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.quran.sessionForm.fromVerse}
                        </label>
                        <Input
                          type="number"
                          value={versesFrom}
                          onChange={(e) => setVersesFrom(e.target.value)}
                          min="1"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          {t.quran.sessionForm.toVerse}
                        </label>
                        <Input
                          type="number"
                          value={versesTo}
                          onChange={(e) => setVersesTo(e.target.value)}
                          min="1"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.sessionForm.ratingLabel} {rating}
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
                      className="w-full"
                    >
                      {isLoading ? t.quran.sessionForm.submitting : t.quran.sessionForm.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  {t.quran.sessionList.title}
                </h3>
                {sessions.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {t.quran.sessionList.empty}
                    </CardContent>
                  </Card>
                ) : (
                  sessions.slice(0, 10).map((session) => (
                    <Card
                      key={session.id}
                      className="border-r-4 border-r-primary"
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-lg">
                            {session.student_name}
                          </h4>
                          <span className="text-sm bg-primary/10 px-3 py-1 rounded-full">
                            {session.performance_rating}/10
                          </span>
                        </div>
                        <p className="text-muted-foreground">
                          {session.surah_name} - {tFunc('quran.sessionList.versesRange', { from: session.verses_from, to: session.verses_to })}
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          {formatDate(new Date(session.session_date), languageMeta.code)}
                        </p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="students">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl text-primary">
                    {t.quran.studentForm.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.studentForm.nameLabel}
                      </label>
                      <Input
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder={t.quran.studentForm.namePlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.studentForm.ageLabel}
                      </label>
                      <Input
                        type="number"
                        value={studentAge}
                        onChange={(e) => setStudentAge(e.target.value)}
                        placeholder={t.quran.studentForm.agePlaceholder}
                        min="5"
                        max="100"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        {t.quran.studentForm.teacherLabel}
                      </label>
                      <Popover
                        open={openTeacherCombo}
                        onOpenChange={setOpenTeacherCombo}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={openTeacherCombo}
                            className="w-full justify-between"
                          >
                            {selectedTeacher
                              ? teachers.find(
                                  (teacher) => teacher.id === selectedTeacher
                                )?.name
                              : teacherSearchValue ||
                                t.quran.teacherCombobox.placeholder}
                            <ChevronsUpDown className="ms-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command shouldFilter={false}>
                            <CommandInput
                              placeholder={t.quran.teacherCombobox.searchPlaceholder}
                              value={teacherSearchValue}
                              onValueChange={setTeacherSearchValue}
                            />
                            <CommandList>
                              <CommandEmpty>
                                <div className="p-2 text-center">
                                  <p className="text-sm text-muted-foreground mb-2">
                                    {t.quran.teacherCombobox.noResults}
                                  </p>
                                  {teacherSearchValue && (
                                    <Button
                                      variant="ghost"
                                      className="w-full"
                                      onClick={() => {
                                        setSelectedTeacher("");
                                        setOpenTeacherCombo(false);
                                      }}
                                    >
                                      {tFunc('quran.teacherCombobox.addNew', { name: teacherSearchValue })}
                                    </Button>
                                  )}
                                </div>
                              </CommandEmpty>
                              <CommandGroup>
                                {teachers
                                  .filter((teacher) =>
                                    teacher.name
                                      .toLowerCase()
                                      .includes(
                                        teacherSearchValue.toLowerCase()
                                      )
                                  )
                                  .map((teacher) => (
                                    <CommandItem
                                      key={teacher.id}
                                      value={teacher.name}
                                      onSelect={() => {
                                        setSelectedTeacher(teacher.id);
                                        setTeacherSearchValue(teacher.name);
                                        setOpenTeacherCombo(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "me-2 h-4 w-4",
                                          selectedTeacher === teacher.id
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                      {teacher.name}
                                    </CommandItem>
                                  ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full"
                    >
                      {isLoading ? t.quran.studentForm.submitting : t.quran.studentForm.submit}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-primary">
                  {t.quran.studentList.title}
                </h3>
                {students.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {t.quran.studentList.empty}
                    </CardContent>
                  </Card>
                ) : (
                  students.map((student) => (
                    <div key={student.id} className="space-y-4">
                      <Card className="border-r-4 border-r-primary">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-bold text-lg">
                                {student.name}
                              </h4>
                              <p className="text-sm text-muted-foreground">
                                {tFunc('quran.studentList.age', { age: student.age })}
                              </p>
                              {student.teacher_name && (
                                <p className="text-sm text-primary font-medium mt-1">
                                  {tFunc('quran.studentList.teacher', { name: student.teacher_name })}
                                </p>
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-medium">
                                {t.quran.studentList.partsMemorized}
                              </p>
                              <p className="text-2xl font-bold text-primary">
                                {student.parts_memorized}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">
                            {student.current_progress}
                          </p>
                        </CardContent>
                      </Card>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Recent review card */}
                        <Card className="border-r-4 border-r-blue-500">
                          <CardContent className="p-4">
                            <h5 className="font-bold text-blue-700 mb-2">
                              {t.quran.reviewCards.recent}
                            </h5>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.surah}</span>{" "}
                                البقرة
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.fromVerse}</span> 150
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.toVerse}</span>{" "}
                                200
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* Distant review card */}
                        <Card className="border-r-4 border-r-green-500">
                          <CardContent className="p-4">
                            <h5 className="font-bold text-green-700 mb-2">
                              {t.quran.reviewCards.distant}
                            </h5>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.surah}</span>{" "}
                                الفاتحة
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.fromVerse}</span> 1
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.toVerse}</span> 7
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        {/* New card */}
                        <Card className="border-r-4 border-r-orange-500">
                          <CardContent className="p-4">
                            <h5 className="font-bold text-orange-700 mb-2">
                              {t.quran.reviewCards.new}
                            </h5>
                            <div className="space-y-2">
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.surah}</span> آل
                                عمران
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.fromVerse}</span> 50
                              </div>
                              <div className="text-sm">
                                <span className="font-medium">{t.quran.reviewCards.toVerse}</span>{" "}
                                100
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Quran;
