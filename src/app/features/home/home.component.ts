import { Component, OnInit } from '@angular/core';
import { BankService, CurrencyService, RoomService } from '../../shared';
import { OrderService } from '../../shared/services/order.service';
import { environment } from '../../../environments/environment';
import { IBank, ICurrency, IOrder, IRoom, ISellRequests } from '../../interface';
import { LazyLoadEvent } from 'primeng/api';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
	mediaUrl = environment.mediaUrl
	activeRoom!: any
	activeCurrency!: number
	toogleActiveButton: 'вывод' | 'депозит' = 'вывод'

	rooms!: IRoom[]
	currencies!: ICurrency[]
	banks!: IBank[]
	orders!: IOrder[]
	orders_mine!: number[]
	orderParams: ISellRequests = { page: 0, size: 10, sortField: 'wantToSellUSD', sortDirection: "desc", filterField:'bank'}
	selectedCity!: any
	filterValue!:IBank

	tablePagination = { totalData:1,size:10 };
	loadData: boolean = false;
	loading: boolean = true;

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
		private _orderService: OrderService,
	) { }

	ngOnInit(): void {
		this._roomService.getRoom().subscribe(data => {
			this.rooms = data
			this.setActiveRoom(data[0])
		})
	}

	getOrders(event:any) {
		this.loading = true;
		const page = event.first / event.rows; // Current page (0-based index)
		const size = event.rows; // Number of rows per page

		const sortField = event.sortField; // Current page (0-based index)
		const sortDirection = event.sortOrder == 1 ? 'asc' : 'desc'; // Number of rows per page

		this._orderService.sellRequests({...this.orderParams, page, size, sortField, sortDirection}).subscribe(data => {
			this.orders = data.other
			this.tablePagination.totalData = data.total
			this.orders_mine = data.my
			this.loading = false;
			this.loadData = true
		});
	}


	setActiveRoom(item: any) {
		this.activeRoom = item;
		this._currencyService.getCurrency(this.activeRoom.id).subscribe(data => {
			this.currencies = data
			this.setActiveCurrency(data[0].id)
		})
	}

	setActiveCurrency(item: number) {
		this.activeCurrency = item;

		// this._bankService.getExistingBank(this.activeRoom.id,this.activeCurrency).subscribe(data => {
		// 	this.banks = data
		// })

		this._bankService.getBank(this.activeCurrency).subscribe(data => {
			this.banks = data
		})

		this.orderParams = { ...this.orderParams, pokerRoomId: this.activeRoom.id, currencyId: this.activeCurrency }

		this.getOrders({first:0, rows: this.tablePagination.size, sortField: 'wantToSellUSD', sortOrder:-1 })
	}

	filteOrderBank(){
		this.orderParams = { ...this.orderParams, pokerRoomId: this.activeRoom.id, currencyId: this.activeCurrency, filterField: 'bank', filterValue: this.filterValue.title }
		this.getOrders({first:0, rows: this.tablePagination.size, sortField: 'wantToSellUSD', sortOrder:-1 })
	}

	isMine(order_id:number){
		return this.orders_mine.some(item => item === order_id)
	}

	changeToogleActiveButton(item: 'вывод' | 'депозит') {
		this.toogleActiveButton = item;
	}


	items: string[] = [
		'The first choice!',
		'And another choice for you.',
		'but wait! A third!'
	];

	onHidden(): void {
		console.log('Dropdown is hidden');
	}
	onShown(): void {
		console.log('Dropdown is shown');
	}
	isOpenChange(): void {
		console.log('Dropdown state is changed');
	}
}
