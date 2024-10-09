import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, Location, PathLocationStrategy} from '@angular/common';
import { SidebarComponent } from './commons/sidebar/sidebar.component';
import { HeaderComponent } from './commons/header/header.component';
import { TokenInterceptorService } from './commons/service/token-interceptor.service';
import { AppRoutingModule } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { BlogModule } from './blog/blog.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    SharedModule,
    NgxSkeletonLoaderModule.forRoot(),
    BlogModule
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
  ],
  providers: [
    // {provide: APP_BASE_HREF, useValue: '/app'},
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
