import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { Centers } from '../../shared/models/Centers.model';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { Vaccines } from '../../shared/models/Vaccines.model';
import { VaccinesDistribution } from '../../shared/models/VaccinesDistribution.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-vaccines-distribution',
  templateUrl: './vaccines-distribution.component.html'
})
export class VaccinesDistributionComponent implements OnInit {
  Reset:string;
  submitt:string;
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  healthunitidsData:Centers = new Centers();
  vaccinesData:Vaccines = new Vaccines();
  VaccinesDistData:VaccinesDistribution = new VaccinesDistribution();
  lang:string;

  constructor(public translate:TranslateService , public service:BookingService,public service1:PublicServiciesService, private toastr: ToastrService) { }


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
    this.service.getVaccines().subscribe((res: {}) => {
      this.vaccinesData = res as Vaccines;
    })
    this.ShowAll();
  }

  getCitiesByState(Stateid:string){
    if(Stateid != ""){
    this.service.getCitiesState(Stateid).subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
  }
 
  }
  getLocalBycity(cityid:string){
    if(cityid != ""){
      this.service.getLocalCity(cityid).subscribe((res: {}) => {
        this.localitiesData = res as Localities;
      })
    }
  
  }
  getUnitByLocal(localid:string){
    if(localid != ""){
    this.service.getUnitLocality(localid).subscribe((res: {}) => {
      this.healthunitidsData = res as Centers;
    })
  }
  
  }
  onSaveVaccinesDist(formVaccinesDist:NgForm){
    if(formVaccinesDist.value.id != null){
     
        return this.service1.UpdateVaccinesDist(formVaccinesDist.value , formVaccinesDist.value.id).subscribe(
          response => {
            formVaccinesDist.reset();
            if (localStorage.getItem('lang') == 'en') {
              this.Reset = "Reset"
              this.submitt = "Create New";
              this.toastr.success("VaccinesDist Updated Successfully", "Done!");
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
      this.service1.addVaccinesDistResponse(formVaccinesDist.value).subscribe(
        (res) => {
          formVaccinesDist.reset();
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.success("Added Sucssed", "Done!");
          } else {
            this.toastr.success("تم حفظ البيانات بنجاح" ,"تم!");
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

    return this.service1.deleteVaccinesDist(id).subscribe(
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
    this.service1.getVaccinesDist().subscribe((res: {}) => {
      this.VaccinesDistData = res as VaccinesDistribution;
    })
  }
  fillForm(VaccinesDistData:VaccinesDistribution){
    if (localStorage.getItem('lang') == 'en') {
      this.Reset = "Cancel Update"
      this.submitt = "Update";
    } else {
      this.submitt = "تعديل"
      this.Reset = "إلغاء التعديل";
    }
this.service1.VaccinesDistData = Object.assign({} , VaccinesDistData) ;
  window.scrollTo({
    top : 70,
    behavior : 'smooth'
  });

  }

}
