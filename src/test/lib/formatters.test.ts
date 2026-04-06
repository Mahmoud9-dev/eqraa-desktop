import { describe, it, expect } from "vitest";
import {
  formatDate,
  formatDateShort,
  formatDateISO,
  formatTime,
  formatDateTime,
  formatNumber,
  formatPercent,
} from "@/lib/i18n/formatters";

describe("formatDate", () => {
  const testDate = new Date(2026, 0, 15); // Jan 15, 2026

  it("should format a Date object for en locale", () => {
    const result = formatDate(testDate, "en");
    expect(result).toContain("2026");
    expect(result).toContain("15");
  });

  it("should format a Date object for ar locale", () => {
    const result = formatDate(testDate, "ar");
    // Arabic locale should produce Arabic digits or month names
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should format a string date input", () => {
    const result = formatDate("2026-01-15", "en");
    expect(result).toContain("2026");
  });

  it("should format a numeric timestamp input", () => {
    const result = formatDate(testDate.getTime(), "en");
    expect(result).toContain("2026");
  });

  it("should return the string value for an invalid date string", () => {
    const result = formatDate("not-a-date", "en");
    expect(result).toBe("not-a-date");
  });
});

describe("formatDateShort", () => {
  const testDate = new Date(2026, 0, 15);

  it("should format a short date for en locale", () => {
    const result = formatDateShort(testDate, "en");
    expect(result).toContain("2026");
  });

  it("should format a short date for ar locale", () => {
    const result = formatDateShort(testDate, "ar");
    expect(result).toBeTruthy();
  });
});

describe("formatDateISO", () => {
  it("should produce yyyy-MM-dd format", () => {
    // Use a UTC noon time to avoid timezone boundary issues
    const date = new Date("2026-01-15T12:00:00Z");
    const result = formatDateISO(date);
    expect(result).toBe("2026-01-15");
  });

  it("should zero-pad single digit months and days", () => {
    const date = new Date("2026-03-05T12:00:00Z");
    const result = formatDateISO(date);
    expect(result).toBe("2026-03-05");
  });

  it("should match yyyy-MM-dd pattern", () => {
    const date = new Date("2026-12-25T12:00:00Z");
    const result = formatDateISO(date);
    expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});

describe("formatTime", () => {
  it("should format time for en locale", () => {
    const date = new Date(2026, 0, 15, 14, 30);
    const result = formatTime(date, "en");
    // Should contain hour and minute representation
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should format time for ar locale", () => {
    const date = new Date(2026, 0, 15, 14, 30);
    const result = formatTime(date, "ar");
    expect(result).toBeTruthy();
  });
});

describe("formatDateTime", () => {
  it("should format date and time combined for en locale", () => {
    const date = new Date(2026, 0, 15, 14, 30);
    const result = formatDateTime(date, "en");
    expect(result).toContain("2026");
    expect(result).toBeTruthy();
  });

  it("should format date and time combined for ar locale", () => {
    const date = new Date(2026, 0, 15, 14, 30);
    const result = formatDateTime(date, "ar");
    expect(result).toBeTruthy();
  });
});

describe("formatNumber", () => {
  it("should format a number with digit grouping for en locale", () => {
    const result = formatNumber(1234567, "en");
    expect(result).toBe("1,234,567");
  });

  it("should format a number for ar locale", () => {
    const result = formatNumber(1234567, "ar");
    expect(result).toBeTruthy();
    expect(result.length).toBeGreaterThan(0);
  });

  it("should format zero", () => {
    const result = formatNumber(0, "en");
    expect(result).toBe("0");
  });
});

describe("formatPercent", () => {
  it("should format a decimal as percentage for en locale", () => {
    const result = formatPercent(0.85, "en");
    expect(result).toBe("85%");
  });

  it("should format a decimal as percentage for ar locale", () => {
    const result = formatPercent(0.85, "ar");
    expect(result).toBeTruthy();
  });

  it("should handle zero percent", () => {
    const result = formatPercent(0, "en");
    expect(result).toBe("0%");
  });

  it("should handle 100 percent", () => {
    const result = formatPercent(1, "en");
    expect(result).toBe("100%");
  });
});
