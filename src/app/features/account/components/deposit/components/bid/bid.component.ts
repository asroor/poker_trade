import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IOrderBuyOne } from '../../../../../../interface';
import { OrderService } from '../../../../../../shared';
import { interval, of, Subscription, switchMap } from 'rxjs';
import { IChat } from '../../../../../../interface/chat';
import { environment } from '../../../../../../../environments';

@Component({
	selector: 'app-bid',
	templateUrl: './bid.component.html',
	styleUrl: './bid.component.scss'
})
export class BidComponent implements OnInit {
	@ViewChild('chatContainer') chatContainer!: ElementRef;
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


	timer: number = 0;
	timerDuration: number = 300 * 1000;
	timerInterval: any;

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
		this.startPollingChat();

		this._orderService.buyRequestsOne(this.id).subscribe(data => {
			this.order = data
		})

		this.startTimer();
	}

	startTimer(): void {
		this.timer = this.timerDuration;
	
		this.timerInterval = setInterval(() => {
		  if (this.timer > 0) {
			this.timer -= 1000;
		  } else {
			clearInterval(this.timerInterval);
		  }
		}, 1000);
	  }

	ngOnDestroy(): void {
		if (this.intervalSubscription) {
			this.intervalSubscription.unsubscribe();
		}
		if (this.intervalSubscriptionChat) {
			this.intervalSubscriptionChat.unsubscribe();
		}
		if (this.timerInterval) {
			clearInterval(this.timerInterval);
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
				switchMap(() => {
					if (this.order.status !== 'WAIT_FOR_SELLER_ACCEPT') {
						return this._orderService.getBuyRequestChat(this.id)
					} else {
						return of()
					}
				})
			)
			.subscribe({
				next: (data: IChat[]) => {
					this.chats = data;
					this.scrollToBottom()
				},
				error: (err) => {
					console.error('Xatolik buyRequestsOne chaqiruvda:', err);
				},
			});
	}

	scrollToBottom(): void {
		try {
			const chatBody = this.chatContainer.nativeElement;
			chatBody.scrollTop = chatBody.scrollHeight; // Scrollni oxiriga o'tkazish
		} catch (err) {
			console.error('Scroll qilishda xatolik:', err);
		}
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
				next: (response) => {
					this.getChat()
				},
				error: (error) => console.error('Fayl yuklashda xatolik:', error),
			});
	}

	sendText() {
		if (this.text.trim().length > 0) {
			this._orderService
				.buyRequestChatText({ buyRequestId: this.id, message: this.text.trim() })
				.subscribe({
					next: (response) => {
						this.text = ''
						this.getChat()
					},
					error: (error) => console.error('Fayl yuklashda xatolik:', error),
				});
		}
	}

	getChat() {
		this._orderService.getBuyRequestChat(this.id).subscribe((data => {
			this.chats = data
		}))
	}
}
