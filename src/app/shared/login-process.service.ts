import { Injectable } from '@angular/core';
import { LoginProcess } from './models/login-process.model';
import { registerProcess } from './models/Register-process.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ServiceRecipient } from './models/Servicerecipient.model';


@Injectable({
  providedIn: 'root'
})
export class LoginProcessService {
  decodeToken:any;

  constructor(private http: HttpClient) { 
  
  }
  jwtHelper = new JwtHelperService()
  loginDetails: LoginProcess = new LoginProcess();
  loginPublic: ServiceRecipient = new ServiceRecipient();
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
          // localStorage.setItem('username',this.decodeToken.unique_name);
          // localStorage.setItem('userid',this.decodeToken.nameid);
          console.log(this.decodeToken);
        }
      })
    );
  }
  loginPublicResponse(loginDetails:any) {
    return this.http.post("https://localhost:5001/api/Servicerecipient/login" , loginDetails ).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodeToken= this.jwtHelper.decodeToken(user.token);
          localStorage.setItem('fullname',this.decodeToken.unique_name);
          localStorage.setItem('userid',this.decodeToken.nameid);
          console.log(this.decodeToken);
        }
      })
    );
  }

  getUserName(id:any){
  
    return this.http.get(this.baseURL + "GetUserName",{params:{'Id': id} , responseType: 'text'});
  }
  getNameRecieption(id:string){
    
    return this.http.get("https://localhost:5001/api/Servicerecipient/GetServiceRecipientNameById",{params:{'nationalNumber': id} , responseType: 'text'});
  }

  registerResponse(registerDetails:any) {

    return this.http.post(this.baseURL + "Register" , registerDetails );
  }
  registerAdminResponse(registerDetails:any,enteredbyid:any) {
    const params = {'enteredbyid' : enteredbyid,'lastupdatedbyid' : enteredbyid };
     const Data = Object.assign(registerDetails, params);
     return this.http.post(this.baseURL + "Register" , Data );
   }
    
    
}
