import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../commons/service/common.service';
import { SharedService } from '../../commons/service/shared.service';
import { AppSettings } from '../../commons/setting/app_setting';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';
declare var require: any;

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  public loginForm: FormGroup;
  public hide = true;
  public attemptCount = 0;
  public loading = false;
  public submitted = false;
  public loginmessageError:any;
  public currentTabActive = 'login';
  public verifyEmail: any;
  public verifyPhone: any;
  public recordGet: any;
  public isOtpVerify = false;
  public newTokan: any;
  public passwordSpaceCheck: string = null;
  public countSpace = 1;
  public searchBoxError = false;
  public emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';

  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public location: Location) { }

  ngOnInit(): void {
    this.sharedService.updateUserType.next(null);
    if(!localStorage.getItem("access_token")){
      localStorage.removeItem('user_type');
    }

    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[\S]+$/)]]
    });
  }

  loginFormSubmit({ value, valid }) {
    this.submitted = true;
    this.loginmessageError=null;
    if (valid) {
      this.loading = true;
      let APIparams = {
        apiKey: AppSettings.APIsNameArray.AUTH.LOGIN,
        uri: '',
        postBody: value,
      };
      this.commonService.post(APIparams).subscribe(
        (success) => {
          if (success.success === true) {
            this.newTokan=success.user.accessToken;
            localStorage.setItem('username', success.user.username);
            localStorage.setItem('user_type', success.user.role);
            localStorage.setItem('userId', success.user.userId);
            localStorage.setItem('access_token', success.user.accessToken);
            localStorage.setItem('refreshToken', success.user.refreshToken);
            this.sharedService.updateTokenData.next(success.user);
            this.sharedService.updateUserType.next(success.user.userType);
           window.location.assign('/blog/list');
          } 
          else {
            this.loading = false;
            this.loginmessageError = success.message;
          }
        },
        (error) => {
          this.loading = false;
          if (error.status === 401) {
            this.loginmessageError = error.error.message;
           }
        }
      );
    }
  }

  goToForgotPassword(){
    this.router.navigate(['forgot-password']);
  }
  signUp(){
    this.router.navigateByUrl('/sign-up');

  }

  
  showHidePassword(hide:any){
    if(hide==true){
      this.hide = false;
    }else{
      this.hide = true;
    }
  }
  
}
