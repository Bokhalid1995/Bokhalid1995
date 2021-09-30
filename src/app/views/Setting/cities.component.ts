import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginProcessService } from '../../shared/login-process.service';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html'

})
export class CitiesComponent implements OnInit {
  submitt:string = "Create City";
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
  onSavecity(formCity:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateCity(formCity.value , formCity.value.id).subscribe(
          response => {
            formCity.reset();
            this.submitt = "Create City";
            this.toastr.success("City Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addCityResponse(formCity.value).subscribe(
        (res) => {
          formCity.reset();
          this.toastr.success("Added Sucssed", "Done!");
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

    return this.service.deleteCity(id).subscribe(
      response => {
        this.toastr.warning("City deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  
  ShowAll(){
    this.service.getCities().subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
  }
  fillForm(cities:Cities){
    this.submitt = "Update";
this.service.citiesData = Object.assign({} , cities) ;
  }
}
