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
