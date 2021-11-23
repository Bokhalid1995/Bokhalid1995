
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


// Dropdowns Component
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';



// Buttons Routing

import { ModalModule } from 'ngx-bootstrap/modal';


import { CommonModule } from '@angular/common';

import { usersManagmentRoutingModule } from './users-management-routing.module';

import { UserAdminComponent } from './user-admin.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


// Angular

@NgModule({
  imports: [
    CommonModule,
    usersManagmentRoutingModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule
  ],
  declarations: [  UserAdminComponent ]
})
export class usersManagementModule { }
