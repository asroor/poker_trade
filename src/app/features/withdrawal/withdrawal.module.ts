import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalComponent } from './withdrawal.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputMaskModule } from 'primeng/inputmask';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
	{
		path: '',
		component: WithdrawalComponent
	}
];

@NgModule({
	declarations: [
		WithdrawalComponent
	],
	imports: [
		CommonModule,
		SharedModule,
		DropdownModule,
		FormsModule,
		InputMaskModule,
		ButtonModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputNumberModule,
		ReactiveFormsModule,
		TooltipModule,
		CheckboxModule,
		RouterModule.forChild(routes)
	]
})
export class WithdrawalModule { }
