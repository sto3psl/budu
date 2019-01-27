---
title: Examples
---

# `budu.js` Examples

`budu.js` does basically the same as [`FastDOM`](https://github.com/wilsonpage/fastdom). To compare both libraries I used the same examples as implemented by `FastDOM`.

**TL;DR: Both libraries offer the same performance, choose whatever you like best.**

## Links

* [Animation](/examples/animation.md)
* [Layout](/examples/layout.md)

## Differences between `budu.js` and `FastDOM`

* `budu.js` is just calling functions and has no way of canceling a task. The reason is that my initial use case didn't need that feature. `FastDOM` creates an instance where you can `measure`, `mutate` **and** `clear` which provides more control.
* `FastDOM` normalizes `requestAnimationFrame` and polyfills it if needed. Since most modern browsers including Internet Explorer 11 now ship with `requestAnimationFrame`, I chose not to do that.
* `budu.js` is a tiny bit smaller.
