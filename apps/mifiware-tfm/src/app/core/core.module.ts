import { NgModule } from '@angular/core';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import * as fromState from './store';
import { ConfirmationService, MessageService, Message } from 'primeng/api';
import { StoreModule } from '@ngrx/store';
import { NotificationService } from './services/notification.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@NgModule({
  declarations: [],
  imports: [
    MessagesModule,
    MessageModule,
    StoreModule.forFeature('core', fromState.reducers),
  ],
  providers: [
    MessageService,
    ConfirmationService,
    NotificationService,
    DialogService,
  ],
  exports: [],
})
export class CoreModule {}
