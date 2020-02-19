/* tslint:disable */
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { environment } from '../../../../../environments/environment';

// all important Location; this allows us to not hard code the URL in the API
// Note this is a philosopy; you could put the API base in the app module,
// but this allows us to have different API's for different models.
// Also, this assmumes "Small system" with the API being at a fixed
// location on the same server as the Angular client side server.
import { Location } from '@angular/common';

// JDG: Changed the below, now goes in ../../models so it's in
// machine generated folder (SDK)
import { WidgetInterface } from '../../../sdk/models/Widget';

import { LoopBackAuth } from '../core/auth.service';
/**
 * Api services for the `Widget` model.

  JDG: Modified per the books/API sample; @Mean expert wasn't generating all HTTP verbs.
 */
@Injectable({
  providedIn: 'root'
})
export class WidgetApiService {

  constructor(private http: HttpClient,
    @Inject(LoopBackAuth) protected loopBackAuth: LoopBackAuth,

    ) {
  }

  Widget: Observable<any>;
  Widgets: Observable<any>;

  public selectedWidget: WidgetInterface = {
    
    id: 0,
    title: 'Title',
    date: new Date('1000-01-01T00:00:00'),
    price: 1,
    description: 'Description',
      } ;

headers: HttpHeaders = new HttpHeaders({
  'Content-Type': 'application/json',
  'Authorization': this.loopBackAuth.getAccessTokenId()
});

// jdg: The port number here, is for the API, not necessarily the client web server.
// while developing, these may be different, i.e. angular on 4200, Loopback on 3000
// For production, they both should be either 3000 or 80, with node.js serving up all
// of the angular client code from the 'dist' build.

// Note filter is optional, for a DB filter. Used to restrict records.

getAllWidgets (filter?: string) {
  let url_api = location.protocol + `//` + location.hostname + `:` + environment.apiPort +`/api/Widgets`;
  if (filter)
    url_api = url_api + filter;

  return this.http.get(url_api);
}
getWidgetById (id: string) {
  const url_api = location.protocol + `//` + location.hostname + `:` + environment.apiPort +`/api/Widgets/${id}`;
  return (this.Widget = this.http.get(url_api));
}

saveWidget(Widget: WidgetInterface) {
  // TODO: obtain token
  // TODO: not null
  const token = this.loopBackAuth.getToken();
  const url_api = location.protocol + `//` + location.hostname + `:` + environment.apiPort +`/api/Widgets?access_token=${token}`;
  return this.http
    .post<WidgetInterface>(url_api, Widget, { headers: this.headers })
    .pipe(map(data => data));
}

updateWidget(Widget) {
  // TODO: obtain ACL token
  // Note: TODO: Will require manual update to ensure Widget.id is the key value for the API
  const WidgetId = Widget.id;
  if (!WidgetId) {
    console.log("ERROR: Table key index Key Widget.id does not exist. Edit this source code (.\\shared\\services\\custom\\Widget.ts) to include proper Table and API key ID (autogenerate assues 'id')");
    //the API call will not succeed at this point; but maybe we can insert?
    return;
  }

  let url_api = location.protocol + `//`+location.host + `:` + environment.apiPort + `/api/Widgets/${WidgetId}/`;
  const token = this.loopBackAuth.getToken();
  if (token)
    {
    url_api += '?access_token=${token}';
    }
  // we use 'patch' here, as put, or post (id/replace) will give you an error
  // that required attributes are missing, if you're sending a sparse update
  return this.http
    .patch<WidgetInterface>(url_api, Widget, { headers: this.headers })
    .pipe(map(data => data));
}

deleteWidget(id: string) {
  // TODO: obtain ACL token
  // TODO: check for not null.
  const token = this.loopBackAuth.getToken();
  console.log(token);
  const url_api = location.protocol + `//` + location.host + `:` + environment.apiPort + `/api/Widgets/${id}/?access_token=${token}`;
  return this.http
    .delete<WidgetInterface>(url_api, { headers: this.headers })
    .pipe(map(data => data));
}

getCountWidgets() {
  const url_api = location.protocol + `//` + location.hostname + `:` + environment.apiPort +`/api/Widgets/count`;
  return (this.Widget = this.http.get(url_api));
}

}
