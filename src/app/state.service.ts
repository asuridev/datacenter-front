import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  public isLogin:boolean =false;
  public id:number = 0;
  public name:string ="";
  public lastName:string ="";
  public roles:Array<{role:string}> = [{role:""}];
  public token:string = "";
  constructor() { }
}
