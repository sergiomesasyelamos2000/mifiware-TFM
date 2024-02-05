import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home.component';
import { AuthModule } from '../auth/auth.module';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { CommonModule } from '@angular/common';

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
        component: HomeComponent,
        data: {},
        canActivate: [],
      },
    ]),
  ],
  exports: [HomeComponent],
  declarations: [HomeComponent],
})
export class HomeModule {}
