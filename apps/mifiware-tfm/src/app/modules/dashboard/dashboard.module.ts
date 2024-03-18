import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { CoreModule } from '../../core/core.module';
import { BinarySensorComponent } from './views/binary-sensor/binary-sensor.component';
import { LocationSensorComponent } from './views/location-sensor/location-sensor.component';
@NgModule({
  declarations: [],
  imports: [CommonModule, CoreModule, DashboardsRoutingModule],
})
export class DashboardModule {}
