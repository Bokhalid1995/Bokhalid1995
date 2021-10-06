import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { VaccinesDoses } from '../../shared/models/VaccinesDoses.model';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.scss']
})
export class DataentryComponent implements OnInit {
  collapsed = true;
  isLinear = true;
  pager: number = 1;
  Status:string="Requested";
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  serviceReciepsData:VaccinesDoses = new VaccinesDoses();
  lastPage:VaccinesDoses = new VaccinesDoses();

  @ViewChild('ConfirmVaccine') modal: ModalDirective;
  constructor(public service: BookingService,private rout:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDataPgination(this.pager , this.Status);
  }

  ShowAll(){
    this.service.getVacinneDoses().subscribe((res: {}) => {
      this.serviceReciepsData = res as VaccinesDoses;
    })
  }
  getDataPgination(page: number , status:string) {

    this.service.getListBypage(page ,status).subscribe((res: {}) => {

      this.serviceReciepsData = res as VaccinesDoses;
      if (!Object.keys(this.serviceReciepsData).length) {
        this.serviceReciepsData = this.lastPage;
      
      }
    });


  }
 
  counterPlus() {

    if (this.pager < 1) {
      this.pager = 1;
    } else {
      this.pager = this.pager + 1;
  
      this.getDataPgination(this.pager, this.Status);
    }
    this.lastPage = this.serviceReciepsData;
  }
  counterMinus() {
    if (this.pager < 1) {
      this.pager = 1;
    } else {
      this.pager = this.pager - 1;

      this.getDataPgination(this.pager, this.Status);
    }
    this.lastPage = this.serviceReciepsData;
  }

  
}