import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BinarySensorComponent } from './binary-sensor.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: BinarySensorComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class BinarySensorRoutingModule {}
