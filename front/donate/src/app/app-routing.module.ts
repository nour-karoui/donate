import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrgPageComponent} from './org-page/org-page.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent
  },
  {
    path: 'org',
    component: OrgPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
