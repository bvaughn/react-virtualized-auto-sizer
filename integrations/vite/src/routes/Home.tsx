import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type FunctionComponent,
  type ReactNode
} from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router";
import {
  AutoSizer,
  type AutoSizerBox,
  type Size
} from "react-virtualized-auto-sizer";
import { Children, type SizeProps } from "../components/Children";

export type ChildProp = "Child" | "ChildComponent" | "renderProp";

export function Home() {
  const [params] = useSearchParams();
  const box = (params.get("box") || undefined) as AutoSizerBox | undefined;
  const childProp = (params.get("childProp") || "ChildComponent") as ChildProp;
  const style = params.get("style") || "";

  const [container] = useState(() => {
    const div = document.createElement("div");
    div.setAttribute("data-testid", "container");
    div.style = `width: 100%; height: 100%; box-sizing: border-box; color: white; ${style}`;
    return div;
  });
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    if (!iframe || !iframe.contentDocument) {
      return;
    }

    iframe.contentDocument.body.style = "margin: 0; padding: 0; height: 100vh;";
    iframe.contentDocument.body.appendChild(container);
  }, [container, iframe]);

  const [commits, setCommits] = useState<SizeProps[]>([]);
  const [onResizeCalls, setOnResizeCalls] = useState<Size[]>([]);

  const ChildComponent = useMemo<FunctionComponent<SizeProps>>(
    () =>
      ({ height, width }) => (
        <Children
          height={height as number}
          onCommitLogsChange={setCommits}
          width={width as number}
        />
      ),
    []
  );

  const onResize = useCallback((size: Size) => {
    setOnResizeCalls((prev) => [
      ...prev,
      {
        height: parseFloat(size.height.toFixed(1)),
        width: parseFloat(size.width.toFixed(1))
      }
    ]);
  }, []);

  let autoSizer: ReactNode;
  switch (childProp) {
    case "Child": {
      autoSizer = (
        <AutoSizer box={box} Child={ChildComponent} onResize={onResize} />
      );
      break;
    }
    case "ChildComponent": {
      autoSizer = (
        <AutoSizer
          box={box}
          ChildComponent={ChildComponent}
          onResize={onResize}
        />
      );
      break;
    }
    case "renderProp": {
      autoSizer = (
        <AutoSizer
          box={box}
          onResize={onResize}
          renderProp={({ height, width }: SizeProps) => (
            <Children
              height={height as number}
              onCommitLogsChange={setCommits}
              width={width as number}
            />
          )}
        />
      );
      break;
    }
  }

  return (
    <div className="w-full h-full">
      <iframe
        className="w-full h-[25%]"
        name="auto-sizer-frame"
        ref={setIframe}
      />
      {createPortal(autoSizer, container)}
      <pre className="text-xs p-2">
        <code
          className="h-full w-full whitespace-pre-wrap overflow-auto"
          data-testid="code"
        >
          {JSON.stringify({
            commits,
            onResizeCalls
          })}
        </code>
      </pre>
    </div>
  );
}
