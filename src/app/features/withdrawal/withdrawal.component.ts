import { Component, OnInit } from '@angular/core';
import { bankData, roomData, sbpBankData } from '../../shared';

@Component({
	selector: 'app-withdrawal',
	templateUrl: './withdrawal.component.html',
	styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent implements OnInit {
	bid_form: boolean = true;
	wallet = roomData
	selectWallet = this.wallet[0]
	curs = this.selectWallet.currencies
	selectCurs = this.selectWallet.currencies[0]
	walletTitle: string = this.wallet[0].name
	ngOnInit(): void {

	}
	bigClick() {
		this.bid_form = true
	}
	changeWallet() {
		this.curs = this.selectWallet.currencies
		this.selectCurs = this.selectWallet.currencies[0]
		this.walletTitle = this.selectWallet.name
	}
	balanceOrAccount: boolean = false;
	balanceToogle(): void {
		this.balanceOrAccount = !this.balanceOrAccount
	}

	maxValu(input: HTMLInputElement, button: HTMLButtonElement): void {
		if (!input.disabled) {
			input.value = this.selectWallet.max.toString()
			input.disabled = true
			button.textContent = 'Очистить'
		} else {
			input.value = ''
			input.disabled = false
			button.textContent = 'Максимум'
		}
	}
	bankDetails = bankData
	selectedBank = this.bankDetails[0]
	banks = sbpBankData

	calcCurs: number = 0
	calculateCurs(input: HTMLInputElement) {
		if (input.value) {
			let valu = parseFloat(input.value);
			console.log(this.calcCurs);
			this.calcCurs = valu * this.selectCurs.rate_usd
		}
	}

	is_sbp: boolean = false
	changeBank(bank: string) {
		if (bank == 'sbp') {
			this.is_sbp = true
		} else {
			this.is_sbp = false
		}
	}
	visible: boolean = false;

	showDialog() {
		this.visible = !this.visible
	}
}
