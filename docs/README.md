---
title: Home
---

# budu.js ![CircleCI](https://circleci.com/gh/sto3psl/budu.svg?style=svg)

> Handle a **bu**nch of **D**OM **up**dates.
>
> Don't let the browser throw away the hard work it has done for you.

Library to batch DOM reads and writes, reducing layout jank and getting a better performance for animations or layout reflows.

[Why should I care?](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)

## Usage

To use `budu` install it with `npm` or `yarn` as follows.

```bash
> npm install --save budu
# or
> yarn install budu
```

After that you can import or require it from your source files.

```js
import schedule from 'budu'
/* or */
const schedule = require('budu')
```

::: warning
`budu` uses `window.requestAnimationFrame` to schedule measurement and updates. Some older browsers don't support this API. You can still use `budu` by using a polyfill for `requestAnimationFrame` like [`raf/polyfill`](https://www.npmjs.com/package/raf).

To see if the browser you want to support implements `requestAnimationFrame`, follow this link -> [Can I Use](https://caniuse.com/#feat=requestanimationframe).
:::

## API

```js
import schedule from 'budu'

schedule({
  measure: () => {
    // call all your expensive DOM reads here
    const bounds = element.getBoundingClientRect()
    return bounds
  },
  update: (bounds) => {
    // write to the DOM in here
    element.style.left = bounds.x + 20 + 'px'
  }
})
```
