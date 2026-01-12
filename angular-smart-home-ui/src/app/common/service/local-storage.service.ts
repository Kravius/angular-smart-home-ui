import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorage {
  getTokenLocalStorage() {
    return localStorage.getItem('token');
  }

  setTokenLocalStorage(item: string) {
    localStorage.setItem('token', item);
  }

  deleteTokenLocalStorage() {
    localStorage.removeItem('token');
  }
}
