import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardWrapper from "../CardWrapper";

describe("CardWrapper Component", () => {
  test("renders title correctly", () => {
    render(
      <CardWrapper titleKey="test_title_key">
        <div>Test Content</div>
      </CardWrapper>
    );

    expect(screen.getByText("test_title_key")).toBeInTheDocument();
  });

  test("renders children content", () => {
    render(
      <CardWrapper titleKey="test_title_key">
        <div>Test Content</div>
      </CardWrapper>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies correct styles", () => {
    render(
      <CardWrapper titleKey="test_title_key">
        <div>Test Content</div>
      </CardWrapper>
    );

    const container = screen.getByText("test_title_key").parentElement;
    expect(container).toHaveClass("bg-gray-100", "shadow-lg", "rounded-lg");
  });
});
