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
import { VaccinesDistributionComponent } from './vaccines-distribution.component';
import { AddressesComponent } from './addresses.component';
import { AuthenticationGuard } from '../../shared/guard/authentication.guard';

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
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Cities Control'
        }
      },
      {
        path: 'States',
        component: StatesComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'States Control'
        }
       },
      {
        path: 'Units',
        component: UnitsComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Units Control'
        }
      },
      {
        path: 'Departments',
        component: DepartmentsComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Departments Control'
        }
      }
      ,
      {
        path: 'Sections',
        component: SectionsComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Sections Control'
        }
      },
      {
        path: 'Vaccines',
        component: VaccinesComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Vaccines Control'
        }
      },
      {
        path: 'Health-Units',
        component: HealthUnitComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Health Units Control'
        }
      },
      {
        path: 'Localities',
        component: LocalitiesComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Localities Control'
        }
      },
      {
        path: 'Vaccine-Distribution',
        component: VaccinesDistributionComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Vaccine Distribution Control'
        }
      },
      {
        path: 'Addresses',
        component: AddressesComponent,
        canActivate:[AuthenticationGuard],
        data: {
          title: 'Addresses Control'
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
