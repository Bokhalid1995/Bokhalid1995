import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../Navbars/_nav';
import { navItemsArabic } from '../../Navbars/_navArabic';
import { navItemsAdmin } from '../../Navbars/_navAdmin';

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
  constructor(private rout:Router){

  }
  ngOnInit(): void {
    this.useractive = localStorage.getItem('username')
    this.lang=localStorage.getItem('lang') || 'en';
  /*  this.isAuthenticated = localStorage.getItem('token');
    if (this.useractive == null) {
      this.rout.navigateByUrl('/login');
    }
    if (this.lang == 'en'){
      if (this.useractive == "hosny"){
        this.navItemsRender = navItems ;
      }else{
        this.navItemsRender =  navItemsAdmin;
      }
}else {
  this.navItemsRender = navItemsArabic ;
}*/
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut(){
    localStorage.removeItem('token');
   
    this.rout.navigateByUrl('/login');
  }
}
