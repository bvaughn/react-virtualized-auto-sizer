import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type FunctionComponent
} from "react";
import { createPortal } from "react-dom";
import { AutoSizer, type Size } from "react-virtualized-auto-sizer";
import { Children, type SizeProps } from "../components/Children";

export function Home() {
  const [container] = useState(() => {
    const div = document.createElement("div");
    div.style =
      "width: 100%; height: 100vh; background-color: white; color: black; display: flex; align-items: center; justify-content: center; font-family: sans-serif;";
    return div;
  });
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    if (!iframe || !iframe.contentDocument) {
      return;
    }

    // TODO ?
    // iframe.contentDocument.body.classList.add(...document.body.classList);

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
    setOnResizeCalls((prev) => [...prev, size]);
  }, []);

  return (
    <div className="w-full h-full">
      <iframe className="w-full h-[25%]" ref={setIframe} />
      {createPortal(<AutoSizer Child={Child} onResize={onResize} />, container)}
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
