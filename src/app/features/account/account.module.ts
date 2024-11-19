import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ApplicationComponent } from './components/application/application.component';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';

const routes: Routes = [
	{
		path: '',
		component: AccountComponent,
		children: [
			{
				path: 'withdrawal', loadChildren: () => import('../account').then(m => m.WithdrawalModule)
			},
			{
				path: 'deposit', loadChildren: () => import('../account').then(m => m.DepositModule)
			},
		]
	}
];

@NgModule({
	declarations: [
		AccountComponent,
		ApplicationComponent
	],
	imports: [
		CommonModule,
		DropdownModule,
		ButtonModule,
		CalendarModule,
		FormsModule,
		DialogModule,
		AccordionModule,
		TagModule,
		RouterModule.forChild(routes)
	]
})
export class AccountModule { }
