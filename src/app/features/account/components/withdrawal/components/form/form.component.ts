import { Component, OnInit } from '@angular/core';
import { BankService, CurrencyService, RoomService, } from '../../../../../../shared';
import { OrderService } from '../../../../../../shared';
import { environment } from '../../../../../../../environments/environment';
import { Router } from '@angular/router';
import { IBank, ICurrency, IRoom, ISellRequestBody } from '../../../../../../interface';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {
	mediaUrl = environment.mediaUrl
	bid_form: boolean = false;
	maxUSD: number = 5000
	// wallet = roomData
	// selectWallet = this.wallet[0]
	// curs = this.selectWallet.currencies
	// selectCurs = this.selectWallet.currencies[0]
	// walletTitle: string = this.wallet[0].name 

	body!: ISellRequestBody
	rooms!: IRoom[]
	activeRoom!: IRoom
	currencies!: ICurrency[]
	activeCurrency!: ICurrency
	banks!: IBank[]
	bankSbp!: { label: string, value: string }[]
	isSbp: Observable<boolean> = of(false)

	// bankDetails = bankData
	selectedBank!: IBank
	// banks = sbpBankData

	calcCurs: number = 0
	sellRequestId!: number

	fullName!: string
	detailsValue!: string
	wantToSellUSD!: number
	minToSellUSD!: number
	currencyRate!: number
	pokerRoomNickname!: string
	byNumberBank!: string

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this._roomService.getRoom().subscribe(data => {
			this.rooms = data
			this.activeRoom = data[0]
			this._currencyService.getCurrency(this.rooms[0].id).subscribe(data => {
				this.currencies = data
				this.setActiveCurrency(data[0])

				this._bankService.getBank(this.activeCurrency.id).subscribe(data => {
					this.banks = data
					this.changeBank(data[0])
				})

				this._bankService.getBankSbp().subscribe(data => {
					this.bankSbp = data.map(item => ({ label: item, value: item }))
					this.byNumberBank = data[0]
				})
			})
		})



	}
	bigClick() {
		this.bid_form = true
	}

	setActiveRoom(item: IRoom) {
		this.activeRoom = item;

		this._currencyService.getCurrency(this.activeRoom.id).subscribe(data => {
			this.currencies = data
			this.setActiveCurrency(data[0])
		})
	}

	setActiveCurrency(item: ICurrency) {
		this.activeCurrency = item;
	}

	submit1() {
		this.body = {
			pokerRoomId: this.activeRoom.id,
			currencyId: this.activeCurrency.id,
			bankId: this.selectedBank.id,
			fullName: this.fullName,
			detailsValue: this.detailsValue,
			wantToSellUSD: this.wantToSellUSD,
			minToSellUSD: this.minToSellUSD,
			currencyRate: this.currencyRate,
		}

		if (this.isSbp) {
			this.body.byNumberBank = this.byNumberBank
		}

		this._orderService.sellRequest(this.body).subscribe(data => {
			this.bigClick()
			this.sellRequestId = data.sellRequestId

			this.router.navigate(['/account', 'withdrawal', this.sellRequestId])
		})
	}

	cancel() {
		this._orderService.sellRequestCancel({ sellRequestId: this.sellRequestId }).subscribe(data => {
			this.router.navigate(['/account', 'withdrawal', this.sellRequestId])
		})
	}

	changeBank(bank: IBank) {
		this.selectedBank = bank
		this.isSbp = of(bank.isSbp);
	}

	balanceOrAccount: boolean = false;
	balanceToogle(): void {
		this.balanceOrAccount = !this.balanceOrAccount
	}

	maxValu(input: HTMLInputElement, button: HTMLButtonElement): void {
		if (!input.disabled) {
			input.value = this.activeCurrency.rateMax.toString()
			input.disabled = true
			button.textContent = 'Очистить'
		} else {
			input.value = ''
			input.disabled = false
			button.textContent = 'Максимум'
		}
	}

	calculateCurs(input: HTMLInputElement) {
		if (input.value) {
			let valu = parseFloat(input.value);
			console.log(this.calcCurs);
			this.calcCurs = valu * this.activeCurrency.rateMin
		}
	}

	calcMacUSD(input: HTMLInputElement) {
		this.maxUSD = Number(input.value)
		return this.maxUSD
	}
}
