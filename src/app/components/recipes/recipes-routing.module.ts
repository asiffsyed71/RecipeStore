import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { AuthGaurdService } from '../../services/auth-gaurd.service';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeResolverService } from '../../services/recipe-resolver.service';

const recipeRoutes: Routes = [
    {
      path: '',
      component: RecipesComponent,
      canActivate: [AuthGaurdService],
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
  ];

@NgModule({
    imports: [RouterModule.forChild(recipeRoutes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{}