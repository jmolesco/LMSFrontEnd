import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CategoryModule} from './category/category.module';
import {CourseModule} from './course/course.module';
// import {ApolloModule, Apollo} from 'apollo-angular';
// import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
// import {InMemoryCache}from 'apollo-cache-inmemory';

@NgModule({
  declarations: [],
  exports:[CategoryModule, CourseModule],
  imports: [
    CommonModule,
    // ApolloModule,
    // HttpLinkModule
  ]
})
export class AdminModule {
  // constructor(
  //   apollo:Apollo,
  //   httpLink: HttpLink,
  // ){
  //   apollo.create({
  //       link: httpLink.create({uri:"http://localhost:13003/graphql"}),
  //       cache: new InMemoryCache()
  //     })
  // }

 }
