import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthModalService {
  localStorageKey = 'telegramToken';
  private modalOpen = new BehaviorSubject<boolean>(false);

  isModalOpen$ = this.modalOpen.asObservable();

  openModal() {
    this.modalOpen.next(true);  
  }

  closeModal() {
    this.modalOpen.next(false);  
  }

  getToken() {
		return localStorage.getItem(this.localStorageKey)
	}

  isUserLoginned() {
		return localStorage.getItem(this.localStorageKey) != null
	}

}
