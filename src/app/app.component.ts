import { Component } from '@angular/core';
import { ScriptService } from './commons/service/script.service';
import { Router, NavigationEnd,  Event } from '@angular/router';
import { CommonService } from './commons/service/common.service';
import { SharedService } from './commons/service/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'blogging-platform-angular';
  public isLoggedIn = false;
  countryListData: any;
  public skeletonLoader = false;
  private initialNavigationPerformed = false;

  constructor(
    private scriptService: ScriptService,
    private sharedService: SharedService,
    private commonService: CommonService,
    private router: Router,
) { }

ngOnInit() {
  if(localStorage.getItem("access_token")){
    this.getUserProfile();
  }
  this.scriptService.load().then(() => { });
  this.router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.handleNavigation(event);
    }
  });

  this.sharedService.updateTokenData.subscribe(() => {
    this.userCheckLogin();
  });

  this.userCheckLogin();
}

handleNavigation(event: NavigationEnd) {
  const publicRoutes = ['/', '/sign-in', '/sign-up'];
  const currentUrl = event.url;

  // if (publicRoutes.includes(currentUrl)) {
  //   this.handlePublicRoutes(currentUrl);
  // } else {
  //   this.handleProtectedRoutes();
  // }

}

handlePublicRoutes(url: string) {
  const accessToken = localStorage.getItem("access_token");
  // if (accessToken ) {
  //   this.router.navigateByUrl('/blog/list');
  //   this.updateLoginStatus(true);
  // } 
  // else if (!accessToken) {
  //   this.router.navigateByUrl('/sign-in');
  // } else {
  //   this.updateLoginStatus(false);
  // }
}

handleProtectedRoutes() {
  const accessToken = localStorage.getItem("access_token");
//  if (!accessToken) {
//     this.updateLoginStatus(true);
//     this.router.navigateByUrl('/sign-in');
//   }
}

updateLoginStatus(isLoggedIn: boolean) {
  this.isLoggedIn = isLoggedIn;
  const body = document.getElementsByTagName('body')[0];
  if (isLoggedIn) {
    body.classList.remove('hidden_side_menu', 'before_after_login');
    body.classList.add('app_after_login');
  } else {
    body.classList.add('hidden_side_menu', 'before_after_login');
    body.classList.remove('app_after_login');
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
      this.sharedService.setInfo(ServerRes.response);
      this.sharedService.userDataPass.next(ServerRes.response);
      this.skeletonLoader = false;
    }
    else {
      this.skeletonLoader = false;
    }
  });
}

userCheckLogin() {
  if (localStorage.getItem("access_token")) {
    this.updateLoginStatus(true);
  } else {
    this.updateLoginStatus(false);
  }
}

}


