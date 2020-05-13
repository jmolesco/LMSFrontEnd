import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import {submitUserInsertAction, submitUserLogInAction, getUserList,submitUserDeleteAction, getUserDetail} from '@sharedHelper/graphql'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // INTERCEPTOR VALUES
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private baseService: BaseService) { 
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue():any {
 
    return this.currentUserSubject.value;
  }

  public getUserList(data){
    const variables = { 
      pager: {	page:parseInt(data.pageNumber)},
      filterStatus: { status: parseInt(data.status) },
      searchKeyword:{ keyword: data.keyword},
      orderBy:{ orderKey:parseInt(data.orderKey), orderType:parseInt(data.orderType)},
      filterRole:{ role:parseInt(data.role)}
    };
    return this.baseService.getResponseAllQuery(getUserList, variables);  
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
          ndefault_pageview:1
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

  public submitMutation(data, refreshVar){
    const variables = {
      userDeleteInput:{  nuser_id:data.id, status:data.status}
    }
    
    const refreshVariables = { 
      pager: {	page:parseInt(refreshVar.pageNumber)},
      filterStatus: { status: parseInt(refreshVar.status) },
      searchKeyword:{ keyword: refreshVar.keyword},
      orderBy:{ orderKey:parseInt(refreshVar.orderKey), orderType:parseInt(refreshVar.orderType)},
      filterRole:{ role:parseInt(refreshVar.role)}
    };
    return this.baseService.submitActionMutation(submitUserDeleteAction, variables, getUserList, refreshVariables);
  }

  public getUserDetail(data){
    const variables = { 
      id:parseInt(data.id)
    };
    return this.baseService.getResponseAllQuery(getUserDetail, variables);  
  }

  public UserAndAdminLogOut(){
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
