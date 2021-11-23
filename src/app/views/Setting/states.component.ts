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
  selector: 'app-states',
  templateUrl: './states.component.html'
})
export class StatesComponent implements OnInit {
  submitt:string = "Create State";
  lang:string ;
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  Reset: string;
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

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
  
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
  this.ShowAll();
  }
  onSaveState(formState:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateState(formState.value , formState.value.id).subscribe(
          response => {
            formState.reset();
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
      this.service.addStateResponse(formState.value).subscribe(
        (res) => {
          formState.reset();
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

    return this.service.deleteState(id).subscribe(
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
    this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
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
  
  fillForm(states:States){
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel  Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
this.service.statesData = Object.assign({} , states) ;

window.scrollTo({
  top : 70,
  behavior : 'smooth'
});

  }

}
