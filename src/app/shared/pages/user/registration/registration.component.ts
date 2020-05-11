import { Component, OnInit } from '@angular/core';
import { ErrorService } from '@sharedService/error.service';
import {processError, setErrorMessage} from '@sharedHelper/helperFunction';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.sass']
})
export class RegistrationComponent implements OnInit {

  constructor(private errorService:ErrorService,
      private service:UserService,
      private router: Router,
    ) { 
    if(this.errorService.errorVar !== undefined){
      this.errorService.errorVar  = undefined;     
    }

  }
  firstName:string;
  lastName:string;
  email:string;
  userName:string;
  password:string;
  confirmPass:string;
  photoPath:any;
  loading:boolean = false;
  photoData: any = <any>{};
  success:boolean = false;
  varNames:any = {
    nuser_firstname:"",
    nuser_lastname:"",
    nuser_name:"",
    nuser_email:"",
    nuser_password:"",
    confirmpass:"",
    nuser_picture:""
  }
  ngOnInit(): void {
    if (this.errorService.errorVar===undefined) 
    {    
        //THIS FUNCTION IS USED WHEN ERROR IN APP MODULE HAS ERROR
        this.errorService.errorVar = this.errorService.invokeErrorComponentFunction.subscribe((obj) => {
           const errors =  processError(obj);
           console.log(errors);
           const newError = setErrorMessage(errors,this.varNames);
           this.varNames = newError;
        });    
    }
  }
  getInputData():any{
    const data = {
      nuser_firstname:this.firstName.trim(),
      nuser_lastname:this.lastName.trim(),
      nuser_email:this.email.trim(),
      nuser_name:this.userName.trim(),
      nuser_password:this.password.trim(),
      cpass:this.confirmPass.trim(),
      image:this.photoData.file,
    }
    return data;
  }
  clearError():void{
    this.varNames.nuser_firstname ="",
    this.varNames.nuser_lastname="",
    this.varNames.nuser_name="",
    this.varNames.nuser_email="",
    this.varNames.nuser_password="",
    this.varNames.confirmpass=""
  }
  functionDelay(time:number){
    setTimeout(()=>{  
      this.loading = false;
      this.success = false; 
      this.router.navigate(["/login"]);
    }, time );
  }
  createAccount():void{
    const dataAdd= this.getInputData();
    this.loading = true;
    this.service.submitActionMutation(dataAdd).subscribe(
      success => { 
           this.success= true;
           this.functionDelay(keyword.delayTime);
      },
      error =>  { 
        console.log(error) 
        this.loading = false;
      } 
    );
  }
  handleFileInput(file):void{
    if (file) {
      this.photoData.file = file[0];
      const reader = new FileReader();
      reader.onload = e => this.photoPath = reader.result;
      reader.readAsDataURL(file[0]);
    }
  }
}
