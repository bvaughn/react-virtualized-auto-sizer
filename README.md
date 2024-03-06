# react-virtualized-auto-sizer

Standalone version of the `AutoSizer` component from [`react-virtualized`](https://github.com/bvaughn/react-virtualized).

### If you like this project, 🎉 [become a sponsor](https://github.com/sponsors/bvaughn/) or ☕ [buy me a coffee](http://givebrian.coffee/)

## Install

```bash
npm install --save react-virtualized-auto-sizer
```

## Documentation


| Property      | Type     | Required? | Description                                                                                                                                                     |
| :------------ | :------- | :-------: | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children      | Function |     ✓     | Function responsible for rendering children. This function should implement the following signature: `({ height?: number \| undefined, width?: number \| undefined }) => PropTypes.element` |
| className     | String   |           | Optional custom CSS class name to attach to root `AutoSizer` element. This is an advanced property and is not typically necessary.                              |
| defaultHeight | Number   |           | Height passed to child for initial render; useful for server-side rendering. This value will be overridden with an accurate height after mounting.              |
| defaultWidth  | Number   |           | Width passed to child for initial render; useful for server-side rendering. This value will be overridden with an accurate width after mounting.                |
| disableHeight | Boolean  |           | Fixed `height`; if specified, the child's `height` property will not be managed                                                                                 |
| disableWidth  | Boolean  |           | Fixed `width`; if specified, the child's `width` property will not be managed                                                                                   |
| doNotBailOutOnEmptyChildren | boolean | | Optional propr that can override default behavior of not rendering children when either `width` or `height` are 0 |
| nonce         | String   |           | Nonce of the inlined stylesheets for [Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute)                    |
| onResize      | Function |           | Callback to be invoked on-resize; it is passed the following named parameters: `({ height: number, width: number })`.                                           |
| style         | Object   |           | Optional custom inline style to attach to root `AutoSizer` element. This is an advanced property and is not typically necessary.                                |
| tagName       | string   |           | Optional HTML tag name for root element; defaults to `"div"` |

## Examples

Some components (like those found in [`react-window`](https://github.com/bvaughn/react-window) or [`react-virtualized`](https://github.com/bvaughn/react-virtualized)) require numeric width and height parameters. The `AutoSizer` component can be useful if you want to pass percentage based dimensions.

```jsx
import AutoSizer from "react-virtualized-auto-sizer";

// UI
<AutoSizer>
  {({ height, width }) => {
    // Use these actual sizes to calculate your percentage based sizes
  }}
</AutoSizer>;
```

## FAQs

### Can I use this component with flexbox?

Flex containers don't prevent their children from growing and `AutoSizer` greedily grows to fill as much space as possible. Combining the two can be problematic. The simple way to fix this is to nest `AutoSizer` inside of a `block` element (like a `<div>`) rather than putting it as a direct child of the flex container, like so:

```jsx
<div style={{ display: 'flex' }}>
  <!-- Other children... -->
  <div style={{ flex: '1 1 auto' }}>
    <AutoSizer>
      {({ height, width }) => (
        <Component
          width={width}
          height={height}
          {...props}
        />
      )}
    </AutoSizer>
  </div>
</div>
```

### Why is `AutoSizer` passing a height of 0?

`AutoSizer` expands to _fill_ its parent but it will not _stretch_ the parent. This is done to prevent problems with flexbox layouts. If `AutoSizer` is reporting a height (or width) of 0- then it's likely that the parent element (or one of its parents) has a height of 0.

The solution to this problem is often to add `height: 100%` or `flex: 1` to the parent. One easy way to test this is to add a style property (eg `background-color: red;`) to the parent to visually confirm that it is the expected size.

### Can I use `AutoSizer` to manage only width or height (not both)?

You can use `AutoSizer` to control only one dimension of its child component using the `disableHeight` or `disableWidth` attributes. For example, a fixed-height component that should grow to fill the available width can be created like so:

```jsx
<AutoSizer disableHeight>
  {({width}) => <Component height={200} width={width} {...props} />}
</AutoSizer>
```


### Module parsing fails because of an unexpected token?

This package targets [ECMAScript 2015](https://262.ecma-international.org/6.0/) (ES6) and requires a build tool such as [babel-loader](https://www.npmjs.com/package/babel-loader) that is capable of parsing the ES6 `class` syntax.

### Can this component work with a Content Security Policy?

[The specification of Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#intro)
describes as the following:

> This document defines Content Security Policy, a mechanism web applications
> can use to mitigate a broad class of content injection vulnerabilities, such
> as cross-site scripting (XSS).

To apply Content Security Policy, pass a `nonce` to `AutoSizer` and add a matching `nonce-source` to the `Content-Security-Policy` field in HTTP header.
