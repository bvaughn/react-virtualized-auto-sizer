import { render as renderForTest } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { simulateResize } from "../utils/test/simulateResize";
import { AutoSizer } from "./AutoSizer";

describe("AutoSizer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call children with undefined size values during the initial render", async () => {
    const Children = vi.fn(() => null);
    const onResize = vi.fn();

    renderForTest(<AutoSizer children={Children} onResize={onResize} />);

    expect(Children).toHaveBeenCalledTimes(1);
    expect(Children).toHaveBeenCalledWith({}, undefined);
    expect(onResize).not.toHaveBeenCalled();
  });

  it("should pass children width and height once mounted", async () => {
    const Children = vi.fn(() => null);
    const onResize = vi.fn();

    const { container } = renderForTest(
      <AutoSizer children={Children} onResize={onResize} />
    );

    expect(Children).toHaveBeenCalled();
    expect(onResize).not.toHaveBeenCalled();

    Children.mockReset();

    await simulateResize({
      element: container,
      height: 100,
      width: 200
    });

    expect(Children).toHaveBeenCalledTimes(1);
    expect(Children).toHaveBeenCalledWith(
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
          className="foo"
          id="auto-sizer"
          role="button"
          style={{ backgroundColor: "red" }}
        />
      );

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.className).toContain("foo");
      expect(element.getAttribute("id")).toEqual("auto-sizer");
      expect(element.getAttribute("role")).toEqual("button");
      expect(element.style.backgroundColor).toEqual("red");
    });

    it("should support a different tagName", () => {
      const { container } = renderForTest(<AutoSizer tagName="span" />);

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.tagName).toEqual("SPAN");
    });
  });
});
