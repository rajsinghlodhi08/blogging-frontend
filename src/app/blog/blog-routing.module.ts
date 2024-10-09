import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogListComponent } from './blog-list/blog-list.component';
import { BlogDetailComponent } from './blog-detail/blog-detail.component';
import { AuthGuard } from '../commons/guard/auth.guard';

const routes: Routes = [
  {path:'', component: BlogListComponent, pathMatch: 'full'},
  {path:'list', component: BlogListComponent, pathMatch: 'full'},
  {path:'detail/:id', component: BlogDetailComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule { }
