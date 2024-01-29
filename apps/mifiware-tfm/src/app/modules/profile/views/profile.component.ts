import { Component, OnInit } from '@angular/core';
import { AppStoreService } from '../../../core/services/app-store.service';

@Component({
  selector: 'mifiware-tfm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private appStoreService: AppStoreService) {}

  ngOnInit(): void {
    this.appStoreService.loadMe$().subscribe((me) => {
      console.log(me);
    });
  }
}
