import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderBuyOne, OrderService } from '../../../../../../shared/services/order.service';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit {
	
// WAIT_FOR_SELLER_ACCEPT
	transfer: boolean = false;
	canceled: boolean = true
	pending: boolean = false
	waiting: boolean = true
	visible: boolean = false;
	request: boolean = false
	transactions: boolean = false
	id!:number
	order!:IOrderBuyOne

	constructor(
		private _orderService: OrderService,
		private router: Router,
		private route: ActivatedRoute,
	){}

	showModal() {
		this.visible = !this.visible
	}
	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this._orderService.buyRequestsOne(this.id).subscribe(data => {
			this.order = data
		})
	}
}
