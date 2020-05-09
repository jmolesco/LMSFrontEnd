import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http'
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { environment } from '@environment/environment';
import {ErrorService} from '@sharedService/error.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    ApolloModule,
    HttpLinkModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    apollo: Apollo,
    httpLink: HttpLink,
    private errorService: ErrorService
  ) {
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        );
        
        this.errorService.acceptErrorList(graphQLErrors);
      }
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        const errors = networkError["error"]["errors"][0];
        if(errors["statusCode"])
        this.errorService.acceptErrorList(errors.errorList);
      }
    });


    const link = httpLink.create({
      uri: environment.url,
    });

    apollo.create({
      link: errorLink.concat(link),
      cache: new InMemoryCache()
    });



  }
}
