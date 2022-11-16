import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    HostBinding
} from '@angular/core';
import {UntypedFormGroup, UntypedFormControl, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {AppService} from '@services/app.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Columns, Config, DefaultConfig  } from 'ngx-easy-table';

@Component({
    selector: 'app-user-list',
    templateUrl: './userlist.component.html',
    styleUrls: ['./userlist.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

    public pageLoading = false;
    public configuration: Config;
    public columns: Columns[];    
    users: [];

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private toastr: ToastrService,
        private userService: UserService
    ) {}

    ngOnInit(): void {
        this.configuration = { ...DefaultConfig };
        // this.configuration.searchEnabled = true;
        // ... etc.
        this.columns = [
          { key: 'name', title: 'Name' },
          { key: 'email', title: 'Email' },
          { key: 'role', title: 'Role' },
          { key: 'isEmailVerified', title: 'Is Verified' },
        ];
        this.userService.list()
        .subscribe( resp => {
            console.log("user resp >", resp)
            this.users = resp?.results
        })
    }

    ngOnDestroy() {
        // todo later
    }    

}
