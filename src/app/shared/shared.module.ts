import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { NgxLoadingModule } from 'ngx-loading';
import { PopupComponent } from './popup/popup.component';
@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    NgxLoadingModule,
    // MatGoogleMapsAutocompleteModule
  ],
  declarations: [
    PopupComponent,
  ],
  entryComponents: [
    PopupComponent,
  ],
  exports: [
    PopupComponent,
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}