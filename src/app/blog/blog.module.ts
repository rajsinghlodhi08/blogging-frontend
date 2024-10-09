import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxLoadingModule } from 'ngx-loading';
import { MaterialModule } from '../material.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent,
  ],
  imports: [
    CommonModule,
    BlogRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    NgxLoadingModule,
    MatInputModule,
    MatFormFieldModule,
    SharedModule,
    FormsModule,
  ]
})
export class BlogModule { }
