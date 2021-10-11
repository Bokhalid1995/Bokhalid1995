
import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { Centers } from '../../shared/models/Centers.model';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { Vaccines } from '../../shared/models/Vaccines.model';
import { VaccinesDoses } from '../../shared/models/VaccinesDoses.model';


@Component({
  selector: 'app-patient-data',
  templateUrl: 'patient-data.component.html',
  styleUrls: []
})
export class PatientDataComponent implements OnInit {
  lang:string;
  list :any[];
  dropdownSettings:IDropdownSettings={};
  currentDate:Date = new Date();
  hours:number;
  validMessage:string;
  classInvalid:boolean = false;
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  CentersData:Centers = new Centers();
  vaccinesData:Vaccines = new Vaccines();
  centerDetails:Centers = new Centers();
  NameRecieption:string;
  IDRecieption:string;
  @ViewChild('UnitDetails') modal: ModalDirective;

  constructor(public translate:TranslateService , public service:BookingService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.list = 
    [
      {name :'Sugar',checked : false},
      {name :'Presure',checked : false},
    
    ];
    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

   this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
    this.service.getVaccines().subscribe((res: {}) => {
      this.vaccinesData = res as Vaccines;
    })
    this.NameRecieption = localStorage.getItem('fullname')
    this.IDRecieption = localStorage.getItem('userid')
   /* this.service.getCities().subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
    this.service.getCenters().subscribe((res: {}) => {
      this.CentersData = res as Centers;
    })
    */
  }
  getHours(timedata:any){
    
    this.hours = timedata.substring(0, 2);
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
      this.CentersData = res as Centers;
    })
  }
  
  }
  getCenterDetails(centerid:any){
    this.service.getUnitDetails(centerid).subscribe((res: {}) => {
      this.centerDetails = res as Centers;

    })
    this.modal.show();
  }
  getVaccineByUnit(center:string){
    this.service.getVaccineUnit(center).subscribe((res: {}) => {
      this.vaccinesData = res as Vaccines;
    })
  }
  onSaveRecords(formData: NgForm) {
      this.service.registerRecieptionBook(formData.value , this.hours , this.IDRecieption).subscribe(
        (res: any) => {
          formData.reset();
          this.toastr.success("Confirmed Successfully", "Done!");
          console.log(res);
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error("Error Data Enserted", "Warning!");
          } else {
            this.toastr.error("خطأ" ," خطأ في ادخال البيانات   !");
          }
        }
      )
    
  }

  checkDate(date:Date){
  
if( new Date(date) <= this.currentDate ){
  this.validMessage = "Your date is incorrect please check!";
  this.classInvalid = true ;
}else {
  this.validMessage = ""
  this.classInvalid = false ;
}
  }
}
