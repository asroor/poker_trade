import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderBuyOne } from '../../../../../../interface';
import { OrderService } from '../../../../../../shared';
import { interval, Subscription, switchMap } from 'rxjs';
import { IChat } from '../../../../../../interface/chat';
import { environment } from '../../../../../../../environments';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit {
	@ViewChild('chat_body') chatBody!: ElementRef;
	mediaUrl = environment.chatMediaUrl;
	private intervalSubscription!: Subscription;
	private intervalSubscriptionChat!: Subscription;

	transfer: boolean = false;
	visible: boolean = false;
	request: boolean = false
	transactions: boolean = false
	id!: number
	order!: IOrderBuyOne
	bayerFullName!: string
	lastFourDig!: string
	chats!: IChat[]
	text!: string

	constructor(
		private _orderService: OrderService,
		private route: ActivatedRoute,
	) { }

	showModal() {
		this.visible = !this.visible
	}
	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));

		this.startPolling();
		this.startPollingChat()

		this._orderService.buyRequestsOne(this.id).subscribe(data => {
			this.order = data
		})
	}

	ngOnDestroy(): void {
		// Resurslarni tozalash
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
		if (this.intervalSubscriptionChat) {
			this.intervalSubscriptionChat.unsubscribe();
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

	startPollingChat(): void {
		this.intervalSubscriptionChat = interval(3000)
			.pipe(
				switchMap(() => this._orderService.getBuyRequestChat(this.id)) // Har 3 sekundda API chaqiruvi
			)
			.subscribe({
				next: (data: IChat[]) => {
					this.chats = data;
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

	onFileSelected(event: Event): void {
		const input = event.target as HTMLInputElement;
		if (input.files && input.files.length > 0) {
			const file = input.files[0]; // Birinchi faylni olish

			// Faylni serverga yuborish
			this.uploadFile(file);
		}
	}

	uploadFile(file: File): void {
		this._orderService
			.buyRequestChatFile({ buyRequestId: this.id, file })
			.subscribe({
				next: (response) => console.log('Fayl muvaffaqiyatli yuklandi:', response),
				error: (error) => console.error('Fayl yuklashda xatolik:', error),
			});
	}

	sendText() {
		if (this.text.trim().length > 0) {
			this._orderService
				.buyRequestChatText({ buyRequestId: this.id, message: this.text.trim() })
				.subscribe({
					next: (response) => { console.log('Fayl muvaffaqiyatli yuklandi:', response); this.text = '' },
					error: (error) => console.error('Fayl yuklashda xatolik:', error),
				});
		}
	}
}
