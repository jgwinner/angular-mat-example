import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { QuillEditorComponent } from 'ngx-quill';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { WidgetInterface } from "../../shared/sdk/models/Widget";
import { WidgetApiService } from '../../shared/sdk/services/custom/Widget';

import { Location } from '@angular/common';

// sort of a mixture of data models
import { WidgetListDataSource } from '../widget-list-datasource';
// look and feel

// for programatic routing
import { Router } from '@angular/router';



import { MatButtonModule } from "@angular/material/button";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCardModule } from "@angular/material/card";
import { MatTableModule } from "@angular/material/table";

// all this crap for the date picker
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';

// sigh: doesn't work:
// import { Moment } from "moment";
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import * as _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
// import { default as _rollupMoment } from 'moment';

const moment = _moment;


// import { MomentModule } from 'ngx-moment';
// import * as moment from 'moment';
// import { TypeCurrencyMaskPipe } from '../../helpers/typeCurrencyMask.pipe'; 

@Component({
  selector: 'app-widget-detail',
  templateUrl: './widget-detail.component.html',
  styleUrls: ['./widget-detail.component.css']

})
export class WidgetDetailComponent implements OnInit {

  //member variables

  currentId = '';
  private idColumn = 'id';
  private newRecord = true;

  // should be the API
  public dataSource: WidgetListDataSource;

  public currentWidget: WidgetInterface;

  public startDate = moment([2001, 2, 2]);



  form: FormGroup;
  datePicker: FormControl;
  date: FormControl;

  currentDateSerialized: FormControl;

  userAlert = { msg: "" };
  isSubmitted = false;
  public ourTitle = 'New Widget';

  backgroundColor = ''
  @ViewChild('description', {
    static: true
  }) description: QuillEditorComponent

  constructor(
    // Was building the server, then realized the problem
    // specifically said, use an in-memory datasource.
    // public widgetApi: WidgetApiService,

    // private currencyMask: TypeCurrencyMaskPipe, 
    private route: ActivatedRoute,
    // the above is so we know where we are; the below
    // is so we know where we're going.
    private router: Router,
    private fb: FormBuilder,

  ) {
    this.datePicker = new FormControl(moment([2010, 4, 4]));
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: 0,
      title: ['', Validators.required],
      date: [new Date('2021-02-03T00:00:00'), Validators.required],
      price: ['', Validators.required],
      // jdg: For testing Quill
      // description: ['<ol><li>test</li><li>123</li></ol>']
      description: ['A New widget!']


    });

    //create a default part, in case the indexing doesn't work.
    this.currentWidget = {
      id: -1,
      title: 'Widget',
      date: new Date('2021-01-01T00:00:00'),
      price: 1,
      description: 'New Widget',
    }

    // find out what ID we have.
    this.currentId = this.route.snapshot.params['id'];
    if ((this.currentId === '0') || (this.currentId === '')) {
      this.newRecord = true;
      this.currentId = '-1';
      this.currentWidget = {
        id: -1,
        title: 'Widget',
        date: new Date('2021-01-01T00:00:00'),
        price: 1.01,
        description: 'A new WIDGET! Spoken like Bob Barker!',
      }
    }
    else
      // need to get the data for ID.
      try {
        // string, the in-memory array is an int, so convert
        const widgetId: number = parseInt(this.currentId);  // Extracts member id 
        // if we get a 0, it's a new record.
        // note this is data dependant!
        // TTD: add a flag for new.
        this.dataSource = new WidgetListDataSource();

        this.newRecord = true;

        if (widgetId > 0) {
          const record = this.dataSource.data.find(obj => obj[this.idColumn] === widgetId);
          // console.log('Getting Widget', record['title'])
          this.currentWidget = record;
          // console.log('Current data for ', record['title'], ':', this.currentWidget);
          // we got to here, we read the record sucesfully.
          this.newRecord = false;
          this.form.patchValue(record);
          // Mat-datepicker won't accept dynamic lables.  This isn't bad,
          // as we may be looking up timezones and doing conversion.
          // would be simpler to use the built in date, but that's a dead end.
          // error is: ERROR TypeError: this._datepicker._registerInput is not a function

          // this.datePicker.patchValue(record['date']);
          // console.log('Patched', this.datePicker, 'to be:', record['date'])
          this.startDate = moment(record['date'].toISOString());
          this.datePicker = new FormControl(moment(record['date']));
          this.date = new FormControl(moment(record['date']));

          this.ourTitle = record['title'];
        }
        else {
          //new record. Note we must insert.
          // Arg! My loopback code generators makes this easier, but
          // the data types didn't seem compatible
          console.log('ERROR: widget id:', this.currentId, ' not found, created new ');
        }

      }
      catch (error) {
        console.log('Error: error obtaining form data', error);
      }

    // if we have a new record, or if teh ID wasn't in the database, assume we're adding a new one
    if (this.newRecord) {
      this.ourTitle = 'New Widget! Please enter the details:';

    }

  }


  onSaveCurrent() {
    console.log('Updating id:', this.form.controls['id'].value, ' date:', this.form.controls['date'].value.toISOString());
    try {
      // because we have a group of various form controls,
      // we'll just update each individual field.
      // ttd: for the longer haul, and/or with the code generator,
      // you could have an updater function, but still have to collect the items

      this.currentWidget.date = new Date(this.form.controls['date'].value.toISOString());

      this.currentWidget.description = this.form.controls['description'].value;
      this.currentWidget.price = this.form.controls['price'].value;
      this.currentWidget.title = this.form.controls['title'].value;

      // ttd: in a real database, we'd get the ID from an insert;
      // in this case, we'll juse use 'max' to get the next ID.
      this.currentWidget.id = this.form.controls['id'].value;
      console.log('Save widget ID:', this.currentWidget.id);
      let widgetIndex = -1;

      // jdg: Index is not the same as the ID! Might start that way though
      if (this.currentWidget.id > 0) {
        widgetIndex = this.dataSource.data.findIndex(obj => obj[this.idColumn] === this.form.controls['id'].value);
        console.log('Found widget Index:', widgetIndex);
      }
      if (widgetIndex >= 0) {
        // should be as simple as this
        this.dataSource.data[widgetIndex] = this.currentWidget;
      }
      else {
        // ID wasn't found, we need to make up a new one!
        let maxId = 0;
        this.dataSource.data.forEach(aWidget => {
          maxId = Math.max(aWidget.id, maxId);
        });
        console.log('Found max ID ', maxId);
        // if we got here, maxId is at least 0
        this.currentWidget.id = maxId + 1;
        this.dataSource.data.push(this.currentWidget);
        console.log('Added new widget, ID ', this.currentWidget.id);
      }

    }
    catch (error) {
      // not unusual to get here if someone is deleting the record we just updated.
      console.log('Error saving widget #:', this.currentWidget.id);
    }
    // Now go back to the detail page.
    this.router.navigateByUrl('/widgets');


  }

  onDeleteCurrent() {

    let widgetIndex = 0;
    try {
      // get the id, and search for the index.
      const idToDelete = this.form.controls['id'].value;
      if (idToDelete > 0) {
        // jdg: Index is not the same as the ID! Might start that way though
        console.log('Deleting id:', this.form.controls['id'].value);
        widgetIndex = this.dataSource.data.findIndex(obj => obj[this.idColumn] === this.form.controls['id'].value);

        console.log('deleting:', widgetIndex);
        this.dataSource.data.splice(widgetIndex, 1);
      }
      else
        console.log('New ID, not deleting');

    }
    catch (error) {
      // not unusual to get here if someone is deleting the record we just updated.
      console.log('Error deleting widget index:', widgetIndex);
    }

    //delete the object, then go back to the detail page.
    this.router.navigateByUrl('/widgets');


  }


}



