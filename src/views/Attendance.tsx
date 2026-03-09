
import { useState, useEffect, useCallback, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Download, FileText, Search } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { getStudents as fetchStudents } from "@/lib/database/repositories/students";
import { getTeachers as fetchTeachers } from "@/lib/database/repositories/teachers";
import {
  getAttendanceRecords as fetchAttendanceRecords,
  insertAttendanceRecords,
} from "@/lib/database/repositories/attendance";
import type { Student as DbStudent } from "@/lib/database/repositories/students";
import type { Teacher as DbTeacher } from "@/lib/database/repositories/teachers";
import type { AttendanceRecord as DbAttendanceRecord } from "@/lib/database/repositories/attendance";
import ReportTemplate from "@/components/ReportTemplate";
import { exportCSV } from "@/lib/export/csv";
import { exportPDF } from "@/lib/export/pdf";
import { formatDate } from "@/lib/i18n";

interface Student {
  id: string;
  name: string;
  age: number;
  grade: string;
  department: string;
  teacherId?: string;
  teacher_id?: string | null;
  partsMemorized?: number;
  parts_memorized?: number | null;
  currentProgress?: string;
  current_progress?: string | null;
  attendance?: number | null;
  parentName?: string;
  parent_name?: string | null;
  parentPhone?: string;
  parent_phone?: string | null;
  isActive?: boolean;
  is_active?: number | boolean | null;
}

interface Teacher {
  id: string;
  name: string;
  specialization: string;
  department: string;
  isActive?: boolean;
  is_active?: number | boolean | null;
}

interface AttendanceRecord {
  id: string;
  studentId?: string;
  student_id?: string | null;
  teacherId?: string;
  teacher_id?: string | null;
  date?: string;
  record_date?: string;
  status: "حاضر" | "غائب" | "مأذون";
  notes?: string | null;
  student?: Student;
  teacher?: Teacher;
}

const Attendance = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedStudents, setSelectedStudents] = useState<{
    [key: string]: "حاضر" | "غائب" | "مأذون";
  }>({});
  const [selectedTeachers, setSelectedTeachers] = useState<{
    [key: string]: "حاضر" | "غائب" | "إجازة";
  }>({});
  const { toast } = useToast();
  const { t, tFunc, language } = useLanguage();
  const [students, setStudents] = useState<Student[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Label map for DB attendance status values
  const statusLabels: Record<string, string> = {
    "حاضر": t.attendance.status.present,
    "غائب": t.attendance.status.absent,
    "مأذون": t.attendance.status.excused,
  };

  // Label map for department DB values
  const departmentLabels: Record<string, string> = {
    quran: t.attendance.departments.quran,
    tajweed: t.attendance.departments.tajweed,
    tarbawi: t.attendance.departments.tarbawi,
  };

  // date-fns locale based on current language
  const dateLocale = language === 'ar' ? ar : undefined;
  const reportRef = useRef<HTMLDivElement>(null);

  const attendanceReportHeaders = [
    t.attendance.table.studentName,
    t.attendance.table.date,
    t.attendance.table.status,
    t.attendance.table.notes,
  ];

  const getAttendanceReportRows = () =>
    attendanceRecords.map((r) => [
      getStudentName(r.student_id || r.studentId) || getTeacherName(r.teacher_id || r.teacherId),
      r.record_date || r.date || "",
      statusLabels[r.status] || r.status,
      r.notes || "",
    ]);

  const handleExportCSV = async () => {
    try {
      const result = await exportCSV(
        `attendance-${new Date().toISOString().split("T")[0]}.csv`,
        attendanceReportHeaders,
        getAttendanceReportRows()
      );
      if (result) {
        toast({ title: t.export.exportSuccess });
      }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    }
  };

  const handleExportPDF = async () => {
    if (!reportRef.current) return;
    try {
      const result = await exportPDF(
        reportRef.current,
        `attendance-${new Date().toISOString().split("T")[0]}.pdf`
      );
      if (result) {
        toast({ title: t.export.exportSuccess });
      }
    } catch {
      toast({ title: t.export.exportError, variant: "destructive" });
    }
  };

  // Load students from SQLite
  const loadStudents = useCallback(async () => {
    try {
      const allStudents = await fetchStudents();
      const activeStudents = allStudents.filter((s) => s.is_active === 1);
      const transformedStudents: Student[] = activeStudents.map((s) => ({
        ...s,
        teacherId: s.teacher_id || "",
        partsMemorized: s.parts_memorized ?? 0,
        currentProgress: s.current_progress || "",
        parentName: s.parent_name || "",
        parentPhone: s.parent_phone || "",
        isActive: s.is_active === 1,
      }));
      setStudents(transformedStudents);
    } catch (error) {
      console.error("Error loading students:", error);
    }
  }, []);

  // Load teachers from SQLite
  const loadTeachers = useCallback(async () => {
    try {
      const allTeachers = await fetchTeachers();
      const activeTeachers = allTeachers.filter((t) => t.is_active === 1);
      const transformedTeachers: Teacher[] = activeTeachers.map((t) => ({
        ...t,
        isActive: t.is_active === 1,
      }));
      setTeachers(transformedTeachers);
    } catch (error) {
      console.error("Error loading teachers:", error);
    }
  }, []);

  // Load attendance records from SQLite
  const loadAttendanceRecords = useCallback(async () => {
    try {
      const records = await fetchAttendanceRecords();
      const transformedRecords: AttendanceRecord[] = records.map((r) => ({
        ...r,
        studentId: r.student_id || "",
        teacherId: r.teacher_id || "",
        date: r.record_date,
        status: r.status as "حاضر" | "غائب" | "مأذون",
      }));
      setAttendanceRecords(transformedRecords);
    } catch (error) {
      console.error("Error loading attendance records:", error);
    }
  }, []);

  // Load all data on mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([loadStudents(), loadTeachers(), loadAttendanceRecords()]);
      setIsLoading(false);
    };
    loadData();
  }, [loadStudents, loadTeachers, loadAttendanceRecords]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch = student.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || student.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const getDepartmentName = (dept: string) => {
    return departmentLabels[dept] || dept;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "حاضر":
        return "bg-green-100 text-green-800";
      case "غائب":
        return "bg-red-100 text-red-800";
      case "مأذون":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    return statusLabels[status] || status;
  };

  const handleRecordAttendance = async () => {
    setIsRecording(true);

    try {
      // Create new attendance records for selected students
      const recordsToInsert = Object.entries(selectedStudents).map(
        ([studentId, status]) => {
          const student = students.find((s) => s.id === studentId);
          return {
            student_id: studentId,
            teacher_id: student?.teacherId || student?.teacher_id || null,
            record_date: selectedDate.toISOString().split("T")[0],
            status,
            notes:
              status === "حاضر"
                ? "حضور منتظم"
                : status === "غائب"
                ? "غياب بدون عذر"
                : "غياب بعذر",
          };
        }
      );

      await insertAttendanceRecords(recordsToInsert);

      // Reload attendance records
      await loadAttendanceRecords();

      setIsRecording(false);
      setSelectedStudents({});
      toast({
        title: t.attendance.toast.recorded,
        description: tFunc('attendance.toast.studentRecordedDesc', { count: recordsToInsert.length }),
      });
    } catch (error) {
      console.error("Error recording attendance:", error);
      toast({
        title: t.attendance.toast.error,
        description: t.attendance.toast.recordError,
        variant: "destructive",
      });
      setIsRecording(false);
    }
  };

  const handleStudentStatusChange = (
    studentId: string,
    status: "حاضر" | "غائب" | "مأذون"
  ) => {
    setSelectedStudents((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  const handleTeacherStatusChange = (
    teacherId: string,
    status: "حاضر" | "غائب" | "إجازة"
  ) => {
    setSelectedTeachers((prev) => ({
      ...prev,
      [teacherId]: status,
    }));
  };

  const handleRecordTeacherAttendance = async () => {
    setIsRecording(true);

    try {
      // Create new attendance records for selected teachers
      const recordsToInsert = Object.entries(selectedTeachers).map(
        ([teacherId, status]) => {
          // Map إجازة to مأذون for database compatibility
          const dbStatus = status === "إجازة" ? "مأذون" : status;
          return {
            student_id: null, // No student for teacher attendance
            teacher_id: teacherId,
            record_date: selectedDate.toISOString().split("T")[0],
            status: dbStatus as "حاضر" | "غائب" | "مأذون",
            notes:
              status === "حاضر"
                ? "حضور منتظم"
                : status === "غائب"
                ? "غياب بدون عذر"
                : "إجازة معتمدة",
          };
        }
      );

      await insertAttendanceRecords(recordsToInsert);

      // Reload attendance records
      await loadAttendanceRecords();

      setIsRecording(false);
      setSelectedTeachers({});
      toast({
        title: t.attendance.toast.recorded,
        description: tFunc('attendance.toast.teacherRecordedDesc', { count: recordsToInsert.length }),
      });
    } catch (error) {
      console.error("Error recording teacher attendance:", error);
      toast({
        title: t.attendance.toast.error,
        description: t.attendance.toast.recordError,
        variant: "destructive",
      });
      setIsRecording(false);
    }
  };

  // Helper to get student name from ID
  const getStudentName = (studentId: string | undefined | null) => {
    if (!studentId) return "-";
    const student = students.find((s) => s.id === studentId);
    return student?.name || "-";
  };

  // Helper to get teacher name from ID
  const getTeacherName = (teacherId: string | undefined | null) => {
    if (!teacherId) return "-";
    const teacher = teachers.find((t) => t.id === teacherId);
    return teacher?.name || "-";
  };

  // Helper to get student department from ID
  const getStudentDepartment = (studentId: string | undefined | null) => {
    if (!studentId) return "";
    const student = students.find((s) => s.id === studentId);
    return student?.department || "";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title={t.attendance.pageTitle} showBack={true} />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">{t.common.loading}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.attendance.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <h2 className="text-2xl font-bold">{t.attendance.sectionTitle}</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV}>
                <Download className="h-4 w-4 me-1" />
                {t.export.exportCSV}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF}>
                <FileText className="h-4 w-4 me-1" />
                {t.export.exportPDF}
              </Button>
            </div>
          </div>
          <p className="text-muted-foreground mb-6">
            {t.attendance.sectionDescription}
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="students">{t.attendance.tabs.students}</TabsTrigger>
            <TabsTrigger value="teachers">{t.attendance.tabs.teachers}</TabsTrigger>
          </TabsList>

          <TabsContent value="students" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.attendance.cards.dailyStudentAttendance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <label className="text-sm font-medium">{t.attendance.filter.dateLabel}</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-48">
                              <CalendarIcon className="ms-2 h-4 w-4" />
                              {format(selectedDate, "PPP", { locale: dateLocale })}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => date && setSelectedDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <label className="text-sm font-medium">{t.attendance.filter.departmentLabel}</label>
                        <Select
                          value={filterDepartment}
                          onValueChange={setFilterDepartment}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder={t.attendance.filter.selectDepartment} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.attendance.filter.allDepartments}</SelectItem>
                            <SelectItem value="quran">{t.attendance.departments.quran}</SelectItem>
                            <SelectItem value="tajweed">{t.attendance.departments.tajweed}</SelectItem>
                            <SelectItem value="tarbawi">{t.attendance.departments.tarbawi}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1 max-w-xs relative">
                        <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t.attendance.filter.searchStudent}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pe-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-4">{t.attendance.cards.todayRecord}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredStudents.map((student) => (
                        <Card
                          key={student.id}
                          className="border-l-4 border-l-primary"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="font-medium">{student.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {student.grade} •{" "}
                                  {getDepartmentName(student.department)}
                                </p>
                              </div>
                              <Badge variant="outline">
                                {student.partsMemorized} {t.attendance.units.parts}
                              </Badge>
                            </div>

                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                size="sm"
                                variant={
                                  selectedStudents[student.id] === "حاضر"
                                    ? "default"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleStudentStatusChange(student.id, "حاضر")
                                }
                              >
                                {t.attendance.status.present}
                              </Button>
                              <Button
                                size="sm"
                                variant={
                                  selectedStudents[student.id] === "غائب"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleStudentStatusChange(student.id, "غائب")
                                }
                              >
                                {t.attendance.status.absent}
                              </Button>
                              <Button
                                size="sm"
                                variant={
                                  selectedStudents[student.id] === "مأذون"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleStudentStatusChange(student.id, "مأذون")
                                }
                              >
                                {t.attendance.status.excused}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={handleRecordAttendance}
                        disabled={
                          isRecording ||
                          Object.keys(selectedStudents).length === 0
                        }
                        className="bg-primary text-primary-foreground"
                      >
                        {isRecording ? t.attendance.actions.recording : t.attendance.actions.recordAttendance}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t.attendance.cards.previousRecords}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.attendance.table.date}</TableHead>
                        <TableHead>{t.attendance.table.studentName}</TableHead>
                        <TableHead>{t.attendance.table.department}</TableHead>
                        <TableHead>{t.attendance.table.teacher}</TableHead>
                        <TableHead>{t.attendance.table.status}</TableHead>
                        <TableHead>{t.attendance.table.notes}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell>{record.date || record.record_date}</TableCell>
                          <TableCell>{getStudentName(record.studentId || record.student_id)}</TableCell>
                          <TableCell>
                            <Badge variant="outline">
                              {getDepartmentName(
                                getStudentDepartment(record.studentId || record.student_id)
                              )}
                            </Badge>
                          </TableCell>
                          <TableCell>{getTeacherName(record.teacherId || record.teacher_id)}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(record.status)}>
                              {getStatusLabel(record.status)}
                            </Badge>
                          </TableCell>
                          <TableCell>{record.notes || "-"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teachers" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t.attendance.cards.dailyTeacherAttendance}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <label className="text-sm font-medium">{t.attendance.filter.dateLabel}</label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-48">
                              <CalendarIcon className="ms-2 h-4 w-4" />
                              {format(selectedDate, "PPP", { locale: dateLocale })}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={(date) => date && setSelectedDate(date)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="flex items-center space-x-2 space-x-reverse">
                        <label className="text-sm font-medium">{t.attendance.filter.departmentLabel}</label>
                        <Select
                          value={filterDepartment}
                          onValueChange={setFilterDepartment}
                        >
                          <SelectTrigger className="w-40">
                            <SelectValue placeholder={t.attendance.filter.selectDepartment} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">{t.attendance.filter.allDepartments}</SelectItem>
                            <SelectItem value="quran">{t.attendance.departments.quran}</SelectItem>
                            <SelectItem value="tajweed">{t.attendance.departments.tajweed}</SelectItem>
                            <SelectItem value="tarbawi">{t.attendance.departments.tarbawi}</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex-1 max-w-xs relative">
                        <Search className="absolute end-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder={t.attendance.filter.searchTeacher}
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pe-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h4 className="font-medium mb-4">{t.attendance.cards.todayRecord}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {teachers.map((teacher) => (
                        <Card
                          key={teacher.id}
                          className="border-l-4 border-l-secondary"
                        >
                          <CardContent className="p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h5 className="font-medium">{teacher.name}</h5>
                                <p className="text-sm text-muted-foreground">
                                  {teacher.specialization}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {getDepartmentName(teacher.department)}
                                </p>
                              </div>
                              <Badge
                                variant={
                                  teacher.isActive ? "default" : "secondary"
                                }
                              >
                                {teacher.isActive ? t.attendance.status.active : t.attendance.status.inactive}
                              </Badge>
                            </div>

                            <div className="flex space-x-2 space-x-reverse">
                              <Button
                                size="sm"
                                variant={
                                  selectedTeachers[teacher.id] === "حاضر"
                                    ? "default"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleTeacherStatusChange(teacher.id, "حاضر")
                                }
                              >
                                {t.attendance.status.present}
                              </Button>
                              <Button
                                size="sm"
                                variant={
                                  selectedTeachers[teacher.id] === "غائب"
                                    ? "destructive"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleTeacherStatusChange(teacher.id, "غائب")
                                }
                              >
                                {t.attendance.status.absent}
                              </Button>
                              <Button
                                size="sm"
                                variant={
                                  selectedTeachers[teacher.id] === "إجازة"
                                    ? "secondary"
                                    : "outline"
                                }
                                className="flex-1"
                                onClick={() =>
                                  handleTeacherStatusChange(teacher.id, "إجازة")
                                }
                              >
                                {t.attendance.status.leave}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-6 flex justify-end">
                      <Button
                        onClick={handleRecordTeacherAttendance}
                        disabled={
                          isRecording ||
                          Object.keys(selectedTeachers).length === 0
                        }
                        className="bg-primary text-primary-foreground"
                      >
                        {isRecording ? t.attendance.actions.recording : t.attendance.actions.recordAttendance}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <ReportTemplate
        ref={reportRef}
        title={`${t.export.reportTitle} — ${t.export.attendance}`}
        headers={attendanceReportHeaders}
        rows={getAttendanceReportRows()}
      />
    </div>
  );
};

export default Attendance;
