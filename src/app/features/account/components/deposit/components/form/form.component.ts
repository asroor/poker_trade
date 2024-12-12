import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { OrderService } from '../../../../../../shared/services/order.service';
import { IOrder, IOrderOne } from '../../../../../../interface';
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
	order!: IOrder

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
			wantToBuyCurrency: [''],
			pokerRoomNickname: ['', Validators.required]
		})
	}

	ngOnInit(): void {
		this.getSelReq()
	}

	getSelReq() {
		this._orderService.getSellRequestShared(this.sellRequestId).subscribe({
			next: data => {
				this.order = data
			},
			error(err) {
				console.error(err)
			},
		})
	}

	submit() {
		if(this.depostiForm.valid){
			const { sellRequestId, wantToBuyUSD, pokerRoomNickname } = this.depostiForm.getRawValue()
			console.log(sellRequestId, wantToBuyUSD, pokerRoomNickname);
	
			this._orderService.buyRequest({ sellRequestId, wantToBuyUSD, pokerRoomNickname }).subscribe(data => {
				this.buyRequestId = data.buyRequestId
				this.router.navigate(['/account', 'deposit', data.buyRequestId])
			})
		}else{

		}
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
	valueToogleCurrency(input: HTMLInputElement, btn: HTMLButtonElement, max:number): void {
		if (btn.textContent == 'Очистить') {
			btn.textContent = 'Максимум'
			this.depostiForm.reset();
		} else {
			this.depostiForm.patchValue({
				wantToBuyCurrency: max
			});
			btn.textContent = 'Очистить'
			this.changeCurrency('changeCurrency')
		}
	}

	valueToogleUSD(input: HTMLInputElement, btn: HTMLButtonElement, max:number): void {
		if (btn.textContent == 'Очистить') {
			btn.textContent = 'Максимум'
			this.depostiForm.reset();
		} else {
			this.depostiForm.patchValue({
				wantToBuyUSD: max
			});
			btn.textContent = 'Очистить'
			this.changeCurrency('changeUSD')
		}
	}

	changeCurrency(type: 'changeCurrency' | 'changeUSD'){
		const { wantToBuyUSD, wantToBuyCurrency } = this.depostiForm.getRawValue()

		if(type == 'changeCurrency') {
			this.depostiForm.patchValue({
				wantToBuyUSD: wantToBuyCurrency / this.order.currencyRate,
				wantToBuyCurrency,
			});
		}
		if(type == 'changeUSD') {
			this.depostiForm.patchValue({
				wantToBuyUSD,
				wantToBuyCurrency: wantToBuyUSD * this.order.currencyRate,
			});
		}
		
	}
}
