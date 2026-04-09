import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import DepartmentPieChart from "@/components/charts/DepartmentPieChart";
import { Department } from "@/types";
import { useStudents } from "./useStudents";
import { StudentTable } from "./StudentTable";
import { StudentFormDialog } from "./StudentFormDialog";
import { StudentDeleteDialog } from "./StudentDeleteDialog";
import { StudentNotesTab } from "./StudentNotesTab";
import { StudentImagesTab } from "./StudentImagesTab";

const StudentsView = () => {
  const hook = useStudents();

  const {
    searchTerm,
    setSearchTerm,
    filterDepartment,
    setFilterDepartment,
    activeTab,
    setActiveTab,
    isLoading,
    teachersList,
    deptData,
    studentsNotes,
    studentsGrades,
    filteredStudents,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isEditImagesDialogOpen,
    setIsEditImagesDialogOpen,
    selectedStudent,
    editingImageType,
    isExporting,
    newStudent,
    setNewStudent,
    getDepartmentName,
    getAttendanceColor,
    getGradeColor,
    getNoteTypeColor,
    handleExportCSV,
    handleExportPDF,
    handleAddStudent,
    handleEditStudent,
    handleDeleteStudent,
    handleEditImages,
    handleDeleteNote,
    openEditDialog,
    openDeleteDialog,
    openEditImagesDialog,
    openAddNoteDialog,
    openEditNoteDialog,
    t,
  } = hook;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <PageHeader title={t.students.pageTitle} showBack={true} />
        <main className="container mx-auto px-4 py-6 sm:py-8">
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
      <PageHeader title={t.students.pageHeaderTitle} showBack={true} />

      <main className="container mx-auto px-4 py-6 sm:py-8">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
            {t.students.sectionTitle}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6">
            {t.students.sectionDescription}
          </p>

          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                {t.charts.departments.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DepartmentPieChart data={deptData} />
            </CardContent>
          </Card>

          {/* Search, filter, export, and add controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2 sm:gap-4 space-x-0 sm:space-x-4 space-x-reverse">
              <Input
                placeholder={t.students.searchPlaceholder}
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
                  <SelectValue placeholder={t.students.departments.all} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.students.departments.all}</SelectItem>
                  <SelectItem value="quran">{t.students.departments.quran}</SelectItem>
                  <SelectItem value="tajweed">{t.students.departments.tajweed}</SelectItem>
                  <SelectItem value="tarbawi">{t.students.departments.tarbawi}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleExportCSV} disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="h-4 w-4 me-1 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 me-1" />
                )}
                {isExporting ? t.export.exporting : t.export.exportCSV}
              </Button>
              <Button variant="outline" size="sm" onClick={handleExportPDF} disabled={isExporting}>
                {isExporting ? (
                  <Loader2 className="h-4 w-4 me-1 animate-spin" />
                ) : (
                  <FileText className="h-4 w-4 me-1" />
                )}
                {isExporting ? t.export.exporting : t.export.exportPDF}
              </Button>
            </div>
            <StudentFormDialog
              mode="add"
              open={isAddDialogOpen}
              onOpenChange={setIsAddDialogOpen}
              formData={newStudent}
              setFormData={setNewStudent}
              teachersList={teachersList}
              onSubmit={handleAddStudent}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 text-xs sm:text-sm">
            <TabsTrigger value="all">{t.students.tabs.allStudents}</TabsTrigger>
            <TabsTrigger value="attendance">{t.students.tabs.attendance}</TabsTrigger>
            <TabsTrigger value="grades">{t.students.tabs.grades}</TabsTrigger>
            <TabsTrigger value="images">{t.students.tabs.images}</TabsTrigger>
            <TabsTrigger value="notes">{t.students.tabs.notes}</TabsTrigger>
          </TabsList>

          {/* All Students tab */}
          <TabsContent value="all" className="mt-6">
            <StudentTable
              filteredStudents={filteredStudents}
              getDepartmentName={getDepartmentName}
              getAttendanceColor={getAttendanceColor}
              openEditDialog={openEditDialog}
              openDeleteDialog={openDeleteDialog}
              setActiveTab={setActiveTab}
            />
          </TabsContent>

          {/* Attendance tab */}
          <TabsContent value="attendance" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.students.attendanceTab.title}</CardTitle>
                <CardDescription>{t.students.attendanceTab.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{student.name}</h3>
                        <Badge className={getAttendanceColor(student.attendance ?? 0)}>
                          {student.attendance ?? 0}%
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {student.teacher_name || ""} {"\u2022"}{" "}
                        {getDepartmentName(student.department)}
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${student.attendance ?? 0}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Grades tab */}
          <TabsContent value="grades" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>{t.students.gradesTab.title}</CardTitle>
                <CardDescription>{t.students.gradesTab.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {filteredStudents.map((student) => (
                    <div key={student.id} className="p-4 border rounded-lg">
                      <h3 className="font-medium mb-3">{student.name}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(studentsGrades[student.id] || []).map((grade, index) => (
                          <div key={index} className="text-center">
                            <div className="text-lg font-bold">{grade.grade}%</div>
                            <Badge className={getGradeColor(grade.grade)}>
                              {grade.status}
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">
                              {grade.subject}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Images tab */}
          <TabsContent value="images" className="mt-6">
            <StudentImagesTab
              filteredStudents={filteredStudents}
              getDepartmentName={getDepartmentName}
              openEditImagesDialog={openEditImagesDialog}
              isEditImagesDialogOpen={isEditImagesDialogOpen}
              setIsEditImagesDialogOpen={setIsEditImagesDialogOpen}
              selectedStudent={selectedStudent}
              editingImageType={editingImageType}
              newStudent={newStudent}
              setNewStudent={setNewStudent}
              handleEditImages={handleEditImages}
            />
          </TabsContent>

          {/* Notes tab */}
          <TabsContent value="notes" className="mt-6">
            <StudentNotesTab
              filteredStudents={filteredStudents}
              studentsNotes={studentsNotes}
              getNoteTypeColor={getNoteTypeColor}
              handleDeleteNote={handleDeleteNote}
              openAddNoteDialog={openAddNoteDialog}
              openEditNoteDialog={openEditNoteDialog}
            />
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Dialog */}
      <StudentFormDialog
        mode="edit"
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        formData={newStudent}
        setFormData={setNewStudent}
        teachersList={teachersList}
        onSubmit={handleEditStudent}
      />

      {/* Delete Dialog */}
      <StudentDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        selectedStudent={selectedStudent}
        onConfirm={handleDeleteStudent}
      />
    </div>
  );
};

export default StudentsView;
