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
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
    this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
  
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
  this.ShowAll();
  }
  onSaveLocality(formLocality:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateLocality(formLocality.value , formLocality.value.id).subscribe(
          response => {
            formLocality.reset();
            this.submitt = "Create New";
            this.toastr.success("Locality Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addLocalityResponse(formLocality.value).subscribe(
        (res) => {
          formLocality.reset();
          this.toastr.success("Added Locality Sucssed", "Done!");
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

    return this.service.deleteLocality(id).subscribe(
      response => {
        this.toastr.warning("Locality deleted Successfully", "Done!");
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
    this.submitt = "Update";
this.service.localitiesData = Object.assign({} , Localities) ;
  }
  getCitiesByState(Stateid:string){
    if(Stateid != ""){
    this.service.getCitiesState(Stateid).subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
  }
  }
  resetForm(form:NgForm){
    if(this.Reset == "Cancel Update"){
    this.submitt = "Create New";
    this.Reset = "Reset"
    form.reset();
  }
    else { form.reset(); }
    

  }
}
