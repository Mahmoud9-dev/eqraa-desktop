import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
import PageHeader from "@/components/PageHeader";
import { useQuranCircles } from "./useQuranCircles";
import { CirclesTab } from "./CirclesTab";
import { MembersTab } from "./MembersTab";
import { RecordsTab } from "./RecordsTab";

const QuranCirclesView = () => {
  const hook = useQuranCircles();
  const {
    qc,
    tFunc,
    circles,
    teachers,
    students,
    activeTab,
    setActiveTab,
    // Add circle dialog
    isAddCircleDialogOpen,
    setIsAddCircleDialogOpen,
    newCircle,
    setNewCircle,
    handleAddCircle,
    // Add member dialog
    isAddMemberDialogOpen,
    setIsAddMemberDialogOpen,
    newMember,
    setNewMember,
    handleAddMember,
    // Edit circle dialog
    isEditCircleDialogOpen,
    setIsEditCircleDialogOpen,
    handleEditCircle,
    // Delete circle dialog
    isDeleteCircleDialogOpen,
    setIsDeleteCircleDialogOpen,
    selectedCircle,
    handleDeleteCircle,
  } = hook;

  return (
    <div className="min-h-screen bg-background">
      <PageHeader title={qc.pageTitle} showBack={true} />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{qc.heading}</h2>
          <p className="text-muted-foreground mb-6">{qc.description}</p>

          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
            <div className="w-full sm:w-auto">
              <Input
                placeholder={qc.searchPlaceholder}
                className="w-full sm:w-64"
                value={hook.searchTerm}
                onChange={(e) => hook.setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              {/* Add Member Dialog */}
              <Dialog
                open={isAddMemberDialogOpen}
                onOpenChange={setIsAddMemberDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button variant="outline">
                    {qc.addMemberDialog.trigger}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{qc.addMemberDialog.title}</DialogTitle>
                    <DialogDescription>
                      {qc.addMemberDialog.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="circle" className="text-end">
                        {qc.addMemberDialog.circleLabel}
                      </Label>
                      <Select
                        value={newMember.circleId}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, circleId: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue
                            placeholder={qc.addMemberDialog.circlePlaceholder}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {circles.map((circle) => (
                            <SelectItem key={circle.id} value={circle.id}>
                              {circle.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="student" className="text-end">
                        {qc.addMemberDialog.studentLabel}
                      </Label>
                      <Select
                        value={newMember.studentId}
                        onValueChange={(value) =>
                          setNewMember({ ...newMember, studentId: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue
                            placeholder={qc.addMemberDialog.studentPlaceholder}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(students).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddMemberDialogOpen(false)}
                    >
                      {qc.actions.cancel}
                    </Button>
                    <Button onClick={handleAddMember}>
                      {qc.addMemberDialog.submit}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              {/* Add Circle Dialog */}
              <Dialog
                open={isAddCircleDialogOpen}
                onOpenChange={setIsAddCircleDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary text-primary-foreground">
                    {qc.addCircleDialog.trigger}
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>{qc.addCircleDialog.title}</DialogTitle>
                    <DialogDescription>
                      {qc.addCircleDialog.description}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-end">
                        {qc.addCircleDialog.nameLabel}
                      </Label>
                      <Input
                        id="name"
                        value={newCircle.name}
                        onChange={(e) =>
                          setNewCircle({ ...newCircle, name: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="supervisor" className="text-end">
                        {qc.addCircleDialog.supervisorLabel}
                      </Label>
                      <Select
                        value={newCircle.supervisorId}
                        onValueChange={(value) =>
                          setNewCircle({ ...newCircle, supervisorId: value })
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue
                            placeholder={
                              qc.addCircleDialog.supervisorPlaceholder
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.entries(teachers).map(([id, name]) => (
                            <SelectItem key={id} value={id}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-end">
                        {qc.addCircleDialog.descriptionLabel}
                      </Label>
                      <Textarea
                        id="description"
                        value={newCircle.description}
                        onChange={(e) =>
                          setNewCircle({
                            ...newCircle,
                            description: e.target.value,
                          })
                        }
                        className="col-span-3"
                        rows={3}
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dailyMemorization" className="text-end">
                        {qc.addCircleDialog.dailyMemorizationLabel}
                      </Label>
                      <Input
                        id="dailyMemorization"
                        value={newCircle.dailyMemorization}
                        onChange={(e) =>
                          setNewCircle({
                            ...newCircle,
                            dailyMemorization: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="dailyRevision" className="text-end">
                        {qc.addCircleDialog.dailyRevisionLabel}
                      </Label>
                      <Input
                        id="dailyRevision"
                        value={newCircle.dailyRevision}
                        onChange={(e) =>
                          setNewCircle({
                            ...newCircle,
                            dailyRevision: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="weeklyEvaluation" className="text-end">
                        {qc.addCircleDialog.weeklyEvaluationLabel}
                      </Label>
                      <Input
                        id="weeklyEvaluation"
                        value={newCircle.weeklyEvaluation}
                        onChange={(e) =>
                          setNewCircle({
                            ...newCircle,
                            weeklyEvaluation: e.target.value,
                          })
                        }
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      variant="outline"
                      onClick={() => setIsAddCircleDialogOpen(false)}
                    >
                      {qc.actions.cancel}
                    </Button>
                    <Button onClick={handleAddCircle}>
                      {qc.addCircleDialog.submit}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="circles">{qc.tabs.circles}</TabsTrigger>
            <TabsTrigger value="members">{qc.tabs.members}</TabsTrigger>
            <TabsTrigger value="records">{qc.tabs.records}</TabsTrigger>
          </TabsList>

          <TabsContent value="circles" className="mt-6">
            <CirclesTab hook={hook} />
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <MembersTab hook={hook} />
          </TabsContent>

          <TabsContent value="records" className="mt-6">
            <RecordsTab hook={hook} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Edit Circle Dialog */}
      <Dialog
        open={isEditCircleDialogOpen}
        onOpenChange={setIsEditCircleDialogOpen}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{qc.editCircleDialog.title}</DialogTitle>
            <DialogDescription>
              {qc.editCircleDialog.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-end">
                {qc.editCircleDialog.nameLabel}
              </Label>
              <Input
                id="edit-name"
                value={newCircle.name}
                onChange={(e) =>
                  setNewCircle({ ...newCircle, name: e.target.value })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-supervisor" className="text-end">
                {qc.editCircleDialog.supervisorLabel}
              </Label>
              <Select
                value={newCircle.supervisorId}
                onValueChange={(value) =>
                  setNewCircle({ ...newCircle, supervisorId: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue
                    placeholder={qc.editCircleDialog.supervisorPlaceholder}
                  />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(teachers).map(([id, name]) => (
                    <SelectItem key={id} value={id}>
                      {name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-end">
                {qc.editCircleDialog.descriptionLabel}
              </Label>
              <Textarea
                id="edit-description"
                value={newCircle.description}
                onChange={(e) =>
                  setNewCircle({ ...newCircle, description: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-dailyMemorization" className="text-end">
                {qc.editCircleDialog.dailyMemorizationLabel}
              </Label>
              <Input
                id="edit-dailyMemorization"
                value={newCircle.dailyMemorization}
                onChange={(e) =>
                  setNewCircle({
                    ...newCircle,
                    dailyMemorization: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-dailyRevision" className="text-end">
                {qc.editCircleDialog.dailyRevisionLabel}
              </Label>
              <Input
                id="edit-dailyRevision"
                value={newCircle.dailyRevision}
                onChange={(e) =>
                  setNewCircle({
                    ...newCircle,
                    dailyRevision: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-weeklyEvaluation" className="text-end">
                {qc.editCircleDialog.weeklyEvaluationLabel}
              </Label>
              <Input
                id="edit-weeklyEvaluation"
                value={newCircle.weeklyEvaluation}
                onChange={(e) =>
                  setNewCircle({
                    ...newCircle,
                    weeklyEvaluation: e.target.value,
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditCircleDialogOpen(false)}
            >
              {qc.actions.cancel}
            </Button>
            <Button onClick={handleEditCircle}>
              {qc.editCircleDialog.submit}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Circle Dialog */}
      <Dialog
        open={isDeleteCircleDialogOpen}
        onOpenChange={setIsDeleteCircleDialogOpen}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{qc.deleteCircleDialog.title}</DialogTitle>
            <DialogDescription>
              {tFunc("quranCircles.deleteCircleDialog.description", {
                name: selectedCircle?.name ?? "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteCircleDialogOpen(false)}
            >
              {qc.actions.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteCircle}>
              {qc.deleteCircleDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default QuranCirclesView;
