import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { IsNotAuthenticatedAuthGuard } from 'apps/mifiware-tfm/src/app/core/guards/is-not-authenticated.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: SignUpComponent,
        canActivate: [IsNotAuthenticatedAuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
