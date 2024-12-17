import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { OrderService } from '../../../../../../shared/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { IOrderBuy, IOrderOne } from '../../../../../../interface';
import { interval, map, Observable, of, Subscription, switchMap, tap, timer } from 'rxjs';
import { IChat } from '../../../../../../interface/chat';
import { environment } from '../../../../../../../environments';
import { DatePipe } from '@angular/common';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent implements OnInit {
	@ViewChild('chatContainer') chatContainer!: ElementRef;
	mediaUrl = environment.chatMediaUrl;

	private intervalSubscription: Subscription | undefined;
	private intervalSubscriptionChat: Subscription | undefined;
	visible: boolean = false;
	visible2: boolean = false;
	visible3: boolean = false;
	order!: IOrderOne
	ordeBuy!: IOrderBuy[]
	id!: number
	buyId!: number
	pokerRoomNickname!: string
	byNumberBank!: string
	chats!: IChat[]
	text!: string
	chatId!: number

	timer: number = 0;
	timerDuration: number = 300 * 1000;
	timerInterval: any;

	constructor(
		private _orderService: OrderService,
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.id = Number(this.route.snapshot.paramMap.get('id'));
		this.getOrder()
		this.startPolling();
		this.startPollingChat()
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

	startPollingChat(): void {
		this.intervalSubscriptionChat = interval(3000)
			.pipe(
				switchMap(() => {
					if(this.chatId){
						return this._orderService.getBuyRequestChat(this.chatId)
					}else{
						return of()
					}
				}) 
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

	showDialog3(buyId: number) {
		this.visible3 = !this.visible3
		this.chatId = buyId
		this.getBuyRequestChat()
	}

	submit2() {
		this._orderService.sellRequestModeration({ sellRequestId: this.id, pokerRoomNickname: this.pokerRoomNickname }).subscribe(data => {
			this.visible2 = false
			this.getOrder()
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
			.buyRequestChatFile({ buyRequestId: this.chatId, file })
			.subscribe({
				next: (response) => {this.getChat()},
				error: (error) => console.error('Fayl yuklashda xatolik:', error),
			});
	}

	sendText(){
		if(this.text.trim().length > 0){
			this._orderService
				.buyRequestChatText({ buyRequestId: this.chatId, message: this.text.trim()})
				.subscribe({
					next: (response) => {this.getChat(); this.text = ''},
					error: (error) => console.error('Fayl yuklashda xatolik:', error),
				});
		}
	}

	getBuyRequestChat(){
		this._orderService
				.getBuyRequestChat(this.chatId)
				.subscribe({
					next: (response) => {
						this.chats = response
					},
					error: (error) => console.error('Fayl yuklashda xatolik:', error),
				});
	}

	getChat() {
		this._orderService.getBuyRequestChat(this.chatId).subscribe((data => {
			this.chats = data
		}))
	}

	scrollToBottom(): void {
		try {
			const chatBody = this.chatContainer.nativeElement;
			chatBody.scrollTop = chatBody.scrollHeight; // Scrollni oxiriga o'tkazish
		} catch (err) {
			console.error('Scroll qilishda xatolik:', err);
		}
	}

}
