import { Component, OnInit, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../course.service';
import { CategoryService } from '../../category/category.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import { ErrorService } from '@sharedService/error.service';
import {processError} from '@sharedHelper/helperFunction';
import {environment} from '@environment/environment';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.sass']
})
export class CourseDetailComponent implements OnInit {

  id:number = 0;
  name: string;
  description:string;
  photo:string;
  photoPath:any;
  photoData: any = <any>{};
  categoryId:number=0;
  createdBy:number = 0;
  updatedBy:number = 0;
  categoryList;
  functionState:boolean = false;
  functionUsed:string;
  actionType:string=keyword.actionInsert;
  constructor(private route:ActivatedRoute,
    private service:CourseService,
    private errorService:ErrorService,
    private categoryService:CategoryService,
    ) {

      if(this.errorService.errorVar !== undefined){
        this.errorService.errorVar  = undefined;     
      }
   }
   handleFileInput(file):void{
     console.log(file);
    if (file) {
      this.photoData.file = file[0];
      const reader = new FileReader();
      reader.onload = e => this.photoPath = reader.result;
      reader.readAsDataURL(file[0]);
  }
   }
  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id = params['id'];
      if(id!=="new"){
        this.functionState = true;
        this.service.getDetail({id}).subscribe(result=>{
            const detailContent = result[keyword.GetCourseDetail];
            
            this.id = detailContent.ncourse_id;
            this.categoryId = detailContent.ncategory_id;
            this.description= detailContent.scourse_description;
            this.name = detailContent.scourse_title;
            this.functionUsed =keyword.recordEdited;
            this.actionType = keyword.actionEdit;
            this.photoPath = environment.imageUrl + detailContent.scourse_photo;
        });     
     }
    });
    this.loadCategory()
    if (this.errorService.errorVar===undefined) 
    {    
        //THIS FUNCTION IS USED WHEN ERROR IN APP MODULE HAS ERROR
        this.errorService.errorVar = this.errorService.invokeErrorComponentFunction.subscribe((obj) => {
           const error =  processError(obj);
           console.log(error);
          
        });    
    }
    
  }
  
  getInputData():any{
    const data = {
      ncourse_id:this.id,
      scourse_title:this.name.trim(),
      scourse_description:this.description.trim(),
      ncategory_id:this.categoryId,
      ncreated_by:1,
      scourse_photo:this.photo,
      nupdated_by:0,
      image:this.photoData.file
    }
    return data;
  }
  clearInput(){
    this.id=0;
    this.name="";
  }
  submitInsertRecord():void{
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

  loadCategory():void{
    let data = {
      pageNumber:0,
      status:0,
      keyword:"",
      orderKey:0,
      orderType:0 
    };
    this.categoryService.getCategoryList(data).subscribe(result=>{
        this.categoryList = result[keyword.categoryList][keyword.listKeyword];
    });     
  }

}
