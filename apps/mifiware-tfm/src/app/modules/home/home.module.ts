import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './views/home.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, HomeRoutingModule, TranslocoModule],
  declarations: [HomeComponent],
})
export class HomeModule {}
