import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Centers } from './models/Centers.model';
import { Cities } from './models/Cities.model';
import { Departments } from './models/Departments.model';
import { Localities } from './models/Localities.model';
import { Sections } from './models/Sections.model';
import { States } from './models/States.model';
import { Units } from './models/Units.model';
import { Vaccines } from './models/Vaccines.model';


@Injectable({
  providedIn: 'root'
})
export class PublicServiciesService {
  readonly baseURL = 'https://localhost:5001/api/';
  statesData:States = new States();
  citiesData:Cities = new Cities();
  localitiesData:Localities = new Localities();
  CentersData:Centers = new Centers();
  VaccinesData:Vaccines = new Vaccines();
  UnitsData:Units = new Units();
  DeptsData:Departments = new Departments();
  SectionsData:Sections = new Sections();

  
  constructor(private http: HttpClient) { 

  }
  getUnitById(id:any){
    let params = new HttpParams().set('Id',id);
    return this.http.get(this.baseURL + "Unit/GetUnitById",{params:{'Id': id}});
  }
  getUnits(){
    return this.http.get(this.baseURL + "Unit/Units");
  }
  getSectionById(id:any){
    let params = new HttpParams().set('Id',id);
    return this.http.get(this.baseURL + "Section/GetSectionById",{params:{'Id': id}});
  }
  
  getSections(){
    return this.http.get(this.baseURL + "Section/Sections");
  }
  getDeptById(id:any){
    let params = new HttpParams().set('Id',id);
    return this.http.get(this.baseURL + "Department/GetDepartmentById",{params:{'Id': id}});
  }
  getDepts(){
    return this.http.get(this.baseURL + "Department/Departments");
  }
  getUserByid(id:any){
    let params = new HttpParams().set('Id',id);
    return this.http.get(this.baseURL + "UserLogin/GetUserById",{params:{'Id': id}});
  }
  getUsers(){
    return this.http.get(this.baseURL + "UserLogin/GetAllUsers");
  }
  deleteUser(id:any){
    const params = {'id' : id};
    return this.http.put(this.baseURL + "UserLogin/UpdateUserDeleted?id=" + id, {responseType : "text"});
 }
 UpdateUser(form:any,id:any){
  const params = {'id' : id , 'status' : 'Active'};
  const Data = Object.assign(form, params);
  return this.http.put(this.baseURL + "UserLogin/UpdatUser?Id=" + id, Data ,{responseType : "blob"});
}
 getUserBypage(page:any){
  let params = new HttpParams().set('Id',page);
  return this.http.get(this.baseURL + "UserLogin/UsersPagenation",{params:{'PageNumber': page , 'PageSize' : '7'}});
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
addCityResponse(form:any){
 
  return this.http.post(this.baseURL + "City/Create City" , form  , {responseType: "blob"} );
}
deleteCity(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "City/DeleteCity?Id=" + id, {responseType : "blob"});
}
UpdateCity(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "City/UpdateCity?Id=" + id, form ,{responseType : "blob"});
}
addStateResponse(form:any){
  return this.http.post(this.baseURL + "State/CreateState" , form , {responseType: "blob"} );
}
deleteState(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "State/DeleteState?Id=" + id, {responseType : "blob"});
}
UpdateState(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "State/UpdateState?Id=" + id, form ,{responseType : "blob"});
}
addUnitResponse(form:any){
  return this.http.post(this.baseURL + "Unit/CreateUnit" , form , {responseType: "blob"} );
}
deleteUnit(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "Unit/DeleteUnit?Id=" + id, {responseType : "blob"});
}
UpdateUnit(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "Unit/UpdateUnit?Id=" + id, form ,{responseType : "blob"});
}
addDeptResponse(form:any){
  return this.http.post(this.baseURL + "Department/CreateDepartment" , form , {responseType: "blob"} );
}
deleteDept(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "Department/DeleteDepartment?Id=" + id, {responseType : "blob"});
}
UpdateDept(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "Department/UpdateDepartment?Id=" + id, form ,{responseType : "blob"});
}
addSectionResponse(form:any){
  return this.http.post(this.baseURL + "Section/CreateSection" , form , {responseType: "blob"} );
}
deleteSection(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "Section/DeleteSection?Id=" + id, {responseType : "blob"});
}
UpdateSection(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "Section/UpdateSection?Id=" + id, form ,{responseType : "blob"});
}

addVaccineResponse(form:any){
  return this.http.post(this.baseURL + "Vaccine/CreateVaccine" , form , {responseType: "blob"} );
}
deleteVaccine(id:any){
  const params = {'id' : id};
  return this.http.delete(this.baseURL + "Vaccine/DeleteVaccine?Id=" + id, {responseType : "blob"});
}
UpdateVaccine(form:any,id:any){
  const params = {'id' : id};
  return this.http.put(this.baseURL + "Vaccine/UpdateVaccine?Id=" + id, form  ,{responseType : "blob"});
}

}
