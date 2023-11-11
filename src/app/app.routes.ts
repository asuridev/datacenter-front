import { Routes } from '@angular/router';
import { FormloginComponent } from './formlogin/formlogin.component';
import { PanelComponent } from './panel/panel.component';

export const routes: Routes = [
  {
    path:'', component:FormloginComponent
  },
  {
    path:'login', component:FormloginComponent
  },
  {
    path:'panel',component:PanelComponent
  }
];
