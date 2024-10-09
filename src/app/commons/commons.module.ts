import { NgModule } from '@angular/core';
import { CommonsRoutingModule } from './commons-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { AuthGuard } from './guard/auth.guard';
import { BeforeAuthGuard } from './guard/before-auth.guard';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CommonsRoutingModule,
    MaterialModule,
  ],

  providers: [AuthGuard, BeforeAuthGuard, DatePipe],

  declarations: [
  ],
  
  entryComponents: [],
})
export class CommonsModule {}
