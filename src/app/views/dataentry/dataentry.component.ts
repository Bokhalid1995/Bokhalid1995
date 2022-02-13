import { formatDate } from '@angular/common';
import { AfterViewChecked, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CollapseDirective } from 'ngx-bootstrap/collapse';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { DialogService } from '../../shared/Dialog.service';
import { Pagination } from '../../shared/models/Pagination.model';
import { Vaccines } from '../../shared/models/Vaccines.model';
import { VaccinesDoses } from '../../shared/models/VaccinesDoses.model';

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html'
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
  PreviewDetails:VaccinesDoses = new VaccinesDoses();
  disableConfirm:boolean;
  Status:string="Requested";
  NameRecieption:string;
  IDRecieption:string;
  lang:string;
  Pagination:Pagination = new Pagination();
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  serviceReciepsData:VaccinesDoses = new VaccinesDoses();
  
  vaccinesData:Vaccines = new Vaccines();
  fromDate:string= "";
  toDate:string = "";

  @ViewChild('ConfirmVaccine') modal1: ModalDirective;
  @ViewChild('PreviewData') modal2: ModalDirective;
  @ViewChild('DeleteData') modal3: ModalDirective;
  constructor(public translate: TranslateService,public service: BookingService,private rout:Router,private toastr:ToastrService, private dialogService: DialogService) { }

  ngOnInit(): void {
    this.fromDate = "2010/01/01"
    this.toDate = formatDate(new Date(), 'yyyy/MM/dd', 'en')

    this.lang = localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;
if(this.lang === 'ar'){

}
    this.getDataPgination(this.pager , this.Status ,this.fromDate , this.toDate);
    this.service.getVaccines().subscribe((res: {}) => {
      
      this.vaccinesData = res as Vaccines;
    })
    this.NameRecieption = localStorage.getItem('username')
    this.IDRecieption = localStorage.getItem('userid')
  }

  ShowAll(){
    this.service.getVacinneDoses().subscribe((res: {}) => {
      this.serviceReciepsData = new VaccinesDoses();
      this.serviceReciepsData = res as VaccinesDoses;
    })
  }
  getDataPgination(page: number , status:string , dateFrom?:string ,dateto?:string ) {
if (status == "Requested"){
this.statusColor = "statusYellow"
}else {
this.statusColor = "statusGreen"
}
this.serviceReciepsData = new VaccinesDoses();
    this.service.getListBypage(page ,status ,dateFrom,dateto).subscribe((res: any) => {
 
      this.serviceReciepsData = res.doeses as VaccinesDoses;
      this.Pagination.totalCount = res.Pagination.totalCount;
      this.Pagination.currentPage = res.currentPage;
      this.Pagination.pageSize = res.pageSize;
      this.Pagination.totalPages = res.totalPages;
    });


  }
  getPginationByEvent(page: any , status:string , dateFrom:string ,dateto:string ) {
    if (status == "Requested"){
    this.statusColor = "statusYellow"
    }else {
    this.statusColor = "statusGreen"
    }
    
        this.service.getListBypage(page.page ,status ,dateFrom,dateto).subscribe((res: any) => {
          this.serviceReciepsData = new VaccinesDoses();
          this.serviceReciepsData = res.doeses as VaccinesDoses;
          this.Pagination.totalCount = res.Pagination.totalCount;
          this.Pagination.currentPage = res.currentPage;
          this.Pagination.pageSize = res.pageSize;
          this.Pagination.totalPages = res.totalPages;
        });
    
    
      }
  getDataByNatid(natid:string ,status1:boolean,status2:boolean,) {
    this.serviceReciepsData = new VaccinesDoses();
    if (status1) {
      this.service.getVaccineDoseByNatID(natid , "Requested").subscribe((res: {}) => {
        this.serviceReciepsData = res as VaccinesDoses;
      });
    }else{
      this.service.getVaccineDoseByNatID(natid , "DoseTaken").subscribe((res: {}) => {
        this.serviceReciepsData = res as VaccinesDoses;
      });
    }

   
  }
  filterStatus(status:string,dateFrom:string,dateTo:string){
    this.pager = 1;
    this.getDataPgination(this.pager , status ,dateFrom,dateTo);
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
        if (localStorage.getItem('lang') == 'en') {
          this.toastr.success("Vaccine Dose has been confirmed Succefully", "Warning!");
        } else {
          this.toastr.success("تم تأكيد اخذ اللقاح" ," تمت  !");
        }
      
        this.getDataPgination(this.pager , this.Status ,this.fromDate ,this.toDate);
        this.modal1.hide();
      },
      error => { 
        if (localStorage.getItem('lang') == 'en') {
          this.toastr.error("wrong Editing Data", "Error!");
        } else {
          this.toastr.error("خطأ في إدخال البيانات الرجاء المراجعة" ," خطأ  !");
        }
     
      form.reset();
    }
    );
  
  }
 
  showData(data: any) {
    this.service.getVaccineDoseByNatID(data.nationalNumber , data.status).subscribe((res: any) => {
      this.PreviewDetails = res as VaccinesDoses;
      console.log(res);
    });
    this.modal2.show();
  }
  getHours(timedata:any){
    
    this.hours = timedata.substring(0, 2);
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
      
      confirmDelete(id:number){
        this.service.updateStatusDeleted(id).subscribe((res: {}) => {
          this.modal3.hide();
          this.toastr.success("Deleted Succefully", "Done!");
          console.log("DELETED" , res as string);
        });
      }
}