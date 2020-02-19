import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// jdg: TTD: Generate this via ModelGen
// also, consider either deleting this template file,
// or making sure the *.component.ts calls the functions.

import { WidgetInterface } from "../shared/sdk/models/Widget";
import { WidgetApiService } from '../shared/sdk/services/custom/Widget';

// jdg: replace WidgetListItem with WidgetInterface


//// TODO: replace this with real data from your application

const EXAMPLE_DATA: WidgetInterface[] = [
//  {
//    id: 1,
//    title: 'Widget',
//    date: new Date('1000-01-01T00:00:00'),
//    price: 1,
//    description: 'Description',
//  },
//  {
//    id: 2,
//    title: 'Sprocket',
//    date: new Date('2019-01-01T00:00:00'),
//    price: 2.00,
//    description: 'Description',
//  },
//];

  {id:  1, price:  1, date: new Date('2001-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Hydrogen'},
  {id:  2, price:  2, date: new Date('2002-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Helium'},
  {id:  3, price:  3, date: new Date('2003-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Lithium'},
  {id:  4, price:  4, date: new Date('2004-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Beryllium'},
  {id:  5, price:  5, date: new Date('2005-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Boron'},
  {id:  6, price:  6, date: new Date('2006-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Carbon'},
  {id:  7, price:  7, date: new Date('2007-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Nitrogen'},
  {id:  8, price:  8, date: new Date('2008-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Oxygen'},
  {id:  9, price:  9, date: new Date('2009-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Fluorine'},
  {id: 10, price: 10, date: new Date('2010-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Neon'},
  {id: 11, price: 11, date: new Date('2011-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Sodium'},
  {id: 12, price: 12, date: new Date('2012-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Magnesium'},
  {id: 13, price: 13, date: new Date('2013-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Aluminum'},
  {id: 14, price: 14, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Silicon'},
  {id: 15, price: 15, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Phosphorus'},
  {id: 16, price: 16, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Sulfur'},
  {id: 17, price: 17, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Chlorine'},
  {id: 18, price: 18, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Argon'},
  {id: 19, price: 19, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Potassium'},
  {id: 20, price: 20, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Calcium'},
  { id: 21, price: 21, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Hydrogen' },
  { id: 22, price: 22, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Helium' },
  { id: 23, price: 23, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Lithium' },
  { id: 24, price: 24, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Beryllium' },
  { id: 25, price: 25, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Boron' },
  { id: 26, price: 26, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Carbon' },
  { id: 27, price: 27, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Nitrogen' },
  { id: 28, price: 28, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Oxygen' },
  { id: 29, price: 29, date: new Date('2019-01-01T00:00:00'), description: 'Totally fantastic widget! Another fine Walley Widget!', title: 'Fluorine' },
];

/**
 * Data source for the WidgetList view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WidgetListDataSource extends DataSource<WidgetInterface> {
  data: WidgetInterface[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<WidgetInterface[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  // jdg: Messed uproutine - only needed because we were to do in-memory
  // a server would add ID's automatically on an add. Here, we'll get an ID number for max ID.
  // it's not really interlocked, but it'll be safe.
  // cant' just take 'max' as we could have deleted some ID's, thus creating duplicate ID's
  // then again, duplicate ID's aren't SO bad, but would create weirdness
  // in deletes or detail lists.

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: WidgetInterface[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WidgetInterface[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'title': return compare(a.title, b.title, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'price': return compare(+a.price, +b.price, isAsc);
        case 'date': return compare(+a.date, +b.date, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/title columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
