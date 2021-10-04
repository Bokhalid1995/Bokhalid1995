import { Component, OnInit } from '@angular/core';
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

}
