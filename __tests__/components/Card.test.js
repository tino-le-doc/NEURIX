import { render, screen } from "@testing-library/react";
import Card from "@/components/Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).not.toBeNull();
  });

  it("applies additional className when provided", () => {
    const { container } = render(<Card className="extra-class">Hi</Card>);
    expect(container.firstChild.className).toContain("extra-class");
  });

  it("keeps base classes intact", () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild.className).toContain("rounded-xl");
  });
});
