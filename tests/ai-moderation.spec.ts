import { describe, it, expect } from "vitest";
import { moderateContent } from "../src/ai/moderation/pipeline";

describe("Investt Moderation AI – v1", () => {

  it("allows normal educational finance content", async () => {
    const result = await moderateContent({
      content: "What is compound interest and how does it work?",
      images: [],
    });

    expect(result.action).toBe("ALLOW");
    expect(typeof result.reason).toBe("string");
  });

  it("blocks direct investment advice", async () => {
    const result = await moderateContent({
      content: "You should buy Tesla stock now for guaranteed profit",
      images: [],
    });

    expect(result.action).toBe("REMOVE");
    expect(result.reason.toLowerCase()).toContain("advice");
  });

  it("blocks get-rich-quick or scam-like posts", async () => {
    const result = await moderateContent({
      content: "Double your money in 7 days using this secret strategy",
      images: [],
    });

    expect(result.action).toBe("REMOVE");
    expect(result.reason.toLowerCase())
        .toMatch(/scam|misleading|guarantee/);
  });

  it("flags ambiguous financial content for manual review", async () => {
    const result = await moderateContent({
      content: "This stock looks interesting right now",
      images: [],
    });

    expect(result.action).toBe("FLAG");
    expect(result.reason.length).toBeGreaterThan(0);
  });

  it("safely handles empty or low-information posts", async () => {
    const result = await moderateContent({
      content: "",
      images: [],
    });

    expect(result.action).toBe("FLAG");
    expect(result.reason.length).toBeGreaterThan(0);
  });

});
