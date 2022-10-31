import { ComponentFactoryResolver, Injectable, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { map, tap } from 'rxjs';
import { AuthService } from './auth-service.service';
import { AlertErrorsService } from './alert-errors.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService,
    private alertErrorsService: AlertErrorsService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length > 0) {
      this.http
        .put(
          'https://angular-backend-51397-default-rtdb.firebaseio.com/recipes.json',
          recipes
        )
        .subscribe((response) => {
          // console.log(response);
        });
    } else {
      this.alertErrorsService.errorSubscription.next(
        'No Recipes Available!! Please Add Recipes'
      );
    }
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        'https://angular-backend-51397-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((response) => {
          return response.map((responseItem) => {
            return {
              ...responseItem,
              ingredients: responseItem['ingredients']
                ? responseItem['ingredients']
                : [],
            };
          });
        }),
        tap((response) => {
          this.recipeService.addRecipes(response);
        })
      );
  }
}
