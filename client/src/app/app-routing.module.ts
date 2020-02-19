import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WidgetListComponent } from './widget-list/widget-list.component';
import { WidgetDetailComponent } from './widget-list/widget-detail/widget-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'widgets', component: WidgetListComponent },
  { path: 'widgets/widgetdetail/:id', component: WidgetDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
