import { Component } from '@angular/core';
import { products } from '../../../../../../shared';
import { Router } from '@angular/router';
import { IOrderBuy, OrderService } from '../../../../../../shared/services/order.service';
import { environment } from '../../../../../../../environments/environment';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	products = products
	orders!: IOrderBuy[]
	mediaUrl = environment.mediaUrl

	constructor(
		private _orderService: OrderService,
		private router: Router,
	) { }

	ngOnInit(): void {
		this._orderService.buyRequestsMy({ page: 0, size: 5 }).subscribe(data => {
			this.orders = data.result
		})
	}
}
