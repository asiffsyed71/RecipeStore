import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { response } from 'express';
import { Recipe } from '../components/recipes/recipe.model';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://angular-backend-51397-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
      });
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