import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from '../base/data.service';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemService extends DataService {
  private categoryitemUrl: string;
  private itemUrl: string;
  private extraItemUrl: string;
  constructor(http: HttpClient) {
    super(http);
    this.categoryitemUrl = this.url.item.getAllItemsByCategoryGuid;
    this.itemUrl = this.url.item.getAll;
    this.extraItemUrl = this.url.item.getExtraItems;
  }

  getItemsByCategoryGuid(categoryGuid: string): Observable<any> {
    const obj = { categoryGuid };
    return this.post<any>(this.categoryitemUrl, obj);
  }

  getAllitems(pageIndex = 0, pageSize = 0): Observable<Item[]> {
    const url = `${this.itemUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.get<Item[]>(url);
  }

  getExtraItems(id: number): Observable<Item[]> {
    this.extraItemUrl += `?${id}`;
    return this.get<Item[]>(this.extraItemUrl);
  }
}
