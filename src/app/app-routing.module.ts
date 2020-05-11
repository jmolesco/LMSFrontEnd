import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '@sharedPagesUser/login/login.component';
import {RegistrationComponent} from '@sharedPagesUser/registration/registration.component';

const routes: Routes = [
  {
    path:"",
    component:LoginComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"user/register",
    component:RegistrationComponent
  },
  {
    path:"admin/course",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.CourseModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
