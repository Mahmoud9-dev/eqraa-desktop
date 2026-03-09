import { save } from "@tauri-apps/plugin-dialog";
import { writeFile } from "@tauri-apps/plugin-fs";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportPDF(
  element: HTMLElement,
  filename: string
): Promise<boolean> {
  const path = await save({
    title: "Export PDF",
    defaultPath: filename,
    filters: [{ name: "PDF", extensions: ["pdf"] }],
  });
  if (!path) return false;

  const canvas = await html2canvas(element, { scale: 2, useCORS: true });
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation: canvas.width > canvas.height ? "l" : "p",
    unit: "mm",
    format: "a4",
  });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const imgW = pageW - margin * 2;
  const imgH = (canvas.height * imgW) / canvas.width;

  let yOffset = 0;
  const usableH = pageH - margin * 2;
  while (yOffset < imgH) {
    if (yOffset > 0) pdf.addPage();
    pdf.addImage(imgData, "PNG", margin, margin - yOffset, imgW, imgH);
    yOffset += usableH;
  }

  const arrayBuf = pdf.output("arraybuffer");
  await writeFile(path, new Uint8Array(arrayBuf));
  return true;
}
