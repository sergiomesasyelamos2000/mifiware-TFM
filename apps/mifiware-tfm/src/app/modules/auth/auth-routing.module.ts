import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'login',
        loadChildren: () =>
          import('./views/log-in/log-in.module').then((m) => m.LogInModule),
      },
      {
        path: 'signup',
        loadChildren: () =>
          import('./views/sign-up/sign-up.module').then((m) => m.SignUpModule),
      },
      { path: '**', redirectTo: '/notfound' },
    ]),
  ],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
