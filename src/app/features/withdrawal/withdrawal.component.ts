import { Component, OnInit } from '@angular/core';
import { roomData } from '../../shared';

@Component({
	selector: 'app-withdrawal',
	templateUrl: './withdrawal.component.html',
	styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent implements OnInit {
	wallet = roomData
	selectWallet = this.wallet[0]
	curs = this.selectWallet.currencies
	selectCurs = this.selectWallet.currencies[0]
	walletTitle: string = this.wallet[0].name
	ngOnInit(): void {

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
}
