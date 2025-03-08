import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardWrapper from "../CardWrapper";

describe("CardWrapper Component", () => {
  test("renders title correctly", () => {
    render(
      <CardWrapper title="Test Title">
        <div>Test Content</div>
      </CardWrapper>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("renders children content", () => {
    render(
      <CardWrapper title="Test Title">
        <div>Test Content</div>
      </CardWrapper>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  test("applies correct styles", () => {
    render(
      <CardWrapper title="Test Title">
        <div>Test Content</div>
      </CardWrapper>
    );

    const container = screen.getByText("Test Title").parentElement;
    expect(container).toHaveClass("bg-gray-100", "shadow-lg", "rounded-lg");
  });
});
