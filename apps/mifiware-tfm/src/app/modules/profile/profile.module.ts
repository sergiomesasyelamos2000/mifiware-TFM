import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './views/profile.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { ProfileService } from './profile.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ProfileComponent,
        data: { breadcrumb: 'MENU.LOGIN' },
        canActivate: [AuthGuard],
      },
    ]),
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
