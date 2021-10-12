import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { BookingService } from '../../shared/booking.service';
import { Addresses } from '../../shared/models/Addresses.model';
import { Cities } from '../../shared/models/Cities.model';
import { Localities } from '../../shared/models/Localities.model';
import { States } from '../../shared/models/States.model';
import { PublicServiciesService } from '../../shared/public-servicies.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html'
})
export class AddressesComponent implements OnInit {

  Reset:string="Reset";
  submitt:string = "Create New";
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  AddressData:Addresses = new Addresses();

  lang:string;

  constructor(public translate:TranslateService , public service:BookingService,public service1:PublicServiciesService, private toastr: ToastrService) { }


  ngOnInit(): void {
    this.lang=localStorage.getItem('lang') || 'en';
    this.translate.use(this.lang);
    document.documentElement.lang = this.lang;

   this.service.getStates().subscribe((res: {}) => {
      this.statesData = res as States;
    })
  
    this.ShowAll();
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
  onSaveAddress(formAddress:NgForm){
    if(this.submitt == "Update"){
     
        return this.service1.UpdateAddress(formAddress.value , formAddress.value.id).subscribe(
          response => {
            formAddress.reset();
            this.submitt = "Create New";
            this.Reset = "Reset"
            this.toastr.success("Address Updated Successfully", "Done!");
            this.ShowAll();
          },
          error => { this.toastr.warning("wrong Editing Data", "Warn!"); }
        );
      
    }else{
      this.service1.addAddressResponse(formAddress.value).subscribe(
        (res) => {
          formAddress.reset();
          this.toastr.success("Added Address Sucssed", "Done!");
          this.ShowAll();
          console.log(res);
        },
        err => {
          if (localStorage.getItem('lang') == 'en') {
            this.toastr.error("Error Enserting Data", "Warning!");
          } else {
            this.toastr.error("خطأ في ادخال البيانات" ,"خطأ!");
          }
        }
      )
    }
 
  }
  onDelete(id:number) {

    return this.service1.deleteAddress(id).subscribe(
      response => {
        this.toastr.warning("Vaccine deleted Successfully", "Done!");
        this.ShowAll();
      },
      error => { this.toastr.error("Data cant be deleted", "error!"); }
    );

  }
  resetForm(form:NgForm){
    if(this.Reset == "Cancel Update"){
    this.submitt = "Create New";
    this.Reset = "Reset"
    form.reset();
  }
    else { form.reset(); }
    

  }
  ShowAll(){
    this.service1.getAddress().subscribe((res: {}) => {
      this.AddressData = res as Addresses;
    })
  }
  fillForm(AddressData:Addresses){
    this.submitt = "Update";
    this.Reset = "Cancel Update"
this.service1.AddressData = Object.assign({} , AddressData) ;
  }

}
