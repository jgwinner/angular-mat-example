import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WidgetDetailComponent } from './widget-list/widget-detail/widget-detail.component';
import { WelcomeComponent } from './welcome/welcome.component';


import { WidgetListComponent } from './widget-list/widget-list.component';

//jdg: id on routes needs this, oddly:
import { HttpClientModule, HttpClient } from '@angular/common/http';

//jdg: This gives us the SDK login ability
import { SDKBrowserModule } from 'src/app/shared/sdk/index';

// for the detail input form
import { ReactiveFormsModule } from '@angular/forms';
// import { CurrencyPipe } from '@angular/common';
// jdg: This works fine for display, but entering is frustrating.
// import { TypeCurrencyMaskPipe } from './helpers/typeCurrencyMask.pipe';

// layout - independant of Material
import { FlexLayoutModule } from '@angular/flex-layout';

// all the material stuff
// list views
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

// nav
import { MatSidenavModule } from "@angular/material/sidenav";

// various UI objects
import { Moment } from "moment"; 

import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDatepickerModule } from "@angular/material/datepicker"; 
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMomentDateModule } from "@angular/material-moment-adapter"; 
import { MatSelectModule } from "@angular/material/select";


import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MatCheckboxModule } from '@angular/material/checkbox';

// Rich text editor
import { QuillModule } from 'ngx-quill';

@NgModule({
  declarations: [
    AppComponent,
    WidgetDetailComponent,
    WelcomeComponent,
    WidgetListComponent,
    // didn't work well enough, bug with ..'s 
    // TypeCurrencyMaskPipe,
  ],
  imports: [
    BrowserModule,
    // rtf:
    QuillModule.forRoot(),

    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // for the API:
    SDKBrowserModule.forRoot(),

    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,

    // Flex layout
    FlexLayoutModule, 
                    
    // order counts, but do these alphabetical
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,

    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,


    // for displaying forms.

  ],
  providers: [
    // getting too fancy. 
    // TypeCurrencyMaskPipe,
    // CurrencyPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
