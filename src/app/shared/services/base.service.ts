import { Injectable } from '@angular/core';
import {HttpClient,  HttpErrorResponse} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {Apollo} from 'apollo-angular';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  constructor(private httpClient: HttpClient,
    private apollo: Apollo
    ) { }

  //VARIABLES DECLARATION
  _error;

  public addResponseCall(api:any,data?:any,){
    let response;
    return response = this.httpClient.post(
      api.url,
      data,       
    ).pipe(catchError(err=>this.handleError(err)));
  }

  public editResponseCall(api:any,data?:any,){
    let response;
    return response = this.httpClient.put(
      api.url,
      data, 
    ).pipe(catchError(err=>this.handleError(err)));
  }

  public deleteResponseCall(api:any){
    let response;
    return response = this.httpClient.delete(
      api.url,
    ).pipe(catchError(err=>this.handleError(err)));
  }

  public getResponseCall(api:any):Observable<any>{
    let response;
    response = this.httpClient.get<any>(
      api.url
    ).pipe(catchError(err=>this.handleError(err)));
    return response;
  }

  public getResponseDetailViaIDCall(api:any):Observable<any>{
    let response;
    response = this.httpClient.get<any>(
      api.url
    ).pipe(catchError(err=>this.handleError(err)));
    return response;
  }

  public getResponseAllQuery(query:any, variables?: any){
    return this.apollo.watchQuery<any>({
            query:query,
            variables: variables,
          })
          .valueChanges
              .pipe(
                map(result => result.data),
                catchError(err=> {
                  console.log(err);
                  return err;
                })
                );           
  }

  public submitActionMutation(mutation?:any, variables?:any, refreshQueries?:any, refreshVar?:any){
    return this.apollo.mutate({
      mutation:mutation,
      variables: variables,
      refetchQueries:[{
        query:refreshQueries,
        variables:refreshVar
      }],
      errorPolicy: 'all'
    });           
  }

  handleError(error: HttpErrorResponse){
    console.log(error);
    if(error.error instanceof ErrorEvent){
      console.error('An error occurred', error.error.message)
    }
    else{
      this._error = {errorMsg:error.message, status:error.status};
      console.log("An error occured : " + error.message);
      return throwError(this._error);       
    }
  }

}
