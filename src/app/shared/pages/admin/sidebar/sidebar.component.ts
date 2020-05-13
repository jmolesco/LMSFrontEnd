import { Component, OnInit } from '@angular/core';
import { UserService } from '@sharedPagesUser/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {

  constructor(private service:UserService,
    private router:Router,
    ) { }

  ngOnInit(): void {
  }
  logout(){
    this.service.UserAndAdminLogOut();
    //this.router.navigate(['/login']);
    window.location.href="/login";
  }
}
