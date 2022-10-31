import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [AuthComponent, LoadingSpinnerComponent],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild([{ path: '', component: AuthComponent }]),
  ],

  exports: [RouterModule, LoadingSpinnerComponent],
})
export class AuthModule {}
