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
  onSaveState(formState:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateState(formState.value , formState.value.id).subscribe(
          response => {
            formState.reset();
            this.submitt = "Create State";
            this.toastr.success("State Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addStateResponse(formState.value).subscribe(
        (res) => {
          formState.reset();
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

    return this.service.deleteState(id).subscribe(
      response => {
        this.toastr.warning("State deleted Successfully", "Done!");
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
  fillForm(states:States){
    this.submitt = "Update";
this.service.statesData = Object.assign({} , states) ;
  }

}
