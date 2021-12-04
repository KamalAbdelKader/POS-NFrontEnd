  
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from '../../config/setting.service';
import { Urls } from '../../model/urls';
// import { environment } from '../../../../environments/environment';

@Injectable()
export abstract class DataService {
  // in case the url need to call from json file in asset folder
  protected domain = AppConfig.settings.apiServer;
  // protected domain = environment.url;
  protected url: Urls;
  constructor(public http: HttpClient) {
    this.url = new Urls();
  }

  protected get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.domain}/${url}`);
  }

  protected getById<T>(url: string): Observable<T> {
    return this.http.get<T>(`${this.domain}/${url}`);
  }

  protected post<T>(url: string, item: T): Observable<any> {
     return this.http.post(`${this.domain}/${url}`, item);
  }

  protected put<T>(url: string, item: any): Observable<T> {
    return this.http.put<T>(`${this.domain}/${url}`, item);
  }

  protected delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${this.domain}/${url}`);
  }

}
