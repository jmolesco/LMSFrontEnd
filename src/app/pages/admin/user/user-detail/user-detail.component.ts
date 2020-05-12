import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '@sharedPagesUser/user.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import { ErrorService } from '@sharedService/error.service';
import {processError} from '@sharedHelper/helperFunction';
import {environment} from '@environment/environment';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  id:number = 0;
  name: string;
  functionState:boolean = false;
  functionUsed:string;
  actionType:string=keyword.actionView;

  nuser_id:number=0;
  nuser_firstname:String; 
  nuser_lastname:String; 
  nuser_middlename:String; 
  tuser_birthdate:String; 
  suser_birthplace:String; 
  nuser_gender:String;
  

  nuser_name:String;
  nuser_email:String; 
  nuser_phone1:String; 
  nuser_phone2:String; 
  nnationality_id:String; 
  scontact_emergency:String;
  slast_school_attended:String; 

  saddress_line_1:String; 
  saddress_line_2:String; 
  scity:String; 
  sstate:String; 
  suser_country:String; 
  nuser_picture:String;
  
  constructor(private route:ActivatedRoute,
    private service:UserService,
    private errorService:ErrorService
    ) {

      if(this.errorService.errorVar !== undefined){
        this.errorService.errorVar  = undefined;     
      }
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id = params['id'];
      if(id!=="new"){
        this.functionState = true;
        this.service.getUserDetail({id}).subscribe(result=>{
            const detailContent = result[keyword.GetUserDetail];
            this.nuser_id=detailContent.nuser_id;
            this.nuser_firstname=detailContent.nuser_firstname;
            this.nuser_lastname=detailContent.nuser_lastname;
            this.nuser_middlename=detailContent.nuser_middlename;
            this.tuser_birthdate=detailContent.tuser_birthdate;
            this.suser_birthplace=detailContent.suser_birthplace;
            this.nuser_gender=detailContent.nuser_birthplace;
            

            this.nuser_name=detailContent.nuser_name;
            this.nuser_email=detailContent.nuser_email;
            this.nuser_phone1=detailContent.nuser_phone1;
            this.nuser_phone2=detailContent.nuser_phone2;
            this.nnationality_id=detailContent.nnationality_id;
            this.scontact_emergency=detailContent.scontact_emergency;
            this.slast_school_attended=detailContent.slast_school_attended;

            this.saddress_line_1=detailContent.saddress_line_1;
            this.saddress_line_2=detailContent.saddress_line_2;
            this.scity=detailContent.scity;
            this.sstate=detailContent.sstate;
            this.suser_country=detailContent.suser_country;
            this.nuser_picture = environment.imageProfile+ detailContent.nuser_picture;
            //this.functionUsed =keyword.recordEdited;
            //this.actionType = keyword.actionEdit;
        });     
     }
    });

  }

}
