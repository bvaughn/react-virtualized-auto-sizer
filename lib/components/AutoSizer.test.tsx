import { render as renderForTest } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { simulateResize } from "../utils/test/simulateResize";
import { AutoSizer } from "./AutoSizer";

describe("AutoSizer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call Child with undefined size values during the initial render", async () => {
    const Child = vi.fn(() => null);
    const onResize = vi.fn();

    renderForTest(<AutoSizer Child={Child} onResize={onResize} />);

    expect(Child).toHaveBeenCalledTimes(1);
    expect(Child).toHaveBeenCalledWith({}, undefined);
    expect(onResize).not.toHaveBeenCalled();
  });

  it("should pass Child width and height once mounted", async () => {
    const Child = vi.fn(() => null);
    const onResize = vi.fn();

    const { container } = renderForTest(
      <AutoSizer Child={Child} onResize={onResize} />
    );

    expect(Child).toHaveBeenCalled();
    expect(onResize).not.toHaveBeenCalled();

    Child.mockReset();

    await simulateResize({
      element: container,
      height: 100,
      width: 200
    });

    expect(Child).toHaveBeenCalledTimes(1);
    expect(Child).toHaveBeenCalledWith(
      {
        height: 100,
        width: 200
      },
      undefined
    );

    expect(onResize).toHaveBeenCalledTimes(1);
    expect(onResize).toHaveBeenCalledWith({
      height: 100,
      width: 200
    });
  });

  describe("HTML", () => {
    it("pass through additional attributes", () => {
      const { container } = renderForTest(
        <AutoSizer
          Child={undefined}
          className="foo"
          data-testid="test-id"
          id="auto-sizer"
          style={{ backgroundColor: "red" }}
        />
      );

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.className).toContain("foo");
      expect(element.getAttribute("data-testid")).toEqual("test-id");
      expect(element.getAttribute("id")).toEqual("auto-sizer");
      expect(element.style.backgroundColor).toEqual("red");
    });

    it("should support a different tagName", () => {
      const { container } = renderForTest(
        <AutoSizer Child={undefined} tagName="span" />
      );

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.tagName).toEqual("SPAN");
    });
  });
});
