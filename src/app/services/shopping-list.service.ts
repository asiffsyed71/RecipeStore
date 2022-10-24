import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsEmitter = new EventEmitter<Ingredient[]>();

  constructor() {}
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 100),
    new Ingredient('Apricots', 200),
  ];

  addShoppingItem(item: Ingredient) {
    this.ingredients.push(item);
    this.ingredientsEmitter.emit(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsEmitter.emit(this.ingredients);
  }
}
