import { Component } from '@angular/core';
import { Location } from '@angular/common';
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss'
})
export class ProfileComponent {
	infoOrder: boolean = false;
	constructor(private location: Location) { }

	infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}
}
