import { Component } from '@angular/core';

@Component({
	selector: 'app-application',
	templateUrl: './application.component.html',
	styleUrl: './application.component.scss'
})
export class ApplicationComponent {
	visible: boolean = false;

	showDialog() {
		this.visible = true;
	}
}
