import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import StatCard from "@/components/StatCard";
import { Users } from "lucide-react";

describe("StatCard", () => {
  it("should render the label text", () => {
    render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Students"
        value={150}
      />
    );
    expect(screen.getByText("Total Students")).toBeInTheDocument();
  });

  it("should render the value", () => {
    render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Students"
        value={150}
      />
    );
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("should render a string value", () => {
    render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Status"
        value="Active"
      />
    );
    expect(screen.getByText("Active")).toBeInTheDocument();
  });

  it("should render the icon", () => {
    const { container } = render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Students"
        value={150}
      />
    );
    // Lucide icons render as SVG elements
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should show loading skeleton when loading is true", () => {
    const { container } = render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Students"
        value={150}
        loading={true}
      />
    );
    const skeleton = container.querySelector(".animate-pulse");
    expect(skeleton).toBeInTheDocument();
  });

  it("should not show value when loading is true", () => {
    render(
      <StatCard
        icon={Users}
        iconBgColor="bg-blue-100"
        iconColor="text-blue-600"
        label="Total Students"
        value={150}
        loading={true}
      />
    );
    expect(screen.queryByText("150")).not.toBeInTheDocument();
  });
});
