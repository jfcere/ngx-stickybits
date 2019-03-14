# ngx-stickybits
[![version](https://img.shields.io/npm/v/ngx-stickybits.svg?style=flat)](https://www.npmjs.com/package/ngx-stickybits) [![npm](https://img.shields.io/npm/l/ngx-stickybits.svg)](https://opensource.org/licenses/MIT) [![dependencies Status](https://david-dm.org/jfcere/ngx-stickybits/status.svg?path=lib)](https://david-dm.org/jfcere/ngx-stickybits?path=lib) [![peerDependencies Status](https://david-dm.org/jfcere/ngx-stickybits/peer-status.svg?path=lib)](https://david-dm.org/jfcere/ngx-stickybits?path=lib&type=peer) [![downloads](https://img.shields.io/npm/dt/ngx-stickybits.svg)](https://www.npmjs.com/package/ngx-stickybits)

Angular sticky directive using [Stickybits](https://github.com/dollarshaveclub/stickybits), a lightweight alternative to `position: sticky` polyfills.

> :alarm_clock: The project is still a Work-In-Progress and may be subject to major changes.

### Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Browser Compatibility](#browser-compatibility)
- [Quirks](#quirks)
- [Demo application](#demo-application)
- [Road map](#road-map)
- [Contribution](#contribution)

## Installation

To add ngx-stickybits library to your `package.json` use the following command.

```bash
npm install ngx-stickybits --save
```

## Configuration

Import `StickybitsModule` to your angular module to be able to use `stickybits` directive.

```diff
import { NgModule } from '@angular/core';
+ import { StickybitsModule } from 'ngx-stickybits';

import { AppComponent } from './app.component';

@NgModule({
  imports: [
+   StickybitsModule,
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## Usage

ngx-stickybits provides the `stickybits` directive to apply on element you want to be sticky.

```html
<div class="some-stickybits-parent">
  <div class="some-stickybits-element" stickybits>
    I am a sticky element
  </div>
</div>
```

### Input Properties

`stickybits` directive can be customized using the following properties:

| Property | Type | Default | Description |
| -------- | ---- | ------- | ----------- |
| @Input() <br/> noStyles | boolean | `false` | To use StickyBits without inline styles except for `position: sticky` or `position: fixed` |
| @Input() <br/> scrollEl | Element \| string | `window` | Desired scrolling element or DOM query selector |
| @Input() <br/> parentClass | string | 'sticky-parent' | Applied CSS class on the parent of the sticky element |
| @Input() <br/> stickyChangeClass | string | 'sticky--change' | Applied CSS class after the element is sticky for a certain duration of scroll - _By default this duration of scrolling is the height of the sticky element_ |
| @Input() <br/> stickyChangeNumber | number | 0 | Description |
| @Input() <br/> stickyClass | string | 'sticky' | Applied CSS class on element when it is _sticky_ |
| @Input() <br/> stuckClass | string | 'stuck' | Applied CSS class on element when it is _stuck_ |
| @Input() <br/> stickyOffset | number | 0 | Desired offset from the top of the viewport to which the element will stick |
| @Input() <br/> useFixed | boolean | `false` | Enforce `position: fixed` instead of using `position: sticky` |
| @Input() <br/> useGetBoundingClientRect | boolean | `false` | Do not use `offsetTop` provide the optional boolean `useGetBoundingClientRect` - _This feature is optimal when dealing with things like CSS calc which can throw off `offsetTop` calculations_ |
| @Input() <br/> useStickyClasses | boolean | `true` | Add/remove classes from element according to it's sticky state (see details below) — _This is expensive for the browser, it is better if can be avoided and remain `false`_ |
| @Input() <br/> verticalPosition | 'top' \| 'bottom' | 'top' | Stick element to the top/bottom of the viewport when vertically scrolled to |
| @Output() <br/> sticky | EventEmitter\<boolean\> | | Emits `true` when element becomes sticky and `false` when it becomes unsticky |
| @Output() <br/> stuck | EventEmitter\<boolean\> | | Emits `true` when element becomes stuck and `false` when it becomes unstuck |

> :warning: Right now events are only emitted when `useStickyClasses` is set to `true` as those are based on CSS class detection with `MutationObserver` which offers better browser compatibility then `IntersectionObserver` althought refactoring might be reconsidered in the future.

When `useStickyClasses` is set to `true`, the following CSS classes will be applied on elements (can be can be overwritten):

- `sticky` if the selected element is sticky
- `stuck` if the selected element is stopped at the bottom of its parent
- `sticky--change` if the selected element is scrolling within the height of the sticky element (before it get sticky)
- `sticky-parent` so that styles can easily be added to the parent of a sticky element

## Browser Compatibility

`Stickybits` works in modern browsers like a charm, when it turns to Internet Explorer it is often a total different story! Althought it tend to support IE 9 and above by using `position: fixed` the result not always what is expected. Please file and issue with browser compatibility quirks [here](https://github.com/dollarshaveclub/stickybits/issues).

## Quirks

I won't lie to you, getting an element sticky has always been a hard and painful task! Although `Stickybits` makes it _easier_ it is not always magic and sometime require some twists to make it works as desired. This section is dedicated to quirks and how to resolve common problematic behaviors using `stickybits` directive.

#### verticalPosition = 'bottom'

Setting `[verticalPosition]="'bottom'"` won't work out of the box, easiest way to fit it is to put the sticky parent element with `display: flex` and set the sticky element with `align-self: flex-end`.

## Demo Application

Demo application is available @ https://jfcere.github.io/ngx-stickybits and its source code can be found inside the `demo` directory.

The following commands will clone the repository, install npm dependencies and serve the application @ http://localhost:4200

```bash
git clone https://github.com/jfcere/ngx-stickybits.git
npm install
ng serve
```

## Road map

Here is the list of tasks that will be done on this library in a near future ...

- ~~Publish demo on github pages~~
- ~~Improve documentation~~
- Add CircleCI integration
- Add unit tests
- Add Module configuration (CSS classes, useFixed, noStyles, ...)

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

I do not own rights for `Stickybits` and all the credits belong to them — see [DollarShaveClub/Stickybits](https://github.com/dollarshaveclub/stickybits) for details.

This package is licensed under [MIT](https://opensource.org/licenses/MIT) license — see [LICENSE](https://github.com/jfcere/ngx-stickybits/blob/master/LICENSE) file for details.
