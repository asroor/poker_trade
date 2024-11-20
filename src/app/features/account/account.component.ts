import { Component, OnInit } from '@angular/core';
import { bankData } from '../../shared';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
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
	constructor(private router: Router) { }
	application: boolean = false;
	dates: Date[] | undefined;
	status: City[] | undefined;
	bankData = bankData
	selectBank: undefined
	selectStatus: City | undefined;

	ngOnInit() {
		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.applicationFN();
			}
		});

		this.applicationFN()
		this.status = [
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];
	}


	applicationFN() {
		const fullUrl = this.router.url;
		if (!fullUrl.includes('form')) {
			this.application = true;
		} else {
			this.application = false;
		}
	}
}
