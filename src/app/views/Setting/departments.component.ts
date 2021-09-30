import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Departments } from '../../shared/models/Departments.model';
import { Units } from '../../shared/models/Units.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit {

  submitt:string = "Create New";
  deptsData:Departments = new Departments();
  unitsData:Units = new Units();

  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }


  ngOnInit(): void {
    this.service.getUnits().subscribe((res: {}) => {
      this.unitsData = res as Units;
    })
  this.ShowAll();
  }
  onSaveDept(formDept:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateDept(formDept.value , formDept.value.id).subscribe(
          response => {
            formDept.reset();
            this.submitt = "Create New";
            this.toastr.success("Department Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addDeptResponse(formDept.value).subscribe(
        (res) => {
          formDept.reset();
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

    return this.service.deleteDept(id).subscribe(
      response => {
        this.toastr.warning("Dept deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  
  ShowAll(){
    this.service.getDepts().subscribe((res: {}) => {
      this.deptsData = res as Departments;
    })
  }
  fillForm(depts:Departments){
    this.submitt = "Update";
this.service.DeptsData = Object.assign({} , depts) ;
  }

}
