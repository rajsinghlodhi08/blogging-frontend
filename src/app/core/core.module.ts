import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { DatePipe } from '@angular/common';
import { CoreRoutingModule } from './core.routing';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SignInComponent } from './sign-in/sign-in.component';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({

  imports: [
    CoreRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    NgxLoadingModule,
    MatFormFieldModule
  ],

  declarations: [
    SignInComponent,
    SignUpComponent,
  ],
  exports: [
    SignInComponent,
    SignUpComponent,
  ],
  providers: [DatePipe],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ],

})
export class CoreModule { }
