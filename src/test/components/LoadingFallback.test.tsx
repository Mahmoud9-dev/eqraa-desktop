import { describe, it, expect } from "vitest";
import { render } from "@/test/utils/test-utils";
import LoadingFallback from "@/components/LoadingFallback";

describe("LoadingFallback", () => {
  it("should render a spinner element", () => {
    const { container } = render(<LoadingFallback />);
    const spinner = container.querySelector(".animate-spin");
    expect(spinner).toBeInTheDocument();
  });

  it("should render an SVG icon", () => {
    const { container } = render(<LoadingFallback />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should render a min-h-screen wrapper", () => {
    const { container } = render(<LoadingFallback />);
    const wrapper = container.querySelector(".min-h-screen");
    expect(wrapper).toBeInTheDocument();
  });
});
