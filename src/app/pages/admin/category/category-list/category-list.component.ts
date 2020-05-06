import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import {dataFilter} from '@sharedHelper/helperFunction'; 
@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.sass']
})
export class CategoryListComponent implements OnInit {
  categories;
  currentPage:number = 1;
  status:number = 1;
  keyword:string = "";
  orderKey:number = 0;
  orderType:number = 0;
  constructor(
    private service:CategoryService
  ) {

   }


  onLoad(data):void{    
    this.service.getCategoryList(data)
        .subscribe(result=>
        { 
            this.categories = dataFilter(result[keyword.categoryList][keyword.listKeyword]);
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

  ngOnInit(): void {
   let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
   this.onLoad(data);
  }
  submitSearch():void{
    let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType);
    console.log(data);
    this.onLoad(data);
  }

}
