import { NgModule } from '@angular/core';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListRouting } from './shopping-list.routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [ShoppingListRouting, CommonModule, FormsModule],
})
export class ShoppingListModule {}
