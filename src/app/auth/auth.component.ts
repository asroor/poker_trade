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
			const token = params['token'] || 
			'NEUoV87tNNpziUbN0AMLTz8xxcFg8xZ48lQIzaCb5HWxLG8x9o0vaoGe9K8szkGnHOYl2ERYi2IMF10VOklw8HC7jYXNIJyUfU3b' ||
			'OXpPiUeNRsDw5cuBfsS3lyj9v3o88rBpGyaaOvnmYzOGT6F5n4kN0LPD2H2c8Z9ITyDrSnZy9kzk8OjP6nNZcf3Dj7ZyNDdFY7tA' ||
			's11b0tGDbDpPbJyKUF3H5cRk9g6bTX1pCtrXvb3ABRupC9kA9NrvtQiqztG3gtmcbcyb8LrwHYgPfS957ySNJy7loDwu0pxFQxei' ||
			'zRb082nchQd7xohBakU0ZRA6DsixuyDz0iHETDy4RwGa3UBV0ckGZCEG8IXMkNOyot0Ito6K8KX7YGL4DxzBqCqmWVVx6tOhc9FN' ||
			 'hpdK3DlY2IPDhAaBKVIbVUR0GTjaq2xqQChGyLf4k6FShhi2iCLxx4tjbHeuxQK3ARsX9vbgqx6uncGn38vUW2XOFUBhG4DJk6mc';
			localStorage.setItem('telegramToken', token);
		});
	}

	onClose() {
		this.modalService.closeModal();
	}
}