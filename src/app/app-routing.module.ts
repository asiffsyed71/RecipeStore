import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeEditComponent } from './components/recipes/recipe-edit/recipe-edit.component';
import { ErrorComponent } from './components/error/error.component';
import { RecipeResolverService } from './services/recipe-resolver.service';
import { AuthComponent } from './components/auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    children: [
      {
        path: '',
        component: RecipeStartComponent,
        data: { message: 'Please select a recipe to view the details' },
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        children: [{ path: '**', redirectTo: '/recipes/new' }],
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: [RecipeResolverService],
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: [RecipeResolverService],
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
