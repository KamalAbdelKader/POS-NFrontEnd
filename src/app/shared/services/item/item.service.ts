import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DataService } from "../base/data.service";
import { Item } from "../../model/item";

@Injectable({
  providedIn: "root",
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

  getAllitems(): Observable<Item[]> {
    return this.get<Item[]>(this.itemUrl);
  }

  getExtraItems(): Observable<Item[]> {
    return this.get<Item[]>(this.extraItemUrl);
  }
}
