import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type FunctionComponent
} from "react";
import { createPortal } from "react-dom";
import {
  AutoSizer,
  type AutoSizerBox,
  type Size
} from "react-virtualized-auto-sizer";
import { Children, type SizeProps } from "../components/Children";
import { useSearchParams } from "react-router";

export function Home() {
  const [params] = useSearchParams();
  const box = (params.get("box") || undefined) as AutoSizerBox | undefined;
  const style = params.get("style") || "";
  console.log("Home:", JSON.stringify({ box, style }, null, 2));

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

  const Child = useMemo<FunctionComponent<SizeProps>>(
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

  return (
    <div className="w-full h-full">
      <iframe className="w-full h-[25%]" ref={setIframe} />
      {createPortal(
        <AutoSizer box={box} Child={Child} onResize={onResize} />,
        container
      )}
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
