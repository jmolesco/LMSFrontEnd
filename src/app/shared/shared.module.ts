import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '@sharedPagesAdmin/header/header.component';
import { SidebarComponent } from '@sharedPagesAdmin/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './pages/admin/pagination/pagination.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegistrationComponent } from './pages/user/registration/registration.component';
import {FormsModule} from '@angular/forms';
import { HeaderUserComponent } from './pages/user/header-user/header-user.component';

@NgModule({
  declarations: [HeaderComponent, SidebarComponent, PaginationComponent, LoginComponent, RegistrationComponent, HeaderUserComponent],
  exports:[HeaderComponent, SidebarComponent, PaginationComponent, LoginComponent, RegistrationComponent, HeaderUserComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ]
})
export class SharedModule { }
