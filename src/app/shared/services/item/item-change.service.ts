import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Item } from '../../model/item';

@Injectable({
  providedIn: 'root',
})
export class ItemChangeService {
  private itemListSource = new BehaviorSubject<Item[]>([]);
  private extraItemListSource = new BehaviorSubject<Item[]>([]);

  currentItemListSource = this.itemListSource.asObservable();
  currentExtraItemListSource = this.extraItemListSource.asObservable();

  constructor() {}

  itemChange(items: Item[]): void {
    this.itemListSource.next(items);
  }

  extraItemsChange(items: Item[]): void {
    this.extraItemListSource.next(items);
  }
}
