import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import {categoryList, submitDeleteAction} from '@sharedHelper/graphql'

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private baseService: BaseService) {

  }
   

  public getCategoryList(data){
    // const promise = this.baseService.getResponseAllQuery(categoryList, variables)
    //     .subscribe(
    //         result=>{
    //           this.getList = result[keyword.categoryList]
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //     ); 
    // return this.getList;
    const variables = { 
      pager: {	page:parseInt(data.pageNumber)},
      filterStatus: { status: parseInt(data.status) },
      searchKeyword:{ keyword: data.keyword},
      orderBy:{ orderKey:parseInt(data.orderKey), orderType:parseInt(data.orderType)}
    };
    return this.baseService.getResponseAllQuery(categoryList, variables);  
  }
  public submitMutation(data, refreshVar){
    const variables = {
      categoryDeleteInput:{  ncategory_id:data.id, status:data.status}
    }
    
    const refreshVariables = { 
      pager: {	page:parseInt(refreshVar.pageNumber)},
      filterStatus: { status: parseInt(refreshVar.status) },
      searchKeyword:{ keyword: refreshVar.keyword},
      orderBy:{ orderKey:parseInt(refreshVar.orderKey), orderType:parseInt(refreshVar.orderType)}
    };
    return this.baseService.submitActionMutation(submitDeleteAction, variables, categoryList, refreshVariables);
  }

}
