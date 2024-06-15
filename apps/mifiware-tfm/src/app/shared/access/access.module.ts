import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

import { AccessRoutingModule } from './access-routing.module';
import { AccessComponent } from './access.component';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  imports: [CommonModule, AccessRoutingModule, ButtonModule, TranslocoModule],
  declarations: [AccessComponent],
})
export class AccessModule {}
