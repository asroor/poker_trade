import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalComponent } from './withdrawal.component';
import { Routes } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';

const routes: Routes = [
	{
		path: '', component: WithdrawalComponent
	}
]

@NgModule({
	declarations: [
		WithdrawalComponent
	],
	imports: [
		CommonModule,
		TagModule,
		TableModule
	]
})
export class WithdrawalModule { }
