import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonService } from '../../commons/service/common.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppSettings } from '../../commons/setting/app_setting';
import { environment } from '../../../environments/environment';
import { SharedService } from '../../commons/service/shared.service';
import { Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userType:any;
  public getUserData : any;
  public checkLogin =false;
  public checkLoginUserProfile =false;
  public mobile_leftMenu_css=true;
  public serverUrl :any;
  public urlMake :  any;
  public companyName:any;
  public urlSignUp:boolean=false;
  public accessToken:any
  public userName: any;

  constructor(
    private commonService: CommonService, 
    private sharedService: SharedService,
    private router: Router,
    private route:ActivatedRoute) {
     
    }

  ngOnInit(): void {
    this.accessToken = localStorage.getItem("access_token")
    this.route.queryParams.subscribe((params) => {
      if (Object.keys(params).length > 0) {
        if(params.dotNumber){
          this.urlSignUp=true
        }
      }
    })
    this.userName = localStorage.getItem('username');

    this.getUserData = this.sharedService.getInfo()
    console.log(this.getUserData,'------getUserData')
    this.sharedService.updateUserType.subscribe((userData:any) => {
      if(userData){
        this.userType = localStorage.getItem('user_type');
      }
    });
    this.userType = localStorage.getItem('user_type');
    this.serverUrl = environment.domain;
    this.sharedService.updateTokenData.subscribe((userData) => {
      console.log(userData,'----userData')
      this.userCheckLogin();
    });
    this.userCheckLogin();
  }
    
  logoRedirect(){
    if(!this.accessToken){
      this.router.navigateByUrl('/')
    }else if(this.accessToken){
        this.router.navigateByUrl('/blog/list');
    }
  }


  userCheckLogin(){
    if(localStorage.getItem("access_token")){
      this.getUserProfile();
        this.checkLogin=true;
        this.checkLoginUserProfile=true;
    }else{
     this.checkLoginUserProfile=false;
     this.checkLogin=false;
    }
   
  } 
  
  getUserProfile() {
    let uri = null;
    let newParams = {};
    if (newParams) uri = this.commonService.getAPIUriFromParams(newParams);
    let APIparams = {
      apiKey: this.sharedService.getUrl(),
      uri: uri,
    };
    this.commonService.getList(APIparams).subscribe((ServerRes) => {
      if (ServerRes.success === true) {
        this.getUserData = ServerRes.response; 
          this.checkLogin=true;
          this.checkLoginUserProfile=true;
        this.sharedService.setInfo(ServerRes.response);
        this.sharedService.userDataPass.next(ServerRes.response);
      }
    });
  }

  logout(){
    this.getUserData="";
    this.checkLoginUserProfile=false;
    this.checkLogin = false;
    localStorage.clear();
    sessionStorage.clear();
    this.sharedService.logOutuser.next(null);
    this.sharedService.updateTokenData.next(null);
    this.sharedService.setInfo(null);
    this.router.navigate(['/sign-in'])
  }

  mobMenuToggleEvent() {
    this.mobile_leftMenu_css=!this.mobile_leftMenu_css;
    if(!this.mobile_leftMenu_css){
      const body = document.getElementsByTagName('body')[0];
      body.classList.add('active_head_menu');
    }
    else{
      const body = document.getElementsByTagName('body')[0];
      body.classList.remove('active_head_menu');
    }
  }
  

  handleRedirect(type:string){ 
    if(type === 'viewBlog') {
      window.location.assign('/blog/list')
    }
    else if (type === 'sign-in') {
      window.location.assign('/sign-in')
    }
     else if (type === 'sign-up') {
      window.location.assign('/sign-up')

     }
  }
  
}
