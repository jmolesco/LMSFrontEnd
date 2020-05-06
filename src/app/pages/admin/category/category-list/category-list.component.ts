import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../category.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import {dataFilter} from '@sharedHelper/helperFunction'; 
import {ChildService} from '@sharedService/child.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit, OnDestroy  {
  categories;
  currentPage:number = 1;
  status:number = 1;
  keyword:string = "";
  orderKey:number = 0;
  orderType:number = 0;
  totalPageList:number = 0;
  totalPageNumber:number = 0;

  private querySubscription: Subscription;

  constructor(
    private service:CategoryService,
    private childService: ChildService
  ) {
    if(this.childService.subsVar!==undefined){
      this.childService.subsVar = undefined;     
    }
   }


  onLoad(data):void{    
    this.querySubscription = this.service.getCategoryList(data)
        .subscribe(result=>
        { 
            this.categories = dataFilter(result[keyword.categoryList][keyword.listKeyword]);
            this.currentPage = result[keyword.categoryList][keyword.pageInfo][keyword.currentPage];            
            this.totalPageList = result[keyword.categoryList][keyword.pageInfo][keyword.totalRecords];
            this.totalPageNumber =result[keyword.categoryList][keyword.pageInfo][keyword.totalPage];
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
        //console.log("current Page on paging clicked : " + this.currentPage);
        let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
        this.onLoad(data);
        // this.service.getCategoryList(data)
        // .subscribe(result=>
        // { 
        //     this.categories = dataFilter(result[keyword.categoryList][keyword.listKeyword]);
        //     return result
        // });

      });    
    }
  }
  submitSearch():void{
    let data  = this.parameter(this.currentPage=1, this.status, this.keyword, this.orderKey, this.orderType);
    this.service.getCategoryList(data)
        .subscribe(result=>
        { 
            this.categories = dataFilter(result[keyword.categoryList][keyword.listKeyword]);
            this.currentPage = result[keyword.categoryList][keyword.pageInfo][keyword.currentPage];            
            this.totalPageNumber =result[keyword.categoryList][keyword.pageInfo][keyword.totalPage];
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
  ngOnDestroy():void {
    this.querySubscription.unsubscribe();
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
