import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root',
})
export class FetchService {

  constructor(
    private http:HttpClient,
    private state:StateService
  ) { }

  public login(url:string, cretentials:String){
     return this.http.post<any>(url,{},{
        headers:{
          Authorization: `Basic ${cretentials}`
        }
      });
  }

  public getOperators(url:string){
    return this.http.get<any>(url,{
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    });
  }

  public setRecharge(url:string, body:any){
    return this.http.post<any>(url, body,{
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    });
  }

  public getRecharges(url:string){
    return this.http.get<any>(url,{
      headers:{
        Authorization: `Bearer ${this.state.token}`
      }
    });
  }


}
