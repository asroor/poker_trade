import { Component } from '@angular/core';
import { OrderService } from '../../../../../../shared';
import { environment } from '../../../../../../../environments/environment';
import { IOrderMy, ISellRequestsMy } from '../../../../../../interface';
import { interval, switchMap } from 'rxjs';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	mediaUrl = environment.mediaUrl
	orders!: IOrderMy[]
	orderParam: ISellRequestsMy = { page: 0, size: 10 }

	constructor(
		private _orderService: OrderService,
	) { }

	ngOnInit(): void {
		this._orderService.sellRequestsMy(this.orderParam).subscribe(data => {
			this.orders = data.result
		})

		// interval(1000)
		// 	.pipe(switchMap(() => this._orderService.sellRequestsMy(this.orderParam)))
		// 	.subscribe(data => {
		// 		this.orders = data.result
		// 	})
	}
}
