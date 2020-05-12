import { Component, OnInit } from '@angular/core';
import { UserService } from '@sharedPagesUser/user.service';
import {constantKeywords as keyword} from '@sharedHelper/constantKeywords';
import {dataFilter} from '@sharedHelper/helperFunction'; 
import {ChildService} from '@sharedService/child.service';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  userList;
  currentPage:number = 1;
  status:number = 1;
  keyword:string = "";
  orderKey:number = 0;
  orderType:number = 0;
  role:number = 1;
  totalPageList:number = 0;
  totalPageNumber:number = 0;

  constructor(private service:UserService,
    private childService: ChildService) { 
      if(this.childService.subsVar!==undefined){
        this.childService.subsVar = undefined;     
      }

    }
    onLoad(data):void{    
     this.service.getUserList(data)
          .subscribe(results=>
          { 
              var result  = results[keyword.GetUserList];
              var pageInfo = result[keyword.pageInfo];
              this.userList = dataFilter(result[keyword.listKeyword]);
              this.currentPage = pageInfo[keyword.currentPage];            
              this.totalPageList = pageInfo[keyword.totalRecords];
              this.totalPageNumber =pageInfo[keyword.totalPage];
              this.childService.loadNewPage(this.totalPageNumber);
              return result;
          });
    }
  ngOnInit(): void {
    let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType, this.role);
    this.onLoad(data);
    if (this.childService.subsVar==undefined) 
    {    
      // THIS FUNCTION IS USED WHEN PAGE NUMBER IS CLICKED
      this.childService.subsVar = this.childService.invokeFirstComponentFunction.subscribe((currentPage:number) => { 
        this.currentPage = currentPage;      
        //console.log("current Page on paging clicked : " + this.currentPage);
        let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType, this.role);
        this.onLoad(data);


      });    
    }
  }
  parameter(currentPage,status, keyword, orderKey, orderType, role){
    let data = {
      pageNumber:currentPage,
      status:status,
      keyword:keyword,
      orderKey:orderKey,
      orderType:orderType,
      role: role 
    };
    return data; 
  }
  submitSearch():void{
    let data  = this.parameter(this.currentPage=1, this.status, this.keyword, this.orderKey, this.orderType, this.role);
    this.service.getUserList(data)
        .subscribe(results=>
        { 
          var result  = results[keyword.GetUserList];
          var pageInfo = result[keyword.pageInfo];
          this.userList = dataFilter(result[keyword.listKeyword]);
          this.currentPage = pageInfo[keyword.currentPage];            
          this.totalPageList = pageInfo[keyword.totalRecords];
          this.totalPageNumber =pageInfo[keyword.totalPage];
          this.childService.loadNewPage(this.totalPageNumber);
          return result
        });
  }
  submitUpdateStatus(id, status):void{
    let data  = this.parameter(this.currentPage, this.status, this.keyword, this.orderKey, this.orderType, this.role);
    console.log(data);
    this.service.submitMutation({id,status},data ).subscribe(result=> 
    {
        return result.data
    });

  }

}
