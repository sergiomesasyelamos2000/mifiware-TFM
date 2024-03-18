import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocationSensorComponent } from './location-sensor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LocationSensorComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LocationSensorRoutingModule {}
