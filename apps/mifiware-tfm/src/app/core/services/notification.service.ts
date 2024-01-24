import { Injectable } from '@angular/core';
import {
  Confirmation,
  ConfirmationService,
  Message,
  MessageService,
} from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  showToast(message: Message) {
    this.messageService.add(message);
  }

  showConfirmationDialog(confirmation: Confirmation) {
    return this.confirmationService.confirm(confirmation);
  }
}
