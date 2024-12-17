import { Component, OnInit } from '@angular/core';
import { BankService, CurrencyService, RoomService, } from '../../../../../../shared';
import { OrderService } from '../../../../../../shared';
import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';
import { IBank, ICurrency, IRoom, ISellRequestBody } from '../../../../../../interface';
import { Observable, of } from 'rxjs';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
	mediaUrl = environment.mediaUrl
	maxUSD: number = 5000
	// wallet = roomData
	// selectWallet = this.wallet[0]
	// curs = this.selectWallet.currencies
	// selectCurs = this.selectWallet.currencies[0]
	// walletTitle: string = this.wallet[0].name 

	body!: ISellRequestBody
	rooms!: IRoom[]
	activeRoom!: IRoom | undefined
	currencies!: ICurrency[]
	activeCurrency!: ICurrency | undefined
	banks!: IBank[]
	bankSbp!: { label: string, value: string }[]
	isSbp: Observable<boolean> = of(false)

	// bankDetails = bankData
	selectedBank!: IBank
	// banks = sbpBankData

	calcCurs: number = 0
	sellRequestId!: number
	withrawalForm!: FormGroup
	amount!: string

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
		private router: Router,
		private fb: NonNullableFormBuilder
	) {
		this.withrawalForm = this.fb.group({
			pokerRoomId: ['', Validators.required],
			currencyId: ['', Validators.required],
			wantToSellUSD: ['', [Validators.required, Validators.min(5), Validators.max(5000)]],
			minToSellUSD: ['', [Validators.required, Validators.min(5), Validators.max(5000)]],
			currencyRate: ['', Validators.required],
			bankId: ['', Validators.required],
			detailsValue: ['', Validators.required],
			byNumberBank: ['', Validators.required],
			fullName: ['', Validators.required],
			accept: [false, Validators.requiredTrue],
		})
	}

	ngOnInit(): void {
		this._roomService.getRoom().subscribe(data => {
			this.rooms = data
			this.activeRoom = data[0]
			this._currencyService.getCurrency(this.rooms[0].id).subscribe(data => {
				this.currencies = data
				this.setActiveCurrency(data[0])

				this._bankService.getBank(this.activeCurrency?.id || 1).subscribe(data => {
					this.banks = data
					this.changeBank(data[0])
				})

				this._bankService.getBankSbp().subscribe(data => {
					this.bankSbp = data.map(item => ({ label: item, value: item }))

					this.withrawalForm.patchValue({ pokerRoomId: this.activeRoom?.id, currencyId: this.activeCurrency?.id, bankId: this.selectedBank?.id, byNumberBank: data[0] })
				})
			})
		})



	}

	setActiveRoom(data?: IRoom) {
		if (data) {
			this.activeRoom = data
			this._currencyService.getCurrency(this.activeRoom?.id || 1).subscribe(data => {
				this.currencies = data
				this.setActiveCurrency(data[0])
			})
		} else {
			const { pokerRoomId } = this.withrawalForm.getRawValue()
			this.withrawalForm.get('pokerRoomId')
			this.activeRoom = this.rooms.find(r => r.id == +pokerRoomId);

			this._currencyService.getCurrency(this.activeRoom?.id || 1).subscribe(data => {
				this.currencies = data
				this.setActiveCurrency(data[0])
			})
		}
	}

	setActiveCurrency(data?: ICurrency) {
		if (data) {
			this.activeCurrency = data
		} else {
			const { currencyId } = this.withrawalForm.getRawValue()
			this.activeCurrency = this.currencies.find(c => c.id == currencyId);
		}
		const itemControl = this.withrawalForm.get('currencyRate');
		if (itemControl) {
			itemControl.setValidators([
				Validators.required,
				Validators.min(this.activeCurrency?.rateMin ?? 100),
				Validators.max(this.activeCurrency?.rateMax ?? 200),
			]);
			itemControl.updateValueAndValidity();
		}
		this._bankService.getBank(this.activeCurrency?.id || 1).subscribe(data => {
			this.banks = data
			this.changeBank(data[0])
			this.withrawalForm.patchValue({ pokerRoomId: this.activeRoom?.id, currencyId: this.activeCurrency?.id, bankId: this.selectedBank?.id })
		})
	}

	submit() {
		if (this.withrawalForm.valid) {
			const { pokerRoomId, currencyId, bankId, wantToSellUSD, minToSellUSD, currencyRate, detailsValue, byNumberBank, fullName } = this.withrawalForm.getRawValue()

			this.body = { pokerRoomId, currencyId, bankId, wantToSellUSD, minToSellUSD, currencyRate, detailsValue, fullName }

			if (this.isSbp) {
				this.body.byNumberBank = byNumberBank
			}

			this._orderService.sellRequest(this.body).subscribe(data => {
				this.router.navigate(['/account', 'sell-request', data.sellRequestId])
			})
		} else {
			this.withrawalForm.markAllAsTouched();
		}
	}

	cancel() {
		this._orderService.sellRequestCancel({ sellRequestId: this.sellRequestId }).subscribe(data => {
			this.router.navigate(['/account', 'sell-request', this.sellRequestId])
		})
	}

	changeBank(bank: IBank) {
		this.selectedBank = bank
		this.isSbp = of(bank?.isSbp ?? false);
		if (bank?.isSbp ?? false) {
			const itemControl = this.withrawalForm.get('byNumberBank');
			if (itemControl) {
				itemControl.setValidators([Validators.required]);
				itemControl.updateValueAndValidity();
			}
		} else {
			const itemControl = this.withrawalForm.get('byNumberBank');
			if (itemControl) {
				itemControl.setValidators([]);
				itemControl.updateValueAndValidity();
			}
		}
	}

	balanceOrAccount: boolean = false;
	balanceToogle(): void {
		this.balanceOrAccount = !this.balanceOrAccount
	}
	clearMaxBtn: string = 'Максимум'
	usdMax(max: number, min: number) {
		if (this.clearMaxBtn == 'Очистить') {
			this.clearMaxBtn = 'Максимум'
			this.withrawalForm.get('wantToSellUSD')?.reset();
		} else {
			this.withrawalForm.patchValue({
				wantToSellUSD: max
			});
			this.clearMaxBtn = 'Очистить'
		}
		this.usdChange()
	}

	usdChange() {
		const usd = this.withrawalForm.get('wantToSellUSD')?.value;
		const rate = this.withrawalForm.get('currencyRate')?.value;

		const itemControl = this.withrawalForm.get('minToSellUSD');
		if (itemControl) {
			itemControl.setValidators([
				Validators.required,
				Validators.min(5),
				Validators.max(usd ?? 5000),
			]);
			itemControl.updateValueAndValidity();
		}
		this.amount = ((usd ? (usd - usd * 0.04 - 1) : 0) * (rate ? rate : 0)).toFixed(2)
	}
}
