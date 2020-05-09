import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminModule} from './admin/admin.module';

@NgModule({
  declarations: [],
  exports:[AdminModule],
  imports: [
    CommonModule,
  ]
})
export class PagesModule { }
export * from './admin/category/category.module';
export * from './admin/course/course.module';
