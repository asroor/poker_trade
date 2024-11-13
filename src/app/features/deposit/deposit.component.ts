import { Component, ElementRef, EventEmitter, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { withdrawalData } from '../../shared';
import { Transaction } from '../../interface/interfaceData';

@Component({
	selector: 'app-deposit',
	templateUrl: './deposit.component.html',
	styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {
	depositData!: Transaction | undefined;
	currentId!: number;
	countValu!: number;
	infoOrder: boolean = false;

	constructor(private location: Location, private routes: ActivatedRoute) { }

	ngOnInit(): void {
		this.currentId = +this.routes.snapshot.params['id'];
		this.depositData = withdrawalData!.find(item => item.id === this.currentId);
	}

	goBack(): void {
		this.location.back();
	}

	infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}


	isInputDisabled: boolean = false;
	valueToogle(input: HTMLInputElement, btn: HTMLButtonElement): void {
		if (input.disabled) {
			input.value = '';
			btn.textContent = 'Максимум'
			input.disabled = false;
		} else {
			input.value = this.depositData?.bank.refill_max_amount?.toString() || '';
			btn.textContent = 'Очистить'
			input.disabled = true;
		}
	}
}
