import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import PageHeader from "@/components/PageHeader";
import { useTarbiwi } from "./useTarbiwi";
import { ProgramsTab } from "./ProgramsTab";
import { AssignmentsTab } from "./AssignmentsTab";
import { AssessmentsTab } from "./AssessmentsTab";
import { ContentTab } from "./ContentTab";
import { ProgramFormDialog } from "./ProgramFormDialog";
import { AssignmentFormDialog } from "./AssignmentFormDialog";

const TarbiwiView = () => {
  const hook = useTarbiwi();
  const { tb, tFunc } = hook;

  // Cast tb to the shape expected by child components
  const tbRecord = tb as unknown as Record<string, unknown>;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={tb.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">
            {tb.pageIcon} {tb.pageTitle}
          </h2>
          <p className="text-muted-foreground mb-6">{tb.subtitle}</p>

          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4 space-x-reverse">
              <Input
                placeholder={tb.searchPlaceholder}
                className="w-64"
                value={hook.searchTerm}
                onChange={(e) => hook.setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Dialog
                open={hook.isAddAssignmentDialogOpen}
                onOpenChange={hook.setIsAddAssignmentDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">{tb.assignments.addButton}</Button>
                </DialogTrigger>
              </Dialog>

              <Dialog
                open={hook.isAddProgramDialogOpen}
                onOpenChange={hook.setIsAddProgramDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground">
                    {tb.programs.addButton}
                  </Button>
                </DialogTrigger>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={hook.activeTab} onValueChange={hook.setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="programs">{tb.tabs.programs}</TabsTrigger>
            <TabsTrigger value="assignments">{tb.tabs.assignments}</TabsTrigger>
            <TabsTrigger value="assessments">{tb.tabs.assessments}</TabsTrigger>
            <TabsTrigger value="content">{tb.tabs.content}</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="mt-6">
            <ProgramsTab
              programs={hook.filteredPrograms}
              daysArray={hook.daysArray}
              onEdit={hook.openEditProgramDialog}
              onDelete={hook.openDeleteProgramDialog}
              tb={tbRecord}
            />
          </TabsContent>

          <TabsContent value="assignments" className="mt-6">
            <AssignmentsTab
              assignments={hook.filteredAssignments}
              assignmentTypeLabels={hook.assignmentTypeLabels}
              language={hook.language}
              onEdit={hook.openEditAssignmentDialog}
              onDelete={hook.openDeleteAssignmentDialog}
              tb={tbRecord}
            />
          </TabsContent>

          <TabsContent value="assessments" className="mt-6">
            <AssessmentsTab
              assessments={hook.filteredAssessments}
              newAssessment={hook.newAssessment}
              onAssessmentChange={hook.setNewAssessment}
              isAddDialogOpen={hook.isAddAssessmentDialogOpen}
              setIsAddDialogOpen={hook.setIsAddAssessmentDialogOpen}
              onAddAssessment={hook.handleAddAssessment}
              onEditAssessment={hook.handleEditAssessment}
              onDeleteAssessment={hook.handleDeleteAssessment}
              language={hook.language}
              tb={tbRecord}
            />
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <ContentTab language={hook.language} tb={tbRecord} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Program Dialog */}
      <ProgramFormDialog
        open={hook.isAddProgramDialogOpen}
        onOpenChange={hook.setIsAddProgramDialogOpen}
        formData={hook.newProgram}
        onFormChange={hook.setNewProgram}
        onSubmit={hook.handleAddProgram}
        mode="add"
        tb={tbRecord}
      />

      {/* Edit Program Dialog */}
      <ProgramFormDialog
        open={hook.isEditProgramDialogOpen}
        onOpenChange={hook.setIsEditProgramDialogOpen}
        formData={hook.newProgram}
        onFormChange={hook.setNewProgram}
        onSubmit={hook.handleEditProgram}
        mode="edit"
        tb={tbRecord}
      />

      {/* Delete Program Dialog */}
      <Dialog
        open={hook.isDeleteProgramDialogOpen}
        onOpenChange={hook.setIsDeleteProgramDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tb.programs.deleteDialogTitle}</DialogTitle>
            <DialogDescription>
              {tFunc("tarbiwi.programs.deleteDialogDescription", {
                title: hook.selectedProgram?.title ?? "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => hook.setIsDeleteProgramDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button variant="destructive" onClick={hook.handleDeleteProgram}>
              {tb.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Assignment Dialog */}
      <AssignmentFormDialog
        open={hook.isAddAssignmentDialogOpen}
        onOpenChange={hook.setIsAddAssignmentDialogOpen}
        formData={hook.newAssignment}
        onFormChange={hook.setNewAssignment}
        onSubmit={hook.handleAddAssignment}
        mode="add"
        tb={tbRecord}
      />

      {/* Edit Assignment Dialog */}
      <AssignmentFormDialog
        open={hook.isEditAssignmentDialogOpen}
        onOpenChange={hook.setIsEditAssignmentDialogOpen}
        formData={hook.newAssignment}
        onFormChange={hook.setNewAssignment}
        onSubmit={hook.handleEditAssignment}
        mode="edit"
        tb={tbRecord}
      />

      {/* Delete Assignment Dialog */}
      <Dialog
        open={hook.isDeleteAssignmentDialogOpen}
        onOpenChange={hook.setIsDeleteAssignmentDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tb.assignments.deleteDialogTitle}</DialogTitle>
            <DialogDescription>
              {tFunc("tarbiwi.assignments.deleteDialogDescription", {
                title: hook.selectedAssignment?.title ?? "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => hook.setIsDeleteAssignmentDialogOpen(false)}
            >
              {tb.common.cancel}
            </Button>
            <Button variant="destructive" onClick={hook.handleDeleteAssignment}>
              {tb.common.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TarbiwiView;
