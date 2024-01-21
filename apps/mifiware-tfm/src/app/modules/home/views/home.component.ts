/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'mifiware-tfm-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  onLogin() {
    console.log('Login');
    this.router.navigate(['auth','log-in']);
  }
}
