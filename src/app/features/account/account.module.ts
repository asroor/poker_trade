import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

const routes: Routes = [
	{
		path: '',
		component: AccountComponent,
		children: [
			{
				path: 'sell-request', loadChildren: () => import('../account').then(m => m.WithdrawalModule)
			},
			{
				path: 'buy-request', loadChildren: () => import('../account').then(m => m.DepositModule)
			},
			{
				path: '**', redirectTo: 'sell-request', pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	declarations: [
		AccountComponent,
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)
	]
})
export class AccountModule { }
