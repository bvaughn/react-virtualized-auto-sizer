/**
 * @jest-environment jsdom
 */

import { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { act } from "react-dom/test-utils";
import { AutoSizer } from "./AutoSizer";
import {
  HeightOnlyProps,
  Props,
  Size,
  WidthOnlyProps,
  isHeightOnlyProps,
  isWidthOnlyProps,
} from "./types";

// AutoSizer uses measurements APIs that JSDOm doesn't support.
function mockOffsetSize(width: number, height: number) {
  Object.defineProperty(HTMLElement.prototype, "getBoundingClientRect", {
    configurable: true,
    value: () => ({ height, width }),
  });
  Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
    configurable: true,
    value: height,
  });
  Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
    configurable: true,
    value: width,
  });
}

function DefaultChildComponent({
  bar,
  foo,
  height,
  width,
}: {
  bar: any;
  foo: any;
  height?: number;
  width?: number;
}) {
  return (
    <div>{`width:${width}, height:${height}, foo:${foo}, bar:${bar}`}</div>
  );
}

async function simulateResize({
  element,
  height,
  width,
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

describe("AutoSizer", () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    // @ts-ignore
    global.IS_REACT_ACT_ENVIRONMENT = true;
  });

  function renderHelper(
    {
      bar = 123,
      ChildComponent = DefaultChildComponent,
      excludeWrapperStyling = false,
      foo = 456,
      height = 100,
      paddingBottom = 0,
      paddingLeft = 0,
      paddingRight = 0,
      paddingTop = 0,
      width = 200,
    } = {},
    props: Omit<Props, "children"> = {}
  ) {
    const wrapperStyle: CSSProperties = {
      boxSizing: "border-box",
      height,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
      width,
    };

    const {
      disableHeight = false,
      disableWidth = false,
      bailoutOnEmptyChildren,
      ...rest
    } = props;

    mockOffsetSize(width, height);

    container = document.createElement("div");

    const root = createRoot(container);
    act(() => {
      root.render(
        <div style={excludeWrapperStyling ? undefined : wrapperStyle}>
          <AutoSizer
            disableHeight={disableHeight as any}
            disableWidth={disableWidth as any}
            bailoutOnEmptyChildren={bailoutOnEmptyChildren}
            {...rest}
          >
            {({ height, width }: Size) => (
              <ChildComponent
                bar={bar}
                foo={foo}
                height={isWidthOnlyProps(props) ? undefined : height}
                width={isHeightOnlyProps(props) ? undefined : width}
              />
            )}
          </AutoSizer>
        </div>
      );
    });
  }

  it("should relay properties to ChildComponent or React child", () => {
    renderHelper();

    expect(container.textContent).toContain("foo:456");
    expect(container.textContent).toContain("bar:123");
  });

  it("should set the correct initial width and height of ChildComponent or React child", () => {
    renderHelper();

    expect(container.textContent).toContain("height:100");
    expect(container.textContent).toContain("width:200");
  });

  it("should not render children for elements that occupy no space in the DOM", () => {
    renderHelper({
      excludeWrapperStyling: true,
      height: 0,
      width: 0,
    });
    expect(container.textContent).toEqual("");

    renderHelper({
      excludeWrapperStyling: true,
      height: 100,
      width: 0,
    });
    expect(container.textContent).toEqual("");

    renderHelper({
      excludeWrapperStyling: true,
      height: 0,
      width: 100,
    });
    expect(container.textContent).toEqual("");
  });

  it("should render children for elements that occupy no space in the DOM if requested", () => {
    renderHelper(
      {
        excludeWrapperStyling: true,
        height: 0,
        width: 0,
      },
      { bailoutOnEmptyChildren: false }
    );
    expect(container.textContent).toBe("width:0, height:0, foo:456, bar:123");

    renderHelper(
      {
        excludeWrapperStyling: true,
        height: 100,
        width: 0,
      },
      { bailoutOnEmptyChildren: false }
    );
    expect(container.textContent).toBe("width:0, height:100, foo:456, bar:123");

    renderHelper(
      {
        excludeWrapperStyling: true,
        height: 0,
        width: 100,
      },
      { bailoutOnEmptyChildren: false }
    );
    expect(container.textContent).toBe("width:100, height:0, foo:456, bar:123");
  });

  it("should account for padding when calculating the available width and height", () => {
    renderHelper({
      paddingBottom: 10,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 15,
    });

    expect(container.textContent).toContain("height:75");
    expect(container.textContent).toContain("width:192");
  });

  it("should account for non-integer padding values when calculating the available width and height", () => {
    renderHelper({
      paddingBottom: 10.5,
      paddingLeft: 4.2,
      paddingRight: 4.1,
      paddingTop: 15.4,
    });

    expect(container.textContent).toContain("height:74.1");
    expect(container.textContent).toContain("width:191.7");
  });

  it("should not update :width if :disableWidth is true", () => {
    renderHelper({}, { disableWidth: true } as HeightOnlyProps);

    expect(container.textContent).toContain("height:100");
    expect(container.textContent).toContain("width:undefined");
  });

  it("should not update :height if :disableHeight is true", () => {
    renderHelper({}, { disableHeight: true } as WidthOnlyProps);

    expect(container.textContent).toContain("height:undefined");
    expect(container.textContent).toContain("width:200");
  });

  it("should update :height after a resize event", async () => {
    renderHelper({
      height: 100,
      width: 200,
    });

    expect(container.textContent).toContain("height:100");
    expect(container.textContent).toContain("width:200");

    await simulateResize({ element: container, height: 400, width: 300 });

    expect(container.textContent).toContain("height:400");
    expect(container.textContent).toContain("width:300");
  });

  describe("onResize and (re)render", () => {
    it("should trigger when size changes", async () => {
      const onResize = jest.fn();
      const ChildComponent = jest
        .fn()
        .mockImplementation(DefaultChildComponent);

      renderHelper(
        {
          ChildComponent,
          height: 100,
          width: 200,
        },
        {
          onResize,
        }
      );

      ChildComponent.mockClear(); // TODO Improve initial check in version 10; see AutoSizer render()

      expect(onResize).toHaveBeenCalledTimes(1);

      await simulateResize({ element: container, height: 400, width: 300 });

      expect(ChildComponent).toHaveBeenCalledTimes(1);
      expect(onResize).toHaveBeenCalledTimes(2);
    });

    it("should only trigger when height changes for disableWidth == true", async () => {
      const onResize = jest.fn();

      const ChildComponent = jest
        .fn()
        .mockImplementation(DefaultChildComponent);

      renderHelper(
        {
          ChildComponent,
          height: 100,
          width: 200,
        },
        {
          disableWidth: true,
          onResize,
        } as Omit<HeightOnlyProps, "children">
      );

      ChildComponent.mockClear(); // TODO Improve initial check in version 10; see AutoSizer render()

      expect(onResize).toHaveBeenCalledTimes(1);

      await simulateResize({ element: container, height: 100, width: 300 });

      expect(ChildComponent).toHaveBeenCalledTimes(0);
      expect(onResize).toHaveBeenCalledTimes(1);

      await simulateResize({ element: container, height: 200, width: 300 });

      expect(ChildComponent).toHaveBeenCalledTimes(1);
      expect(onResize).toHaveBeenCalledTimes(2);
    });

    it("should only trigger when width changes for disableHeight == true", async () => {
      const onResize = jest.fn();
      const ChildComponent = jest
        .fn()
        .mockImplementation(DefaultChildComponent);

      renderHelper(
        {
          ChildComponent,
          height: 100,
          width: 200,
        },
        {
          disableHeight: true,
          onResize,
        } as Omit<WidthOnlyProps, "children">
      );

      ChildComponent.mockClear(); // TODO Improve initial check in version 10; see AutoSizer render()

      expect(onResize).toHaveBeenCalledTimes(1);

      await simulateResize({ element: container, height: 200, width: 200 });

      expect(ChildComponent).toHaveBeenCalledTimes(0);
      expect(onResize).toHaveBeenCalledTimes(1);

      await simulateResize({ element: container, height: 200, width: 300 });

      expect(ChildComponent).toHaveBeenCalledTimes(1);
      expect(onResize).toHaveBeenCalledTimes(2);
    });
  });

  describe("HTML attributes", () => {
    it("should pass along :className attribute if specified", () => {
      renderHelper({}, { className: "foo", id: "auto-sizer" });

      const element = container.querySelector("#auto-sizer") as HTMLDivElement;
      expect(element.className).toContain("foo");
    });

    it("should pass along custom :style values if specified", () => {
      renderHelper({}, { id: "auto-sizer", style: { backgroundColor: "red" } });

      const element = container.querySelector("#auto-sizer") as HTMLDivElement;
      expect(element.style.backgroundColor).toEqual("red");
    });

    it("should support arbitrary HTML attributes like role", () => {
      renderHelper({}, { id: "auto-sizer", role: "none" });

      const element = container.querySelector("#auto-sizer") as HTMLDivElement;
      expect(element.getAttribute("role")).toEqual("none");
    });
  });

  it("should support a different tagName", () => {
    renderHelper({}, { id: "auto-sizer", tagName: "span" });

    const element = container.querySelector("#auto-sizer") as HTMLDivElement;
    expect(element.tagName).toEqual("SPAN");
  });
});
