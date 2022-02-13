import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private Authguardservice: AuthGuardService, private router: Router){}
  canActivate() : boolean {
    if (!this.Authguardservice.getToken()) {  
      this.router.navigateByUrl("/login");  
  }  else{
    return this.Authguardservice.getToken(); 
  }
 
}
  
}
