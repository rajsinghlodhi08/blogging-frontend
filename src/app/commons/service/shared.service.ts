import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AppSettings } from '../../commons/setting/app_setting';
import { AlertService } from '../service/alert.service';
import { CommonService } from '../service/common.service';

@Injectable({
  providedIn: 'root',
})

export class SharedService {
  public _config: any;
  public _address: any;
  public _userInfo:any;
  public userDataPass = new Subject<string>();
  public logOutuser = new Subject<string>();
  public updateTokenData = new Subject<string>();
  public updateUserType = new Subject<string>();

  constructor(
    public commonService: CommonService,
    public alertService: AlertService,
  ) { }
  
 getUrl(){
  let url = AppSettings.APIsNameArray.USER.USER;
  return url;
 }


 updateUserUrl(){
  let url = AppSettings.APIsNameArray.USER.USER;
  return url;
 }

 userRegistration(){
  let url= AppSettings.APIsNameArray.AUTH.SIGNUP;
  return url;
 }
   getFirstLetter(name) {
    let acronym;
    let countLength;
    if(name) {
      acronym = name.split(/\s/).reduce((response, word) => (response += word.slice(0, 1)), '');
      countLength = acronym.length;
      if (countLength === 1) {
        acronym = name.substr(0, 2).toUpperCase();
      } else if (countLength >= 2) acronym = acronym.substr(0, 2).toUpperCase();
    } else acronym = '';
    return acronym;
  }

  generateFakeSkeleton(count: number): Array<number> {
    const indexes = [];
    for (let i = 0; i < count; i++) {
      indexes.push(i);
    }
    return indexes;
  }

  public getConfig() {
    return this._config;
  }

  public setConfig(value: any) {
    if (value !== 'undefined') {
      this._config = value;
    }
  }

  public getAddress() {
    return this._address;
  }

  public setAddress(value: any) {
    if (value !== 'undefined') {
      this._address = value;
    }
  }
  public getInfo() {
    return this._userInfo;
  }

  public setInfo(value: any) {
    if (value !== 'undefined') {
      this._userInfo = value;
    }
  }
  
}
