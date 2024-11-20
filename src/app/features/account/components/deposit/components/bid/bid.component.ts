import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit {
	transfer: boolean = false;
	canceled: boolean = true
	pending: boolean = false
	waiting: boolean = true
	visible: boolean = false;
	request: boolean = false
	showModal() {
		this.visible = !this.visible
	}
	ngOnInit(): void {
		setInterval(() => {
			this.waiting = false;
			if (!this.waiting && this.canceled) {
				this.pending = true;
			}
		}, 500);
	}
}
