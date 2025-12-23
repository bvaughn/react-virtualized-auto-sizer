import { useLayoutEffect, useState } from "react";
import type { AutoSizerChildrenProps } from "react-virtualized-auto-sizer";

export const Children = function Children({
  height,
  onCommitLogsChange,
  width
}: AutoSizerChildrenProps & {
  onCommitLogsChange: (logs: AutoSizerChildrenProps[]) => void;
}) {
  const [commitLogs, setCommitLogs] = useState<AutoSizerChildrenProps[]>([]);

  useLayoutEffect(() => {
    setCommitLogs((prev) => [
      ...prev,
      { height, width } as AutoSizerChildrenProps
    ]);
  }, [height, width]);

  useLayoutEffect(() => onCommitLogsChange(commitLogs));

  // Account for StrictMode double rendering on mount
  useLayoutEffect(
    () => () => {
      setCommitLogs([]);
    },
    []
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-1 text-white">
      {width} x {height} pixels
    </div>
  );
};
