import { NgModule } from '@angular/core';

import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

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
