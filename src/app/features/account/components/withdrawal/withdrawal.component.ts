import { Component } from '@angular/core';
import { products } from '../../../../shared';

@Component({
	selector: 'app-withdrawal',
	templateUrl: './withdrawal.component.html',
	styleUrl: './withdrawal.component.scss'
})
export class WithdrawalComponent {
	products = products
}
