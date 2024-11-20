import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule } from '@angular/forms';
import { BidComponent } from './components/bid/bid.component';
import { TableComponent } from './components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

const routes: Routes = [
	{
		path: '', component: DepositComponent,
		children: [
			{
				path: '', component: TableComponent
			},
			{
				path: ':id', component: BidComponent
			}
		]
	}
]

@NgModule({
	declarations: [DepositComponent, BidComponent, TableComponent],
	imports: [
		CommonModule,
		TableModule,
		TagModule,
		FormsModule,
		ButtonModule,
		DialogModule,
		RouterModule.forChild(routes)
	]
})
export class DepositModule { }
