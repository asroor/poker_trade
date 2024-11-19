import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
	{
		path: '', component: DepositComponent
	}
]

@NgModule({
	declarations: [DepositComponent],
	imports: [
		CommonModule,
		TableModule,
		TagModule,
		FormsModule,
		RouterModule.forChild(routes)
	]
})
export class DepositModule { }
