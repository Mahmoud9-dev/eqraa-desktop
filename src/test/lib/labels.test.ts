import { describe, it, expect } from "vitest";
import { getDepartmentLabel } from "@/lib/labels";
import type { Translations } from "@/lib/i18n";

const mockT = {
  attendance: {
    departments: {
      quran: "Quran",
      tajweed: "Tajweed",
      tarbawi: "Tarbawi",
    },
  },
} as unknown as Translations;

describe("getDepartmentLabel", () => {
  it("should return translated label for quran", () => {
    expect(getDepartmentLabel("quran", mockT)).toBe("Quran");
  });

  it("should return translated label for tajweed", () => {
    expect(getDepartmentLabel("tajweed", mockT)).toBe("Tajweed");
  });

  it("should return translated label for tarbawi", () => {
    expect(getDepartmentLabel("tarbawi", mockT)).toBe("Tarbawi");
  });

  it("should return the key as passthrough for unknown department", () => {
    expect(getDepartmentLabel("unknown", mockT)).toBe("unknown");
  });

  it("should return empty string key as passthrough", () => {
    expect(getDepartmentLabel("", mockT)).toBe("");
  });
});
