import { Component } from '@angular/core';

@Component({
	selector: 'app-information',
	templateUrl: './information.component.html',
	styleUrl: './information.component.scss'
})
export class InformationComponent {
	userIcons: string[] = [
		"images/user-icon01.svg",
		"images/user-icon02.svg",
		"images/user-icon03.svg",
		"images/user-icon04.svg",
		"images/user-icon05.svg",
		"images/user-icon06.svg",
		"images/user-icon07.svg",
		"images/user-icon08.svg",
		"images/user-icon09.svg",
		"images/user-icon10.svg",
		"images/user-icon11.svg",
		"images/user-icon12.svg",
		"images/user-icon13.svg",
		"images/user-icon14.svg",
		"images/user-icon15.svg",
		"images/user-icon16.svg",
		"images/user-icon17.svg",
		"images/user-icon18.svg",
		"images/user-icon19.svg",
		"images/user-icon20.svg"
	];
	userimg: string = this.userIcons[0]

	visible: boolean = false;
	showDialog() {
		this.visible = true
	}
	sitchUserImg(img: string) {
		this.userimg = img
		this.visible = false;
	}
}
