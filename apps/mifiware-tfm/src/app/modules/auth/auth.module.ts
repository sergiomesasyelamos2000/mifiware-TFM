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
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  declarations: [LogInComponent, SignUpComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    ButtonModule,
    MessagesModule,
    RouterModule.forChild([
      {
        path: 'log-in',
        component: LogInComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        canActivate: [!AuthGuard],
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: { breadcrumb: 'MENU.SIGNUP' },
        canActivate: [!AuthGuard],
      },
    ]),
  ],
  exports: [LogInComponent, SignUpComponent],
})
export class AuthModule {}
