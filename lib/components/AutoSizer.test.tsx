import { render as renderForTest } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { simulateResize } from "../utils/test/simulateResize";
import { AutoSizer } from "./AutoSizer";

describe("AutoSizer", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should pass undefined size values during the initial render", async () => {
    const ChildComponent = vi.fn(() => null);
    const onResize = vi.fn();

    renderForTest(
      <AutoSizer ChildComponent={ChildComponent} onResize={onResize} />
    );

    expect(ChildComponent).toHaveBeenCalledTimes(1);
    expect(ChildComponent).toHaveBeenCalledWith({}, undefined);
    expect(onResize).not.toHaveBeenCalled();
  });

  it("should pass actual width and height once mounted", async () => {
    const renderProp = vi.fn(() => null);
    const onResize = vi.fn();

    const { container } = renderForTest(
      <AutoSizer onResize={onResize} renderProp={renderProp} />
    );

    expect(renderProp).toHaveBeenCalled();
    expect(onResize).not.toHaveBeenCalled();

    renderProp.mockReset();

    await simulateResize({
      element: container,
      height: 100,
      width: 200
    });

    expect(renderProp).toHaveBeenCalledTimes(1);
    expect(renderProp).toHaveBeenCalledWith({
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
    function Child() {
      return null;
    }

    it("pass through additional attributes", () => {
      const { container } = renderForTest(
        <AutoSizer
          Child={Child}
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
        <AutoSizer Child={Child} tagName="span" />
      );

      const element = container.querySelector(
        "[data-auto-sizer]"
      ) as HTMLDivElement;
      expect(element.tagName).toEqual("SPAN");
    });
  });
});
