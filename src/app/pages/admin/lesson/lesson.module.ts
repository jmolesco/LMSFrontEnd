import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LessonRoutingModule } from './lesson-routing.module';
import { LessonListComponent } from './lesson-list/lesson-list.component';
import { LessonDetailComponent } from './lesson-detail/lesson-detail.component';
import {FormsModule} from '@angular/forms';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [LessonListComponent, LessonDetailComponent],
  imports: [
    CommonModule,
    LessonRoutingModule,
    FormsModule,
    SharedModule
  ]
})
export class LessonModule { }
