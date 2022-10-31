import { NgModule } from '@angular/core';
import { DropdownDirective } from '../utils/dropdown.directive';
import { HoverDirective } from '../utils/hover.directive';
import { CommonModule } from '@angular/common';
import { PlaceholderDirective } from '../utils/placeholder.directive';

@NgModule({
  declarations: [DropdownDirective, HoverDirective, PlaceholderDirective],
  imports: [CommonModule],
  exports: [
    DropdownDirective,
    HoverDirective,
    CommonModule,
    PlaceholderDirective,
  ],
})
export class SharedModule {}
