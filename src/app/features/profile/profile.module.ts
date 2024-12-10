import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { BalanceComponent } from './components/balance/balance.component';
import { InformationComponent } from './components/information/information.component';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';

const routes: Routes = [
	{
		path: '',
		component: ProfileComponent,
		children: [
			{
				path: 'token/:token', component: InformationComponent
			},
			{
				path: 'information', component: InformationComponent
			},
			{
				path: 'balance', component: BalanceComponent
			},
			{
				path: '**', redirectTo: 'information', pathMatch: 'full'
			}
		]
	}
];

@NgModule({
	declarations: [
		ProfileComponent,
		BalanceComponent,
		InformationComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		InputTextModule,
		ButtonModule,
		InputGroupModule,
		FormsModule,
		InputOtpModule,
		InputGroupAddonModule,
		ReactiveFormsModule,
		DialogModule
	]
})
export class ProfileModule { }
