import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TagModule } from 'primeng/tag';

const routes: Routes = [
	{
		path: '',
		component: AccountComponent,
		children: [
			{
				path: 'withdrawal', component: WithdrawalComponent
			},
			{
				path: 'deposit', component: DepositComponent
			},
			{
				path: '**', redirectTo: 'withdrawal', pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	declarations: [
		AccountComponent,
		DepositComponent,
		WithdrawalComponent
	],
	imports: [
		CommonModule,
		DropdownModule,
		ButtonModule,
		CalendarModule,
		TagModule,
		FormsModule,
		TableModule,
		RouterModule.forChild(routes)
	]
})
export class AccountModule { }
