import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CitiesComponent } from './cities.component';
import { SettingsRoutingModule } from './settings-routing.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { StatesComponent } from './states.component';
import { UnitsComponent } from './units.component';
import { DepartmentsComponent } from './departments.component';
import { SectionsComponent } from './sections.component';
import { VaccinesComponent } from './vaccines.component';
import { HealthUnitComponent } from './health-unit.component';
import { LocalitiesComponent } from './localities.component';
import { VaccinesDistributionComponent } from './vaccines-distribution.component';
import { AddressesComponent } from './addresses.component';



@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    FormsModule
    
  ],
  declarations: [
    CitiesComponent,
    StatesComponent,
    UnitsComponent,
    DepartmentsComponent,
    SectionsComponent,
    VaccinesComponent,
    HealthUnitComponent,
    LocalitiesComponent,
    VaccinesDistributionComponent,
    AddressesComponent
  ]
  
})
export class SettingsModule { }
