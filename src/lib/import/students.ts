import { readTextFile } from "@tauri-apps/plugin-fs";
import { parseCSV } from "@/lib/export/csv";
import { showOpenDialog } from "@/lib/export/dialog";
import { studentSchema } from "@/lib/validations";
import { addStudent } from "@/lib/database/repositories/students";
import type { Teacher } from "@/lib/database/repositories/teachers";

const REQUIRED_HEADERS = ["name", "age", "grade", "department"] as const;
const ALLOWED_DEPARTMENTS = ["quran", "tajweed", "tarbawi"];

export type StudentImportSkipReason =
  | "invalidData"
  | "invalidDepartment"
  | "databaseError";

export interface StudentImportRowResult {
  row: number;
  name: string;
  status: "imported" | "skipped";
  reason?: StudentImportSkipReason;
  detail?: string;
}

export interface StudentImportSummary {
  results: StudentImportRowResult[];
  importedCount: number;
  skippedCount: number;
  missingColumns?: string[];
}

export async function importStudentsFromCSV(
  teachers: Teacher[]
): Promise<StudentImportSummary | null> {
  const filePath = await showOpenDialog("CSV", ["csv"]);
  if (!filePath) return null;

  const text = await readTextFile(filePath);
  const rows = parseCSV(text);
  if (rows.length === 0) {
    return { results: [], importedCount: 0, skippedCount: 0 };
  }

  const header = rows[0].map((h) => h.trim().toLowerCase());
  const colIndex = (name: string) => header.indexOf(name);

  const idx = {
    name: colIndex("name"),
    age: colIndex("age"),
    grade: colIndex("grade"),
    department: colIndex("department"),
    teacherName: colIndex("teacher_name"),
    parentName: colIndex("parent_name"),
    parentPhone: colIndex("parent_phone"),
    partsMemorized: colIndex("parts_memorized"),
  };

  const missingColumns = REQUIRED_HEADERS.filter((h) => colIndex(h) < 0);
  if (missingColumns.length > 0) {
    return { results: [], importedCount: 0, skippedCount: 0, missingColumns };
  }

  const results: StudentImportRowResult[] = [];

  for (let i = 0; i < rows.length - 1; i++) {
    const cols = rows[i + 1];
    const rowNumber = i + 2; // +1 for header row, +1 for 1-indexing
    const name = (cols[idx.name] ?? "").trim();
    const department = (cols[idx.department] ?? "").trim().toLowerCase();
    const age = Number((cols[idx.age] ?? "").trim());

    const parsed = studentSchema.safeParse({
      name,
      age,
      grade: (cols[idx.grade] ?? "").trim(),
      department,
      parentName: idx.parentName >= 0 ? (cols[idx.parentName] ?? "").trim() : undefined,
      parentPhone: idx.parentPhone >= 0 ? (cols[idx.parentPhone] ?? "").trim() : undefined,
    });

    if (!parsed.success) {
      results.push({
        row: rowNumber,
        name,
        status: "skipped",
        reason: "invalidData",
        detail: parsed.error.issues[0]?.message,
      });
      continue;
    }

    if (!ALLOWED_DEPARTMENTS.includes(department)) {
      results.push({ row: rowNumber, name, status: "skipped", reason: "invalidDepartment" });
      continue;
    }

    const teacherName = idx.teacherName >= 0 ? (cols[idx.teacherName] ?? "").trim() : "";
    const teacher = teacherName ? teachers.find((t) => t.name === teacherName) : undefined;
    const partsMemorized =
      idx.partsMemorized >= 0 ? Number((cols[idx.partsMemorized] ?? "0").trim()) || 0 : 0;

    try {
      await addStudent({
        name: parsed.data.name,
        age: parsed.data.age,
        grade: parsed.data.grade,
        department: parsed.data.department,
        teacher_id: teacher?.id ?? null,
        parts_memorized: partsMemorized,
        parent_name: parsed.data.parentName || undefined,
        parent_phone: parsed.data.parentPhone || undefined,
      });
      results.push({ row: rowNumber, name, status: "imported" });
    } catch {
      results.push({ row: rowNumber, name, status: "skipped", reason: "databaseError" });
    }
  }

  return {
    results,
    importedCount: results.filter((r) => r.status === "imported").length,
    skippedCount: results.filter((r) => r.status === "skipped").length,
  };
}
