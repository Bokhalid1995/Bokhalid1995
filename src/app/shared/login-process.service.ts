import { Injectable } from '@angular/core';
import { LoginProcess } from './models/login-process.model';
import { registerProcess } from './models/Register-process.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginProcessService {
  decodeToken:any;

  constructor(private http: HttpClient) { 
  
  }
  jwtHelper = new JwtHelperService()
  loginDetails: LoginProcess = new LoginProcess();
  registerDetails:  registerProcess = new registerProcess();
  dataRetrieved: any[];
  status: string;
  readonly baseURL = 'https://localhost:5001/api/UserLogin/';

  loginResponse(loginDetails:any) {
    return this.http.post(this.baseURL + "login" , loginDetails ).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken= this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('username',this.decodeToken.unique_name);
          localStorage.setItem('userid',this.decodeToken.nameid);
          console.log(this.decodeToken);
        }
      })
    );
  }
  getUserName(id:any){
    let params = new HttpParams().set('Id',id);
    return this.http.get(this.baseURL + "GetUserName",{params:{'Id': id} , responseType: 'text'});
  }
  registerResponse(registerDetails:any) {

    return this.http.post(this.baseURL + "Register" , registerDetails );
  }
  registerAdminResponse(registerDetails:any,enteredbyid:any) {
    const params = {'enteredbyid' : enteredbyid };
     const Data = Object.assign(registerDetails, params);
     return this.http.post(this.baseURL + "Register" , Data );
   }
    
    
}
