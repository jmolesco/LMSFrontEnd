import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LessonService } from '../lesson.service';
import { CourseService } from '@pagesAdmin/course/course.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import { ErrorService } from '@sharedService/error.service';
import {processError, setErrorMessage} from '@sharedHelper/helperFunction';
import {environment} from '@environment/environment';
@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.sass']
})
export class LessonDetailComponent implements OnInit {

  id:number;
  title:string;
  duration:number = 0;
  courseId:number = 0;
  attachmentType:number = 0;
  summary:number;
  photo:string;
  photoPath:any;
  photoData: any = <any>{};
  fileType:string;
  courseList;
  varNames:any = {
    title:"",
    duration:"",
    courseId:"",
    summary:"",
    attachmentType:"",
    attachment:""
  }

  functionState:boolean = false;
  functionUsed:string;
  actionType:string=keyword.actionInsert;
  constructor(private route:ActivatedRoute,
    private service:LessonService,
    private errorService:ErrorService,
    private courseService:CourseService,) { 


    }

  ngOnInit(): void {
    this.loadCourse();
    this.route.params.subscribe(params=>{
      const id = params['id'];
      if(id!=="new"){
        this.functionState = true;
        this.service.getLessonDetail({id}).subscribe(result=>{
            const detailContent = result[keyword.GetLessonDetail];           
            this.id = detailContent.id;
            this.title = detailContent.title;
            this.summary= detailContent.summary;
            this.duration = detailContent.duration;
            this.courseId= detailContent.course_id;
            this.attachmentType = detailContent.attachment_type;
            this.functionUsed =keyword.recordEdited;
            this.actionType = keyword.actionEdit;
            this.photoPath = environment.imageLesson + detailContent.attachment;
        });     
     }
    });
    if (this.errorService.errorVar===undefined) 
    {    
        //THIS FUNCTION IS USED WHEN ERROR IN APP MODULE HAS ERROR
        this.errorService.errorVar = this.errorService.invokeErrorComponentFunction.subscribe((obj) => {
           const errors =  processError(obj);
           const newError = setErrorMessage(errors,this.varNames);
           this.varNames = newError;
           console.log(this.varNames);
        });    
    }
  }
  loadCourse():void{
    let data = {
      pageNumber:0,
      status:0,
      keyword:"",
      orderKey:0,
      orderType:0 
    };
    this.courseService.getAllList(data).subscribe(result=>{
        this.courseList = result[keyword.courseList][keyword.listKeyword];
    });     
  }
  handleFileInput(file):void{
   console.log(file);
   if (file) 
   {
     this.photoData.file = file[0];
     const reader = new FileReader();
     reader.onload = e => this.photoPath = reader.result;
     reader.readAsDataURL(file[0]);
    }  
  }

  getInputData():any{
    const data = {
      title:this.title,
      duration:this.duration,
      course_id:this.courseId,
      attachment_type:this.attachmentType,
      summary:this.summary,
      file:this.photoData.file
    }
    return data;
  }

  clearError():void{
    this.varNames.title ="";
    this.varNames.duration=0;
    this.varNames.course_id=0;
    this.varNames.attachment_type=0;
    this.varNames.summary="";
  }

  clearInput(){
    this.id=0;
    this.title="";
    this.duration = 0;
    this.courseId = 0;
    this.attachmentType =0;
    this.summary =0;
  }
  submitInsertRecord():void{
    this.clearError();
    const dataAdd = this.getInputData();
    console.log(dataAdd);
    this.service.submitActionMutation(dataAdd).subscribe(
      success => { 
           this.clearInput();
           console.log(success);
      },
      error =>  { 
        console.log(error) 
      } 
    );
  }
  submitEditRecord():void{
    this.clearError();
    const dataAdd = this.getInputData();
    this.service.submitActionMutation(dataAdd, true).subscribe(
      success => { 
        console.log(success);
      },
      (error) =>  { 
        console.log(error); 
      } 
    );
  
  }
  handleFileType(event):void{
    const id = event.options.selectedIndex;
    const text = event.options[id].text;
    this.fileType = text;
  }

}
