import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../../../../interface/interfaceData';
import { ActivatedRoute, Router } from '@angular/router';
import { BankService, CurrencyService, RoomService, withdrawalData } from '../../../../../../shared';
import { Location } from '@angular/common';
import { IOrder, IOrderOne, OrderService } from '../../../../../../shared/services/order.service';

@Component({
	selector: 'app-form',
	templateUrl: './form.component.html',
	styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit{

	sellRequestId!: number;
	countValu!: number;
	infoOrder: boolean = false;
	order!:IOrderOne

	wantToBuyUSD!:number
	pokerRoomNickname!:string
	buyRequestId!:number

	constructor(
		private location: Location, 
		private routes: ActivatedRoute,
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this.sellRequestId = +this.routes.snapshot.params['id'];
		// this._orderService.getSellRequest(this.sellRequestId).subscribe(data => {
		// 	this.order = data
		// })
	}

	submit(){
		this._orderService.buyRequest({
			sellRequestId:this.sellRequestId, 
			wantToBuyUSD: this.wantToBuyUSD, 
			pokerRoomNickname: this.pokerRoomNickname
		}).subscribe(data => {
			this.buyRequestId = data.buyRequestId
			this.router.navigate(['/account', 'deposit', data.buyRequestId])
		})
	}

	cancel(){
		this._orderService.buyRequestCancel({
			buyRequestId:this.buyRequestId, 
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
		if (input.disabled) {
			input.value = '';
			btn.textContent = 'Максимум'
			input.disabled = false;
		} else {
			input.value = this.order?.wantToSellUSD?.toString() || '';
			btn.textContent = 'Очистить'
			input.disabled = true;
		}
	}

}
