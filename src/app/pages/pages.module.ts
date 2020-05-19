import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ]
})
export class PagesModule { }
export * from './admin/category/category.module';
export * from './admin/course/course.module';
export * from './admin/user/user.module';
export * from './admin/dashboard/dashboard.module';
export { DashboardModule as UserDashboardModule} from './user/dashboard/dashboard.module';
export * from './admin/lesson/lesson.module';