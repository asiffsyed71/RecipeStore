import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // ingredientsEmitter = new EventEmitter<Ingredient[]>();
  updatedIngredients = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 100),
    new Ingredient('Apricots', 200),
  ];
  constructor() {}
  addShoppingItem(item: Ingredient) {
    this.ingredients.push(item);
    this.updatedIngredients.next(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updatedIngredients.next(this.ingredients);
  }
}
