import { NgModule } from '@angular/core';
import { HomeComponent } from './views/home.component';
import { AuthModule } from '../auth/auth.module';
@NgModule({
    imports: [AuthModule],
    exports: [HomeComponent],
    declarations: [HomeComponent],
  })
export class HomeModule {}