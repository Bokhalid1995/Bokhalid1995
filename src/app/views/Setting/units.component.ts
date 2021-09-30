import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { Units } from '../../shared/models/Units.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-Units',
  templateUrl: './units.component.html'
})
export class UnitsComponent implements OnInit {

  submitt:string = "Create Unit";
  unitsData:Units = new Units();
  
 
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
  this.ShowAll();
  }
  onSaveUnit(formUnit:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateUnit(formUnit.value , formUnit.value.id).subscribe(
          response => {
            formUnit.reset();
            this.submitt = "Create Unit";
            this.toastr.success("Unit Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addUnitResponse(formUnit.value).subscribe(
        (res) => {
          formUnit.reset();
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

    return this.service.deleteUnit(id).subscribe(
      response => {
        this.toastr.warning("Unit deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  
  ShowAll(){
    this.service.getUnits().subscribe((res: {}) => {
      this.unitsData = res as Units;
    })
  }
  fillForm(Units:Units){
    this.submitt = "Update";
    this.service.UnitsData = Object.assign({} , Units);
  }


}
