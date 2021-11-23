import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-localities',
  templateUrl: './localities.component.html'
})
export class LocalitiesComponent implements OnInit {
  Reset:string="Reset";
  submitt:string = "Create New";
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  lang: string;
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Reset"
      this.submitt = "Create New";
    } else {
      this.Reset = "إعادة تعيين"
      this.submitt = "إضافة جديد";
    }
    this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
  this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
  this.ShowAll();
  }
  onSaveLocality(formLocality:NgForm){
    if(formLocality.value.id != null){
     
        return this.service.UpdateLocality(formLocality.value , formLocality.value.id).subscribe(
          response => {
            formLocality.reset();
            if (localStorage.getItem('lang') == 'en') {
              this.Reset = "Reset"
              this.submitt = "Create New";
              this.toastr.success("Data Updated Successfully", "Done!");
            } else {
              this.Reset = "إعادة تعيين"
              this.submitt = "إضافة جديد";
              this.toastr.success("تم تعديل البيانات بنجاح" ,"تم!");
            }
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addLocalityResponse(formLocality.value).subscribe(
        (res) => {
          formLocality.reset();
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.success("Added Sucssed", "Done!");
          } else {
            this.toastr.success("تم الحفظ بنجاح ", "تمت!");
          }
          this.ShowAll();
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error("Error Enserting Data", "Warning!");
          } else {
            this.toastr.error("خطأ في ادخال البيانات" ,"خطأ!");
          }
        }
      )
    }
 
  }
  onDelete(id:number) {

    return this.service.deleteLocality(id).subscribe(
      response => {
        if (localStorage.getItem('lang') == 'en') {
          this.toastr.warning("Data Deleted Successfully", "Done!");
        } else {
          this.toastr.warning("تم حذف البيانات" ,"تم!");
        }
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  
  ShowAll(){
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
  }
  fillForm(Localities:Localities){
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel  Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
this.service.localitiesData = Object.assign({} , Localities) ;

window.scrollTo({
  top : 70,
  behavior : 'smooth'
});

  }
  getCitiesByState(Stateid:string){
    if(Stateid != ""){
    this.service.getCitiesState(Stateid).subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
  }
  }
  resetForm(form:NgForm){
    if(form.value.id != null){
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
