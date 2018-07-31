declare module 'react-virtualized-auto-sizer' {
  import { CSSProperties } from 'react';

  interface Size {
    height: number;
    width: number;
  }

  const AutoSizer: React.ComponentType<{
    className?: string;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    nonce?: string;
    onResize?: (size: Size) => void;
    style?: CSSProperties;
    children: (size: Size) => React.ReactElement<any>;
  }>;

  export default AutoSizer;
}
