import { Component, OnInit } from '@angular/core';
import { bankData, products } from '../../shared';
interface City {
	name: string;
	code: string;
}
@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	dates: Date[] | undefined;
	status: City[] | undefined;
	bankData = bankData
	selectBank: undefined
	selectStatus: City | undefined;

	ngOnInit() {
		this.status = [
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];
	}
}
