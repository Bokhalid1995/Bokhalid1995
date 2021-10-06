import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginProcessService } from '../../shared/login-process.service';

@Component({
  selector: 'app-login-public',
  templateUrl: './login-public.component.html'
})
export class LoginPublicComponent implements OnInit {
  lang:string;
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
    this.service.loginPublicResponse(formData.value).subscribe(
      (res:any) => {
      
        this.rout.navigateByUrl('/patientdata');
        formData.reset();
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
  findName(searchid:string){
    return this.service.getNameRecieption(searchid).subscribe((res: {}) => {
     this.userselected = res as string;
    

     if (this.userselected == "Username Not Found"){
      this.service.loginDetails.nameen = ""
      this.toastr.error(this.userselected as string, "Warning!");
     }else{
      this.service.loginPublic.nameen = this.userselected;
     }
   })
}

}
