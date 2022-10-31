import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../components/recipes/recipe.model';
import { Ingredient } from '../components/shopping-list/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeEmitter = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'testRecipe1',
  //     'Test Description1',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     [
  //       new Ingredient('tomato', 10),
  //       new Ingredient('onions', 11),
  //       new Ingredient('Zuccini', 12),
  //       new Ingredient('olives', 13),
  //       new Ingredient('brocolli', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'testRecipe2',
  //     'Test Description2',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     [
  //       new Ingredient('tomato', 10),
  //       new Ingredient('onions', 11),
  //       new Ingredient('Zuccini', 12),
  //       new Ingredient('olives', 13),
  //       new Ingredient('brocolli', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'testRecipe3',
  //     'Test Description3',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     [
  //       new Ingredient('tomato', 10),
  //       new Ingredient('onions', 11),
  //       new Ingredient('Zuccini', 12),
  //       new Ingredient('olives', 13),
  //       new Ingredient('brocolli', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'testRecipe4',
  //     'Test Description4',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     [
  //       new Ingredient('tomato', 10),
  //       new Ingredient('onions', 11),
  //       new Ingredient('Zuccini', 12),
  //       new Ingredient('olives', 13),
  //       new Ingredient('brocolli', 20),
  //     ]
  //   ),
  //   new Recipe(
  //     'testRecipe5',
  //     'Test Description5',
  //     'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=768,574',
  //     [
  //       new Ingredient('tomato', 10),
  //       new Ingredient('onions', 11),
  //       new Ingredient('Zuccini', 12),
  //       new Ingredient('olives', 13),
  //       new Ingredient('brocolli', 20),
  //     ]
  //   ),
  // ];

  selectedRecipe = new Subject<Recipe>();

  constructor(private slService: ShoppingListService) {}
  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeEmitter.next(this.recipes.slice());
  }

  updateRecipe(updatedRecipe: Recipe, index: number) {
    this.recipes[index] = updatedRecipe;
    this.recipeEmitter.next(this.recipes.slice());
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }
  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredientsToShoppingList(ingredients);
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipeEmitter.next(this.recipes);
  }

  addRecipes(recipes: Recipe[]) {
    this.recipes.push(...recipes.slice());

    this.recipeEmitter.next(this.recipes);
  }
}
