import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        //canActivate: [IsNotAuthenticatedGuard],
      },
    ]),
  ],
})
export class DashboardModule {}
