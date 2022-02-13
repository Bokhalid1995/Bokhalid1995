import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../Navbars/_nav';
import { navItemsArabic } from '../../Navbars/_navArabic';
import { navItemsAdmin } from '../../Navbars/_navAdmin';
import { TranslateService } from '@ngx-translate/core';
import { AuthGuardService } from '../../shared/auth-guard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItemsRender ;
  useractive:string;
  lang:string;
  isAuthenticated:string;
  AuthData: AuthGuardService = new AuthGuardService();
  constructor(private rout:Router,private translate:TranslateService){

  }
  ngOnInit(): void {
    // this.lang=localStorage.getItem('lang') || 'en';
    this.AuthData.getToken();
    this.useractive =this.AuthData.username;
    // this.isAuthenticated = localStorage.getItem('token');
    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;
    if(this.lang == "ar"){
      document.documentElement.dir = "rtl";
    }else{
      document.documentElement.dir = "ltr";
    }
    if (this.lang == 'en'){
      if (this.useractive == "hosny"){
        this.navItemsRender = navItems ;
      }else{
        this.navItemsRender =  navItemsAdmin;
      }
   }else {
       this.navItemsRender = navItemsArabic ;
   }
  }
  
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.rout.navigateByUrl('/login');
  }
  changeLang(lang) {
    localStorage.setItem('lang', lang);
    this.translate.use(lang);
    document.documentElement.lang = lang;
    if(this.lang == "ar"){
      document.documentElement.dir = "rtl";
    }else{
      document.documentElement.dir = "ltr";
    }
    window.location.reload();

  }
}
