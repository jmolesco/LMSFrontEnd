import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import {submitUserInsertAction, submitUserLogInAction} from '@sharedHelper/graphql'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private baseService: BaseService) { 


  }
  public submitActionMutation(data, isEdit=false){
    var action = submitUserInsertAction;
    let inputData;
    if(isEdit === true){
      const variables = {
        userUpdateInput:{
          nuser_id :data.nuser_id,
          nuser_name:data.nuser_name,
          nuser_email:data.nuser_email,
          nuser_firstname:data.nuser_firstname,
          nuser_lastname:data.nuser_lastname,
          nuser_picture:data.nuser_picture,
          nuser_password:data.nuser_password,
          image:data.image,
          cpass:data.cpass,
        }
      };
      inputData= variables;
      //action = submitCourseEditAction;
    }
    else{
      const variables = {
        userInput:{
          nuser_name:data.nuser_name,
          nuser_email:data.nuser_email,
          nuser_firstname:data.nuser_firstname,
          nuser_lastname:data.nuser_lastname,
          nuser_picture:data.nuser_picture,
          nuser_password:data.nuser_password,
          image:data.image,
          cpass:data.cpass,
        }
      };
      
      inputData= variables;
    }

    return this.baseService.SubmitWithUploadImage(action, inputData);
  }

  public submitLogInActionMutation(data){
    const inputData = {
      userLogInInput:{
        nuser_name:data.nuser_name,
        nuser_password:data.nuser_password
      }
    };
    return this.baseService.SubmitWithUploadImage(submitUserLogInAction, inputData);
  }
}
