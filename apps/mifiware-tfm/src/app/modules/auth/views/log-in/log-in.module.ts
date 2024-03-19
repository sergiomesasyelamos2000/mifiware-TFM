import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { LogInRoutingModule } from './log-in-routing.module';
import { LogInComponent } from './log-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { ListboxModule } from 'primeng/listbox';
import { TranslocoModule } from '@ngneat/transloco';
import { ToastModule } from 'primeng/toast';

@NgModule({
  imports: [
    CommonModule,
    LogInRoutingModule,
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
  declarations: [LogInComponent],
})
export class LogInModule {}
