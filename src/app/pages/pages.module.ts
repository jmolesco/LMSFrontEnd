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
