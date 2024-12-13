import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderBuyOne } from '../../../../../../interface';
import { OrderService } from '../../../../../../shared';
import { interval, Subscription, switchMap } from 'rxjs';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit {
	private intervalSubscription!: Subscription;
	transfer: boolean = false;
	visible: boolean = false;
	request: boolean = false
	transactions: boolean = false
	id!: number
	order!: IOrderBuyOne
	bayerFullName!: string
	lastFourDig!: string

	constructor(
		private _orderService: OrderService,
		private router: Router,
		private route: ActivatedRoute,
	) { }

	showModal() {
		this.visible = !this.visible
	}
	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));

		this.startPolling();

		this._orderService.buyRequestsOne(this.id).subscribe(data => {
			this.order = data
		})
	}

	ngOnDestroy(): void {
		// Resurslarni tozalash
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
	}

	startPolling(): void {
		this.intervalSubscription = interval(3000)
			.pipe(
				switchMap(() => this._orderService.buyRequestsOne(this.id)) // Har 3 sekundda API chaqiruvi
			)
			.subscribe({
				next: (data) => {
					this.order = data;
				},
				error: (err) => {
					console.error('Xatolik buyRequestsOne chaqiruvda:', err);
				},
			});
	}

	cancel() {
		this._orderService.buyRequestCancel({
			buyRequestId: this.id,
		}).subscribe(data => {
			this._orderService.buyRequestsOne(this.id).subscribe(data => {
				this.order = data
			})
		})
	}

	payed() {
		this._orderService.buyRequestPayed({
			buyRequestId: this.id,
			bayerFullName: this.bayerFullName,
			lastFourDig: this.lastFourDig,
		}).subscribe(data => {
			this._orderService.buyRequestsOne(this.id).subscribe(data => {
				this.order = data
			})
		})
	}

}
