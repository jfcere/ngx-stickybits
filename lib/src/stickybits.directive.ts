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
  private classListObserver: MutationObserver;
  private instance: StickyBits;
  private isSticky = false;
  private isStuck = false;

  @Input() noStyles: boolean;
  @Input() scrollEl: Element | string;
  @Input() parentClass = 'sticky-parent';
  @Input() stickyChangeClass = 'sticky--change';
  @Input() stickyChangeNumber: number;
  @Input() stickyClass = 'sticky';
  @Input() stickyOffset: number;
  @Input() stuckClass = 'stucky';
  @Input() useFixed: boolean;
  @Input() useGetBoundingClientRect: boolean;
  @Input() useStickyClasses = true;
  @Input() verticalPosition: 'top' | 'bottom';
  @Output() sticky = new EventEmitter<boolean>();
  @Output() stuck = new EventEmitter<boolean>();

  constructor(
    private elementRef: ElementRef,
    @Inject(PLATFORM_ID) private platformId: string,
  ) { }

  ngAfterContentInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId) && this.instance) {
      this.destroy();
      this.init();
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  private init() {
    const element = this.elementRef.nativeElement as HTMLElement;
    if (element) {
      // setup stickybits
      this.instance = stickybits(element, {
        customStickyChangeNumber: this.stickyChangeNumber,
        noStyles: this.noStyles,
        stickyBitStickyOffset: this.stickyOffset,
        scrollEl: this.scrollEl,
        parentClass: this.parentClass,
        stickyClass: this.stickyClass,
        stuckClass: this.stuckClass,
        stickyChangeClass: this.stickyChangeClass,
        useStickyClasses: this.useStickyClasses,
        useFixed: this.useFixed,
        useGetBoundingClientRect: this.useGetBoundingClientRect,
        verticalPosition: this.verticalPosition,
      });
      // observe for CSS class changes to emit output events
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
