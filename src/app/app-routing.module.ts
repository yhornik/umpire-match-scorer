import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'page-a',
    loadChildren: () => import('./page-a/page-a.module').then(m => m.PageAModule)
  },
  {
    path: 'page-b',
    loadChildren: () => import('./page-b/page-b.module').then(m => m.PageBModule)
  },
  {
    path: 'page-c',
    loadChildren: () => import('./page-c/page-c.module').then(m => m.PageCModule)
  },
  {
    path: '',
    redirectTo: 'page-a',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {relativeLinkResolution: 'legacy'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
