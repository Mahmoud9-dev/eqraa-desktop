import { save } from "@tauri-apps/plugin-dialog";
import { writeTextFile } from "@tauri-apps/plugin-fs";

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
  const path = await save({
    title: "Export CSV",
    defaultPath: filename,
    filters: [{ name: "CSV", extensions: ["csv"] }],
  });
  if (!path) return false;
  await writeTextFile(path, generateCSV(headers, rows));
  return true;
}
