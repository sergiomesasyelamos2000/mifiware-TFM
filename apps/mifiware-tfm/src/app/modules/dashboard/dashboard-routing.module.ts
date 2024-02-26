import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard.component';
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
