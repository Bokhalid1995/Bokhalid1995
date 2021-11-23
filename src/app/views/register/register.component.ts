import { AfterContentInit, AfterViewInit, Component, OnInit ,ViewChild } from '@angular/core';
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
import { Icds } from '../../shared/models/Icds.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  lang:string;
  list = [];

  validPassword:string;
  validEmail:string;
  validIdendityID:string;
  validPhone:string;

  BODitilite:Date = new Date("1995-01-01");
  repasswordcheck: string = '';

  classInvalidEmail:boolean = false;
  classInvalidPass:boolean = false
  classInvalidIdendityID: boolean = false;
  classInvalidPhone: boolean = false;
  isFilled:boolean = false;

  Icds:Array<Icds>; 
  IdTypes:IdTypes = new IdTypes();
   @ViewChild('ContinuBookig') modal: ModalDirective;
  constructor(public translate:TranslateService,private rout: Router, public service: BookingService, public service1: PublicServiciesService, private toastr: ToastrService) {
 

   }
  ngOnInit() {
    
    this.service.getIcds().subscribe((res:Array<Icds>) => {
      this.Icds = res ;
      this.Icds.forEach(item => {
        this.list =[
          { name :  item.name , cheched : false}
        ]
     
       });
    })
    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

    this.service.getIdType().subscribe((res: {}) => {
      this.IdTypes = res as IdTypes;
    })
  }
  onSaveRecords(formData: NgForm) {
    if (this.classInvalidEmail  || this.classInvalidPass || this.classInvalidIdendityID || this.classInvalidPhone) {
      if (localStorage.getItem('lang') == 'en') {
        this.toastr.error("You Must Fill All Data", "Warning!");
      } else {
        this.toastr.error("خطأ" ," خطأ في ادخال البيانات   !");
      }
    } else {
      
      this.service.registerRecieptionService(formData.value).subscribe(
        (res: any) => {
          formData.reset();
          localStorage.setItem('fullname' , formData.value.nameen)
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

  /* Validations */

  checkEmail(email:string){
    if(email.includes("@")){
     // this.validEmail = "";
     // this.isFilled = true
      this.classInvalidEmail = false ;
    }else{
     // this.isFilled = false;
      this.classInvalidEmail = true ;
     // this.validEmail = "Enter Valid Email";
    }
  }

  checkRetypePassword(pass:string){
    if(pass == this.service.recieptiestDetails.password){
   //   this.validPassword = "";
     this.classInvalidPass = false ;
    }else{
      this.classInvalidPass = true ;
    //  this.validPassword = "Password Not Matching";
    }
  }
  checkLIdendityID(id:string , idType:string){
    if(idType == "1" && (id.length <= 0 || id.length != 10)){
      this.classInvalidIdendityID = true ;
     // this.validIdendityID = "Idendity must be 10 chars";
    }else{
    //  this.validIdendityID = "";
      this.classInvalidIdendityID = false ;
    }
  }
    
  checkPhone(phone:string){
    phone.toString()
    if(phone.toString().length != 0 && phone.toString().length == 9){
     // this.validPhone = "";
      this.classInvalidPhone = false ;
    }else{
      this.classInvalidPhone = true ;
      //this.validPhone = "Phone must be 10 chars";
    }
  }

}
