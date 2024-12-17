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
			pokerRoomNickname: ['', Validators.required],
			wantToBuyCurrency: ['', Validators.required],
			accept: [false, Validators.requiredTrue],
		})
	}

	ngOnInit(): void {
		this.getSelReq()
	}

	getSelReq() {
		this._orderService.getSellRequestShared(this.sellRequestId).subscribe({
			next: data => {
				this.order = data

				const wantToBuyUSDControl = this.depostiForm.get('wantToBuyUSD');
				if (wantToBuyUSDControl) {
					wantToBuyUSDControl.setValidators([
						Validators.required,
						Validators.min(this.order.minToSellUSD),
						Validators.max(this.order.wantToSellUSD),
					]);
					wantToBuyUSDControl.updateValueAndValidity(); // Validatsiyani yangilash
				}
			},
			error(err) {
				console.error(err)
			},
		})
	}

	submit() {
		if (this.depostiForm.valid) {
			const { sellRequestId, wantToBuyUSD, pokerRoomNickname } = this.depostiForm.getRawValue()

			this._orderService.buyRequest({ sellRequestId, wantToBuyUSD, pokerRoomNickname }).subscribe(data => {
				this.buyRequestId = data.buyRequestId
				this.router.navigate(['/account', 'buy-request', data.buyRequestId])
			})
		} else {
			this.depostiForm.markAllAsTouched();
		}
	}

	cancel() {
		this._orderService.buyRequestCancel({
			buyRequestId: this.buyRequestId,
		}).subscribe(data => {
			this.router.navigate(['/account', 'buy-request'])
		})
	}


	goBack(): void {
		this.location.back();
	}

	infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}

	clearBtn: string = 'Максимум'
	isInputDisabled: boolean = false;
	valueToogleCurrency(input: HTMLInputElement, max: number): void {
		if (this.clearBtn == 'Очистить') {
			this.clearBtn = 'Максимум'
			this.depostiForm.reset();
		} else {
			this.clearBtn = 'Очистить'
			this.depostiForm.patchValue({
				wantToBuyCurrency: max
			});
			this.changeCurrency('changeCurrency')
		}
	}

	valueToogleUSD(input: HTMLInputElement, max: number): void {
		if (this.clearBtn == 'Очистить') {
			this.clearBtn = 'Максимум'
			this.depostiForm.reset();
		} else {
			this.clearBtn = 'Очистить'
			this.depostiForm.patchValue({
				wantToBuyUSD: max
			});
			this.changeCurrency('changeUSD')
		}
	}

	changeCurrency(type: 'changeCurrency' | 'changeUSD') {
		const { wantToBuyUSD, wantToBuyCurrency } = this.depostiForm.getRawValue()

		if (type == 'changeCurrency') {
			this.depostiForm.patchValue({
				wantToBuyUSD: wantToBuyCurrency / this.order.currencyRate,
				wantToBuyCurrency,
			});
		}
		if (type == 'changeUSD') {
			this.depostiForm.patchValue({
				wantToBuyUSD,
				wantToBuyCurrency: wantToBuyUSD * this.order.currencyRate,
			});
		}
	}
}
