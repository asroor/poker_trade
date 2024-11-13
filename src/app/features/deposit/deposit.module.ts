import { NgModule } from '@angular/core';

import { DepositComponent } from './deposit.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		component: DepositComponent
	}
];

@NgModule({
	declarations: [
		DepositComponent
	],
	imports: [
		RouterModule.forChild(routes)
	]
})
export class DepositModule { }
