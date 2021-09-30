import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UserAdminComponent } from './user-admin.component';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Users Management'
    },
    children: [
      {
        path: '',
        redirectTo: 'register-admin'
      },
      {
        path: 'register-admin',
        component: UserAdminComponent,
        data: {
          title: 'register admin'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule ,TranslateModule]
})
export class usersManagmentRoutingModule {}
