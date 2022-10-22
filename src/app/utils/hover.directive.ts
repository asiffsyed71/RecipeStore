import {
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appHover]',
})
export class HoverDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @HostListener('mouseenter') hoverStart(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'pointer');
  }
  @HostListener('mouseleave') hoverEnd(event: Event) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'cursor', 'auto');
  }
}
