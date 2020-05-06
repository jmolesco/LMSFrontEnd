import { Injectable, EventEmitter } from '@angular/core';
import { Subscription  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  currentPage:number =0;
  showAll:boolean = false;

  invokeFirstComponentFunction = new EventEmitter();    
  subsVar: Subscription;    

  invokeLoadNewPageComponentFunction = new EventEmitter();    
  subsVar1: Subscription;    

  sendNextPage(currentPage):void{
     this.invokeFirstComponentFunction.emit(currentPage);
  }

  loadNewPage(totalRecords):void{
    this.invokeLoadNewPageComponentFunction.emit(totalRecords);
  }


  constructor() { }


}
