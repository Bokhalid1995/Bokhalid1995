import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceRecipient } from './models/Servicerecipient.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  recieptiestDetails:ServiceRecipient = new ServiceRecipient();
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

   registerRecieptionService(form:any){
    return this.http.post(this.baseURL + "Servicerecipient/CreateServicerecipient" , form , {responseType: "blob"} );
   }
   getIdType(){
    return this.http.get(this.baseURL + "IdType/IdTypes");
  }
  
}
