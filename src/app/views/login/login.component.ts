import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {  ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginProcess } from '../../shared/models/login-process.model';
import { LoginProcessService } from '../../shared/login-process.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styles: [` .card-group {
  
    box-shadow: 5px 5px 15px #bbb;
  
  } #cover-img {
    border-rudios: 15px; 
    border: 2px #333 solid; 
  } `]

})
export class LoginComponent implements OnInit {
  lang: string;
  userselected:string;

 

  constructor(public translate: TranslateService, public service: LoginProcessService,private rout:Router,private toastr:ToastrService) { 
  
  }
  ngOnInit() {
    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;
  }

  changeLang(lang) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    document.documentElement.lang = lang;
  }
  onSubmitt(formData:NgForm){
    this.service.loginResponse(formData.value).subscribe(
      (res:any) => {
      
        this.rout.navigateByUrl('/dashboard');
        this.clearAfterLogin();
        console.log(res); },
      err => {
        if (this.lang == 'en'){
               this.toastr.error("Please enter valid username and password" , "Warning!");
        }else {
               this.toastr.error("تاكد من بيانات الدخول" ,"خطأ!");
        }
      }
    )
  }
  findUserName(searchid:number){
    return this.service.getUserName(searchid).subscribe((res: {}) => {
     this.userselected = res as string;
     if (this.userselected == "Username Not Found"){
      this.service.loginDetails.nameen = ""
      this.toastr.error(this.userselected as string, "Warning!");
     }else{
      this.service.loginDetails.nameen = this.userselected;
     }
   })
}
clearAfterLogin(){
  this.service.loginDetails.id = 0
  this.service.loginDetails.nameen = ""
  this.service.loginDetails.password = ""
}
}
