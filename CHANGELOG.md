# Changelog

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