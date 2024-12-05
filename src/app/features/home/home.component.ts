import { Component, OnInit } from '@angular/core';
import { bankData, BankService, CurrencyService, IBank, ICurrency, IRoom, roomData, RoomService, withdrawalData } from '../../shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
	activeRoom!: any
	activeCurrency!: number
	toogleActiveButton: 'вывод' | 'депозит' = 'вывод'

	rooms!:IRoom []
	currencies!:ICurrency[]
	banks!:IBank[]
	withdrawalData = withdrawalData
	cities = bankData
	selectedCity!: any

	constructor(
		private _roomService: RoomService,
		private _currencyService: CurrencyService,
		private _bankService: BankService,
	){}

	ngOnInit(): void {
		this.cities = bankData

		this._roomService.getRoom().subscribe(data => {
			this.rooms = data
			this.setActiveRoom(data[0])

			this._currencyService.getCurrency(this.activeRoom.id).subscribe(data => {
				this.currencies = data
				this.setActiveCurrency(data[0].id)
			})

		})
		// this._bankService.getBank(2).subscribe()
		// this._bankService.getExistingBanks(1,2).subscribe()
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

		this._bankService.getBank(this.activeCurrency).subscribe(data => {
			this.banks = data
		})
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
