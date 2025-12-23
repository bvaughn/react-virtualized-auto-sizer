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
  type AutoSizerChildrenProps,
  type Size
} from "react-virtualized-auto-sizer";
import { Children } from "../components/Children";

export function Home() {
  const [container] = useState(() => document.createElement("div"));
  const [iframe, setIframe] = useState<HTMLIFrameElement | null>(null);

  useLayoutEffect(() => {
    if (!iframe || !iframe.contentDocument) {
      return;
    }

    iframe.contentDocument.body.style =
      "background-color: white; color: black; font-family: sans-serif; font-size: 12px;";
    iframe.contentDocument.body.appendChild(container);
  }, [container, iframe]);

  const [commits, setCommits] = useState<AutoSizerChildrenProps[]>([]);
  const [onResizeCalls, setOnResizeCalls] = useState<Size[]>([]);

  const children = useMemo<FunctionComponent<AutoSizerChildrenProps>>(
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
    <>
      <iframe className="w-full h-10" ref={setIframe} />
      {createPortal(
        <AutoSizer children={children} onResize={onResize} />,
        container
      )}
      <pre className="text-xs">
        <code>
          {JSON.stringify(
            {
              commits,
              onResizeCalls
            },
            null,
            2
          )}
        </code>
      </pre>
    </>
  );
}
