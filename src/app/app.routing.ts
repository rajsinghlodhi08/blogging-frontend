import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './commons/guard/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./core/core.module').then((mod) => mod.CoreModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./blog/blog.module').then((mod) => mod.BlogModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
