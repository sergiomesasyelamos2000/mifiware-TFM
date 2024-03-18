import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { TranslocoModule } from '@ngneat/transloco';
import { BinarySensorComponent } from '../binary-sensor/binary-sensor.component';
import { LocationSensorRoutingModule } from './location-sensor-routing.module';
import { LocationSensorComponent } from './location-sensor.component';

@NgModule({
  imports: [
    CommonModule,
    LocationSensorRoutingModule,
    ButtonModule,
    CheckboxModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    OverlayPanelModule,
    ListboxModule,
    TranslocoModule,
    ReactiveFormsModule,
  ],
  declarations: [LocationSensorComponent],
})
export class LocationSensorModule {}
