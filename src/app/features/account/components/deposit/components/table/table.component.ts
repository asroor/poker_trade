import { Component } from '@angular/core';
import { products } from '../../../../../../shared';

@Component({
	selector: 'app-table',
	templateUrl: './table.component.html',
	styleUrl: './table.component.scss'
})
export class TableComponent {
	products = products
}
