import { Component } from '@angular/core';
import { Recipe } from './components/recipes/recipe.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Recipes';
  recipeDetailData!: Recipe;
  private _displayComponent = "recipes";

  set displayComponent(componentName: string){
    this._displayComponent = componentName;
  }

  get displayComponent() {
    return this._displayComponent;
  }
  selectedRecipe(recipe: Recipe){
    this.recipeDetailData = recipe;

  }
}
