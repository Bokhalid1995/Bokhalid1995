import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule, Routes } from '@angular/router';
import { CitiesComponent } from './cities.component';
import { StatesComponent } from './states.component';
import { UnitsComponent } from './units.component';
import { DepartmentsComponent } from './departments.component';
import { SectionsComponent } from './sections.component';
import { VaccinesComponent } from './vaccines.component';
import { HealthUnits } from '../../shared/models/HealthUnits.model';
import { HealthUnitComponent } from './health-unit.component';
import { Localities } from '../../shared/models/Localities.model';
import { LocalitiesComponent } from './localities.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Settings Module'
    },
    children: [
      {
        path: '',
        redirectTo: 'cities'
      },
      {
        path: 'cities',
        component: CitiesComponent,
        data: {
          title: 'Cities Control'
        }
      },
      {
        path: 'States',
        component: StatesComponent,
        data: {
          title: 'States Control'
        }
       },
      {
        path: 'Units',
        component: UnitsComponent,
        data: {
          title: 'Units Control'
        }
      },
      {
        path: 'Departments',
        component: DepartmentsComponent,
        data: {
          title: 'Departments Control'
        }
      }
      ,
      {
        path: 'Sections',
        component: SectionsComponent,
        data: {
          title: 'Sections Control'
        }
      },
      {
        path: 'Vaccines',
        component: VaccinesComponent,
        data: {
          title: 'Vaccines Control'
        }
      },
      {
        path: 'Health-Units',
        component: HealthUnitComponent,
        data: {
          title: 'Health Units Control'
        }
      },
      {
        path: 'Localities',
        component: LocalitiesComponent,
        data: {
          title: 'Localities Control'
        }
      }

    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ,TranslateModule]
})
export class SettingsRoutingModule { }
