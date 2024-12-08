import { Component } from '@angular/core';
import { BankService, CurrencyService, products, RoomService } from '../../../../../../shared';
import { IOrder, IOrderMy, ISellRequestsMy, OrderService } from '../../../../../../shared/services/order.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	mediaUrl = environment.mediaUrl
	orders!:IOrderMy[]
	orderParam:ISellRequestsMy = {page:0, size:10}

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
	) { }

	ngOnInit(): void {
		this._orderService.sellRequestsMy(this.orderParam).subscribe(data => {
			this.orders = data.result
		})
	}
}
