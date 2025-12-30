import { expect, test, type Page } from "@playwright/test";
import { type AutoSizerBox } from "react-virtualized-auto-sizer";
import type { ChildProp } from "../src/routes/Home";

async function startTest({
  box,
  childProp,
  page,
  style = ""
}: {
  box?: AutoSizerBox;
  childProp?: ChildProp;
  page: Page;
  style?: string;
}) {
  // page.on("console", (message) => console.log(message.text()));

  const url = new URL("http://localhost:3010");
  if (box) {
    url.searchParams.set("box", box);
  }
  if (childProp) {
    url.searchParams.set("childProp", childProp);
  }
  if (style) {
    url.searchParams.set("style", style);
  }

  console.log(`\n${url}\n`);

  await page.goto(url.toString());
}

test.describe("render", () => {
  for (const childProp of ["Child", "ChildComponent", "renderProp"]) {
    test.describe(childProp, () => {
      test("should mount with undefined size and then update with measured size", async ({
        page
      }) => {
        await startTest({ childProp: childProp as ChildProp, page });

        await expect(page.getByTestId("code")).toHaveText(
          JSON.stringify({
            commits: [{}, { height: 150, width: 1000 }],
            onResizeCalls: [{ height: 150, width: 1000 }]
          })
        );

        await page.setViewportSize({ height: 500, width: 500 });

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
  }

  test("should support box: content-box", async ({ page }) => {
    await startTest({
      box: "content-box",
      page,
      style: "padding: 10px; border: 2px solid black;"
    });

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [{}, { height: 126, width: 976 }],
        onResizeCalls: [{ height: 126, width: 976 }]
      })
    );

    await page.setViewportSize({
      width: 500,
      height: 500
    });

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [{}, { height: 126, width: 976 }, { height: 101, width: 476 }],
        onResizeCalls: [
          { height: 126, width: 976 },
          { height: 101, width: 476 }
        ]
      })
    );
  });

  test("should support box: border-box", async ({ page }) => {
    await startTest({
      box: "border-box",
      page,
      style: "padding: 10px; border: 2px solid black;"
    });

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

  test("should support box: device-pixel-content-box", async ({ page }) => {
    await startTest({
      box: "device-pixel-content-box",
      page,
      style: "scale: 0.5;"
    });

    // Would be 75 x 500 if scale was applied
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

  // Regression test for issues #96
  test("should support floating values", async ({ page }) => {
    await startTest({ page, style: "width: 500.4px; height: 125.6px;" });

    await expect(page.getByTestId("code")).toHaveText(
      JSON.stringify({
        commits: [{}, { height: 125.6, width: 500.4 }],
        onResizeCalls: [{ height: 125.6, width: 500.4 }]
      })
    );
  });
});
