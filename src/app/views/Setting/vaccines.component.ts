import { Component, ElementRef, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Vaccines } from '../../shared/models/Vaccines.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-vaccines',
  templateUrl: './vaccines.component.html'
})
export class VaccinesComponent implements OnInit {
  Reset:string;
  submitt:string;
  VaccinesData:Vaccines = new Vaccines();
  lang: string;
  
 
  constructor(private el:ElementRef, private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Reset"
      this.submitt = "Create New";
    } else {
      this.Reset = "إعادة تعيين"
      this.submitt = "إضافة جديد";
    }
     this.ShowAll();
  }
  onSaveVaccine(formVaccine:NgForm){
    if(formVaccine.value.id != null){
     
        return this.service.UpdateVaccine(formVaccine.value , formVaccine.value.id).subscribe(
          response => {
            formVaccine.reset();
            if (localStorage.getItem('lang') == 'en') {
              this.Reset = "Reset"
              this.submitt = "Create New";
              this.toastr.success("Vaccine Updated Successfully", "Done!");
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
      this.service.addVaccineResponse(formVaccine.value).subscribe(
        (res) => {
          formVaccine.reset();
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
            this.toastr.error("Error Inserting Data", "Warning!");
          } else {
            this.toastr.error("خطأ في ادخال البيانات" ,"خطأ!");
          }
        }
      )
    }
 
  }
  onDelete(id:number) {

    return this.service.deleteVaccine(id).subscribe(
      response => {
        if (localStorage.getItem('lang') == 'en') {
          this.toastr.warning("Vaccine deleted Successfully", "Done!");
        } else {
          this.toastr.warning("تم حذف البيانات" ,"تم!");
        }
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

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
    this.service.getVaccines().subscribe((res: {}) => {
      this.VaccinesData = res as Vaccines;
    })
  }
  fillForm(Vaccines:Vaccines){
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel  Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
    this.service.VaccinesData = Object.assign({} , Vaccines);
    
    window.scrollTo({
      top : 70,
      behavior : 'smooth'
    });
  }

}
