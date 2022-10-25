import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'testRecipe1',
      'Test Description1',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      [
        new Ingredient('tomato', 10),
        new Ingredient('onions', 11),
        new Ingredient('Zuccini', 12),
        new Ingredient('olives', 13),
        new Ingredient('brocolli', 20),
      ]
    ),
    new Recipe(
      'testRecipe2',
      'Test Description2',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      [
        new Ingredient('tomato', 10),
        new Ingredient('onions', 11),
        new Ingredient('Zuccini', 12),
        new Ingredient('olives', 13),
        new Ingredient('brocolli', 20),
      ]
    ),
    new Recipe(
      'testRecipe3',
      'Test Description3',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      [
        new Ingredient('tomato', 10),
        new Ingredient('onions', 11),
        new Ingredient('Zuccini', 12),
        new Ingredient('olives', 13),
        new Ingredient('brocolli', 20),
      ]
    ),
    new Recipe(
      'testRecipe4',
      'Test Description4',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      [
        new Ingredient('tomato', 10),
        new Ingredient('onions', 11),
        new Ingredient('Zuccini', 12),
        new Ingredient('olives', 13),
        new Ingredient('brocolli', 20),
      ]
    ),
    new Recipe(
      'testRecipe5',
      'Test Description5',
      'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
      [
        new Ingredient('tomato', 10),
        new Ingredient('onions', 11),
        new Ingredient('Zuccini', 12),
        new Ingredient('olives', 13),
        new Ingredient('brocolli', 20),
      ]
    ),
  ];

  selectedRecipe = new Subject<Recipe>();

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsToShoppingList(ingredients);
  }
}
