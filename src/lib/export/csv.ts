import { writeTextFile } from "@tauri-apps/plugin-fs";
import { showSaveDialog } from "./dialog";

export function generateCSV(headers: string[], rows: string[][]): string {
  const BOM = "\uFEFF";
  const escapeCSV = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const lines = [
    headers.map(escapeCSV).join(","),
    ...rows.map((r) => r.map(escapeCSV).join(",")),
  ];
  return BOM + lines.join("\n");
}

export async function exportCSV(
  filename: string,
  headers: string[],
  rows: string[][]
): Promise<boolean> {
  const path = await showSaveDialog(filename, "CSV", ["csv"]);
  if (!path) return false;
  await writeTextFile(path, generateCSV(headers, rows));
  return true;
}
