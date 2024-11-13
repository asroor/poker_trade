import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepositFormComponent } from './deposit-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { RouterModule, Routes } from '@angular/router';
import { CheckboxModule } from 'primeng/checkbox';

const routes: Routes = [
	{
		path: '',
		component: DepositFormComponent
	}
]

@NgModule({
	declarations: [
		DepositFormComponent
	],
	imports: [
		CommonModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		ReactiveFormsModule,
		ButtonModule,
		FormsModule,
		CheckboxModule,
		RouterModule.forChild(routes)
	]
})
export class DepositFormModule { }
