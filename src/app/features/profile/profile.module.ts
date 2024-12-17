import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { ProfileComponent } from "./profile.component";
import { RouterModule, Routes } from "@angular/router";
import { InputTextModule } from "primeng/inputtext";
import { ButtonModule } from "primeng/button";
import { InputGroupModule } from "primeng/inputgroup";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputGroupAddonModule } from "primeng/inputgroupaddon";
import { DialogModule } from "primeng/dialog";
import { InputOtpModule } from "primeng/inputotp";

const routes: Routes = [
	{
		path: "",
		component: ProfileComponent,
		children: [
			{
				path: "token/:token",
				component: ProfileComponent,
			},
			{
				path: "**",
				redirectTo: "profile",
				pathMatch: "full",
			},
		],
	},
];

@NgModule({
	declarations: [ProfileComponent],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		InputTextModule,
		ButtonModule,
		InputGroupModule,
		FormsModule,
		InputOtpModule,
		InputGroupAddonModule,
		ReactiveFormsModule,
		DialogModule,
	],
	providers: [DatePipe]
})
export class ProfileModule { }
