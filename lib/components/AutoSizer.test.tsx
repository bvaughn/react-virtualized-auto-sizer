import { render as renderForTest } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AutoSizer } from "./AutoSizer";
import { simulateResize } from "../utils/test/simulateResize";

describe("AutoSizer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should call render with undefined values during mount", () => {
    const onResize = vi.fn();
    const render = vi.fn().mockReturnValue(null);

    renderForTest(<AutoSizer onResize={onResize} render={render} />);

    expect(onResize).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalled();
    expect(render).toHaveBeenCalledWith({});
  });

  it("should call render with measured values after mount", async () => {
    const onResize = vi.fn();
    const render = vi.fn().mockReturnValue(null);

    const { container } = renderForTest(
      <AutoSizer onResize={onResize} render={render} />
    );

    expect(onResize).not.toHaveBeenCalled();
    expect(render).toHaveBeenCalled();

    render.mockReset();

    await simulateResize({
      element: container,
      height: 100,
      width: 200
    });

    expect(render).toHaveBeenCalledTimes(1);
    expect(render).toHaveBeenCalledWith({
      height: 100,
      width: 200
    });

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
          render={() => null}
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
      const { container } = renderForTest(
        <AutoSizer render={() => null} tagName="span" />
      );

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.tagName).toEqual("SPAN");
    });
  });
});
