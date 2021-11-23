import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRecipient } from './models/Servicerecipient.model';
import { VaccinesDoses } from './models/VaccinesDoses.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  recieptiestDetails:ServiceRecipient = new ServiceRecipient();
  bookingDetails:VaccinesDoses = new VaccinesDoses();
  readonly baseURL = 'https://localhost:5001/api/';
 
  constructor(private http: HttpClient) { 

  }
  getStates(){
    return this.http.get(this.baseURL + "State/States");
  }
  getCities(){
    return this.http.get(this.baseURL + "City/Cities");
  }
  getLocalities(){
    return this.http.get(this.baseURL + "Locality/Localities");
  }
  getCenters(){
    return this.http.get(this.baseURL + "Center/Centers");
  }
  getVaccines(){
    return this.http.get(this.baseURL + "Vaccine/Vaccines");
  }
  getIcds(){
    return this.http.get(this.baseURL + "Icd/Icds");
  }
  getCitiesState(stateid:any){
    
    return this.http.get(this.baseURL + "City/GetCityStateId?Id=" + stateid);
   }
   getLocalCity(cityid:any){
    return this.http.get(this.baseURL + "Locality/GetLocalityByCityId?Id=" + cityid);
   }
   getUnitLocality(localityid:any){
    return this.http.get(this.baseURL + "Healthunit/HealthUnitByLocalityId?Id=" + localityid);
   }
   getVaccineUnit(unitid:any){
    return this.http.get(this.baseURL + "Healthunit/HealthUnitByunitId?Id=" + unitid);
   }
   getUnitDetails(unitid:any){
    return this.http.get(this.baseURL + "Healthunit/GetHealthunitById?Id=" + unitid);
   }
   registerRecieptionService(form:any){
    return this.http.post(this.baseURL + "Servicerecipient/CreateServicerecipient" , form , {responseType: "blob"} );
   }
   registerRecieptionBook(form:any ,hours:any , id:any){
     const params ={ 'servicerecipientid' : id , 'bookinghour' : hours };
     const data = Object.assign(params , form)
    return this.http.post(this.baseURL + "Servicerecipientvaccinedose/CreateServicerecipientvaccinedose" , data , {responseType: "blob"} );
   }
   getVacinneDoses(){
    return this.http.get(this.baseURL + "Servicerecipientvaccinedose/Servicerecipientvaccinedose");
   }
   getListBypage(page:any ,status:any , dateFrom:any , dateTo:any){
    return this.http.get(this.baseURL + "Servicerecipientvaccinedose/ServiceRecipientVaccineDosePagedList",{params:{'PageNumber': page , 'PageSize' : '10' ,'status' : status ,'fromDate' : dateFrom , 'toDate':dateTo}});
   }
   getVaccineDoseByNatID(natid:any ,status:any){
    return this.http.get(this.baseURL + "Servicerecipientvaccinedose/GetServicerecipientvaccinedoseNationalNumber" ,{params:  {'nationalNumber':natid , 'status' : status}});
   }
   getIdType(){
    return this.http.get(this.baseURL + "IdType/IdTypes"); 
  }
  confirmVaccineDose(form:any ,serviceseciptid:any){
    const params = {'acceptedbyid' : localStorage.getItem('userid')};
    const data = Object.assign(params , form)
    return this.http.put(this.baseURL + "Servicerecipientvaccinedose/Confirm?Id=" + serviceseciptid, data ,{responseType : "blob"});
  }
}
