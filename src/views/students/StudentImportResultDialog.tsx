import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useLanguage } from "@/contexts/LanguageContext";
import type { StudentImportSummary } from "@/lib/import/students";

interface StudentImportResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  summary: StudentImportSummary | null;
}

export function StudentImportResultDialog({
  open,
  onOpenChange,
  summary,
}: StudentImportResultDialogProps) {
  const { t, tFunc } = useLanguage();

  if (!summary) return null;

  const skippedRows = summary.results.filter((r) => r.status === "skipped");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{t.students.import.title}</DialogTitle>
          <DialogDescription>
            {summary.missingColumns
              ? tFunc("students.import.missingColumns", {
                  columns: summary.missingColumns.join(", "),
                })
              : tFunc("students.import.summary", {
                  imported: summary.importedCount,
                  skipped: summary.skippedCount,
                })}
          </DialogDescription>
        </DialogHeader>

        {skippedRows.length > 0 && (
          <div className="max-h-64 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.students.import.columns.row}</TableHead>
                  <TableHead>{t.students.import.columns.name}</TableHead>
                  <TableHead>{t.students.import.columns.reason}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {skippedRows.map((r) => (
                  <TableRow key={r.row}>
                    <TableCell>{r.row}</TableCell>
                    <TableCell>{r.name || "-"}</TableCell>
                    <TableCell>
                      {r.reason === "invalidData" && r.detail
                        ? r.detail
                        : r.reason
                        ? t.students.import.reasons[r.reason]
                        : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        <DialogFooter>
          <Button onClick={() => onOpenChange(false)}>{t.students.import.close}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
