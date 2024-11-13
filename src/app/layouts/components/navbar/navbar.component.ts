import { Component } from '@angular/core';
import { AuthModalService } from '../../../auth/auth.modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
	localStorageKey = 'telegramToken';

	constructor(private modalService: AuthModalService, private router: Router) { }

	openModal() {
		this.modalService.openModal();
	}

	logout() {
		localStorage.removeItem(this.localStorageKey)
		this.router.navigate([''])
	}

	isUserLoginned() {
		return localStorage.getItem(this.localStorageKey) != null
	}

	navigateByAuth() {
		this.isUserLoginned() ? this.router.navigate(['withdrawal']) : this.openModal();
	}
}
