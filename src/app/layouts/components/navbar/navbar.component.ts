import { Component, OnInit } from "@angular/core";
import { AuthModalService } from "../../../auth/auth.modal.service";
import { Router } from "@angular/router";
import { ProfileService } from "../../../shared";
import { IProfile } from "../../../interface";
import { map, Observable } from "rxjs";
import { NonNullableFormBuilder, Validators } from "@angular/forms";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.scss",
})
export class NavbarComponent implements OnInit {
  balanceModal: boolean = false;
  acceptModal: boolean = false;
  succsessModal: boolean = false;
  localStorageKey = "telegramToken";
  profile!: Observable<IProfile>;
  /**
   *
   */
  amount!: string;
  roomNick!: string;

  constructor(
    private modalService: AuthModalService,
    private _profileService: ProfileService,
    private router: Router,
    private fb: NonNullableFormBuilder
  ) {}

  withdrawalForm = this.fb.group({
    amount: ["", [Validators.required, Validators.min(5), Validators.min(5000)]],
    pokerRoomNickname: ["", Validators.required],
  });

  ngOnInit(): void {
    this.profile = this._profileService.getProfile().pipe(
      map(data => {
        const itemControl = this.withdrawalForm.get('amount');
        if (itemControl) {
          itemControl.setValidators([
          Validators.required,
          Validators.min(5),
          Validators.max(data.balance),
          ]);
          itemControl.updateValueAndValidity();
        }
        return data
      })
    );
  }

  openModal() {
    if (this.isUserLoginned()) {
      this.router.navigate(["/profile"]);
    } else {
      this.modalService.openModal();
    }
  }

  logout() {
    localStorage.removeItem(this.localStorageKey);
    this.router.navigate([""]);
  }

  isUserLoginned() {
    return localStorage.getItem(this.localStorageKey) != null;
  }

  navigateByAuth() {
    this.isUserLoginned()
      ? this.router.navigate(["account/sell-request/form"])
      : this.openModal();
  }

  showBalance(): void {
    this.balanceModal = !this.balanceModal;
  }

  sendToAdmin() {
    if (this.withdrawalForm.valid) {
      this.amount = String(this.withdrawalForm.get("amount")?.value);
      this.roomNick = String(
        this.withdrawalForm.get("pokerRoomNickname")?.value
      );
      this.balanceModal = false;
      this.acceptModal = true;
    }
  }

  /**
   *
   *
   */
  sentSucess() {
    if(this.withdrawalForm.valid){
      const amount = this.withdrawalForm.getRawValue().amount;
      const roomNick = this.withdrawalForm.getRawValue().pokerRoomNickname;
      this._profileService
        .withdrawingBalance(Number(amount), roomNick)
        .subscribe({
          next: () => {
            console.log("sucess");
          },
          complete: () => {
            this.acceptModal = false;
            this.succsessModal = true;
          },
          error(err) {
            console.error(err);
          },
        });
    }else{
      this.withdrawalForm.markAllAsTouched()
    }
  }
}
