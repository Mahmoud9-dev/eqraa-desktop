import { forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { formatDate } from "@/lib/i18n";

interface ReportTemplateProps {
  title: string;
  headers: string[];
  rows: string[][];
}

const ReportTemplate = forwardRef<HTMLDivElement, ReportTemplateProps>(
  ({ title, headers, rows }, ref) => {
    const { t, language, isRTL } = useLanguage();

    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: "1100px",
          direction: isRTL ? "rtl" : "ltr",
          fontFamily: "sans-serif",
          background: "#fff",
          color: "#000",
          padding: "40px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
            borderBottom: "2px solid #16a34a",
            paddingBottom: "16px",
          }}
        >
          <h1 style={{ fontSize: "28px", fontWeight: "bold", color: "#16a34a", margin: 0 }}>
            إقرأ - Eqraa
          </h1>
          <h2 style={{ fontSize: "20px", marginTop: "8px", color: "#333" }}>
            {title}
          </h2>
          <p style={{ fontSize: "14px", color: "#666", marginTop: "4px" }}>
            {t.export.generatedOn}: {formatDate(new Date().toISOString(), language)}
          </p>
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr>
              {headers.map((header, i) => (
                <th
                  key={i}
                  style={{
                    border: "1px solid #d1d5db",
                    padding: "10px 12px",
                    backgroundColor: "#16a34a",
                    color: "#fff",
                    fontWeight: "bold",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td
                    key={cellIdx}
                    style={{
                      border: "1px solid #d1d5db",
                      padding: "8px 12px",
                      backgroundColor: rowIdx % 2 === 0 ? "#fff" : "#f9fafb",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "16px", fontSize: "12px", color: "#999", textAlign: "center" }}>
          {t.export.reportTitle} — {rows.length}
        </div>
      </div>
    );
  }
);

ReportTemplate.displayName = "ReportTemplate";

export default ReportTemplate;
