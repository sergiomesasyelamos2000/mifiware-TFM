import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { CoreModule } from '../../core/core.module';

@NgModule({
  imports: [CommonModule, CoreModule, AuthRoutingModule],
})
export class AuthModule {}
