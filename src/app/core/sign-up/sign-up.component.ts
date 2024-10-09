import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../../commons/service/common.service';
import { SharedService } from '../../commons/service/shared.service';
import { AppSettings } from '../../commons/setting/app_setting';
import { MatDialog } from '@angular/material/dialog';
import { Location } from '@angular/common';

declare var require: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  public sendDotNumber:any;
  public signUpForm: FormGroup;
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
  public dotNumber: any;
  public emailID: any;
  public emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$';
  public getDotNumber:any;
  public userSearchRecord:any=[];
  public countryList: any;
  public defualtCountryFlag:any;
  public getRecord:any;
 public configData:any;




  constructor(private formBuilder: FormBuilder,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    public sharedService: SharedService,
    public location: Location) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', []],
      username: ['', [Validators.required, Validators.maxLength(64)]],
      // mobile: ['', [Validators.required, Validators.pattern('^-?[0-9]\\d*(\\.\\d{1,3})?$'),Validators.minLength(10),Validators.maxLength(10),]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16), Validators.pattern(/^[\S]+$/)]],
      role: ['',[Validators.required]]
    });
  }




  signUpFormSubmit({ value, valid }) {
    this.submitted = true;
    this.loginmessageError=null;
    if (valid) {
      this.loading = true;
      let APIparams = {
        apiKey: AppSettings.APIsNameArray.AUTH.SIGNUP,
        uri: '',
        postBody: value,
      };
      this.commonService.post(APIparams).subscribe(
        (success) => {
          console.log(success,'success')
          this.loading=false;
          if (success.success === true) {
            localStorage.setItem('username', success.user.username);
            localStorage.setItem('user_type', success.user.role);
            localStorage.setItem('userId', success.user.userId);
            localStorage.setItem('access_token', success.user.accessToken);
            localStorage.setItem('refreshToken', success.user.refreshToken);
            this.sharedService.updateTokenData.next(success.user);
            window.location.assign('/blog/list');
          } else {
          this.submitted=false;
            this.loading = false;
            this.loginmessageError = success.message;
          }
        },
        (error) => {
          this.loading = false;
          this.submitted=false;
          if (error.status === 401) {
            this.loginmessageError = error.message;
           }
        }
      );
    }
  }
  signIn(){
    this.router.navigate(['sign-in']);
  }
  showHidePassword(hide:any){
    if(hide==true){
      this.hide = false;
    }else{
      this.hide = true;
    }
  }


  selectUserRole(event:any){
    console.log(event,'event-----------<')
    this.signUpForm.get('role').setValue(event)
    console.log(this.signUpForm.controls,'control')
    // this.getRecord = this.countryList.filter((item) => item.code == event);
    // this.defualtCountryFlag = this.getRecord[0]?.flag;
  }
}
