import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
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
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { ImageModule } from 'primeng/image';
import { InputMaskModule } from 'primeng/inputmask';

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
		RouterModule.forChild(routes),
		FormsModule,

		InputTextModule,
		InputGroupModule,
		InputGroupAddonModule,
		TableModule,
		InputMaskModule,
		TagModule,
		ReactiveFormsModule,
		ButtonModule,
		CheckboxModule,
		BlockUIModule,
		PanelModule,
		DialogModule,
		DropdownModule,
		ImageModule,
		CalendarModule,
	],
	providers: [DatePipe,]
})
export class DepositModule { }
