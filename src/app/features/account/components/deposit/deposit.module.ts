import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './deposit.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BidComponent } from './components/bid/bid.component';
import { TableComponent } from './components/table/table.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormComponent } from './components/form/form.component';
import { CheckboxModule } from 'primeng/checkbox';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputTextModule } from 'primeng/inputtext';
import { BlockUIModule } from 'primeng/blockui';
import { PanelModule } from 'primeng/panel';

const routes: Routes = [
	{
		path: '', component: DepositComponent,
		children: [
			{
				path: '', component: TableComponent
			},
			{
				path: 'form/:id', component: FormComponent
			},
			{
				path: ':id', component: BidComponent
			}
		]
	}
]

@NgModule({
	declarations: [DepositComponent, BidComponent, TableComponent, FormComponent],
	imports: [
		CommonModule,
		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		TableModule,
		TagModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		BlockUIModule,
		PanelModule,
		DialogModule,
		FormsModule,
		RouterModule.forChild(routes)
	]
})
export class DepositModule { }
