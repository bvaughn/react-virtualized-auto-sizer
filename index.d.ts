declare module 'react-virtualized-auto-sizer' {

  import { CSSProperties } from 'react';

  interface Size {
    height: number;
    width: number;
  }

class AutoSizer extends React.Component<{
    className?: string;
    defaultHeight?: number;
    defaultWidth?: number;
    disableHeight?: boolean;
    disableWidth?: boolean;
    nonce?: string;
    onResize?: (size: Size) => void;
    style?: CSSProperties;
    children: (size: Size) => React.ReactNode;
  }, {}> {}

  export default AutoSizer;
}
