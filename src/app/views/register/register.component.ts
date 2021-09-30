import { Component, OnInit ,ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginProcessService } from '../../shared/login-process.service';
import { PublicServiciesService } from '../../shared/public-servicies.service';
import { registerProcess } from '../../shared/models/Register-process.model';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  lang:string;
  repasswordcheck: string = '';
  classInvalid: boolean = false;
   @ViewChild('ContinuBookig') modal: ModalDirective;
  constructor(public translate:TranslateService,private rout: Router, public service: LoginProcessService, public service1: PublicServiciesService, private toastr: ToastrService) {
   
   }
  ngOnInit() {
    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;
  }
  onSaveRecords(formData: NgForm) {
    if (this.repasswordcheck != this.service.registerDetails.password) {
      this.classInvalid = true;
    } else {
      this.classInvalid = false;
      this.service.registerResponse(formData.value).subscribe(
        (res: any) => {
          formData.reset();
          this.modal.show();
          console.log(res);
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error(err.error, "Warning!");
          } else {
            this.toastr.error(err.error ,"خطأ!");
          }
        }
      )
    }
  }
    

}
