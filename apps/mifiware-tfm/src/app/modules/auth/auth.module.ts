import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      {
        path: 'log-in',
        component: LogInComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        //canActivate: [IsNotAuthenticatedGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { breadcrumb: 'MENU.SIGNUP' },
        //canActivate: [IsNotAuthenticatedGuard],
      },
    ]),
  ],
  exports: [LogInComponent, SignUpComponent],
})
export class AuthModule {}
