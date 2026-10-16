import { act, render as renderForTest } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { simulateResize } from "../utils/test/simulateResize";
import { mockOffsetSize } from "../utils/test/mockOffsetSize";
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

  it.each(["border-box", "content-box"] as const)(
    "should use a changed box after starting with %s",
    async (box) => {
      const onResize = vi.fn();
      const renderProp = () => null;
      const { container, rerender } = renderForTest(
        <AutoSizer box={box} onResize={onResize} renderProp={renderProp} />
      );
      container.style.border = "5px solid";
      container.style.padding = "10px";

      await simulateResize({ element: container, height: 100, width: 200 });
      expect(onResize).toHaveBeenLastCalledWith(
        box === "border-box"
          ? { height: 100, width: 200 }
          : { height: 70, width: 170 }
      );

      const nextBox = box === "border-box" ? "content-box" : "border-box";
      rerender(
        <AutoSizer box={nextBox} onResize={onResize} renderProp={renderProp} />
      );
      await simulateResize({ element: container, height: 150, width: 250 });

      expect(onResize).toHaveBeenLastCalledWith(
        nextBox === "border-box"
          ? { height: 150, width: 250 }
          : { height: 120, width: 220 }
      );
    }
  );

  it("should cancel pending observer work when the box changes", () => {
    const callbacks: Array<() => void> = [];
    const disconnect = vi.fn();
    const ResizeObserverMock = vi.fn(function (callback: () => void) {
      callbacks.push(callback);
      return { observe: vi.fn(), disconnect };
    });
    vi.stubGlobal("ResizeObserver", ResizeObserverMock);
    vi.useFakeTimers();

    try {
      mockOffsetSize(200, 100);
      const first = vi.fn();
      const latest = vi.fn();
      const renderProp = () => null;
      const { container, rerender, unmount } = renderForTest(
        <AutoSizer box="content-box" onResize={first} renderProp={renderProp} />
      );
      container.style.border = "5px solid";
      container.style.padding = "10px";

      rerender(
        <AutoSizer
          box="content-box"
          onResize={latest}
          renderProp={renderProp}
        />
      );
      expect(ResizeObserverMock).toHaveBeenCalledTimes(1);

      act(() => callbacks[0]());
      expect(vi.getTimerCount()).toBe(1);
      rerender(
        <AutoSizer box="border-box" onResize={latest} renderProp={renderProp} />
      );
      expect(ResizeObserverMock).toHaveBeenCalledTimes(2);
      expect(disconnect).toHaveBeenCalledTimes(1);
      expect(vi.getTimerCount()).toBe(0);

      act(() => callbacks[1]());
      act(() => vi.runOnlyPendingTimers());
      expect(first).not.toHaveBeenCalled();
      expect(latest).toHaveBeenCalledWith({ height: 100, width: 200 });

      act(() => callbacks[1]());
      unmount();
      expect(disconnect).toHaveBeenCalledTimes(2);
      expect(vi.getTimerCount()).toBe(0);
    } finally {
      vi.unstubAllGlobals();
      vi.useRealTimers();
    }
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
