# ngx-stickybits
Angular sticky directive using [Stickybits](https://github.com/dollarshaveclub/stickybits), a lightweight alternative to `position: sticky` polyfills.

> :alarm-clock: The project is still a Work-In-Progress and may be subject to major changes.

### Table of contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Browser Compatibility](#browser-compatibility)
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
+   StickybitsModule.forRoot(),
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }
```

## Usage

`ngx-stickybits` provides the `stickybits` directive to apply on element you want to be sticky.

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
| @Input() useStickyClasses | boolean  | `false` | Add/remove classes from element according to it's sticky state (see details below)<br/> _This is expensive for the browser - better if can be avoided and remain 'false'_ |
| @Input() stickyOffset | number | `0` | Desired offset from the top of the viewport to which the element will stick |
| @Input() stickToBottom | boolean | `false` | Stick the element to the bottom instead of top |

When `usesStickyClasses` is set to `true`, the following classes will be added on elements:

- `is-sticky` if the selected element is sticky
- `is-stuck` if the selected element is stopped at the bottom of its parent
- `stickybit-parent` so that styles can easily be added to the parent of a sticky element

- applied when element is stuck = 'is-stuck';
- applied when element is sticky = 'is-sticky';
- applied when chaning sticky state - 'is-sticky-change';
- class applied on parent element - 'is-sticky-parent';

## Browser Compatibility

`Stickybits` works in all modern browsers including Internet Explorer 9 and above. Please file and issue with browser compatibility quirks [here](https://github.com/dollarshaveclub/stickybits/issues).

## Demo Application

Demo application is not available yet but is soon to come.

## Road map

Here is the list of tasks that will be done on this library in a near future ...

- Add CircleCI integration
- Publish demo on github pages
- Add more Stickybits options
- Improve documentation

## Contribution

Contributions are always welcome, just make sure that ...

- Your code style matches with the rest of the project
- Unit tests pass
- Linter passes

## License

I do not own rights for `Stickybits` and all the credits belong to them - see [DollarShaveClub/Stickybits](https://github.com/dollarshaveclub/stickybits) details.

This package is licensed under [MIT](https://opensource.org/licenses/MIT) license - see [LICENSE](https://github.com/jfcere/ngx-stickybits/blob/master/LICENSE) file for details.
