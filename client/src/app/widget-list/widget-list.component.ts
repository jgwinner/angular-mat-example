import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';

import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

// for searching
import { merge, Subject, Observable, Subscription, ReplaySubject } from 'rxjs';
import { catchError, startWith, switchMap, tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

// for programatic routing
import { Router } from '@angular/router';

// deep copy; wouldn't need this except we're using in-memory arrays.
import { cloneDeep } from 'lodash'; 

import { WidgetInterface } from "../shared/sdk/models/Widget";
import { WidgetListDataSource } from './widget-list-datasource';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  // this was a persistent bug, lost a lot of time here. See:
  // https://stackoverflow.com/questions/49284358/calling-renderrows-on-angular-material-table/50495353#50495353
  // comment by sosNiLa Nov 15 '19 at 9:17
  // STILL doesn't seem to fix it though
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  constructor(
    private router: Router,
    private fb: FormBuilder) {
  }

  dataSource: WidgetListDataSource;
  dataHidden: WidgetListDataSource;

  public searchField = new FormControl();

  public searchTitle: string;
  form: FormGroup;
  titleSearch = '';

  // for Title query
  private idColumn = 'id';

  private idSelArray: number[] = [];  // Create array for checkbox selection in table.

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'select',
    'id',
    'title',
    'price',
    'date'];

  ngOnInit(): void {
    this.dataHidden = new WidgetListDataSource(); 
    this.dataSource = new WidgetListDataSource(); //actually does a reference.
    this.dataSource.data = cloneDeep(this.dataHidden.data);  

    this.form = this.fb.group({
      titleSearch: [this.titleSearch]
    });

    // we use ValueChanges here, so that cut/paste will update
    // the search term. 
    this.searchField.valueChanges.subscribe(value => {
      this.titleSearch = value;
    } );
    
  }


  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  resetTableView() {
    //this.ngAfterViewInit();
    // this.form.reset();
    // the docs say this works; it doesn't. ??
    this.table.renderRows();

    // for some weird reason, we seem to need first/last page
    // to 'tickle' it.
     this.paginator.lastPage();
     this.paginator.firstPage();

  }

  // Check boxes for selection
  public selectWidget(selectedWidget) {
    // push the id's into an array then call it with the button.
    return this.idSelArray.push(selectedWidget);
  }


  deleteSelected() {
    const dsData = this.dataSource.data; // shallow of course. 
    const dsDataHidden = this.dataHidden.data;
    const idColumn = this.idColumn;

    // idSelArray are the selected items. 
    this.idSelArray.forEach(function (id, i) {

      // Need to match ids in idSelArray with dataSource.data.
      const widgetId: number = id;  // Extracts member id from selection array.
      console.log('Checking for id:', widgetId);

      try {
        const record = dsData.find(obj => obj[idColumn] === widgetId);
        // jdg: Note it's oddly possible for the record to be undefined,
        // due to the table trendering issue (bug??)
        // good to check anyway, thus the catch. 
        const delWarn = 'Delete ' + record['title'] + '?';

        // TTD: POPUP with Delete warning
        console.log(delWarn);

        const itemIndexhidden = dsDataHidden.findIndex(obj => obj[idColumn] === widgetId);
        console.log('deleting: master', itemIndexhidden);
        if (itemIndexhidden >= 0)
          dsDataHidden.splice(itemIndexhidden, 1);

        const itemIndex = dsData.findIndex(obj => obj[idColumn] === widgetId);
        console.log('deleting regular:', itemIndex);
        if (itemIndex>=0)
          dsData.splice(itemIndex, 1);
      }

      catch (error) {
        // you'll get here if there are still records selected; clear selection.
        console.log('whoops, couldn\'t delete id', error);

      }
    });
    
    // Arg! It's not refreshing the control.
    // didn't work
    this.idSelArray = [];  // Clear array
    // deselect the Delete Selected button.
    this.resetTableView();
  }

  addWidget() {
    this.router.navigateByUrl('/widgets/widgetdetail/-1');
  }


  clearSearch() {

    this.dataSource.data = cloneDeep(this.dataHidden.data);  

    // ttd: Get current index, and seek to that.
    // also, figure out why a refresh doesn't.
    // there seems to be a time delay here due to the copying of data. 
    this.resetTableView();

  }
  // Title Search



  searchForTitle(): any {

    // load the term to search for.
    const lowerSearch = this.titleSearch.toLowerCase();

    if (lowerSearch.length <= 0)
      return;

    // remember, we saved the old data, but
    // put it back as we're not filtering already filtered stuff.
    this.dataSource.data = cloneDeep(this.dataHidden.data);  

    // this.dataSource.data = Object.create(this.dataSource.data, this.dataHidden.data); //need to deep clone it!

    const dsData = this.dataSource.data;


    // idSelArray are the selected items. 
    // Don't need to do this:
    // can do it with filter. this.dataSource.data.forEach(aWidget ... 

      try {

        this.dataSource.data = dsData.filter(obj => {
          const lower = obj['title'].toLowerCase();
          if (lower.indexOf(lowerSearch)>=0)
            return true;
          const lowerDesc = obj['description'].toLowerCase();
          if (lowerDesc.indexOf(lowerSearch) >= 0)
            return true;
          return false;
        });

        console.log('Searching, now have:', this.dataSource.data.length, 'items to show');
        this.resetTableView();

      }

      catch (error) {
        // you'll get here if there are still records selected; clear selection.
        console.log('ERROR: Whoops, search had an error!');

      }
    

  }
}


