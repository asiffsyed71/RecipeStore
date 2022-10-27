import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  // ingredientsEmitter = new EventEmitter<Ingredient[]>();
  updatedIngredients = new Subject<Ingredient[]>();
  editIngredientIndex =  new Subject<number>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 100),
    new Ingredient('Apricots', 200),
  ];
  constructor() {}
  addShoppingItem(item: Ingredient) {
    this.ingredients.push(item);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  getShoppingItem(id: number) {
    return this.ingredients[id];
  }
  editShoppingItem(id: number, updatedIngredient: Ingredient) {
    this.ingredients[id] = updatedIngredient;
    this.updatedIngredients.next(this.ingredients.slice());
  }
  getIngredients() {
    return this.ingredients.slice();
  }
  deleteShoppingListItem(id: number){
    this.ingredients.splice(id,1);
    this.updatedIngredients.next(this.ingredients.slice());
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.updatedIngredients.next(this.ingredients);
  }
}
