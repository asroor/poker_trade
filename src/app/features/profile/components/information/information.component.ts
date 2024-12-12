import { Component, OnInit } from "@angular/core";
import { ProfileService } from "../../../../shared";
import { IProfile } from "../../../../interface";
import { ActivatedRoute, Router } from "@angular/router";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-information",
  templateUrl: "./information.component.html",
  styleUrl: "./information.component.scss",
})
export class InformationComponent implements OnInit {
  token!: string | null;
  profile!: IProfile;

  constructor(
    private _profileService: ProfileService,
    private routes: ActivatedRoute,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  ngOnInit(): void {
    this.token = this.routes.snapshot.paramMap.get("token");
    if (this.token) {
      localStorage.setItem("telegramToken", this.token);
      this.router.navigate(["/profile/information"]);
    }
    this.getData();
  }

  getData() {
    this._profileService.getProfile().subscribe((data) => {
      this.profile = data;
      this.profileForm.patchValue(data);
    });
  }

  senCode: boolean = false;
  profileForm = this.fb.group({
    email: [
      {
        value: this.profile?.email,
        disabled: !this.profile?.verified,
      },
      [Validators.required, Validators.email],
    ],
    code: ["", Validators.required],
  });

  value!: string;
  codeInput: boolean = false;
  timer: number = 3;
  timerSubscription: any;

  sendCodeFn(event: Event) {
    const { email } = this.profileForm.getRawValue();
    this._profileService.sendCodeEmail(email).subscribe({
      next: (data) => {},
    });
  }
  emailVerifyFN() {
    const { code } = this.profileForm.getRawValue();
    this._profileService.emailVerify(code.toString()).subscribe({
      next: () => {
        this.getData();
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
        }`; // formatlash
      } else {
        btn.disabled = false;
        clearInterval(this.timerSubscription);
        btn.textContent = "Отправить код";
        this.timer = 60;
      }
    }, 1000);
  }
}
