import { Component } from '@angular/core';
import { balances } from '../../../../shared/';

@Component({
	selector: 'app-balance',
	templateUrl: './balance.component.html',
	styleUrl: './balance.component.scss'
})
export class BalanceComponent {
	balance = balances
	showInfo: boolean = true
	infoToogle() {
		this.showInfo = !this.showInfo;
	}
}
