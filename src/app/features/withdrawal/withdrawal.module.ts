import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawalComponent } from './withdrawal.component';
import { RouterModule, Routes } from '@angular/router';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

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
		ReactiveFormsModule,
		NgxMaskDirective, NgxMaskPipe,
		RouterModule.forChild(routes)
	],
	providers: [provideNgxMask()]
})
export class WithdrawalModule { }
