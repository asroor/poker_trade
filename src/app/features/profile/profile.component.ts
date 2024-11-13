import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  infoOrder: boolean = false;

  infoToogle(): void {
		this.infoOrder = !this.infoOrder;
	}

}
