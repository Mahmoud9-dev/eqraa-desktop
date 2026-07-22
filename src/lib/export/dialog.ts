import { save, open } from "@tauri-apps/plugin-dialog";
import { downloadDir, join } from "@tauri-apps/api/path";

export async function showSaveDialog(
  filename: string,
  filterName: string,
  extensions: string[]
): Promise<string | null> {
  const dir = await downloadDir();
  const defaultPath = await join(dir, filename);
  return save({
    title: `Export ${filterName}`,
    defaultPath,
    filters: [{ name: filterName, extensions }],
  });
}

export async function showOpenDialog(
  filterName: string,
  extensions: string[]
): Promise<string | null> {
  const result = await open({
    title: `Import ${filterName}`,
    filters: [{ name: filterName, extensions }],
    multiple: false,
    directory: false,
  });
  return typeof result === "string" ? result : null;
}
