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
import { BookingService } from '../../shared/booking.service';
import { IdTypes } from '../../shared/models/IdTypes.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  lang:string;
  list :any[];
  repasswordcheck: string = '';
  classInvalidRegist: boolean = false;
  IdTypes:IdTypes = new IdTypes();
   @ViewChild('ContinuBookig') modal: ModalDirective;
  constructor(public translate:TranslateService,private rout: Router, public service: BookingService, public service1: PublicServiciesService, private toastr: ToastrService) {
   
   }
  ngOnInit() {
    this.list = 
    [
      {name :'Sugar',checked : false},
      {name :'Presure',checked : false},
    
    ];

    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

    this.service.getIdType().subscribe((res: {}) => {
      this.IdTypes = res as IdTypes;
    })
  }
  onSaveRecords(formData: NgForm) {
    if (this.repasswordcheck != this.service.recieptiestDetails.password) {
      this.classInvalidRegist = true;
    } else {
      this.classInvalidRegist = false;
      this.service.registerRecieptionService(formData.value).subscribe(
        (res: any) => {
          formData.reset();
          this.modal.show();
          console.log(res);
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error("Error Data Enserted", "Warning!");
          } else {
            this.toastr.error("خطأ" ," خطأ في ادخال البيانات   !");
          }
        }
      )
    }
  }
    

}
