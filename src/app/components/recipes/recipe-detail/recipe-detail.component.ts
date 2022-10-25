import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from 'src/app/services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipeTobeDisplayed!: Recipe;
  recipeSubscription!: Subscription;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.recipeTobeDisplayed = this.recipeService.getRecipe(+params['id']);
      }
    );
  }
  onAddIngredients() {
    this.recipeService.onAddIngredientsToShoppingList(
      this.recipeTobeDisplayed.ingredients
    );
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute});
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
