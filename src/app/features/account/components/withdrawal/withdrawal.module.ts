import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalComponent } from './withdrawal.component';
import { RouterModule, Routes } from '@angular/router';
import { TagModule } from 'primeng/tag';
import { Table, TableModule } from 'primeng/table';
import { FormComponent } from './components/form/form.component';
import { TableComponent } from './components/table/table.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputMaskModule } from 'primeng/inputmask';
import { ApplicationComponent } from './components/application/application.component';
import { AccordionModule } from 'primeng/accordion';

const routes: Routes = [
	{
		path: '', component: WithdrawalComponent,
		children: [
			{
				path: '', component: TableComponent
			},
			{
				path: 'form', component: FormComponent
			}, {
				path: ':id', component: ApplicationComponent
			}
		]
	}
]

@NgModule({
	declarations: [
		WithdrawalComponent,
		FormComponent,
		TableComponent,
		ApplicationComponent
	],
	imports: [
		CommonModule,
		AccordionModule,
		TagModule,
		TableModule,
		DialogModule,
		FormsModule,
		TooltipModule,
		InputGroupAddonModule,
		DropdownModule,
		InputGroupModule,
		CheckboxModule,
		InputTextModule,
		ButtonModule,
		InputMaskModule,
		RouterModule.forChild(routes)
	]
})
export class WithdrawalModule { }
