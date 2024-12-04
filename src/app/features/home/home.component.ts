import { Component, OnInit } from '@angular/core';
import { bankData, BankService, CurrencyService, roomData, RoomService, withdrawalData } from '../../shared';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
	activeRoom!: any
	activeCurrency!: string
	toogleActiveButton: 'вывод' | 'депозит' = 'вывод'

	roomData = roomData
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
		this.setActiveRoom(this.roomData[0])

		this._roomService.getRoom().subscribe()
		this._currencyService.getCurrency(1).subscribe()
		this._bankService.getBank(2).subscribe()
		this._bankService.getExistingBanks(1,2).subscribe()
	}


	setActiveRoom(item: any) {
		this.activeRoom = item;
		this.activeCurrency = item.currencies[0].title;
	}

	setActiveCurrency(item: string) {
		this.activeCurrency = item;
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
