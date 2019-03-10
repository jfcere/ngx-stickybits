import { isPlatformBrowser } from '@angular/common';
import {
  AfterContentInit,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  PLATFORM_ID,
  SimpleChanges,
 } from '@angular/core';
import stickybits, { StickyBits } from 'stickybits';

@Directive({
  selector: '[stickybits]',
})
export class StickybitsDirective implements AfterContentInit, OnChanges, OnDestroy {
  // applied css classes
  private readonly stickyClass = 'sb-sticky';
  private readonly stuckClass = 'sb-stuck';
  private readonly changeClass = 'sb-sticky-change';
  private readonly parentClass = 'sb-sticky-parent';

  private classListObserver: MutationObserver;
  private instance: StickyBits = null;
  private isSticky = false;
  private isStuck = false;

  @Input() stickyOffset = 0;
  @Input() stickToBottom = false;
  @Input() useStickyClasses = false;
  @Output() sticky = new EventEmitter<boolean>();
  @Output() stuck = new EventEmitter<boolean>();

  private get verticalPosition() {
    return this.stickToBottom
      ? 'bottom'
      : 'top';
  }

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  ngAfterContentInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    // const change = changes.stickybits;
    // if (isPlatformBrowser(this.platformId) && change && !change.isFirstChange) {
    //   if (change.currentValue) {
    //     this.init();
    //   } else {
    //     this.destroy();
    //   }
    // }
  }

  ngOnDestroy() {
    this.destroy();
  }

  private init() {
    this.destroy();
    const element = this.elementRef.nativeElement as HTMLElement;
    if (element) {
      // setup stickybits
      this.instance = stickybits(element, {
        parentClass: this.parentClass,
        stickyBitStickyOffset: this.stickyOffset,
        stickyChangeClass: this.changeClass,
        stickyClass: this.stickyClass,
        stuckClass: this.stuckClass,
        useStickyClasses: true, // this.useStickyClasses,
        verticalPosition: this.verticalPosition,
      });
      // observe for class changes to emit output events
      this.classListObserver = new MutationObserver((mutations: MutationRecord[]) => {
        mutations
          .filter(mutation => mutation.oldValue !== element.classList.value)
          .forEach(() => {
            const hasStickyClass = element.classList.contains(this.stickyClass);
            if (hasStickyClass !== this.isSticky) {
              this.isSticky = hasStickyClass;
              this.sticky.emit(this.isSticky);
            }
            const hasStuckClass = element.classList.contains(this.stuckClass);
            if (hasStuckClass !== this.isStuck) {
              this.isStuck = hasStuckClass;
              this.stuck.emit(this.isStuck);
            }
          });
      });
      this.classListObserver.observe(this.elementRef.nativeElement, {
        attributes: true,
        attributeOldValue: true,
        attributeFilter: ['class'],
      });
    }
  }

  private destroy() {
    if (this.instance) {
      this.instance.cleanup();
      this.instance = null;
      this.classListObserver.disconnect();
    }
  }
}
