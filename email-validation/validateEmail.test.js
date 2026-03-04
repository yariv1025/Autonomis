import { describe, it, expect } from "vitest";
import { validateEmail } from "./validateEmail.js";

describe("validateEmail", () => {
  it("returns true when email has @ and non-empty part after @", () => {
    expect(validateEmail("a@b.co")).toBe(true);
  });

  it("returns false when no @", () => {
    expect(validateEmail("invalid")).toBe(false);
  });

  it("returns false when nothing after @", () => {
    expect(validateEmail("a@")).toBe(false);
  });
});
