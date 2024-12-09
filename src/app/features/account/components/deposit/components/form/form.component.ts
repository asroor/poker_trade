import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../../../../../shared/services/order.service';
import { IOrderOne } from '../../../../../../interface';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

	sellRequestId: number;
	countValu!: number;
	infoOrder: boolean = true;
	order!: IOrderOne

	wantToBuyUSD!: number
	pokerRoomNickname!: string
	buyRequestId!: number

	depostiForm: FormGroup
	constructor(
		private location: Location,
		private routes: ActivatedRoute,
		private _orderService: OrderService,
		private router: Router,
		private fb: NonNullableFormBuilder
	) {
		this.sellRequestId = +this.routes.snapshot.params['id'];
		this.depostiForm = this.fb.group({
			sellRequestId: [this.sellRequestId, Validators.required],
			wantToBuyUSD: ['', Validators.required],
			pokerRoomNickname: ['', Validators.required]
		})
	}

	ngOnInit(): void {
		this.getSelReq()
	}

	getSelReq() {
		this._orderService.getSellRequest(this.sellRequestId).subscribe({
			next: data => {
				this.order = data
			},
			error(err) {
				console.error(err)
			},
		})
	}
	submit() {
		const { sellRequestId, wantToBuyUSD, pokerRoomNickname } = this.depostiForm.getRawValue()
		console.log(sellRequestId, wantToBuyUSD, pokerRoomNickname);

		this._orderService.buyRequest({ sellRequestId, wantToBuyUSD, pokerRoomNickname }).subscribe(data => {
			this.buyRequestId = data.buyRequestId
			this.router.navigate(['/account', 'deposit', data.buyRequestId])
		})
	}

	cancel() {
		this._orderService.buyRequestCancel({
			buyRequestId: this.buyRequestId,
		}).subscribe(data => {
			this.router.navigate(['/account', 'deposit'])
		})
	}


	goBack(): void {
		this.location.back();
	}

	infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}


	isInputDisabled: boolean = false;
	valueToogle(input: HTMLInputElement, btn: HTMLButtonElement): void {
		if (input.value) {
			input.value = '';
			btn.textContent = 'Максимум'
		} else {
			input.value = this.order.wantToSellUSD.toString();
			this.depostiForm.patchValue({
				wantToBuyUSD: this.order.wantToSellUSD
			});
			btn.textContent = 'Очистить'
		}
	}
}
