import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  NgZone,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
 } from '@angular/core';
import stickybits, { StickyBits } from 'stickybits';

@Directive({
  selector: '[stickybits]',
})
export class StickybitsDirective implements AfterContentInit, OnChanges, OnDestroy {
  private cssClassObserver: MutationObserver;
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
    private changeDetectorRef: ChangeDetectorRef,
    private elementRef: ElementRef,
    private zone: NgZone,
  ) { }

  ngAfterContentInit() {
    this.init();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.instance) {
      this.destroy();
      this.init();
    }
  }

  ngOnDestroy() {
    this.destroy();
  }

  private init() {
    const element = this.elementRef.nativeElement as HTMLElement;
    this.zone.runOutsideAngular(() => {
      this.instance = this.initStickybits(element);
      this.cssClassObserver = this.initClassObserver(element);
    });
  }

  private initStickybits(element: HTMLElement): StickyBits {
    return stickybits(element, {
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
  }

  private initClassObserver(element: HTMLElement): MutationObserver {
    const observer = new MutationObserver(mutations => {
      mutations
        .filter(mutation => mutation.oldValue !== element.classList.value)
        .forEach(() => {
          let shouldDetectChanges = false;
          const hasStickyClass = element.classList.contains(this.stickyClass);
          if (hasStickyClass !== this.isSticky) {
            this.isSticky = hasStickyClass;
            this.sticky.emit(this.isSticky);
            shouldDetectChanges = true;
          }
          const hasStuckClass = element.classList.contains(this.stuckClass);
          if (hasStuckClass !== this.isStuck) {
            this.isStuck = hasStuckClass;
            this.stuck.emit(this.isStuck);
            shouldDetectChanges = true;
          }
          if (shouldDetectChanges) {
            this.changeDetectorRef.detectChanges();
          }
        });
    });
    observer.observe(element, {
      attributes: true,
      attributeOldValue: true,
      attributeFilter: ['class'],
    });
    return observer;
  }

  private destroy() {
    this.instance.cleanup();
    this.instance = null;
    this.cssClassObserver.disconnect();
    this.cssClassObserver = null;
  }
}
