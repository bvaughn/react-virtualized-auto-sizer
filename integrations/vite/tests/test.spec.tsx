import { expect, test } from "@playwright/test";

test.describe("e2e", () => {
  test("should mount with undefined dimensions and then update with the correct measured size", async ({
    page
  }) => {
    await page.goto("http://localhost:3010/");

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [{}, { height: 150, width: 1000 }],
        onResizeCalls: [{ height: 150, width: 1000 }]
      })
    );
  });

  test("should re-render and notify change callback when resized", async ({
    page
  }) => {
    await page.goto("http://localhost:3010/");

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [{}, { height: 150, width: 1000 }],
        onResizeCalls: [{ height: 150, width: 1000 }]
      })
    );

    await page.setViewportSize({
      width: 500,
      height: 500
    });

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [
          {},
          { height: 150, width: 1000 },
          { height: 125, width: 500 }
        ],
        onResizeCalls: [
          { height: 150, width: 1000 },
          { height: 125, width: 500 }
        ]
      })
    );
  });
});
