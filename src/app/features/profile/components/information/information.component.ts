import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../../shared';
import { IProfile } from '../../../../interface';
import { ActivatedRoute, Router } from '@angular/router';
import { NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-information',
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent implements OnInit {
	token!: string | null
	profile!: IProfile

	constructor(
		private _profileService: ProfileService,
		private routes: ActivatedRoute,
		private router: Router,
		private fb: NonNullableFormBuilder
	) { }

	ngOnInit(): void {
		this.token = this.routes.snapshot.paramMap.get('token');
		if (this.token) {
			localStorage.setItem('telegramToken', this.token);
			this.router.navigate(['/profile/information'])
		}

		this._profileService.getProfile().subscribe(data => {
			this.profile = data
		})
	}
	profileForm = this.fb.group({
		email: [this.profile?.email, [Validators.required, Validators.email]]
	})


	codeInput: boolean = false
	/**
	 * 
	 */
	sendCodeFn() {
		const { email } = this.profileForm.getRawValue()
		this._profileService.sendCodeEmail(email).subscribe({
			next: (data) => {
				console.log(this.profileForm.getRawValue());
			}
		})
	}
}
