import { NgModule } from '@angular/core';

import { DepositComponent } from './deposit.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';

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
		DropdownModule,
		RouterModule.forChild(routes)
	]
})
export class DepositModule { }
