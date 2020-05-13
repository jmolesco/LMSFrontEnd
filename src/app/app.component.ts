import { Component } from '@angular/core';
import { UserService } from '@sharedPagesUser/user.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Learning Management System';
  currentUser: any;
  isLogIn:Boolean= false;
  isAdmin:Boolean = false;
  constructor(private service:UserService,
    ){
    this.service.currentUser.subscribe(x => {
      if(x)
      {
        this.currentUser=x;
        console.log(this.currentUser);
        if(x.token!=null)
        {
          this.isLogIn = true;
          const role = x.ndefault_pageview;
          if(role===3) this.isAdmin= true;
          else this.isAdmin = false;
          
        }
        return this.currentUser;
      }
    });
  }

}
