import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent
	}
];

@NgModule({
	declarations: [
		HomeComponent
	],
	imports: [
		CommonModule,
		TableModule,
		ChipModule,
		DropdownModule,
		ReactiveFormsModule,
		ButtonModule,
		RouterModule.forChild(routes)
	]
})
export class HomeModule { }
