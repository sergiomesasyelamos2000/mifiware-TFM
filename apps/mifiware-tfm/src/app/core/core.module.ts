import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NotificationService } from './services/notification.service';
import * as fromState from './store';

@NgModule({
  declarations: [],
  imports: [
    MessagesModule,
    MessageModule,
    StoreModule.forFeature('core', fromState.reducers),
  ],
  providers: [ConfirmationService, NotificationService, DialogService],
  exports: [],
})
export class CoreModule {}
