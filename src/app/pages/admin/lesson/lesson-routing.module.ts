import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';


const routes: Routes = [
  {
    path:"",
    component:LessonListComponent
  },
  {
    path:":id",
    component:LessonDetailComponent,
    pathMatch:"full"
  },
  {
    path:"new",
    component:LessonDetailComponent,
    pathMatch:"full"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LessonRoutingModule { }
