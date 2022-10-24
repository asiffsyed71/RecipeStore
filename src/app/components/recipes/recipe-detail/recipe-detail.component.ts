import { Component, Input, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipeTobeDisplayed!: Recipe;
  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
  onAddIngredients(){
    this.recipeService.onAddIngredientsToShoppingList(this.recipeTobeDisplayed.ingredients)
  }
}
