import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        canActivate: [AuthGuard],
      },
    ]),
  ],
})
export class DashboardModule {}
