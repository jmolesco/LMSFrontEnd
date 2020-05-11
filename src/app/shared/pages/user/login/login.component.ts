import { Component, OnInit } from '@angular/core';
import { ErrorService } from '@sharedService/error.service';
import {processError, setErrorMessage} from '@sharedHelper/helperFunction';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  password:string;
  userName:string;
  loading:boolean= false;
  success:boolean= false;
  varNames:any = {
    account:""
  }
  constructor(private errorService:ErrorService,
    private service:UserService,
    private router: Router,) { 
      if(this.errorService.errorVar !== undefined){
        this.errorService.errorVar  = undefined;     
      }
    }

  ngOnInit(): void {
    if (this.errorService.errorVar===undefined) 
    {    
        //THIS FUNCTION IS USED WHEN ERROR IN APP MODULE HAS ERROR

        this.errorService.errorVar = this.errorService.invokeErrorComponentFunction.subscribe((obj) => {
          this.success = true;  
          const errors =  processError(obj);
           const newError = setErrorMessage(errors,this.varNames);
           this.varNames = newError;
        });    
    }
  }
  getInputData():any{
    return {
      nuser_name:this.userName,
      nuser_password:this.password
    }
  }
  functionDelay(time:number){
    setTimeout(()=>{  
      this.loading = false;
      this.success = false; 
      //this.router.navigate(["/login"]);
    }, time );
  }
  clearError():void{
    this.varNames.account ="";    
  }
  
  submitLogIn():void{
    this.clearError();
    const dataAdd= this.getInputData();
    this.loading = true;
    this.service.submitLogInActionMutation(dataAdd).subscribe(
      success => { 
           this.functionDelay(keyword.delayTime);
           console.log(success);
      },
      error =>  { 
        console.log(error) 
        this.loading = false;
      } 
    );
    
  }
}
