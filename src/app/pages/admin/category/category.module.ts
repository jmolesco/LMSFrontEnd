import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [CategoryListComponent, CategoryDetailComponent],
  exports:[CategoryListComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class CategoryModule { }
