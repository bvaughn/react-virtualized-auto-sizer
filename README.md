<img src="https://react-virtualized-auto-sizer.vercel.app/og.png" alt="react-virtualized-auto-sizer logo" width="400" height="210" />

`react-virtualized-auto-sizer`: Measures the available width and height of an `HTMLElement` and passes those values as props to a `Child` component. Refer to [the docs](https://react-virtualized-auto-sizer.vercel.app/examples/basic-usage) for usage examples.

> [!NOTE]
> This package began as a fork of the `AutoSizer` component from [react-virtualized](https://github.com/bvaughn/react-virtualized), and was intended for use with earlier versions of [react-window](https://github.com/bvaughn/react-virtualized). More recent versions of `react-window` use `ResizeObserver` natively and do not require this package.

### If you like this project, 🎉 [become a sponsor](https://github.com/sponsors/bvaughn/) or ☕ [buy me a coffee](http://givebrian.coffee/)

## Install

```bash
npm install --save react-virtualized-auto-sizer
```

## FAQs

Frequently asked questions can be found [here](https://react-virtualized-auto-sizer.vercel.app/common-questions).

## Documentation

### AutoSizer

<!-- AutoSizer:description:begin -->
Measures the available width and height of its parent `HTMLElement` and passes those values as `width` and `height` props to its `children`.

ℹ️ This component began as a fork of the [javascript-detect-element-resize](https://www.npmjs.com/package/javascript-detect-element-resize) package.
<!-- AutoSizer:description:end -->

#### Required props

<!-- AutoSizer:required-props:begin -->
None
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
    <tr>
      <td>Child</td>
      <td><p>Child component to be passed the available width and height values as props.
@deprecated Use the <code>ChildComponent</code> or <code>renderProp</code> props instead.</p>
</td>
    </tr>
    <tr>
      <td>ChildComponent</td>
      <td><p>Child component to be passed the available width and height values as props.</p>
<p>ℹ️ Use <code>renderProp</code> instead if you need access to local state.</p>
<p>⚠️ Width and height are undefined during the during the initial render (including server-rendering).</p>
</td>
    </tr>
    <tr>
      <td>renderProp</td>
      <td><p>Render prop to be passed the available width and height values as props.</p>
<p>ℹ️ Use <code>ChildComponent</code> instead for better memoization if you do not need access to local state.</p>
<p>⚠️ Width and height are undefined during the during the initial render (including server-rendering).</p>
</td>
    </tr>
  </tbody>
</table>

<!-- AutoSizer:optional-props:end -->
