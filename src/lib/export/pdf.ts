import { writeFile } from "@tauri-apps/plugin-fs";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { AMIRI_REGULAR_BASE64 } from "./fonts/amiri-font";
import { showSaveDialog } from "./dialog";

interface ExportPDFOptions {
  isRTL?: boolean;
}

export async function exportPDF(
  filename: string,
  title: string,
  headers: string[],
  rows: string[][],
  options?: ExportPDFOptions
): Promise<boolean> {
  const path = await showSaveDialog(filename, "PDF", ["pdf"]);
  if (!path) return false;

  const isRTL = options?.isRTL ?? false;
  const pdf = new jsPDF({ orientation: "p", unit: "mm", format: "a4" });

  // Register Amiri Arabic font
  pdf.addFileToVFS("Amiri-Regular.ttf", AMIRI_REGULAR_BASE64);
  pdf.addFont("Amiri-Regular.ttf", "Amiri", "normal", undefined, "Identity-H");
  pdf.setFont("Amiri");

  // Prepare columns/rows for RTL: reverse order so rightmost column is first
  const displayHeaders = isRTL ? [...headers].reverse() : headers;
  const displayRows = isRTL ? rows.map((r) => [...r].reverse()) : rows;
  const halign = isRTL ? "right" : "left";

  const headerColor: [number, number, number] = [22, 163, 74]; // #16a34a

  autoTable(pdf, {
    head: [displayHeaders],
    body: displayRows,
    startY: 40,
    styles: {
      font: "Amiri",
      fontStyle: "normal",
      halign,
      fontSize: 10,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: headerColor,
      textColor: [255, 255, 255],
      fontStyle: "normal",
      halign,
    },
    alternateRowStyles: {
      fillColor: [249, 250, 251], // #f9fafb
    },
    didDrawPage: (data) => {
      // Title + date on every page
      pdf.setFont("Amiri");
      pdf.setFontSize(18);
      pdf.setTextColor(22, 163, 74);
      const titleX = isRTL
        ? pdf.internal.pageSize.getWidth() - 14
        : 14;
      pdf.text(title, titleX, 15, { align: isRTL ? "right" : "left" });

      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const dateStr = new Date().toLocaleDateString(
        isRTL ? "ar-SA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" }
      );
      pdf.text(dateStr, titleX, 22, { align: isRTL ? "right" : "left" });

      // Page number
      const pageCount = pdf.getNumberOfPages();
      const pageNum = data.pageNumber;
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text(
        `${pageNum} / ${pageCount}`,
        pdf.internal.pageSize.getWidth() / 2,
        pdf.internal.pageSize.getHeight() - 8,
        { align: "center" }
      );
    },
    margin: { top: 35 },
  });

  const arrayBuf = pdf.output("arraybuffer");
  await writeFile(path, new Uint8Array(arrayBuf));
  return true;
}
