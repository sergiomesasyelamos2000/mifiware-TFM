import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { LogInComponent } from './views/log-in/log-in.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessagesModule } from 'primeng/messages';
import { CheckboxModule } from 'primeng/checkbox';
import { AuthGuard } from '../../core/guards/auth.guard';
import { IsNotAuthenticatedAuthGuard } from '../../core/guards/is-not-authenticated.guard';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    CheckboxModule,
    RouterModule.forChild([
      {
        path: 'log-in',
        component: LogInComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        canActivate: [IsNotAuthenticatedAuthGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { breadcrumb: 'MENU.SIGNUP' },
        canActivate: [IsNotAuthenticatedAuthGuard],
      },
    ]),
  ],
  exports: [LogInComponent, SignUpComponent],
})
export class AuthModule {}
