import { describe, it, expect } from "vitest";
import { paginationClause, computeTotalPages } from "@/lib/database/pagination";

describe("paginationClause", () => {
  it("should return LIMIT 10 OFFSET 0 for page 1, pageSize 10", () => {
    const result = paginationClause({ page: 1, pageSize: 10 });
    expect(result.clause).toBe("LIMIT 10 OFFSET 0");
    expect(result.limit).toBe(10);
    expect(result.offset).toBe(0);
  });

  it("should return LIMIT 20 OFFSET 40 for page 3, pageSize 20", () => {
    const result = paginationClause({ page: 3, pageSize: 20 });
    expect(result.clause).toBe("LIMIT 20 OFFSET 40");
    expect(result.limit).toBe(20);
    expect(result.offset).toBe(40);
  });

  it("should use default page size of 50 when no params provided", () => {
    const result = paginationClause();
    expect(result.clause).toBe("LIMIT 50 OFFSET 0");
    expect(result.limit).toBe(50);
    expect(result.offset).toBe(0);
  });

  it("should calculate offset correctly for page 5, pageSize 25", () => {
    const result = paginationClause({ page: 5, pageSize: 25 });
    expect(result.clause).toBe("LIMIT 25 OFFSET 100");
    expect(result.limit).toBe(25);
    expect(result.offset).toBe(100);
  });
});

describe("computeTotalPages", () => {
  it("should return 10 for 100 items with pageSize 10", () => {
    expect(computeTotalPages(100, 10)).toBe(10);
  });

  it("should return 1 for 0 items", () => {
    expect(computeTotalPages(0, 10)).toBe(1);
  });

  it("should return 11 for 101 items with pageSize 10", () => {
    expect(computeTotalPages(101, 10)).toBe(11);
  });

  it("should return 1 for items less than pageSize", () => {
    expect(computeTotalPages(5, 10)).toBe(1);
  });

  it("should return 1 for exactly 1 item", () => {
    expect(computeTotalPages(1, 10)).toBe(1);
  });
});
