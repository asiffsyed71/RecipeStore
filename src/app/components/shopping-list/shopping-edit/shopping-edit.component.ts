import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from '../ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('slForm') shoppinglistForm!: NgForm;

  editSubscription!: Subscription;
  editIngredient!: Ingredient;
  editMode = false;
  editItemIndex!: number;
  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.editSubscription =
      this.shoppingListService.editIngredientIndex.subscribe((id: number) => {
        this.editMode = true;
        this.editItemIndex = id;
        this.editIngredient = this.shoppingListService.getShoppingItem(
          this.editItemIndex
        );
        this.shoppinglistForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount,
        });
      });
  }

  onClear() {
    this.shoppinglistForm.reset();
    this.editMode = false;
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, +value.amount);
    if (this.editMode) {
      this.shoppingListService.editShoppingItem(this.editItemIndex, ingredient);
    } else {
      this.shoppingListService.addShoppingItem(ingredient);
    }
    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteShoppingListItem(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }
}
