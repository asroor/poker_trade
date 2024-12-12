import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {  BankService, OrderService } from '../../../../../../shared/';
import { environment } from '../../../../../../../environments/environment';
import { IBank, IOrderBuy, ISellRequestsMy } from '../../../../../../interface';
import { IStatus } from '../../../withdrawal/components/table/table.component';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	orders!: IOrderBuy[]
	mediaUrl = environment.mediaUrl
	orderParam: ISellRequestsMy = { page: 0, size: 10, filters:{} }

	bankFilter!: IBank
	statusFilter!: IStatus
	dateFilter!: Date

	tablePagination = { totalData:1, size:10 };	
	loadData: boolean = false;
	loading: boolean = true;

	dates: Date[] | undefined;
	status: IStatus[] | undefined;
	selectBank: undefined
	selectStatus: IStatus | undefined;
	bankData!:IBank[]

	constructor(
		private _orderService: OrderService,
		private router: Router,
		private _bankService: BankService,
		private datePipe: DatePipe
	) { }

	ngOnInit(): void {
		this.getOrders({first:0, rows: this.tablePagination.size })
		this.getBank()

		this.status = [
			{ name: 'Ожидает', code: 'WAIT_FOR_SELLER_ACCEPT' }, // Ожидает подтверждения
			{ name: 'Оплата', code: 'WAIT_FOR_BUYER_PAY' },       // Ожидает оплаты
			{ name: 'Оплачено', code: 'BUYER_PAYED' },           // Оплачено, ожидание подтверждения
			{ name: 'Перевод', code: 'WAIT_FOR_ADMIN_MOVE' },    // Ожидается перевод
			{ name: 'Отклонена', code: 'REJECTED' },             // Отклонена
			{ name: 'Завершена', code: 'COMPLETED' },            // Завершена
			{ name: 'Отменена', code: 'CANCELED' },              // Отменена
			{ name: 'Истек', code: 'EXPIRED' }                  // Истек
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

	filterData(){
		if(this.dateFilter){
			this.orderParam.filters.date = this.datePipe.transform(this.dateFilter, 'yyyy-MM-dd')?.toString()
		}
		if(this.statusFilter){
			this.orderParam.filters.status = this.statusFilter.code
		}
		if(this.bankFilter){
			this.orderParam.filters.bank = this.bankFilter.title
		}

		this.getOrders({ first:0, rows: this.tablePagination.size })
	}
}
