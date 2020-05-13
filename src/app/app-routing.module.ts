import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from '@sharedPagesUser/login/login.component';
import {RegistrationComponent} from '@sharedPagesUser/registration/registration.component';
import {AdminAuthGuard} from '@sharedHelper/adminAuthGuard';
import {UserAuthGuard} from '@sharedHelper/userAuthGuard';
const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"user/register",
    component:RegistrationComponent
  },
  // ADMIN PART
  {
    path:"admin/dashboard",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.DashboardModule),
    canActivate:[AdminAuthGuard]
  },
  // {
  //   path:"",
  //   loadChildren:()=> import("./pages/pages.module").then(m=>m.DashboardModule),
  //   canActivate:[AdminAuthGuard]
  // },
  {
    path:"admin/course",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.CourseModule),
    canActivate:[AdminAuthGuard]
  },
  {
    path:"admin/category",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.CategoryModule),
    canActivate:[AdminAuthGuard]
  },
  {
    path:"admin/user",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.UserModule),
    canActivate:[AdminAuthGuard]
  },

  // USER PART
  {
    path:"user/dashboard",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.UserDashboardModule),
    canActivate:[UserAuthGuard]
  },
  // {
  //   path:"",
  //   loadChildren:()=> import("./pages/pages.module").then(m=>m.UserDashboardModule),
  //   canActivate:[UserAuthGuard],
  //   pathMatch:"full"
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
