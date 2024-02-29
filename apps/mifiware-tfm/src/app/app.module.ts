import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';
import { NgrxStoreIdbModule } from 'ngrx-store-idb';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './modules/layout/views/app.layout.module';

import { NotfoundComponent } from './shared/notfound/notfound.component';
import { TranslocoRootModule } from './transloco-root.module';

export const metaReducers: MetaReducer<any>[] = isDevMode()
  ? [storeFreeze]
  : [];

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
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
    TranslocoRootModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
