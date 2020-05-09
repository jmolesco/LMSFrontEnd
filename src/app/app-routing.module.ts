import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path:"admin/category",
    loadChildren:()=> import("./pages/pages.module").then(m=>m.CategoryModule),
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
