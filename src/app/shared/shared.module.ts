import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@sharedPagesAdmin/header/header.component';
import { SidebarComponent } from '@sharedPagesAdmin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pages/admin/pagination/pagination.component';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent, PaginationComponent],
  exports:[HeaderComponent, SidebarComponent, PaginationComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
