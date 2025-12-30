import { expect, test } from "@playwright/test";

test.describe("dom state", () => {
  // See issue #103
  test("should preserve DOM state across renders when an inline renderProp function is used", async ({
    page
  }) => {
    await page.goto("http://localhost:3010/scrolling-dom-state");

    await expect(page.getByText("force update (0)")).toBeVisible();
    await expect(page.getByText("Row 01")).toBeInViewport();
    await page.getByText("Row 99").scrollIntoViewIfNeeded();

    await page.getByText("force update (0)").click();

    await expect(page.getByText("force update (1)")).toBeVisible();
    await expect(page.getByText("Row 99")).toBeInViewport();
  });
});
