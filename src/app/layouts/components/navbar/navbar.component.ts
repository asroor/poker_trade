import { Component, OnInit } from '@angular/core';
import { AuthModalService } from '../../../auth/auth.modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IProfile, ProfileService } from '../../../shared';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
	localStorageKey = 'telegramToken';
	profile!:IProfile

	constructor(
		private modalService: AuthModalService, 
		private _profileService: ProfileService, 
		private router: Router
	) { }

	ngOnInit(): void {
		this._profileService.getProfile().subscribe(data => {
			this.profile = data
		})
	}

	openModal() {
		if (this.isUserLoginned()) {
			this.router.navigate(['/profile'])
		} else {
			this.modalService.openModal();
		}
	}

	logout() {
		localStorage.removeItem(this.localStorageKey)
		this.router.navigate([''])
	}

	isUserLoginned() {
		return localStorage.getItem(this.localStorageKey) != null
	}

	navigateByAuth() {
		this.isUserLoginned() ? this.router.navigate(['account/withdrawal/form']) : this.openModal();
	}
}
