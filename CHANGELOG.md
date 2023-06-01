# Changelog

## 1.0.20
* Guard against potential state update after unmount (caused by `setTimeout` when using `ResizeObserver`)

## 1.0.19
* Further improved TypeScript definitions to avoid `any` types for `children` function parameters.
* [61](https://github.com/bvaughn/react-virtualized-auto-sizer/pull/61): Build release bundle with Preconstruct.

## 1.0.18
* Refine TypeScript types so that `disableHeight` and `disableWidth` are properly paired with conditional types like `children` and `onResize`.

## 1.0.17
* Support non-integer padding styles.

## 1.0.16
* Relaxed `children` prop return type from `ReactElement` to `ReactNode`.

## 1.0.15
* Readme changes

## 1.0.14
* Fix potential "_ResizeObserver loop limit exceeded_" error caused by long-running renders ([#55](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/55))

## 1.0.13
* Transpile nullish coalescing operator ([#53](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/53))

## 1.0.12
* Fix regression introduced in 1.0.8 with transformations; pass unscaled width and height as "default" params (and add additional `scaledHeight` and `scaledWidth` params to `children` function)
* Use `ResizeObserver` when possible; fallback to legacy resize polyfill logic otherwise

## 1.0.11
* Pre-transform static class property syntax (`defaultProps`) ([#46](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/46))
* Fixed bad TypeScript definition for `onResize` prop ([#44](https://github.com/bvaughn/react-virtualized-auto-sizer/issues/44))

## 1.0.10
* Add named exports for `AutoSizer` as well as `Props` and `Size` types.

## 1.0.9
* Add optional `tagName` property (default to `"div"`).

## 1.0.8
* Replace `offsetHeight`/`offsetWidth` with `getBoundingClientRect` to better support floating size values
* Spread all additional props onto out `HTMLDivElement`

## 1.0.7
* Add peer dependency for `"react"` / `"react-dom"` version 18

## 1.0.6
* Fixed rAF throttling issue caused by new Chrome flag (#39)

## 1.0.5
* Add peer dependency for `"react"` / `"react-dom"` version 17

## 1.0.4
* Do not use `innerHTML` when detecting element resize as this will throw an error if the page uses Trusted Types (#30)