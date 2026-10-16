# Changelog

## 2.0.4

- Fix changes to the `box` prop being ignored after the initial render. The parent is now remeasured as soon as `box` changes. - ([feritcemkahraman](https://github.com/feritcemkahraman) - [#107](https://github.com/bvaughn/react-virtualized-auto-sizer/pull/107))
- Fix `"content-box"` sizes being calculated with styles from the wrong window when rendering into an iframe or popup. - ([feritcemkahraman](https://github.com/feritcemkahraman) - [#107](https://github.com/bvaughn/react-virtualized-auto-sizer/pull/107))

## 2.0.3

- Fix the project logo not displaying correctly in the README in Firefox.

## 2.0.2

- Update README docs.

## 2.0.1

- Separate `renderProp` and `ChildComponent` props. - [#104](https://github.com/bvaughn/react-virtualized-auto-sizer/pull/104)

## 2.0.0

Version 2 simplifies the API and improves TypeScript support.

### Migrating from 1.x to 2.x

Refer to [the docs](https://react-virtualized-auto-sizer.vercel.app/) for a complete list of props and API methods. Below are some examples of migrating from version 1 to 2, but first a couple of potential questions:

<dl>
<dt>Q: Why were the <code>defaultHeight</code> and <code>defaultWidth</code> props removed?</dt>
<dd>A: The more idiomatic way of setting default width and height is to use <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters">default parameters</a>; see below for examples.</dd>
<dt>Q: Why were the <code>disableHeight</code> and <code>disableWidth</code> props removed?</dt>
<dd>A: These props interfered with the TypeScript inference (see issue <a href="https://github.com/bvaughn/react-virtualized-auto-sizer/issues/100">#100</a>). `React.memo` can be used to achieve this behavior instead; see below for examples.</dd>
<dt>Q: Why was the <code>doNotBailOutOnEmptyChildren</code> prop removed?</dt>
<dd>A: This component no longer bails out on empty children; this decision is left up to the child component.</dd>
<dt>Q: Does <code>AutoSizer</code> support CSS transitions/animations?</dt>
<dd>A: To an extent, but as with <code>ResizeObserver</code>, there is no event dispatched when a CSS transition is complete (see issue <a href="https://github.com/bvaughn/react-virtualized-auto-sizer/issues/99">#99</a>). As a potential workaround, the <code>box</code> property can be used to report unscaled size; see below for examples.</dd>
</dl>

#### Basic usage

```tsx
// Version 1
<AutoSizer>
  {({ height, width }) => {
    // ...
  }}
</AutoSizer>

// Version 2
<AutoSizer
  Child={({ height, width }) => {
    // ...
  }}
/>
```

#### Default width/height for server rendered content

```tsx
// Version 1
<AutoSizer defaultWidth={800} defaultHeight={600} {...rest} />

// Version 2
<AutoSizer
  Child={({ height = 600, width = 800 }) => {
    // ...
  }}
/>
```

#### Width only (or height only)

```tsx
// Version 1
<AutoSizer disableWidth {...rest} />

// Version 2
<AutoSizer Child={MemoizedChild} />

const MemoizedChild = memo(
  Child,
  function arePropsEqual(oldProps, newProps) {
    return oldProps.height === newProps.height;
  }
);
```

## 1.0.26

- Change `width` and `height` values to be based on `getBoundingClientRect` rather than `offsetWidth` and `offsetHeight` ([which are integers](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/offsetWidth#value) and can cause rounding/flickering problems in some cases).

## 1.0.25

- Update peer dependencies to include React 19.

## 1.0.24

- Add optional `doNotBailOutOnEmptyChildren` prop to `AutoSizer` to override the default behavior of not rendering children when either width or height is 0.

## 1.0.23

- Fix `ResizeObserver` events not being emitted when using multiple realms by using the `ResizeObserver` global from the parent node's realm. - [#82](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/82)

## 1.0.22

- Fix empty-string padding values not being treated as 0.

## 1.0.21

- Change `AutoSizer` return type from `ReactElement` to `ReactNode` (TypeScript change only).

## 1.0.20

- Guard against a potential state update after unmount (caused by `setTimeout` when using `ResizeObserver`).

## 1.0.19

- Improve TypeScript definitions to avoid `any` types for `children` function parameters.
- Build release bundle with Preconstruct. - [#61](https://github.com/bvaughn/react-virtualized-auto-sizer/pull/61)

## 1.0.18

- Refine TypeScript types so that `disableHeight` and `disableWidth` are properly paired with conditional types like `children` and `onResize`.

## 1.0.17

- Support non-integer padding styles.

## 1.0.16

- Relax `children` prop return type from `ReactElement` to `ReactNode`.

## 1.0.15

- Update README docs.

## 1.0.14

- Fix potential "_ResizeObserver loop limit exceeded_" error caused by long-running renders. - [#55](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/55)

## 1.0.13

- Transpile nullish coalescing operator. - [#53](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/53)

## 1.0.12

- Fix regression introduced in 1.0.8 with transformations; pass unscaled width and height as "default" params (and add additional `scaledHeight` and `scaledWidth` params to `children` function).
- Use `ResizeObserver` when possible; fall back to legacy resize polyfill logic otherwise.

## 1.0.11

- Pre-transform static class property syntax (`defaultProps`). - [#46](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/46)
- Fix bad TypeScript definition for `onResize` prop. - [#44](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/44)

## 1.0.10

- Add named exports for `AutoSizer` as well as `Props` and `Size` types.

## 1.0.9

- Add optional `tagName` prop (defaults to `"div"`).

## 1.0.8

- Replace `offsetHeight`/`offsetWidth` with `getBoundingClientRect` to better support floating point size values.
- Spread all additional props onto our `HTMLDivElement`.

## 1.0.7

- Add peer dependency for `"react"` / `"react-dom"` version 18.

## 1.0.6

- Fix rAF throttling issue caused by new Chrome flag. - [#39](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/39)

## 1.0.5

- Add peer dependency for `"react"` / `"react-dom"` version 17.

## 1.0.4

- Do not use `innerHTML` when detecting element resize as this will throw an error if the page uses Trusted Types. - [#30](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/30)
