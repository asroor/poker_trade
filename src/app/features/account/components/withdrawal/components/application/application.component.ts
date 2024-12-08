import { Component, OnInit } from '@angular/core';
import { RoomService, CurrencyService, BankService } from '../../../../../../shared';
import { IOrder, IOrderBuy, IOrderOne, OrderService } from '../../../../../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
	visible: boolean = false;
	order!: IOrderOne
	ordeBuy!: IOrderBuy[]
	id!: number
	buyId!:number

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
		private route: ActivatedRoute,
		private router: Router
	){}

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this._orderService.getSellRequest(this.id).subscribe(data => {
			this.order = data

			this._orderService.buyRequests(this.id).subscribe(data => {
				this.ordeBuy = data
			})
		})
	}

	cancel(){
		this._orderService.sellRequestCancel({sellRequestId: this.id}).subscribe(data => {
			this._orderService.getSellRequest(this.id).subscribe(data => {
				this.order = data
			})
		})
	}

	buyAccept(id:number){
		this._orderService.buyRequestAccept({buyRequestId: id}).subscribe(data => {
			// this._orderService.getSellRequest(this.id).subscribe(data => {
			// 	this._orderService.buyRequests(this.id).subscribe(data => {
			// 		this.ordeBuy = data
			// 	})
			// })
		})
	}

	buyCancel(id:number){
		this._orderService.buyRequestCancel({buyRequestId: id}).subscribe(data => {
			// this._orderService.getSellRequest(this.id).subscribe(data => {
			// 	this._orderService.buyRequests(this.id).subscribe(data => {
			// 		this.ordeBuy = data
			// 	})
			// })
		})
	}

	buyReceiveApprove(){
		this._orderService.buyRequestReceiveApprove({buyRequestId: this.buyId}).subscribe(data => {
			// this._orderService.getSellRequest(this.id).subscribe(data => {
			// 	this._orderService.buyRequests(this.id).subscribe(data => {
			// 		this.ordeBuy = data
			// 	})
			// })
		})
	}

	showDialog(buyId:number) {
		this.visible = true;
		this.buyId = buyId
	}

}
