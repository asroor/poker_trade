import { Component, OnInit } from '@angular/core';
import { RoomService, CurrencyService, BankService } from '../../../../../../shared';
import { IOrder, IOrderOne, OrderService } from '../../../../../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
	visible: boolean = false;
	order!: IOrderOne
	id!: number

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
		})
	}

	showDialog() {
		this.visible = true;
	}

}
