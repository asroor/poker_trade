import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { AuthModalService } from './auth.modal.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-auth',
	templateUrl: './auth.component.html',
	styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {
	showModal = false;

	constructor(private modalService: AuthModalService, private route: ActivatedRoute, private router: Router) { }

	ngOnInit() {
		this.modalService.isModalOpen$.subscribe(isOpen => {
			this.showModal = isOpen;
		});
		this.route.params.subscribe(params => {
			const token = params['token'];
			localStorage.setItem('telegramToken', token);
		});
	}

	onClose() {
		this.modalService.closeModal();
	}
}