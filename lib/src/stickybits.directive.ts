import { isPlatformBrowser } from '@angular/common';
import { AfterContentInit, Directive, ElementRef, Inject, Input, OnChanges, OnDestroy, PLATFORM_ID, SimpleChanges } from '@angular/core';
import stickybits from 'stickybits';

@Directive({
  selector: '[stickybits]',
})
export class StickybitsDirective implements AfterContentInit, OnChanges, OnDestroy {

  private instance: any = null;

  // options
  private stuckClass = 'is-stuck';
  private stickyClass = 'is-sticky';
  private changeClass = 'is-sticky-change';
  private parentClass = 'is-sticky-parent';

  // Add/remove classes from element according to it's sticky state
  // this is expensive for the browser - better if can be avoided and remain 'false'
  @Input() useStickyClasses = false;
  // desired offset from the top of the viewport to which the element will stick
  @Input() stickyOffset = 0;
  // Stick the element to the bottom instead of top
  @Input() stickToBottom = false;

  constructor(
    private element: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  ngAfterContentInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.stickybits;
    if (isPlatformBrowser(this.platformId) && change && !change.isFirstChange) {
      if (change.currentValue) {
        this.init();
      } else {
        this.destroy();
      }
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  private init() {
    this.destroy();
    const element = this.element.nativeElement as HTMLElement;
    if (element) {
      this.instance = stickybits(element, {
        useStickyClasses: this.useStickyClasses,
        stickyBitStickyOffset: this.stickyOffset,
        verticalPosition: this.getVerticalPosition(),
        stuckClass: this.stuckClass,
        stickyClass: this.stickyClass,
        stickyChangeClass: this.changeClass,
        parentClass: this.parentClass,
      });
    }
  }

  private destroy() {
    if (this.instance) {
      this.instance.cleanup();
      this.instance = null;
    }
  }

  private getVerticalPosition() {
    return this.stickToBottom
      ? 'bottom'
      : 'top';
  }
}
