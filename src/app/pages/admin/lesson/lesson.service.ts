import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import { lessonDetail, lessonList, submitLessonDeleteAction, submitLessonEditAction, submitLessonInsertAction} from '@sharedHelper/graphql'

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  constructor(private baseService: BaseService) {

  }

  public getLessonList(data){
    const variables = { 
      pager: {	page:parseInt(data.pageNumber)},
      filterStatus: { status: parseInt(data.status) },
      filterCourse: { course_id: parseInt(data.course_id) },
      searchKeyword:{ keyword: data.keyword},
      orderBy:{ orderKey:parseInt(data.orderKey), orderType:parseInt(data.orderType)}      
    };
    return this.baseService.getResponseAllQuery(lessonList, variables);  
  }
  public submitMutation(data, refreshVar){
    const variables = {
      lessonDeleteInput:{  id:data.id, status:data.status}
    }
    
    const refreshVariables = { 
      pager: {	page:parseInt(refreshVar.pageNumber)},
      filterStatus: { status: parseInt(refreshVar.status) },
      filterCourse: { course_id: parseInt(data.course_id) },
      searchKeyword:{ keyword: refreshVar.keyword},
      orderBy:{ orderKey:parseInt(refreshVar.orderKey), orderType:parseInt(refreshVar.orderType)}
    };
    return this.baseService.submitActionMutation(submitLessonDeleteAction, variables, lessonList, refreshVariables);
  }
  public submitActionMutation(data, isEdit=false){
    var action = submitLessonInsertAction;
    let inputData;
    if(isEdit === true){
      const variables = {
        lessonUpdateInput:{
          id:data.id,
          title: data.title,
          duration: parseInt(data.duration),
          course_id: parseInt(data.course_id),
          attachment_type: parseInt(data.attachment_type),
          summary: data.summary,
          file:data.file,
        }
      };
      inputData= variables;
      action = submitLessonEditAction;
    }
    else{
      const variables = {
        lessonInput:{
          title: data.title,
          duration: parseInt(data.duration),
          course_id: parseInt(data.course_id),
          attachment_type: parseInt(data.attachment_type),
          summary: data.summary,
          file:data.file,
        }
      };
      
      inputData= variables;
    }
    console.log(inputData);
    return this.baseService.SubmitWithUploadImage(action, inputData);
  }
  public getLessonDetail(data){
    const variables = { 
      id:parseInt(data.id)
    };
    return this.baseService.getResponseAllQuery(lessonDetail, variables);  
  }


}
