import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@/test/utils/test-utils";
import IconButton from "@/components/IconButton";
import { Home } from "lucide-react";

describe("IconButton", () => {
  it("should render the label text", () => {
    render(
      <IconButton
        icon={Home}
        label="Dashboard"
        onClick={vi.fn()}
      />
    );
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render as a link when to prop is provided", () => {
    render(
      <IconButton
        icon={Home}
        label="Dashboard"
        to="/dashboard"
      />
    );
    const link = screen.getByRole("link", { name: "Dashboard" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/dashboard");
  });

  it("should render as a link when href prop is provided", () => {
    render(
      <IconButton
        icon={Home}
        label="Settings"
        href="/settings"
      />
    );
    const link = screen.getByRole("link", { name: "Settings" });
    expect(link).toHaveAttribute("href", "/settings");
  });

  it("should render as a button when no to/href is provided", () => {
    render(
      <IconButton
        icon={Home}
        label="Click Me"
        onClick={vi.fn()}
      />
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    expect(button).toBeInTheDocument();
  });

  it("should call onClick when button is clicked", async () => {
    const handleClick = vi.fn();
    render(
      <IconButton
        icon={Home}
        label="Click Me"
        onClick={handleClick}
      />
    );
    const button = screen.getByRole("button", { name: "Click Me" });
    button.click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(
      <IconButton
        icon={Home}
        label="Disabled"
        onClick={vi.fn()}
        disabled={true}
      />
    );
    const button = screen.getByRole("button", { name: "Disabled" });
    expect(button).toBeDisabled();
  });

  it("should render as span (not link) when disabled with to prop", () => {
    render(
      <IconButton
        icon={Home}
        label="Disabled Link"
        to="/dashboard"
        disabled={true}
      />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    const span = screen.getByLabelText("Disabled Link");
    expect(span.tagName.toLowerCase()).toBe("span");
  });

  it("should render the icon as SVG", () => {
    const { container } = render(
      <IconButton
        icon={Home}
        label="With Icon"
        onClick={vi.fn()}
      />
    );
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });
});
