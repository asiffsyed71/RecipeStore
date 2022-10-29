import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { Recipe } from '../components/recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from './auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

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
    return this.authService.user.pipe(
      take(1),
      exhaustMap((authenticatedUser) => {
        return this.http.get<Recipe[]>(
          'https://angular-backend-51397-default-rtdb.firebaseio.com/recipes.json',
          {
            params: authenticatedUser?.token
              ? new HttpParams().set('auth', authenticatedUser?.token)
              : undefined,
          }
        );
      }),
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
