import { NgModule } from '@angular/core';

import { TableModule } from 'ngx-easy-table';
import { UsersRoutingModule } from './user.routing.module';
import { UserListComponent } from './components/user-list/userlist.component';

@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    TableModule,
    UsersRoutingModule
  ],
  providers: [],
  bootstrap: []
})
export class UserModule {}