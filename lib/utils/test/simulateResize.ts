import { act } from "@testing-library/react";
import { mockOffsetSize } from "./mockOffsetSize";

export async function simulateResize({
  element,
  height,
  width
}: {
  element: HTMLElement;
  height: number;
  width: number;
}) {
  mockOffsetSize(width, height);

  await act(async () => {
    // Trigger detectElementResize library by faking a scroll event
    // TestUtils Simulate doesn't work here in JSDom so we manually dispatch
    const trigger = element.querySelector(".contract-trigger");
    trigger?.dispatchEvent(new Event("scroll"));

    // Allow requestAnimationFrame to be invoked before continuing
    await new Promise((resolve) => setTimeout(resolve, 100));
  });
}
