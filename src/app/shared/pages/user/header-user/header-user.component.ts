import { Component, OnInit } from '@angular/core';
import { UserService } from '@sharedPagesUser/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.sass']
})
export class HeaderUserComponent implements OnInit {

  constructor(private service:UserService,
    private router:Router,) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.UserAndAdminLogOut();
    //this.router.navigate(['/login']);
    window.location.href="/login";
  }
}
