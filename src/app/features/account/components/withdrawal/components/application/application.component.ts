import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { IOrderBuy, IOrderOne } from '../../../../../../interface';
import { interval, map, Observable, Subscription } from 'rxjs';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
	private intervalSubscription: Subscription | undefined;
	visible: boolean = false;
	order!: IOrderOne
	ordeBuy!: Observable<IOrderBuy[]>
	id!: number
	buyId!: number
	pokerRoomNickname!: string
	byNumberBank!:string

	constructor(
		private _orderService: OrderService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this.getOrder()

		this.intervalSubscription = interval(2000).subscribe((data) => {
			this.getOrder();
		});
	}
	ngOnDestroy(): void {
		if (this.intervalSubscription) {
		  this.intervalSubscription.unsubscribe();
		}
	  }

	getOrder(){
		this._orderService.getSellRequest(this.id).subscribe((data) => {
			if(data.status == 'IN_PROGRESS'){
				this.getOrdcerBy()
			}
			this.order = data
			return data
		})
	}

	getOrdcerBy(){
		this.ordeBuy = this._orderService.buyRequests(this.id)
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

	visible2 = false
	showDialog2() {
		this.visible2 = !this.visible2
	}

	submit2() {
		this._orderService.sellRequestModeration({ sellRequestId: this.id, pokerRoomNickname: this.pokerRoomNickname }).subscribe(data => {
			// this.router.navigate(['/account', 'withdrawal', this.sellRequestId])
		})
	}

}
