import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Departments } from '../../shared/models/Departments.model';
import { Sections } from '../../shared/models/Sections.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html'
})
export class SectionsComponent implements OnInit {

  submitt:string = "Create Section";
  deptsData:Departments = new Departments();
  sectionsData:Sections = new Sections();
  lang: string;
 
  constructor(private rout: Router, public service: PublicServiciesService,  private toastr: ToastrService,public translate:TranslateService ) { }

  ngOnInit(): void {
  
    this.service.getDepts().subscribe((res: {}) => {
      this.deptsData = res as Departments;
    })
  
  
  this.ShowAll();
  }
  onSaveSection(formSection:NgForm){
    if(this.submitt == "Update"){
     
        return this.service.UpdateSection(formSection.value , formSection.value.id).subscribe(
          response => {
            formSection.reset();
            this.submitt = "Create Section";
            this.toastr.success("Section Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service.addSectionResponse(formSection.value).subscribe(
        (res) => {
          formSection.reset();
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

    return this.service.deleteSection(id).subscribe(
      response => {
        this.toastr.warning("Section deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  
  ShowAll(){
    this.service.getSections().subscribe((res: {}) => {
      this.sectionsData = res as Sections;
    })
  }
  fillForm(sections:Sections){
    this.submitt = "Update";
this.service.SectionsData = Object.assign({} , sections) ;
  }
}
