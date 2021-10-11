import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { Vaccines } from '../../shared/models/Vaccines.model';
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
  hours:string;
  idConfirm:number;
  statusColor:string = "statusYellow"
  searchEmpty:boolean = true;
  isRequseted:boolean = true;
  isConfirmed:boolean = false;
  nameConfirm:string;
  datalist:VaccinesDoses = new VaccinesDoses();
  disableConfirm:boolean;
  Status:string="Requested";
  NameRecieption:string;
  IDRecieption:string;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  serviceReciepsData:VaccinesDoses = new VaccinesDoses();
  lastPage:VaccinesDoses  = new VaccinesDoses();
  vaccinesData:Vaccines = new Vaccines();

  @ViewChild('ConfirmVaccine') modal1: ModalDirective;
  @ViewChild('PreviewData') modal2: ModalDirective;
  constructor(public service: BookingService,private rout:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getDataPgination(this.pager , this.Status);
    this.service.getVaccines().subscribe((res: {}) => {
      this.vaccinesData = res as Vaccines;
    })
    this.NameRecieption = localStorage.getItem('username')
    this.IDRecieption = localStorage.getItem('userid')
  }

  ShowAll(){
    this.service.getVacinneDoses().subscribe((res: {}) => {
      this.serviceReciepsData = res as VaccinesDoses;
    })
  }
  getDataPgination(page: number , status:string) {
if (status == "Requested"){
this.statusColor = "statusYellow"
}else {
this.statusColor = "statusGreen"
}
    this.service.getListBypage(page ,status).subscribe((res: {}) => {

      this.serviceReciepsData = res as VaccinesDoses;
      if (!Object.keys(this.serviceReciepsData).length) {
        this.serviceReciepsData = this.lastPage;
      
      }
      
    });


  }
  getDataByNatid(natid:string ) {

    this.service.getVaccineDoseByNatID(natid).subscribe((res: {}) => {
      this.serviceReciepsData = res as VaccinesDoses;
    });
  }
  filterStatus(status:string){
    this.pager = 1;
    this.getDataPgination(this.pager , status);
    if (status == "DoseTaken"){
      this.isRequseted = false;
      this.isConfirmed = true;
      this.disableConfirm = true ;
    }else {
      this.isRequseted = true;
      this.isConfirmed = false;
      this.disableConfirm = false ;
    }
   
  }

  confirmVaccineDose(form:NgForm){
    return this.service.confirmVaccineDose(form.value , this.idConfirm ).subscribe(
      response => {
        form.reset();
        this.toastr.success("Section Updated Successfully", "Done!");
        this.getDataPgination(this.pager , this.Status);
        this.modal1.hide();
      },
      error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
    );
  
  }
 
  showData(data: any) {
    this.service.getVaccineDoseByNatID(data.nationalNumber).subscribe((res: {}) => {
      this.datalist = res as VaccinesDoses;
      console.log(res);
    });
    this.modal2.show();
  }
  getHours(timedata:any){
    
    this.hours = timedata.substring(0, 2);
  }
 
  counterPlus() {

    if (this.pager < 1) {
      this.pager = 1;
    } else {
      if(this.isConfirmed == true){
        this.pager = this.pager + 1;
        this.getDataPgination(this.pager, 'DoseTaken');
      }else{
        this.pager = this.pager + 1;
        this.getDataPgination(this.pager, 'Requested');
      }
     
    }
    this.lastPage = this.serviceReciepsData;
  }
  counterMinus() {
    if (this.pager < 1) {
      this.pager = 1;
    } else {
      if(this.isConfirmed == true){
        this.pager = this.pager - 1;
        this.getDataPgination(this.pager, 'DoseTaken');
      }else{
        this.pager = this.pager - 1;
        this.getDataPgination(this.pager, 'Requested');
      }  
    }
    this.lastPage = this.serviceReciepsData;
  }
  confirmShow(data:any){
    this.idConfirm = data.id;
    this.nameConfirm = data.serviceRecipientNameEn;
    this.service.bookingDetails.vaccineid = data.vaccineid;
    this.service.bookingDetails.dosenumber = data.dosenumber;
    this.modal1.show();
      }
      scrollTo(id:any){
        let el = document.getElementById(id);
        el.scrollIntoView();
      }
}