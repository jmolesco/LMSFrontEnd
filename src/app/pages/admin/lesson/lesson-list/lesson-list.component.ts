import { Component, OnInit } from '@angular/core';
import {CourseService} from '@pagesAdmin/course/course.service';
import {LessonService} from '../lesson.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import {dataFilter} from '@sharedHelper/helperFunction'; 
import {ChildService} from '@sharedService/child.service';
@Component({
  selector: 'app-lesson-list',
  templateUrl: './lesson-list.component.html',
  styleUrls: ['./lesson-list.component.sass']
})
export class LessonListComponent implements OnInit {
  lessons;
  courseList;
  currentPage:number = 1;
  status:number = 1;
  keyword:string = "";
  orderKey:number = 0;
  orderType:number = 0;
  totalPageList:number = 0;
  totalPageNumber:number = 0;
  courseID:number = 0;
  fileType:number = 0;
  constructor(private courseService: CourseService,
    private service: LessonService,
    private childService: ChildService
    ) {
      if(this.childService.subsVar!==undefined){
        this.childService.subsVar = undefined;     
      }
   }

  loadCourseList():void{
    let data = {
      pageNumber:0,
      status:0,
      keyword:"",
      orderKey:0,
      orderType:0 
    };
    this.courseService.getAllList(data)
        .subscribe(results=>
        { 
          this.courseList  = results[keyword.courseList][keyword.listKeyword];         
        });
  }

  onLoad(data):void{    
    this.service.getLessonList(data)
        .subscribe(results=>
        { 
            var result  = results[keyword.GetLessonList];
            var pageInfo = result[keyword.pageInfo];
            this.lessons = dataFilter(result[keyword.listKeyword]);
            this.currentPage = pageInfo[keyword.currentPage];            
            this.totalPageList = pageInfo[keyword.totalRecords];
            this.totalPageNumber =pageInfo[keyword.totalPage];
            this.childService.loadNewPage(this.totalPageNumber);
            return result;
        });
  }
  ngOnInit(): void {
    let data  = this.parameter(this.currentPage, this.status,this.courseID, this.keyword, this.orderKey, this.orderType);
    this.loadCourseList();
    this.onLoad(data);
  }
  submitSearch():void{
    let data  = this.parameter(this.currentPage=1, this.status,this.courseID, this.keyword, this.orderKey, this.orderType);
    this.service.getLessonList(data)
        .subscribe(results=>
        { 
          var result  = results[keyword.GetLessonList];
          var pageInfo = result[keyword.pageInfo];
          this.lessons = dataFilter(result[keyword.listKeyword]);
          this.currentPage = pageInfo[keyword.currentPage];            
          this.totalPageList = pageInfo[keyword.totalRecords];
          this.totalPageNumber =pageInfo[keyword.totalPage];
          this.childService.loadNewPage(this.totalPageNumber);
            return result
        });
  }
  submitUpdateStatus(id, status):void{
    let data  = this.parameter(this.currentPage, this.status,this.courseID, this.keyword, this.orderKey, this.orderType);
    console.log(data);
    this.service.submitMutation({id,status},data ).subscribe(result=> 
    {
        return result.data;
    });

  }
  
  parameter(currentPage,status,courseID, keyword, orderKey, orderType){
    let data = {
      pageNumber:currentPage,
      status:status,
      course_id:courseID,
      keyword:keyword,
      orderKey:orderKey,
      orderType:orderType 
    };
    return data; 
  }
}
