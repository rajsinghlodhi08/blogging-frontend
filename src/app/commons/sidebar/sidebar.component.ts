import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public toggleDropdown: boolean = false;
  public toggleDropdownReview: boolean = false;
  public toggleDropdownRcalculatorReview:boolean=false;
  public toggleDropdownDigitalMarketing: boolean = false;
  public toggleDropdownForecastAvailability: boolean = false;
  public toggleDropdownLoadQuote: boolean = false;
  public getUserData: any;
  public userType: any;
  public totalStrenth: any = 0;
  public strengthdisabled = true;
  public routeSub: any;
  public activeSubTab: any;

  constructor(
    private sharedService: SharedService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.routeSub = this.router.events.subscribe((event) => {
      if (event) {
        if (event instanceof NavigationEnd) {
          if ((event.url.includes('/blog')) || (event.url.includes('/blog/list')) || (event.url.includes('/blog/detail'))) {
            this.activeSubTab = 'blog';
          }
          else {
            this.activeSubTab = '';
          }
        }
      }
    });
    this.sharedService.updateTokenData.subscribe((userData) => {
      this.userCheckLogin();
    });
    this.userCheckLogin();
    this.userType = localStorage.getItem('user_type');
    this.sharedService.logOutuser.subscribe((userData) => {
      this.getUserData = "";
    });
  }

  userCheckLogin() {
    if (localStorage.getItem("access_token")) {
      this.userType = localStorage.getItem('user_type');
    } else {
      this.userType = localStorage.getItem('user_type');
    }
  }
  userInfo(userDtail) {
    this.getUserData = userDtail;
  }

  menuToggleEvent(event, type) {
    if (type == 'blog') {
      event.preventDefault();
      this.toggleDropdown = !this.toggleDropdown;
    } 

  }
  logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.sharedService.logOutuser.next(null);
    this.sharedService.updateTokenData.next(null);
    this.sharedService.setInfo(null);
    this.router.navigate(['/sign-in'])
  }
  refreshTab() {
    location.reload();
  }
  showStrength(totalStrenth: any) {
    return Math.round(totalStrenth);
  }
  activeMenu(type:any) {
    if (type == 'blog') {
      this.router.navigateByUrl('/blog/list')
      this.activeSubTab = 'blog'
    }
  }

}
