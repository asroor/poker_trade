import { Component } from "@angular/core";
import { Location } from "@angular/common";
import { IProfile } from "../../interface";
import { ProfileService } from "../../shared";
import { ActivatedRoute, Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";
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

  token!: string | null;
  profile!: IProfile;

  constructor(
    private location: Location,
    private _profileService: ProfileService,
    private routes: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.token = this.routes.snapshot.paramMap.get("token");
    if (this.token) {
      localStorage.setItem("telegramToken", this.token);
      this.router.navigate(["/profile"]);
    }
    this.getData();
  }

  getData() {
    this._profileService.getProfile().subscribe((data) => {
      this.profile = data;
      this.profileForm.patchValue(data);
    });
  }

  profileForm = this.fb.group({
    email: [this.profile?.email, [Validators.required, Validators.email]],
    code: ["", Validators.required],
  });

  value!: string;
  codeInput: boolean = false;
  timer: number = 60;
  timerSubscription: any;

  sendCodeFn(event: Event) {
    const { email } = this.profileForm.getRawValue();
    this._profileService.sendCodeEmail(email).subscribe({
      next: (data) => {
        const button = event.target as HTMLButtonElement;
        this.startTimer(button);
        this.codeInput = true;
      },
    });
  }

  startTimer(btn: HTMLButtonElement) {
    this.timerSubscription = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
        btn.disabled = true;
        btn.textContent = `00:${
          this.timer < 10 ? "0" + this.timer : this.timer
        }`;
      } else {
        this.codeInput = false;
        clearInterval(this.timerSubscription);
        btn.textContent = "Отправить код";
        btn.disabled = false;
      }
    }, 1000);
  }

  emailVerifyFN() {
    const { code } = this.profileForm.getRawValue();
    this._profileService.emailVerify(code.toString()).subscribe({
      next: () => {
        this.getData();
        this.codeInput = false;
      },
    });
  }
}
