import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AppLayoutComponent } from './modules/layout/views/app.layout.component';
import { NotfoundComponent } from './shared/notfound/notfound.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./modules/users/users.module').then((m) => m.UsersModule),
      },
    ],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'error',
    loadChildren: () =>
      import('./shared/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'access',
    loadChildren: () =>
      import('./shared/access/access.module').then((m) => m.AccessModule),
  },
  { path: 'notfound', component: NotfoundComponent },
  { path: '**', redirectTo: '/notfound' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
