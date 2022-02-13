import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  decodeToken:any;
  username:string;
  userId:string;
  // userGroupid:string;
  // userCode:string;
  jwtHelper = new JwtHelperService()
  constructor() { }

  getToken(){
    this.decodeToken= this.jwtHelper.decodeToken(localStorage.getItem('token'));
    this.username=this.decodeToken.unique_name;
    this.userId =this.decodeToken.nameid;
    // this.userGroupid = this.decodeToken.role;
    // this.userCode=this.decodeToken.certserialnumber;
  if(this.decodeToken.unique_name != null){
    return true;
  }else{
    return false;
  }
  }
}
