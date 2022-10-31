import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./components/recipes/recipes.module').then(
        (module) => module.RecipesModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./components/shopping-list/shopping-list.module').then(
        (module) => module.ShoppingListModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        (module) => module.AuthModule
      ),
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
