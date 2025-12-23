import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { App } from "./App";

describe("App", () => {
  it("renders the app title", () => {
    render(<App />);
    const headings = screen.getAllByRole("heading", { level: 1, name: "Chris Driscol" });
    expect(headings.length).toBeGreaterThan(0);
  });
});
