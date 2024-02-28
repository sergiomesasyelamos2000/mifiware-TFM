import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './views/dashboard.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../../core/core.module';
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, CoreModule, DashboardsRoutingModule],
})
export class DashboardModule {}
