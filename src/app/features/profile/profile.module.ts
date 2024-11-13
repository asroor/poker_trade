import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule, Routes } from '@angular/router';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { DividerModule } from 'primeng/divider';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { InputGroupModule } from 'primeng/inputgroup';
import { ReactiveFormsModule } from '@angular/forms';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';

const routes: Routes = [
  {
    path:'',
    component: ProfileComponent
  }
];

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,

    RouterModule.forChild(routes),

    TabViewModule,
    InputTextModule,
    ButtonModule,
    AvatarModule,
    DividerModule,
    CardModule,
    MessageModule,
    InputGroupModule,
		InputGroupAddonModule,
		ReactiveFormsModule,
  ]
})
export class ProfileModule { }
