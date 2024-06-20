import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home.component';
import { TranslocoModule } from '@ngneat/transloco';
import { ButtonModule } from 'primeng/button';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TranslocoModule, ButtonModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
