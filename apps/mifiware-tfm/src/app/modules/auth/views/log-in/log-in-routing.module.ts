import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogInComponent } from './log-in.component';
import { IsNotAuthenticatedAuthGuard } from 'apps/mifiware-tfm/src/app/core/guards/is-not-authenticated.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LogInComponent,
        canActivate: [IsNotAuthenticatedAuthGuard],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class LogInRoutingModule {}
