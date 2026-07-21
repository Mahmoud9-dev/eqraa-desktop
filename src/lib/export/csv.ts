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

/** Parses CSV text (RFC 4180 style quoting) into rows of raw string fields. */
export function parseCSV(text: string): string[][] {
  const content = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text;
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (inQuotes) {
      if (char === '"') {
        if (content[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += char;
      }
      continue;
    }

    if (char === '"') {
      inQuotes = true;
    } else if (char === ",") {
      row.push(field);
      field = "";
    } else if (char === "\r") {
      continue;
    } else if (char === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows.filter((r) => r.length > 1 || r[0] !== "");
}
