import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { BookingService } from '../../shared/booking.service';
import { Centers } from '../../shared/models/Centers.model';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { Vaccines } from '../../shared/models/Vaccines.model';


@Component({
  selector: 'app-patient-data',
  templateUrl: 'patient-data.component.html',
  styleUrls: []
})
export class PatientDataComponent implements OnInit {
  lang:string;
  list :any[];
  dropdownSettings:IDropdownSettings={};

  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  CentersData:Centers = new Centers();
  vaccinesData:Vaccines = new Vaccines();
  constructor(public translate:TranslateService , public service:BookingService) { }

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
    this.service.getCities().subscribe((res: {}) => {
      this.citiesData = res as Cities;
    })
    this.service.getLocalities().subscribe((res: {}) => {
      this.localitiesData = res as Localities;
    })
    this.service.getCenters().subscribe((res: {}) => {
      this.CentersData = res as Centers;
    })
    this.service.getVaccines().subscribe((res: {}) => {
      this.vaccinesData = res as Vaccines;
    })
  }

  

}
