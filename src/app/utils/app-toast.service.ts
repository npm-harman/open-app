import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppToastService {
  toasts: any[] = [];

  constructor() { }

  show(toast: any) {
    this.toasts.push(toast);
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t != toast);
  }

}
