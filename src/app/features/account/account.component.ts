import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, Routes } from '@angular/router';
import { BankService } from '../../shared';
import { bankData } from '../../shared/mock/bank';
import { IBank } from '../../interface';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
	
	constructor(private router: Router) { }

	ngOnInit() {
	}

	
}
