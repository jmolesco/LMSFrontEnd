import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

const routes: Routes = [
  {
    path:"",
    component:CategoryListComponent,
    pathMatch:"full"
  },
  {
    path:":id",
    component:CategoryDetailComponent,
    pathMatch:"full"
  },
  {
    path:"new",
    component:CategoryDetailComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
