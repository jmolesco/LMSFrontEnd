import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';


const routes: Routes = [
  {
    path:"",
    component:UserListComponent,
    pathMatch:"full"
  },
  {
    path:":id",
    component:UserDetailComponent,
    pathMatch:"full"
  },
  {
    path:"new",
    component:UserDetailComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
