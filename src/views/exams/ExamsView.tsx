import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import PageHeader from "@/components/PageHeader";
import { ExamType } from "@/types";
import { useExams, TabType } from "./useExams";
import { ExamListTab } from "./ExamListTab";
import { ExamResultsTab } from "./ExamResultsTab";
import { ExamFormDialog } from "./ExamFormDialog";
import { ResultFormDialog } from "./ResultFormDialog";

const ExamsView = () => {
  const hook = useExams();
  const {
    activeTab,
    setActiveTab,
    exams,
    filteredExams,
    filteredResults,
    selectedExam,
    newExam,
    setNewExam,
    newResult,
    setNewResult,
    students,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    isResultDialogOpen,
    setIsResultDialogOpen,
    isEditResultDialogOpen,
    setIsEditResultDialogOpen,
    isDeleteResultDialogOpen,
    setIsDeleteResultDialogOpen,
    handleAddExam,
    handleEditExam,
    handleDeleteExam,
    handleAddResult,
    handleEditResult,
    handleDeleteResult,
    openEditDialog,
    openDeleteDialog,
    openResultDialog,
    openEditResultDialog,
    openDeleteResultDialog,
    getExamStatusText,
    getExamTypeLabel,
    getResultStatusLabel,
    searchTerm,
    setSearchTerm,
    t,
    language,
  } = hook;

  const examTabTypes: ExamType[] = ["\u0642\u0631\u0622\u0646", "\u062a\u062c\u0648\u064a\u062f", "\u062a\u0631\u0628\u0648\u064a"];

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={t.exams.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{t.exams.heading}</h2>
          <p className="text-muted-foreground mb-6">
            {t.exams.headingDescription}
          </p>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.exams.searchPlaceholder}
                className="w-full sm:w-64"
              />
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  {t.exams.actions.createExam}
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as TabType)}
        >
          <div className="overflow-x-auto -mx-4 px-4 pb-2">
            <TabsList className="inline-flex w-auto min-w-full sm:grid sm:w-full sm:grid-cols-4 gap-1 p-1">
              <TabsTrigger
                value="\u0642\u0631\u0622\u0646"
                className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"
              >
                {t.exams.tabs.quranExams}
              </TabsTrigger>
              <TabsTrigger
                value="\u062a\u062c\u0648\u064a\u062f"
                className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"
              >
                {t.exams.tabs.tajweedExams}
              </TabsTrigger>
              <TabsTrigger
                value="\u062a\u0631\u0628\u0648\u064a"
                className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"
              >
                {t.exams.tabs.educationalExams}
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"
              >
                {t.exams.tabs.resultsAndStats}
              </TabsTrigger>
            </TabsList>
          </div>

          {examTabTypes.map((type) => (
            <TabsContent key={type} value={type} className="mt-6">
              <ExamListTab
                filteredExams={filteredExams}
                activeTab={type}
                typeLabel={getExamTypeLabel(type)}
                getExamStatusText={getExamStatusText}
                openResultDialog={openResultDialog}
                openEditDialog={openEditDialog}
                openDeleteDialog={openDeleteDialog}
                t={t as unknown as Record<string, unknown>}
                language={language}
              />
            </TabsContent>
          ))}

          <TabsContent value="results" className="mt-6">
            <ExamResultsTab
              filteredResults={filteredResults}
              exams={exams}
              students={students}
              getResultStatusLabel={getResultStatusLabel}
              openEditResultDialog={openEditResultDialog}
              openDeleteResultDialog={openDeleteResultDialog}
              t={t as unknown as Record<string, unknown>}
            />
          </TabsContent>
        </Tabs>
      </main>

      <ExamFormDialog
        isAddDialogOpen={isAddDialogOpen}
        setIsAddDialogOpen={setIsAddDialogOpen}
        isEditDialogOpen={isEditDialogOpen}
        setIsEditDialogOpen={setIsEditDialogOpen}
        isDeleteDialogOpen={isDeleteDialogOpen}
        setIsDeleteDialogOpen={setIsDeleteDialogOpen}
        selectedExam={selectedExam}
        newExam={newExam}
        setNewExam={setNewExam}
        handleAddExam={handleAddExam}
        handleEditExam={handleEditExam}
        handleDeleteExam={handleDeleteExam}
        t={t as unknown as Record<string, unknown>}
      />

      <ResultFormDialog
        isResultDialogOpen={isResultDialogOpen}
        setIsResultDialogOpen={setIsResultDialogOpen}
        isEditResultDialogOpen={isEditResultDialogOpen}
        setIsEditResultDialogOpen={setIsEditResultDialogOpen}
        isDeleteResultDialogOpen={isDeleteResultDialogOpen}
        setIsDeleteResultDialogOpen={setIsDeleteResultDialogOpen}
        newResult={newResult}
        setNewResult={setNewResult}
        students={students}
        handleAddResult={handleAddResult}
        handleEditResult={handleEditResult}
        handleDeleteResult={handleDeleteResult}
        t={t as unknown as Record<string, unknown>}
      />
    </div>
  );
};

export default ExamsView;
