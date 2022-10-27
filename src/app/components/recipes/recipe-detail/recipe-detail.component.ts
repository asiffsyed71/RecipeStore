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
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.recipeSubscription = this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeTobeDisplayed = this.recipeService.getRecipe(this.id);
      }
    );
  }
  onAddIngredients() {
    this.recipeService.onAddIngredientsToShoppingList(
      this.recipeTobeDisplayed.ingredients
    );
    this.router.navigate(['../../shopping-list'], {
      relativeTo: this.activatedRoute,
    });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.activatedRoute });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
