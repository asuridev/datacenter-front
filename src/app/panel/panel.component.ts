import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from '../state.service';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatSlideToggleChange, MatSlideToggleModule} from '@angular/material/slide-toggle';
import { FormGroup,Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { FetchService } from '../fetch.service';
import { API_ENDPOINTS } from '../../environments/environments';
import { Router, Event } from '@angular/router';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatTableModule
  ],
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.scss'
})
export class PanelComponent {

  constructor(
    private state:StateService,
    private fetchService:FetchService,
    private router: Router
  ){}

  public report:boolean = false;
  public isAdmin:boolean = false;
  public error:string = "";
  public confirmation:string = ""
  public name:string = "";
  public lastName:string = "";
  public role:string = "";
  public users: Array<any> = [];
  public operators: Array<any> = [];
  public infoReport: Array<any> = [];
  public allRegister: Array<any> = [];
  public operadorSelected: Array<number> = [];
  public sellerSelected: Array<number> = [];
  displayedColumns: string[] = ['position', 'telephone', 'operator', 'value', 'seller'];

  form: FormGroup = new FormGroup({
    telephone: new FormControl('',[Validators.required]),
    value: new FormControl('',[Validators.required]),
    operator: new FormControl('',[Validators.required]),
  });

  recharge(){
    if (this.form.valid) {
      this.confirmation = "";

      const rechargeDto = {
        value:this.form.value.value,
        telephone:this.form.value.telephone,
        user:{
          id:this.state.id
        },
        operator:{
          id:this.form.value.operator
        }
      }
      this.fetchService.setRecharge(API_ENDPOINTS.recharge,rechargeDto)
      .subscribe(data =>{
        this.confirmation = `La Recarga al numero ${this.form.value.telephone} se Aplicó exitosamente.`
        this.form.untouched;
        this.form.markAsUntouched();
        this.form.reset();
      },({error})=>{
        this.error = "Upss Ocurrió un error...";
      })
    }
  }

  logout(){
    this.state.isLogin = false;
    this.state.token = "";
    this.router.navigate(['/','login'])
  }

  changeToggle(event:MatSlideToggleChange){
    this.report = event.checked;
    if(event.checked){
      this.fetchService.getRecharges(API_ENDPOINTS.recharge)
      .subscribe(data => {
        this.infoReport = data.content
          .map((register:any, index:number) => {
            return {
              position:index + 1,
              telephone:register.telephone,
              value:register.value,
              seller: `${register.user.name} ${register.user.lastName}`,
              sellerId: register.user.id,
              operator:register.operator.name,
              operatorId:register.operator.id
            }
          });
        const sellers = data.content
              .map((register:any) => register.user)
        this.users = [];      
        sellers.forEach((seller:any)=>{
          if(!this.users.some(user => user.id === seller.id)){
            this.users.push(seller);
          }
        });
        this.sellerSelected = this.users.map((user:any)=> user.id);
        this.allRegister = [...this.infoReport]
      })
    }
  }


  private filter(){
    this.infoReport = this.allRegister
      .filter((register:any)=> this.operadorSelected.some((id:number)=> id === register.operatorId))
      .filter((register:any)=> this.sellerSelected.some((id:number)=> id === register.sellerId))
    
  }

  filterOperator(event:MatSelectChange){
    this.operadorSelected = [...event.value];
    this.filter();
    
  }

  filterSeller(event:MatSelectChange){
    this.sellerSelected = [...event.value];
    this.filter();
  }

  ngOnInit(){
    this.name = this.state.name;
    this.lastName = this.state.lastName;
    this.isAdmin = this.state.roles.some(role => role.role === 'ADMIN');
    this.role = this.state.roles[0].role;

    this.fetchService.getOperators(API_ENDPOINTS.operator)
    .subscribe(data => {
      this.operators = [...data.content]
      this.operadorSelected = this.operators.map((operator:any)=>operator.id);
    });
  }


}
