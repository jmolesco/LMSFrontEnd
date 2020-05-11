import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../category.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import { ErrorService } from '@sharedService/error.service';
import {processError} from '@sharedHelper/helperFunction';
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.sass']
})
export class CategoryDetailComponent implements OnInit {

  id:number = 0;
  name: string;
  functionState:boolean = false;
  functionUsed:string;
  actionType:string=keyword.actionInsert;
  // componentVariables: object{
  //   scategory_name:"This is an error",
  //   ncategory_id:""
  // }
  scategory_name_err:string;
  constructor(private route:ActivatedRoute,
    private service:CategoryService,
    private errorService:ErrorService
    ) {

      if(this.errorService.errorVar !== undefined){
        this.errorService.errorVar  = undefined;     
      }
   }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      const id = params['id'];
      if(id!=="new"){
        this.functionState = true;
        this.service.getCategoryDetail({id}).subscribe(result=>{
            const detailContent = result[keyword.GetCategoryDetail];
            this.name = detailContent[keyword.scategory_name];
            this.id = detailContent[keyword.ncategory_id];

            this.functionUsed =keyword.recordEdited;
            this.actionType = keyword.actionEdit;
        });     
     }
    });

    if (this.errorService.errorVar===undefined) 
    {    
        //THIS FUNCTION IS USED WHEN ERROR IN APP MODULE HAS ERROR
        this.errorService.errorVar = this.errorService.invokeErrorComponentFunction.subscribe((obj) => {
           const error =  processError(obj);
           console.log(error);
           this.scategory_name_err = error["scategory_name_err"];
           console.log(this.scategory_name_err);
        });    
    }
    
  }
  
  getInputData():any{
    const data = {
      id:this.id,
      name:this.name.trim()
    }
    return data;
  }
  clearInput(){
    this.id=0;
    this.name="";
  }
  submitInsertRecord():void{
    const dataAdd = this.getInputData();
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


}
