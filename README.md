# react-virtualized-auto-sizer

Standalone version of the `AutoSizer` component from [`react-virtualized`](https://github.com/bvaughn/react-virtualized).

### If you like this project, 🎉 [become a sponsor](https://github.com/sponsors/bvaughn/) or ☕ [buy me a coffee](http://givebrian.coffee/)

## Install

```bash
npm install --save react-virtualized-auto-sizer
```

### AutoSizer

<!-- AutoSizer:description:begin -->
Measures the available width and height of its parent `HTMLElement` and passes those values as `width` and `height` props to its `children`.

ℹ️ This component began as a fork of the [javascript-detect-element-resize](https://www.npmjs.com/package/javascript-detect-element-resize) package.
<!-- AutoSizer:description:end -->

#### Required props

<!-- AutoSizer:required-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Child</td>
      <td><p>Child component to be passed the available width and height values as props.</p>
<p>ℹ️ Width and height are undefined during the during the initial render (including server-rendering).</p>
</td>
    </tr>
  </tbody>
</table>

<!-- AutoSizer:required-props:end -->

#### Optional props

<!-- AutoSizer:optional-props:begin -->

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>box</td>
      <td><p>Corresponds to the <code>ResizeObserver</code> <a href="https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver/observe#box">box</a> parameter.
Sets which box model the observer will observe changes to.</p>
<ul>
<li><code>border-box</code>: Size of the box border area as defined in CSS.</li>
<li><code>content-box</code>: Size of the content area as defined in CSS.</li>
<li><code>device-pixel-content-box</code>: The size of the content area as defined in CSS, in device pixels, before applying any CSS transforms on the element or its ancestors.</li>
</ul>
</td>
    </tr>
    <tr>
      <td>className</td>
      <td><p>Class name to be applied to the auto-sizer <code>HTMLElement</code>.</p>
</td>
    </tr>
    <tr>
      <td>data-testid</td>
      <td><p>Test id attribute to interop with frameworks like <a href="https://testing-library.com/docs/queries/bytestid/">Testing Library</a>.</p>
</td>
    </tr>
    <tr>
      <td>id</td>
      <td><p>Unique id attribute to attach to root DOM element.</p>
</td>
    </tr>
    <tr>
      <td>nonce</td>
      <td><p><a href="https://www.w3.org/TR/2016/REC-CSP2-20161215/#script-src-the-nonce-attribute">Nonce</a> used for inline <code>StyleSheet</code>
in browsers/environments that do not support the <code>ResizeObserver</code> API.</p>
</td>
    </tr>
    <tr>
      <td>onResize</td>
      <td><p>Optional callback notified after a resize.
@param size New width and height of parent element</p>
</td>
    </tr>
    <tr>
      <td>style</td>
      <td><p>Style properties to be applied to the auto-sizer <code>HTMLElement</code>.</p>
</td>
    </tr>
    <tr>
      <td>tagName</td>
      <td><p>Optional HTML tag name for root HTMLElement; defaults to <code>&quot;div&quot;</code>.</p>
</td>
    </tr>
  </tbody>
</table>

<!-- AutoSizer:optional-props:end -->


## FAQs

### Can I use this component with flexbox?

Flex containers don't prevent their children from growing and `AutoSizer` greedily grows to fill as much space as possible. Combining the two can be problematic. The simple way to fix this is to nest `AutoSizer` inside of a `block` element (like a `<div>`) rather than putting it as a direct child of the flex container, like so:

```tsx
<div style={{ display: 'flex' }}>
  {/* Other children... */}
  <div style={{ flex: '1 1 auto' }}>
    <AutoSizer Child={ChildComponent} />
  </div>
</div>
```

### Why is `AutoSizer` passing a height of 0?

`AutoSizer` expands to _fill_ its parent but it will not _stretch_ the parent. This is done to prevent problems with Flex layouts. If `AutoSizer` is reporting a height (or width) of 0- then it's likely that the parent element (or one of its parents) has a height of 0.

The solution to this problem is often to add `height: 100%` or `flex: 1` to the parent. One easy way to test this is to add a style property (eg. `background-color: red;`) to the parent to visually confirm that it is the expected size.

### Can I use `AutoSizer` to manage _only_ width or height (not both)?

No, but you can memoize your child component so that it only re-renders if width (or height) changes.
```tsx
import { memo } from "react";

const MemoizedChild = memo(
  Child,
  function arePropsEqual(oldProps, newProps) {
    return oldProps.height === newProps.height;
  }
);
```

### Can this component work with a Content Security Policy?

[The specification of Content Security Policy](https://www.w3.org/TR/2016/REC-CSP2-20161215/#intro) describes as the following:

> This document defines Content Security Policy, a mechanism web applications
> can use to mitigate a broad class of content injection vulnerabilities, such
> as cross-site scripting (XSS).

To apply Content Security Policy, pass a `nonce` to `AutoSizer` and add a matching `nonce-source` to the `Content-Security-Policy` field in HTTP header.
