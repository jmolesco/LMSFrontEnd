import { Injectable } from '@angular/core';
import {BaseService} from '@sharedService/base.service';
import {categoryList} from '@sharedHelper/graphql'

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
}
