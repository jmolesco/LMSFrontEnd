import { Injectable, EventEmitter } from '@angular/core';
import { Subscription  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  invokeErrorComponentFunction = new EventEmitter();    
  errorVar: Subscription;    
  constructor() { }
  
  acceptErrorList(error):void{
    this.invokeErrorComponentFunction.emit(error);
  }
}
