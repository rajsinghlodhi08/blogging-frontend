import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
   {
    path: '',
    component: SignInComponent,
  },
  {
    path: 'sign-in',
    component: SignInComponent,

  },

  {
    path: 'sign-up',
    component: SignUpComponent,
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule { }
