import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import {courseList, submitCourseDeleteAction,courseDetail, submitCourseInsertAction,submitCourseEditAction } from '@sharedHelper/graphql'

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private baseService: BaseService) {

  }

  public getAllList(data){
    const variables = { 
      pager: {	page:parseInt(data.pageNumber)},
      filterStatus: { status: parseInt(data.status) },
      searchKeyword:{ keyword: data.keyword},
      orderBy:{ orderKey:parseInt(data.orderKey), orderType:parseInt(data.orderType)}
    };
    return this.baseService.getResponseAllQuery(courseList, variables);  
  }
  public submitMutation(data, refreshVar){
    const variables = {
      courseDeleteInput:{  ncourse_id:data.id, status:data.status}
    }
    
    const refreshVariables = { 
      pager: {	page:parseInt(refreshVar.pageNumber)},
      filterStatus: { status: parseInt(refreshVar.status) },
      searchKeyword:{ keyword: refreshVar.keyword},
      orderBy:{ orderKey:parseInt(refreshVar.orderKey), orderType:parseInt(refreshVar.orderType)}
    };
    return this.baseService.submitActionMutation(submitCourseDeleteAction, variables, courseList, refreshVariables);
  }
  public submitActionMutation(data, isEdit=false){
    var action = submitCourseInsertAction;
    let inputData;
    if(isEdit === true){
      const variables = {
        courseUpdateInput:{
          ncourse_id:data.ncourse_id,
          scourse_title:data.scourse_title,
          scourse_description:data.scourse_description,
          scourse_photo:data.scourse_photo,
          ncategory_id:parseInt(data.ncategory_id),
          ncreated_by:data.ncreated_by,
          nupdated_by:data.nupdated_by,
          image:data.image
        }
      };
      inputData= variables;
      action = submitCourseEditAction;
    }
    else{
      const variables = {
        courseInput:{
          scourse_title:data.scourse_title,
          scourse_description:data.scourse_description,
          scourse_photo:data.scourse_photo,
          ncategory_id:parseInt(data.ncategory_id),
          ncreated_by:data.ncreated_by,
          nupdated_by:data.nupdated_by,
          image:data.image
        }
      };
      
      inputData= variables;
    }
    return this.baseService.SubmitWithUploadImage(action, inputData);
  }
  public getDetail(data){
    const variables = { 
      id:parseInt(data.id)
    };
    return this.baseService.getResponseAllQuery(courseDetail, variables);  
  }
}
