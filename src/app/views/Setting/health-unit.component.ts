import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { HealthUnits } from '../../shared/models/HealthUnits.model';
import { Localities } from '../../shared/models/Localities.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-health-unit',
  templateUrl: './health-unit.component.html'
})
export class HealthUnitComponent implements OnInit {
  Reset:string;
  submitt:string ;
  hoursFrom:string;
  hoursTo:string;
  lang:string;
  LocalityData:Localities = new Localities();
  HealthUnitsData:HealthUnits = new HealthUnits();
  formDataUpdate:HealthUnits = new HealthUnits();
  constructor(private el:ElementRef, private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
  
    
    this.service.getLocalities().subscribe((res: {}) => {
      this.LocalityData = res as Localities;
    })
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Reset"
      this.submitt = "Create New";
    } else {
      this.Reset = "إعادة تعيين"
      this.submitt = "إضافة جديد";
    }
    this.ShowAll();
  }
  onSaveHealthUnit(formHealthUnit:NgForm){
    if(formHealthUnit.value.id != null){
     
        return this.service.UpdateHealthUnit(formHealthUnit.value , formHealthUnit.value.id ,this.hoursFrom , this.hoursTo ).subscribe(
          response => {
            formHealthUnit.reset();
            if (localStorage.getItem('lang') == 'en') {
              this.Reset = "Reset"
              this.submitt = "Create New";
              this.toastr.success("HealthUnit Updated Successfully", "Done!");
            } else {
              this.Reset = "إعادة تعيين"
              this.submitt = "إضافة جديد";
              this.toastr.success("تم تعديل البيانات بنجاح" ,"تم!");
            }
           
            this.ShowAll();
          },
          error => { this.toastr.warning("Wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addHealthUnitResponse(formHealthUnit.value , this.hoursFrom , this.hoursTo ).subscribe(
        (res) => {
          formHealthUnit.reset();
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.success("Added Sucssefully", "Done!");
          } else {
            this.toastr.success("تم حفظ البيانات بنجاح" ,"تم!");
          }
          
          this.ShowAll();
          console.log(res);
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

    return this.service.deleteHealthUnit(id).subscribe(
      response => {
        this.toastr.warning("HealthUnit deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  getHoursFrom(timedata:any){
    
    this.hoursFrom = timedata.substring(0, 2);
  }
  getHoursTo(timedata:any){
    
    this.hoursTo = timedata.substring(0, 2);
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
  
 ShowAll(){
    this.service.getHealthUnits().subscribe((res: {}) => {
      this.HealthUnitsData = res as HealthUnits;
    })
  }
  fillForm(HealthUnits:HealthUnits){
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel  Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
    this.service.HealthUnitsData = Object.assign({} , HealthUnits);
    window.scrollTo({
      top : 80,
      behavior : 'smooth'
    });
   
  }

}
