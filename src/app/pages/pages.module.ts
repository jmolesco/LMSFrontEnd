import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './user/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent,],
  imports: [
    CommonModule,
  ]
})
export class PagesModule { }
export * from './admin/category/category.module';
export * from './admin/course/course.module';
export * from './admin/user/user.module';