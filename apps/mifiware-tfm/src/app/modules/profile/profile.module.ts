import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './views/profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfileService } from './profile.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { ProfileRoutingModule } from './profile-routing.module';
import { CoreModule } from '../../core/core.module';
import {
  DynamicDialogModule,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { PasswordModule } from 'primeng/password';
import { AvatarModule } from 'primeng/avatar';
import { TranslocoModule } from '@ngneat/transloco';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    CardModule,
    TableModule,
    InputTextModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    DropdownModule,
    ProfileRoutingModule,
    DynamicDialogModule,
    PasswordModule,
    AvatarModule,
    TranslocoModule,
  ],
  providers: [ProfileService, DynamicDialogRef, DynamicDialogConfig],
  exports: [ProfileComponent],
})
export class ProfileModule {}
