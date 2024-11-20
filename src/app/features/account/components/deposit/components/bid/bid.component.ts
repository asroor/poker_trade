import { Component } from '@angular/core';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent {
	visible: boolean = false;
	showModal(){
		this.visible = !this.visible
	}
}
