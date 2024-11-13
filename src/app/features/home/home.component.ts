import { Component, OnInit } from '@angular/core';
import { bankData, roomData, withdrawalData } from '../../shared';

export interface IBot {
	deposit: number
	withdraw: number
	min: number
	max: number
	time: string
	link: string
}

export interface IRoom {
	id: string
	image: string
	name: string
	has_bot: boolean
	currency: string[]
	bot?: IBot
}

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

	transactioon = [
		{ id: 'ID384939', offer: 10, logo: "images/user.svg", min: 2000, max: 2500, kurs: 2250, bank: "Сбербанк", bank_logo: 'images/bank.svg' },
		{ id: 'ID384940', offer: 14, logo: "images/user.svg", min: 2100, max: 2600, kurs: 2300, bank: "Тинькофф", bank_logo: 'images/bank.svg' },
		{ id: 'ID384941', offer: 16, logo: "images/user.svg", min: 2200, max: 2700, kurs: 2350, bank: "ВТБ", bank_logo: 'images/bank.svg' },
		{ id: 'ID384942', offer: 18, logo: "images/user.svg", min: 2300, max: 2800, kurs: 2400, bank: "Альфа-Банк", bank_logo: 'images/bank.svg' },
		{ id: 'ID384943', offer: 20, logo: "images/user.svg", min: 2400, max: 2900, kurs: 2450, bank: "Газпромбанк", bank_logo: 'images/bank.svg' },
		{ id: 'ID384944', offer: 22, logo: "images/user.svg", min: 2500, max: 3000, kurs: 2500, bank: "Россельхозбанк", bank_logo: 'images/bank.svg' },
	];

	cities = bankData
	selectedCity!: any


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

	ngOnInit(): void {
		this.cities = bankData
		this.setActiveRoom(this.roomData[0])
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
