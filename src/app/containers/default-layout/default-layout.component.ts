import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit{
  public sidebarMinimized = false;
  public navItems = navItems;
  useractive:string;
  constructor(private rout:Router){

  }
  ngOnInit(): void {
    this.useractive = localStorage.getItem('username')
    
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }
  logOut(){
    localStorage.removeItem('token');
   
    this.rout.navigateByUrl('/login');
  }
}
