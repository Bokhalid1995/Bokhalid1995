import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

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
    
    return this.http.get(this.baseURL + "UserLogin/UsersPagenation",{params:{'PageNumber': stateid}});
   }
  
}
