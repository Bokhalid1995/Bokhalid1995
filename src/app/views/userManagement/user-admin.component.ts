import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LoginProcessService } from '../../shared/login-process.service';
import { Departments } from '../../shared/models/Departments.model';
import { Pagination } from '../../shared/models/Pagination.model';
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
  isUpdate:boolean = false;

  lang:string = '';
  submitt:string='Create Account'
  Reset:string="Reset"
  isAuthenticated: string;
  useractive: string;
  pager: number = 1;
  namePrev: string; nameArPrev: string; sectionPrev: string; deptPrev: string; unitPrev: string; createdOnPrev: string; createdByPrev: string;
  Pagination :Pagination = new Pagination();


  unitsData: Units = new Units();
  sectionData: Sections = new Sections();
  deptsData: Departments = new Departments();
  usersData: registerProcess = new registerProcess();

  userlist: registerProcess[];
  @ViewChild('PreviewUser') modal: ModalDirective;

  constructor(private rout: Router, public service: LoginProcessService, public service1: PublicServiciesService, private toastr: ToastrService,public translate:TranslateService ) { }


  ngOnInit(): void {
    this.getUsersPgination(this.pager);
    this.isAuthenticated = localStorage.getItem('token');
    this.useractive = localStorage.getItem('userid');
    if (this.isAuthenticated == null) {
      this.rout.navigateByUrl('/login');
    }
    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Reset"
      this.submitt = "Create New";
    } else {
      this.Reset = "إعادة تعيين"
      this.submitt = "إضافة جديد";
    }

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
      if(formData.value.id != null){
        
        return this.service1.UpdateUser(formData.value , formData.value.id).subscribe(
          response => {
            formData.reset();
            if (localStorage.getItem('lang') == 'en') {
              this.Reset = "Reset"
              this.submitt = "Create Account";
              this.toastr.success("Account Updated Successfully", "Done!");
            } else {
              this.Reset = "إعادة تعيين"
              this.submitt = "إضافة جديد";
              this.toastr.success("تم تعديل البيانات بنجاح" ,"تم!");
            }
            this.isUpdate = false;
            this.allUers();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.classInvalid = false;
      this.service.registerAdminResponse(formData.value , this.useractive).subscribe(
        (res: any) => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.success("Added Success", "Done!");
          } else {
            this.toastr.success("تم حفظ البيانات بنجاح" ,"تم!");
          }
          this.allUers();
          formData.reset();
       
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
  }

  allUers() {
    this.service1.getUsers().subscribe((res: any) => {
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
  /* console.log(this.userlist);*/
    this.modal.show();
    this.userlist = [];
  }
  onDelete(id:number) {

    return this.service1.deleteUser(id).subscribe(
      response => {
       
        if (localStorage.getItem('lang') == 'en') {
          this.toastr.warning("user deleted Successfully", "Done!");
        } else {
          this.toastr.warning("تم حذف البيانات بنجاح", "تمت!");
        }
      },
      error => { 
      if (localStorage.getItem('lang') == 'en') {
        this.toastr.error("Can't be deleted", "Error!");
      } else {
        this.toastr.warning("لا يمكن حذف البيانات", "خطأ!");
      }
    
    }
    );

  }
  getUsersPgination(event: any) {

    this.service1.getUserBypage(event.page).subscribe((res: any) => {

      this.usersData = res.users as registerProcess;
      this.Pagination.totalCount = res.totalCount;
      this.Pagination.currentPage = res.currentPage;
      this.Pagination.pageSize = res.pageSize;
      this.Pagination.totalPages = res.totalPages;
    
    });


  }
  fillForm(users:registerProcess){
    this.isUpdate = true;
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
this.service.registerDetails = Object.assign({} , users) ;
window.scrollTo({
  top : 70,
  behavior : 'smooth'
});
  }
  resetForm(form:NgForm){
    if(form.value.id != null){
      this.isUpdate = false;
      if (localStorage.getItem('lang') == 'en') {
        this.Reset = "Reset"
        this.submitt = "Create New";
      } else {
        this.Reset = "إعادة تعيين"
        this.submitt = "إضافة جديد";
      }
    form.reset();
  }
    else { form.reset(); }
    

  }



}
