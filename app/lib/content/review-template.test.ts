import { describe, expect, it } from "bun:test";
import {
  buildReviewFromTemplate,
  InvalidReviewSlugError,
} from "./review-template";

describe("buildReviewFromTemplate", () => {
  it("normalises bare platform ids", async () => {
    const review = await buildReviewFromTemplate("navigator");
    expect(review.slug).toBe("navigator-review");
    expect(review.platformId).toBe("platform-navigator");
  });

  it("normalises messy input into canonical slug", async () => {
    const review = await buildReviewFromTemplate("  Navigator Review / ");
    expect(review.slug).toBe("navigator-review");
    expect(review.summary.platform).toBe("Navigator");
  });

  it("rejects slugs without identifiers", async () => {
    await expect(buildReviewFromTemplate("   -review   ")).rejects.toThrow(
      InvalidReviewSlugError
    );
  });
});
