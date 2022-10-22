import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  constructor(private elRef: ElementRef) {}
  @HostListener('document:click', ['$event']) toggleDropdown(event: Event) {
    console.log(event.target,this.elRef.nativeElement)
    this.isOpen = this.elRef.nativeElement.contains(event.target)
      ? !this.isOpen
      : false;
  }
}
