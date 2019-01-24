# budu

![Build Status](https://img.shields.io/circleci/project/github/sto3psl/budu/master.svg?style=for-the-badge)
![Size](https://img.shields.io/bundlephobia/min/budu.svg?style=for-the-badge)
![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=for-the-badge)

> Handle a **bu**nch of **D**OM **up**dates.
>
> Don't let the browser throw away the hard work it has done for you.

**More in depth documentation at [budu.now.sh](https://budu.now.sh)**

Library to batch DOM reads and writes, reducing layout jank and getting a better performance for animations or layout reflows.

[Why should I care?](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)

> When you change styles the browser checks to see if any of the changes require layout to be calculated, and for that render tree to be updated. Changes to “geometric properties”, such as widths, heights, left, or top all require layout.

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

> `budu` uses `window.requestAnimationFrame` to schedule measurement and updates. Some older browsers don't support this API. You can still use `budu` by using a polyfill for `requestAnimationFrame` like [`raf/polyfill`](https://www.npmjs.com/package/raf).
>
> To see if the browser you want to support implements `requestAnimationFrame`, follow this link -> [Can I Use](https://caniuse.com/#feat=requestanimationframe).

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

---

I created this mini library to make it easier to create performant data visualisations and I learned a lot from the following articles and libraries:

* [Browser Rendering Optimizations for Frontend Development](https://scotch.io/tutorials/browser-rendering-optimizations-for-frontend-development)
* [Avoid Large, Complex Layouts and Layout Thrashing](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing)
* [FastDOM](https://github.com/wilsonpage/fastdom)
