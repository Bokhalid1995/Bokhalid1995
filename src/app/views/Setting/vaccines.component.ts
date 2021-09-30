import { Component, OnInit } from '@angular/core';
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
  Reset:string="Reset"
  submitt:string = "Create Vaccine";
  VaccinesData:Vaccines = new Vaccines();
  
 
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
     this.ShowAll();
  }
  onSaveVaccine(formVaccine:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateVaccine(formVaccine.value , formVaccine.value.id).subscribe(
          response => {
            formVaccine.reset();
            this.Reset = "Reset"
            this.submitt = "Create New";
            this.toastr.success("Vaccine Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addVaccineResponse(formVaccine.value).subscribe(
        (res) => {
          formVaccine.reset();
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

    return this.service.deleteVaccine(id).subscribe(
      response => {
        this.toastr.warning("Vaccine deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  resetForm(form:NgForm){
    if(this.Reset == "Cancel Update"){
    this.submitt = "Create New";
    this.Reset = "Reset"
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
    this.submitt = "Update";
    this.Reset = "Cancel Update"
    this.service.VaccinesData = Object.assign({} , Vaccines);
  }

}
