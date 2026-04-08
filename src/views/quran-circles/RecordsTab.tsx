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
import { formatDate } from "@/lib/i18n";
import type { UseQuranCirclesReturn } from "./useQuranCircles";

interface RecordsTabProps {
  hook: UseQuranCirclesReturn;
}

export function RecordsTab({ hook }: RecordsTabProps) {
  const {
    qc,
    language,
    circles,
    students,
    memorizationRecords,
    memorizationTypeLabel,
    isAddRecordDialogOpen,
    setIsAddRecordDialogOpen,
    isEditRecordDialogOpen,
    setIsEditRecordDialogOpen,
    isDeleteRecordDialogOpen,
    setIsDeleteRecordDialogOpen,
    newRecord,
    setNewRecord,
    handleAddRecord,
    handleEditRecord,
    handleDeleteRecord,
    openEditRecordDialog,
    openDeleteRecordDialog,
    getEvaluationColor,
    getMemorizationTypeColor,
  } = hook;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-medium">{qc.recordsList.heading}</h3>
        <Dialog
          open={isAddRecordDialogOpen}
          onOpenChange={setIsAddRecordDialogOpen}
        >
          <DialogTrigger asChild>
            <Button>{qc.addRecordDialog.trigger}</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{qc.addRecordDialog.title}</DialogTitle>
              <DialogDescription>
                {qc.addRecordDialog.description}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="record-circle" className="text-end">
                  {qc.addRecordDialog.circleLabel}
                </Label>
                <Select
                  value={newRecord.circleId}
                  onValueChange={(value) =>
                    setNewRecord({ ...newRecord, circleId: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={qc.addRecordDialog.circlePlaceholder}
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
                <Label htmlFor="record-student" className="text-end">
                  {qc.addRecordDialog.studentLabel}
                </Label>
                <Select
                  value={newRecord.studentId}
                  onValueChange={(value) =>
                    setNewRecord({ ...newRecord, studentId: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={qc.addRecordDialog.studentPlaceholder}
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
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="surah" className="text-end">
                  {qc.addRecordDialog.surahLabel}
                </Label>
                <Input
                  id="surah"
                  value={newRecord.surahName}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      surahName: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="from" className="text-end">
                  {qc.addRecordDialog.fromVerseLabel}
                </Label>
                <Input
                  id="from"
                  type="number"
                  value={newRecord.versesFrom}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      versesFrom: parseInt(e.target.value) || 1,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="to" className="text-end">
                  {qc.addRecordDialog.toVerseLabel}
                </Label>
                <Input
                  id="to"
                  type="number"
                  value={newRecord.versesTo}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      versesTo: parseInt(e.target.value) || 1,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-end">
                  {qc.addRecordDialog.typeLabel}
                </Label>
                <Select
                  value={newRecord.memorizationType}
                  onValueChange={(value) =>
                    setNewRecord({
                      ...newRecord,
                      memorizationType: value as "حفظ جديد" | "مراجعة",
                    })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue
                      placeholder={qc.addRecordDialog.typePlaceholder}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="حفظ جديد">
                      {qc.memorizationType.newMemorization}
                    </SelectItem>
                    <SelectItem value="مراجعة">
                      {qc.memorizationType.revision}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="evaluation" className="text-end">
                  {qc.addRecordDialog.evaluationLabel}
                </Label>
                <Input
                  id="evaluation"
                  type="number"
                  min="1"
                  max="10"
                  value={newRecord.evaluation}
                  onChange={(e) =>
                    setNewRecord({
                      ...newRecord,
                      evaluation: parseInt(e.target.value) || 0,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="notes" className="text-end">
                  {qc.addRecordDialog.notesLabel}
                </Label>
                <Textarea
                  id="notes"
                  value={newRecord.notes}
                  onChange={(e) =>
                    setNewRecord({ ...newRecord, notes: e.target.value })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddRecordDialogOpen(false)}
              >
                {qc.actions.cancel}
              </Button>
              <Button onClick={handleAddRecord}>
                {qc.addRecordDialog.submit}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{qc.recordsList.title}</CardTitle>
          <CardDescription>{qc.recordsList.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Mobile Card View */}
          <div className="block md:hidden space-y-4">
            {memorizationRecords.map((record) => (
              <div
                key={record.id}
                className="p-4 border rounded-lg space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">
                      {students[record.studentId]}
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      {circles.find((c) => c.id === record.circleId)?.name}
                    </p>
                  </div>
                  <Badge
                    className={`${getEvaluationColor(record.evaluation)} text-xs shrink-0`}
                  >
                    {record.evaluation}/10
                  </Badge>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    className={`${getMemorizationTypeColor(record.memorizationType)} text-xs`}
                  >
                    {memorizationTypeLabel[record.memorizationType] ??
                      record.memorizationType}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {record.surahName} ({record.versesFrom} -{" "}
                    {record.versesTo})
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(record.date, language)}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => openEditRecordDialog(record)}
                  >
                    {qc.actions.edit}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 text-xs"
                    onClick={() => openDeleteRecordDialog(record)}
                  >
                    {qc.actions.delete}
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
                  <TableHead>{qc.tableHeaders.student}</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {qc.tableHeaders.circle}
                  </TableHead>
                  <TableHead>{qc.tableHeaders.surah}</TableHead>
                  <TableHead>{qc.tableHeaders.verses}</TableHead>
                  <TableHead>{qc.tableHeaders.type}</TableHead>
                  <TableHead>{qc.tableHeaders.evaluation}</TableHead>
                  <TableHead className="hidden lg:table-cell">
                    {qc.tableHeaders.date}
                  </TableHead>
                  <TableHead>{qc.tableHeaders.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {memorizationRecords.map((record) => (
                  <TableRow key={record.id}>
                    <TableCell className="max-w-[120px] truncate">
                      {students[record.studentId]}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell max-w-[120px] truncate">
                      {circles.find((c) => c.id === record.circleId)?.name}
                    </TableCell>
                    <TableCell>{record.surahName}</TableCell>
                    <TableCell>
                      {record.versesFrom} - {record.versesTo}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getMemorizationTypeColor(
                          record.memorizationType
                        )}
                      >
                        {memorizationTypeLabel[record.memorizationType] ??
                          record.memorizationType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={getEvaluationColor(record.evaluation)}
                      >
                        {record.evaluation}/10
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {formatDate(record.date, language)}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs px-2"
                          onClick={() => openEditRecordDialog(record)}
                        >
                          {qc.actions.edit}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="text-xs px-2"
                          onClick={() => openDeleteRecordDialog(record)}
                        >
                          {qc.actions.delete}
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

      {/* Edit Record Dialog */}
      <Dialog open={isEditRecordDialogOpen} onOpenChange={setIsEditRecordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{qc.editRecordDialog.title}</DialogTitle>
            <DialogDescription>{qc.editRecordDialog.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-surah" className="text-end">
                {qc.addRecordDialog.surahLabel}
              </Label>
              <Input
                id="edit-surah"
                value={newRecord.surahName}
                onChange={(e) => setNewRecord({ ...newRecord, surahName: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-from" className="text-end">
                {qc.addRecordDialog.fromVerseLabel}
              </Label>
              <Input
                id="edit-from"
                type="number"
                value={newRecord.versesFrom}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, versesFrom: parseInt(e.target.value) || 1 })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-to" className="text-end">
                {qc.addRecordDialog.toVerseLabel}
              </Label>
              <Input
                id="edit-to"
                type="number"
                value={newRecord.versesTo}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, versesTo: parseInt(e.target.value) || 1 })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-end">
                {qc.addRecordDialog.typeLabel}
              </Label>
              <Select
                value={newRecord.memorizationType}
                onValueChange={(value) =>
                  setNewRecord({
                    ...newRecord,
                    memorizationType: value as "حفظ جديد" | "مراجعة",
                  })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={qc.addRecordDialog.typePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="حفظ جديد">{qc.memorizationType.newMemorization}</SelectItem>
                  <SelectItem value="مراجعة">{qc.memorizationType.revision}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-evaluation" className="text-end">
                {qc.addRecordDialog.evaluationLabel}
              </Label>
              <Input
                id="edit-evaluation"
                type="number"
                min="1"
                max="10"
                value={newRecord.evaluation}
                onChange={(e) =>
                  setNewRecord({ ...newRecord, evaluation: parseInt(e.target.value) || 0 })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-notes" className="text-end">
                {qc.addRecordDialog.notesLabel}
              </Label>
              <Textarea
                id="edit-notes"
                value={newRecord.notes}
                onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditRecordDialogOpen(false)}>
              {qc.actions.cancel}
            </Button>
            <Button onClick={handleEditRecord}>{qc.editRecordDialog.submit}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Record Dialog */}
      <Dialog open={isDeleteRecordDialogOpen} onOpenChange={setIsDeleteRecordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{qc.deleteRecordDialog.title}</DialogTitle>
            <DialogDescription>{qc.deleteRecordDialog.description}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteRecordDialogOpen(false)}>
              {qc.actions.cancel}
            </Button>
            <Button variant="destructive" onClick={handleDeleteRecord}>
              {qc.deleteRecordDialog.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
