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
import { AuthService } from '@services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    @HostBinding('class') class = 'login-box';
    public loginForm: UntypedFormGroup;
    public isAuthLoading = false;
    public isGoogleLoading = false;
    public isFacebookLoading = false;

    constructor(
        private renderer: Renderer2,
        private router: Router,
        private toastr: ToastrService,
        private appService: AppService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.renderer.addClass(
            document.querySelector('app-root'),
            'login-page'
        );
        this.loginForm = new UntypedFormGroup({
            email: new UntypedFormControl(null, Validators.required),
            password: new UntypedFormControl(null, Validators.required)
        });
    }

    async loginByAuth() {
        this.isAuthLoading = true;

        this.authService.login(this.loginForm.value)
        .subscribe( resp => {
           //do Stuff
           let token = resp["tokens"]["access"]["token"]
           console.log("auth response -> ", resp, token)
           if (token){
                localStorage.setItem('token', token);
                this.router.navigate(['/']);
            }           
           this.isAuthLoading = false;
        });        
        console.log("this.loginForm.value >> ",this.loginForm.value)

        // if (this.loginForm.valid) {
        //     this.isAuthLoading = true;
        //     await this.appService.loginByAuth(this.loginForm.value);
        //     this.isAuthLoading = false;
        // } else {
        //     this.toastr.error('Form is not valid!');
        // }
    }

    async loginByGoogle() {
        this.isGoogleLoading = true;
        await this.appService.loginByGoogle();
        this.isGoogleLoading = false;
    }

    async loginByFacebook() {
        this.isFacebookLoading = true;
        await this.appService.loginByFacebook();
        this.isFacebookLoading = false;
    }

    ngOnDestroy() {
        this.renderer.removeClass(
            document.querySelector('app-root'),
            'login-page'
        );
    }
}
