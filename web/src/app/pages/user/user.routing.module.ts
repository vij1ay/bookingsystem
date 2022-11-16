import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
// import { AuthGuard } from "app/common/guards/auth.guards";
import { UserListComponent } from "./components/user-list/userlist.component";

const routes: Routes = [
	{
		path: "",
		component: UserListComponent,
		// canActivate: [AuthGuard],
		data: {
			module: ["users"],
			keyList: ["add", "edit", "delete", "view"],
		},
	},
	// {
	// 	path: "card",
	// 	component: TeamsCardComponent,
	// 	// canActivate: [AuthGuard],
	// 	data: {
	// 		module: ["users"],
	// 		keyList: ["add", "edit", "delete", "view"],
	// 	},
	// },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UsersRoutingModule {}
