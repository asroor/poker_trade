import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { IOrderBuy, IOrderOne } from '../../../../../../interface';
import { interval, map, Observable, Subscription, switchMap, tap, timer } from 'rxjs';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
	private intervalSubscription: Subscription | undefined;
	visible: boolean = false;
	visible2: boolean = false;
	visible3: boolean = false;
	order!: IOrderOne
	ordeBuy!: IOrderBuy[]
	id!: number
	buyId!: number
	pokerRoomNickname!: string
	byNumberBank!: string

	constructor(
		private _orderService: OrderService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this.getOrder()
		this.startPolling();
	}

	startPolling(): void {
		this.intervalSubscription = interval(3000)
		  .pipe(
			switchMap(() => this._orderService.getSellRequest(this.id))
		  )
		  .subscribe({
			next: (data) => {
			  this.order = data;
			  if (data.status === 'IN_PROGRESS') {
				this.getOrdcerBy();
			  }
			},
			error: (err) => {
			  console.error('API chaqiruvda xatolik:', err);
			},
		  });
	  }

	ngOnDestroy(): void {
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
	}

	getOrder() {
		return this._orderService.getSellRequest(this.id).subscribe((data) => {
			if (data.status == 'IN_PROGRESS') {
				this.getOrdcerBy()
			}
			this.order = data
			return data
		})
	}

	getOrdcerBy() {
		this._orderService.buyRequests(this.id).subscribe((data) => {
			this.ordeBuy = data
		})
	}

	cancel() {
		this._orderService.sellRequestCancel({ sellRequestId: this.id }).subscribe(data => {
			this.getOrder()
		})
	}

	buyAccept(id: number) {
		this._orderService.buyRequestAccept({ buyRequestId: id }).subscribe(data => {
			this._orderService.getSellRequest(this.id).subscribe(data => {
				this.getOrdcerBy()
			})
		})
	}

	buyCancel(id: number) {
		this._orderService.buyRequestCancel({ buyRequestId: id }).subscribe(data => {
			this._orderService.getSellRequest(this.id).subscribe(data => {
				this.getOrdcerBy()
			})
		})
	}

	buyReceiveApprove() {
		this._orderService.buyRequestReceiveApprove({ buyRequestId: this.buyId }).subscribe(data => {
			this._orderService.getSellRequest(this.id).subscribe(data => {
				this.getOrdcerBy()
			})
		})
	}

	showDialog(buyId: number) {
		this.visible = true;
		this.buyId = buyId
	}

	showDialog2() {
		this.visible2 = !this.visible2
	}

	showDialog3() {
		this.visible3 = !this.visible3
	}

	submit2() {
		this._orderService.sellRequestModeration({ sellRequestId: this.id, pokerRoomNickname: this.pokerRoomNickname }).subscribe(data => {
			this.visible2 = false
			this.getOrder()
		})
	}

}
