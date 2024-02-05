import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home.component';
import { AuthModule } from '../auth/auth.module';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CommonModule } from '@angular/common';
import { IsNotAuthenticatedAuthGuard } from '../../core/guards/is-not-authenticated.guard';

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    ButtonModule,
    RouterModule.forChild([
      /* {
        path: 'home',
        component: HomeComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        //canActivate: [IsNotAuthenticatedGuard],
        canActivate: [],
      }, */
      {
        path: '',
        data: { breadcrumb: 'MENU.LOGIN' },
        component: HomeComponent,
        canActivate: [IsNotAuthenticatedAuthGuard],
      },
    ]),
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}
