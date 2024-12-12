import { Component } from '@angular/core';
import { BankService, OrderService } from '../../../../../../shared';
import { environment } from '../../../../../../../environments/environment';
import { IBank, IOrderMy, ISellRequestsMy } from '../../../../../../interface';
import { interval, switchMap } from 'rxjs';

export interface City {
	name: string;
	code: string;
}

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	mediaUrl = environment.mediaUrl
	orders!: IOrderMy[]
	orderParam: ISellRequestsMy = { page: 0, size: 10 }

	tablePagination = { totalData:1,size:10 };
	loadData: boolean = false;
	loading: boolean = true;

	dates: Date[] | undefined;
	status: City[] | undefined;
	selectBank: undefined
	selectStatus: City | undefined;
	bankData!:IBank[]

	constructor(
		private _orderService: OrderService,
		private _bankService: BankService
	) { }

	ngOnInit(): void {
		this.getOrders({first:0, rows: this.tablePagination.size })
		this.getBank()

		this.status = [
			{ name: 'New York', code: 'NY' },
			{ name: 'Rome', code: 'RM' },
			{ name: 'London', code: 'LDN' },
			{ name: 'Istanbul', code: 'IST' },
			{ name: 'Paris', code: 'PRS' }
		];

		// interval(1000)
		// 	.pipe(switchMap(() => this._orderService.sellRequestsMy(this.orderParam)))
		// 	.subscribe(data => {
		// 		this.orders = data.result
		// 	})
	}

	getOrders(event: any){
		this.loading = true;
		const page = event.first / event.rows; // Current page (0-based index)
		const size = event.rows; // Number of rows per page

		this._orderService.sellRequestsMy({...this.orderParam, page, size}).subscribe(data => {
			this.orders = data.result
			this.tablePagination.totalData = data.total
			this.loading = false;
			this.loadData = true
		})
	}

	getBank(){
		this._bankService.getBank(2).subscribe(bank => {
			this.bankData = bank
		})
	}
}
