import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormGroup,Validators, FormControl,ReactiveFormsModule } from '@angular/forms';
import { FetchService } from '../fetch.service';
import { API_ENDPOINTS } from '../../environments/environments';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formlogin',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './formlogin.component.html',
  styleUrl: './formlogin.component.scss'
})
export class FormloginComponent {
  
  constructor(
    private fetchService:FetchService,
    private stateService:StateService,
    private router: Router
  ){

  }
  error: string | null = "";
  
  form: FormGroup = new FormGroup({
    username: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  submit() {
    if (this.form.valid) {
      const credentialsBase64:string = window.btoa(this.form.value.username + ':' + this.form.value.password);
      this.fetchService.login(API_ENDPOINTS.login,credentialsBase64)
      .subscribe(data => {
        this.error = "";
        this.stateService.isLogin = true;
        this.stateService.id = data.id;
        this.stateService.lastName = data.lastName;
        this.stateService.name = data.name;
        this.stateService.roles = data.roles;
        this.stateService.token = data.token;
        this.router.navigate(['/','panel'])
      },
      ({ error })=>{
        this.error = error.message;
      });
      
    }
  }
}
