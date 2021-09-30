import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginProcessService } from '../../shared/login-process.service';
import { Departments } from '../../shared/models/Departments.model';
import { registerProcess } from '../../shared/models/Register-process.model';
import { Sections } from '../../shared/models/Sections.model';
import { Units } from '../../shared/models/Units.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html'
})
export class UserAdminComponent implements OnInit {
  repasswordcheck:string = '';
  classInvalid:boolean = false;
  searchEmpty:boolean = true;
  lang:string = '';
  submitt:string='Create Account'
  Reset:string="Reset"
  isAuthenticated: string;
  useractive: string;
  pager: number = 1;
  namePrev: string; nameArPrev: string; sectionPrev: string; deptPrev: string; unitPrev: string; createdOnPrev: string; createdByPrev: string;



  unitsData: Units = new Units();
  sectionData: Sections = new Sections();
  deptsData: Departments = new Departments();
  usersData: registerProcess = new registerProcess();
  lastPage: registerProcess = new registerProcess();
  userlist: registerProcess[];
  @ViewChild('PreviewUser') modal: ModalDirective;

  constructor(private rout: Router, public service: LoginProcessService, public service1: PublicServiciesService, private toastr: ToastrService,public translate:TranslateService ) { }


  ngOnInit(): void {
    this.getUsersPgination(this.pager);
    this.isAuthenticated = localStorage.getItem('token');

    if (this.isAuthenticated == null) {
      this.rout.navigateByUrl('/login');
    }
    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

    this.service1.getUnits().subscribe((res: {}) => {
      this.unitsData = res as Units;
    });
    this.service1.getSections().subscribe((res: {}) => {
      this.sectionData = res as Sections;
    });
    this.service1.getDepts().subscribe((res: {}) => {
      this.deptsData = res as Departments;
    });
  }

  onSaveRecords(formData:NgForm) {
    if (this.repasswordcheck != this.service.registerDetails.password) {
      this.classInvalid = true;
    } else {
      this.classInvalid = false;
      this.service.registerResponse(formData.value).subscribe(
        (res: any) => {
          this.toastr.success("Data registred Successfully", "Done!");
          this.allUers();
          formData.reset();
          console.log(res);
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error("Please enter valid registry Data", "Warning!");
          } else {
            this.toastr.error("تاكد من بيانات التسجيل", "خطأ!");
          }
        }
      );
    }
  }

  allUers() {
    this.service1.getUsers().subscribe((res: {}) => {
      this.usersData = res as registerProcess;
    });
  }
  getUser(UIS: number) {
    this.service1.getUserByid(UIS).subscribe((res: {}) => {
      this.usersData = res as registerProcess;
    });
  }
  showDataUser(user: any) {
    this.service1.getUserByid(user.id).subscribe((res: {}) => {
      this.userlist = res as registerProcess[];
      this.userlist.forEach(userInfo => {
        this.namePrev = userInfo.nameen;
        this.nameArPrev = userInfo.name;
        this.createdOnPrev = userInfo.creationdate;
        this.createdByPrev = userInfo.enteredbyName;
        this.sectionPrev = userInfo.sectionName;
        this.deptPrev = userInfo.depatmentName;
        this.unitPrev = userInfo.unitName;
      });
    });
    console.log(this.userlist);
    this.modal.show();
    this.userlist = [];
  }
  onDelete(id:number) {

    return this.service1.deleteUser(id).subscribe(
      response => {
        this.toastr.warning("user deleted Successfully", "Done!");
      },
      error => { this.toastr.success("user deleted Successfully", "Done!"); }
    );

  }
  getUsersPgination(page: number) {

    this.service1.getUserBypage(page).subscribe((res: {}) => {

      this.usersData = res as registerProcess;
      if (!Object.keys(this.usersData).length) {
        this.usersData = this.lastPage;
        this.toastr.warning("This is The last page", "warning!");
      }
    });


  }
  fillForm(users:registerProcess){
    this.submitt = "Update";
    this.Reset = "Reset"
    this.Reset = "Cancel Update"
this.service.registerDetails = Object.assign({} , users) ;
  }
  resetForm(form:NgForm){
    if(this.Reset == "Cancel Update"){
    this.submitt = "Create Account";
    form.reset();
  }
    else { form.reset(); }
    

  }
  counterPlus() {

    if (this.pager < 1) {
      this.pager = 1;
    } else {
      this.pager = this.pager + 1;
      this.getUsersPgination(this.pager);
    }
    this.lastPage = this.usersData;
  }
  counterMinus() {
    if (this.pager < 1) {
      this.pager = 1;
    } else {
      this.pager = this.pager - 1;
      this.getUsersPgination(this.pager);
    }
    this.lastPage = this.usersData;
  }

}
