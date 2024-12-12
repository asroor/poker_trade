import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  BankService, OrderService } from '../../../../../../shared/';
import { environment } from '../../../../../../../environments/environment';
import { IBank, IOrderBuy, ISellRequestsMy } from '../../../../../../interface';
import { City } from '../../../withdrawal/components/table/table.component';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	orders!: IOrderBuy[]
	mediaUrl = environment.mediaUrl
	orderParam: ISellRequestsMy = { page: 0, size: 10 }

	tablePagination = { totalData:1, size:10 };	
	loadData: boolean = false;
	loading: boolean = true;

	dates: Date[] | undefined;
	status: City[] | undefined;
	selectBank: undefined
	selectStatus: City | undefined;
	bankData!:IBank[]

	constructor(
		private _orderService: OrderService,
		private router: Router,
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
	}

	getOrders(event: any){
		this.loading = true;
		const page = event.first / event.rows; // Current page (0-based index)
		const size = event.rows; // Number of rows per page

		this._orderService.buyRequestsMy({...this.orderParam, page, size}).subscribe(data => {
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
