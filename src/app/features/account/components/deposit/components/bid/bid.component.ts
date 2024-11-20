import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit{
	blockedPanel: boolean = false;
	transfer: boolean = false;
	canceled: boolean = false
	pending: boolean = false
	waiting: boolean = true
	visible: boolean = false;
	showModal() {
		this.visible = !this.visible
	}
	ngOnInit(): void {
		setInterval(() => {
			this.waiting = false
			this.pending = true
		}, 1000)
	}
}
