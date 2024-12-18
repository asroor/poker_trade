import { Component } from "@angular/core";
import { DatePipe, Location } from "@angular/common";
import { IProfile } from "../../interface";
import { ProfileService } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
@Component({
	selector: "app-profile",
	templateUrl: "./profile.component.html",
	styleUrl: "./profile.component.scss",
})
export class ProfileComponent {
	infoOrder: boolean = false;

	infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}

	token: string | null;
	profile!: IProfile;

	profileForm = this.fb.group({
		email: [
			{ value: this.profile?.email, disabled: this.profile?.verified },
			[Validators.required, Validators.email],
		],
		code: ["", [Validators.required, Validators.maxLength(6), Validators.minLength(6)]],
	});


	value!: string;
	codeInput: boolean = false;

	timer: number = 0;
	timerDuration: number = 0;
	timerInterval: any;
	formattedTime: string = '00:00'

	constructor(
		private _profileService: ProfileService,
		private routes: ActivatedRoute,
		private router: Router,
		private fb: NonNullableFormBuilder,
		private datePipe: DatePipe,
		private msg: MessageService
	) {
		this.token = this.routes.snapshot.paramMap.get("token");
	}

	ngOnInit(): void {
		if (this.token) {
			localStorage.setItem("telegramToken", this.token);
			this.router.navigate(["/profile"]);
		}
		this.getData();
	}

	ngOnDestroy(): void {
		if (this.timerInterval) {
			clearInterval(this.timerInterval)
		}
	}

	getData() {
		this._profileService.getProfile().subscribe((data) => {
			this.profile = data;
			this.profileForm.patchValue(data);

			if (this.profile.retryAfterSec > 0) {
				const button = document.querySelector('#senCodeBtn') as HTMLButtonElement;
				this.startTimer(button, this.profile.retryAfterSec)
			}

			if (data.verified) {
				this.profileForm.get('email')?.disable()
			}
		});
	}

	sendCodeFn(event: Event) {
		const { email } = this.profileForm.getRawValue();
		if (this.profileForm.get('email')?.valid) {
			if (this.timer <= 0 && !this.profile.verified) {
				this._profileService.sendCodeEmail(email).subscribe({
					next: (data) => {
						const button = event.target as HTMLButtonElement;
						this.startTimer(button, 60);
						setInterval(() => {
							this.codeInput = true;
						}, 2000);
					},
					error: (err) => {
						// Xato holati 409 bo'lsa, alert chiqariladi
						if (err.status === 409) {
							alert('Bu emailga allaqachon kod yuborilgan. Iltimos, biroz kuting.');
						} else {
							alert('Xatolik yuz berdi. Qayta urinib ko‘ring.');
						}
					}
				});
			}
		}
	}

	btnDisabled = this.profile?.verified ?? false
	btnTextContent = 'Отправить код'

	startTimer(btn: HTMLButtonElement, time: number) {
		this.timer = 0;
		this.timerDuration = (time ?? 60) * 1000;
		this.timer = this.timerDuration;

		this.timerInterval = setInterval(() => {
			if (this.timer > 0) {
				this.timer -= 1000;
				this.formattedTime = this.datePipe.transform(this.timer, 'mm:ss') || '00:00'

				this.profileForm.get('email')?.disable()
				this.btnDisabled = true;
				this.btnTextContent = this.formattedTime;
				this.codeInput = true;
			} else {
				clearInterval(this.timerInterval);

				this.codeInput = false;
				this.btnTextContent = "Отправить код";
				this.profileForm.get('email')?.enable()
				this.btnDisabled = false;
			}
		}, 1000);
	}

	emailVerifyFN() {
		if (this.profileForm.get('code')?.valid) {
			const { code } = this.profileForm.getRawValue();
			this._profileService.emailVerify(code.toString()).subscribe({
				next: () => {
					this.getData();
					this.codeInput = false;
				},
				error: (err) => {
					this.msg.add({
						severity: "error",
						summary: `Статус ошибки: ${err.status}`,
						detail: JSON.stringify(err.error.message['errors']),
					});
				}
			});
		}
	}
}
