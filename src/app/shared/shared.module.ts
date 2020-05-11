import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@sharedPagesAdmin/header/header.component';
import { SidebarComponent } from '@sharedPagesAdmin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pages/admin/pagination/pagination.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, PaginationComponent, LoginComponent, RegistrationComponent],
  exports:[HeaderComponent, SidebarComponent, PaginationComponent, LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
