import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './modules/home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from './modules/auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { NgrxStoreIdbModule } from 'ngrx-store-idb';
import { AppLayoutModule } from './modules/layout/views/app.layout.module';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';

import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { SliderModule } from 'primeng/slider';
import { RatingModule } from 'primeng/rating';
import { ProfileModule } from './modules/profile/profile.module';

export const metaReducers: MetaReducer<any>[] = isDevMode()
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthModule,
    HomeModule,
    CoreModule,
    ProfileModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({}, { metaReducers }),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      name: 'Mifiware TFM',
      maxAge: 25,
      logOnly: isDevMode(),
    }),
    NgrxStoreIdbModule.forRoot({
      keys: [
        {
          core: ['auth', 'user'],
        },
      ],
      concurrency: {
        allowed: true,
        failInitialisationIfNoLock: false,
        refreshRate: 2000,
      },
      saveOnChange: true,
      rehydrate: true,
      debugInfo: false,
    }),
    AppLayoutModule,
    TableModule,
    CommonModule,
    RatingModule,
    ButtonModule,
    SliderModule,
    InputTextModule,
    ToggleButtonModule,
    RippleModule,
    MultiSelectModule,
    DropdownModule,
    ProgressBarModule,
    ToastModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
