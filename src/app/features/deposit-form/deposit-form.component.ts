import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../interface/interfaceData';
import { ActivatedRoute } from '@angular/router';
import { withdrawalData } from '../../shared';
import { Location } from '@angular/common'
@Component({
	selector: 'app-deposit-form',
	templateUrl: './deposit-form.component.html',
	styleUrl: './deposit-form.component.scss'
})
export class DepositFormComponent implements OnInit {
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
