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
