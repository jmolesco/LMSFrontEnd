import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import {dataFilter} from '@sharedHelper/helperFunction'; 
import {ChildService} from '@sharedService/child.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.sass']
})
export class CourseListComponent implements OnInit {
  courses;
  currentPage:number = 1;
  status:number = 1;
  keyword:string = "";
  orderKey:number = 0;
  orderType:number = 0;
  totalPageList:number = 0;
  totalPageNumber:number = 0;

  constructor(
    private service:CourseService,
    private childService: ChildService
  ) {
    if(this.childService.subsVar!==undefined){
      this.childService.subsVar = undefined;     
    }
   }
   onLoad(data):void{    
    this.service.getAllList(data)
        .subscribe(results=>
        { 
            var result  = results[keyword.courseList];
            var pageInfo = result[keyword.pageInfo];
            this.courses = dataFilter(result[keyword.listKeyword]);
            this.currentPage = pageInfo[keyword.currentPage];            
            this.totalPageList = pageInfo[keyword.totalRecords];
            this.totalPageNumber =pageInfo[keyword.totalPage];
            this.childService.loadNewPage(this.totalPageNumber);
            return result;
        });
  }



  ngOnInit(): void {
    let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
    this.onLoad(data);
    if (this.childService.subsVar==undefined) 
    {    
      // THIS FUNCTION IS USED WHEN PAGE NUMBER IS CLICKED
      this.childService.subsVar = this.childService.invokeFirstComponentFunction.subscribe((currentPage:number) => { 
        this.currentPage = currentPage;      
        let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
        this.onLoad(data);       
      });    
    }
  }
  submitSearch():void{
    let data  = this.parameter(this.currentPage=1, this.status, this.keyword, this.orderKey, this.orderType);
    this.service.getAllList(data)
        .subscribe(results=>
        { 
          var result  = results[keyword.courseList];
          var pageInfo = result[keyword.pageInfo];
          this.courses = dataFilter(result[keyword.listKeyword]);
          this.currentPage = pageInfo[keyword.currentPage];            
          this.totalPageList = pageInfo[keyword.totalRecords];
          this.totalPageNumber =pageInfo[keyword.totalPage];
          this.childService.loadNewPage(this.totalPageNumber);
            return result
        });
  }
  submitUpdateStatus(id, status):void{
    let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
    this.service.submitMutation({id,status},data ).subscribe(result=> 
    {
        return result.data
    });

  }


  parameter(currentPage,status, keyword, orderKey, orderType){
    let data = {
      pageNumber:currentPage,
      status:status,
      keyword:keyword,
      orderKey:orderKey,
      orderType:orderType 
    };
    return data; 
  }

}
