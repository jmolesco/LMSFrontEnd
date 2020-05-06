import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@sharedPagesAdmin/header/header.component';
import { SidebarComponent } from '@sharedPagesAdmin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [HeaderComponent, SidebarComponent],
  exports:[HeaderComponent, SidebarComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
