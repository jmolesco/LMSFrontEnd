import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourseListComponent } from './course-list/course-list.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';

const routes: Routes = [
  {
    path:"",
    component:CourseListComponent,
    pathMatch:"full"
  },
  {
    path:":id",
    component:CourseDetailComponent,
    pathMatch:"full"
  },
  {
    path:"new",
    component:CourseDetailComponent,
    pathMatch:"full"
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
