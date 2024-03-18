import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/guards/auth.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'binary-sensor',
        loadChildren: () =>
          import('./views/binary-sensor/binary-sensor.module').then(
            (m) => m.BinarySensorModule
          ),
        canActivate: [AuthGuard],
      },
      {
        path: 'location-sensor',
        loadChildren: () =>
          import('./views/location-sensor/location-sensor.module').then(
            (m) => m.LocationSensorModule
          ),
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: '/notfound' },
    ]),
  ],
  exports: [RouterModule],
})
export class DashboardsRoutingModule {}
