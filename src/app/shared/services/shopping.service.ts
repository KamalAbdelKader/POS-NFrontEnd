import { Item } from './../model/item';
import { ShortItem } from './../model/shortItem';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  ArrayIsNotEmpty,
  CloneObject,
  ConvertObjectToString,
  IsNullOrEmptyString,
  ObjectHasValue,
} from '../helper/helper';
import { DataService } from './base/data.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService extends DataService {
 
  private _itemList: Item[] = [];
  private _extraItemList: Item[] = [];


  private itemList: Item[] = [];
  private itemListSource = new BehaviorSubject<Item[]>([]);

  // urls
  private shoppingCartUrl: string;
  private savingAsTakeAwayUrl: string;


  /**
   * Observable of current product list in user cart
   */
  currentItemsList = this.itemListSource.asObservable();

  constructor(private sessionService: SessionService, httpClient: HttpClient) {
    super(httpClient);
    this.shoppingCartUrl = this.url.shoppingCart.saveItems;
    this.savingAsTakeAwayUrl = this.url.shoppingCart.takeAway;
  }

  private productChange(): void {
    const converted: ShortItem[] = this.convertItem();
    const obj = ConvertObjectToString(converted);
    this.sessionService.setProducts(obj);
    this.itemList = this.convertShortItemsToItems(converted);
    this.itemListSource.next(this.itemList.filter((prod) => prod.quantity > 0));
  }

  private convertItem(): ShortItem[] {
    return this.itemList.map((item) => {
      return {
        id: item.id,
        quantity: item.quantity,
        extra: item.extraItems?.map((eitem) => {
          return { id: eitem.id, quantity: item.quantity };
        }),
      };
    }) as ShortItem[];
  }

  /**
   * Get user stored Products from local storage
   */
  getItems(): Item[] {
    const productsString = this.sessionService.getProducts();
    if (!IsNullOrEmptyString(productsString)) {
      const converted = JSON.parse(productsString);
      return this.convertShortItemsToItems(converted);
    }
    return [];
  }

  /** Set Product data-source from the api
   * in case the user logged in and already have products
   */
  setProducts(item: Item[]): void {
    this.itemList = item;
    this.productChange();
  }

  removeFromCart(
    item: Item,
    itemList: Item[],
    cartMainItem: Item = null
  ): void {
    let mainItem: Item = null;
    if (ObjectHasValue(cartMainItem)) {
      mainItem = this.itemList.find((it) => it.id == cartMainItem.id);
      mainItem.extraItems = itemList.filter((prod) => prod.id !== item.id);
    } else {
      if (ObjectHasValue(item)) {
        this.itemList = itemList.filter((prod) => prod.id !== item.id);
      }
    }
    this.productChange();
  }

  updateItem(_item: Item, change: number): void {
    const cartItem = this.getItemFromCart(_item);
    this.updateData(cartItem, _item, change, this.itemList);
    this.productChange();
  }

  private updateData(
    cartItem: Item,
    _item: Item,
    change: number,
    itemList: Item[],
    cartMainItem: Item = null
  ) {
    if (
      cartItem &&
      ObjectHasValue(cartItem) &&
      cartItem.quantity + change >= 0
    ) {
      cartItem.quantity += change;
      if (cartItem.quantity == 0) {
        this.removeFromCart(cartItem, itemList, cartMainItem);
      }
    } else if (_item && change > 0) {
      const prod = this.setCartProduct(_item, change);
      itemList.push(prod);
    }
  }

  private getItemFromCart(_item: Item): Item {
    return this.itemList.find((prod) => prod.id == _item.id);
  }

  updateExtraItems(_item: Item, extraItem: Item, change: number): void {
    let extraItemCart: Item = null;
    const cartItem = this.getItemFromCart(_item);

    if (cartItem.extraItems && cartItem.extraItems.length > 0) {
      extraItemCart = cartItem?.extraItems.find((it) => it.id == extraItem.id);
    } else {
      cartItem.extraItems = [];
    }

    this.updateData(
      extraItemCart,
      extraItem,
      change,
      cartItem.extraItems,
      cartItem
    );

    if (cartItem.extraItems && cartItem.extraItems.length > 0) {
      cartItem.extraItems = cartItem.extraItems.filter((it) => it.quantity > 0);
    }
    this.productChange();
  }

  getQuantity(_item: Item): number {
    const item = this.itemList.find((it) => _item.id == it.id);
    return item && item.quantity ? item.quantity : 0;
  }

  getExtraQuantity(_item: Item, extraItem: Item): number {
    const item = this.itemList.find((it) => _item.id == it.id);
    if (item && item.extraItems && item.extraItems.length > 0) {
      const _extraItem = item.extraItems.find((it) => extraItem.id == it.id);
      return _extraItem ? _extraItem.quantity : 0;
    }

    return 0;
  }

  getProductTotal(_item: Item): number {
    const item = this.itemList.find((it) => _item.id == it.id);
    let totalExtra = 0;
    if (item && item.extraItems && item.extraItems.length > 0) {
      item.extraItems.forEach((it) => (totalExtra += it.endUser * it.quantity));
    }
    return item ? item.quantity * item.endUser + totalExtra : 0;
  }

  getTotalPrice(): number {
    let total = 0;
    this.itemList.forEach((it) => {
      total +=
        it.quantity * it.endUser + this.calculateTotalExtraItem(it, total);
    });
    return total;
  }

  private calculateTotalExtraItem(it: Item, total: number): number {
    if (it.extraItems && it.extraItems.length > 0) {
      it.extraItems.forEach((i) => {
        total += i.quantity * i.endUser;
      });
      return total;
    }
    return 0;
  }

  private setCartProduct(item: Item, quantity: number): Item {
    if (item && ObjectHasValue(item) && quantity > 0) {
      const productItem = CloneObject(item);
      productItem.quantity = quantity;
      return productItem;
    }
    return {} as Item;
  }

  clearProducts(): void {
    this.itemList = [];
    this.productChange();
  }

  // Add Extra param for type Id
  saveItems(itemsObj: {
    items: Item[];
    tableNumber: number;
  }): Observable<number> {
    itemsObj?.items.forEach((it) => {
      it.image = null;
    });
    return this.post(this.shoppingCartUrl, itemsObj);
  }


  // Add Extra param for type Id
  saveAsTakeAway(itemsObj: {
    items: Item[];
  }): Observable<number> {
    itemsObj?.items.forEach((it) => {
      it.image = null;
    });
    return this.post(this.savingAsTakeAwayUrl, itemsObj);
  }


  setItems(items: Item[]): void {
    this._itemList = items;
  }

  setExtraItems(extraItems: Item[]): void {
    this._extraItemList = extraItems;
  }

  private convertShortItemsToItems(shortItem: ShortItem[]): Item[] {
    const items: Item[] = [];
    if (ArrayIsNotEmpty(shortItem) && ArrayIsNotEmpty(this._itemList)) {
      shortItem.forEach((sItem) => {
        const item = this._itemList.find((i) => i.id == sItem.id);
        const exItems: Item[] = [];
        if (ArrayIsNotEmpty(sItem.extra)) {
          sItem.extra.forEach((ex) => {
            const exitem = this._extraItemList.find((ei) => ei.id == ex.id);
            exitem.quantity = ex.quantity;
            exItems.push(exitem);
          });
        }

        item.quantity = sItem.quantity;
        item.extraItems = exItems;
        items.push(item);
      });
      return items;
    }

    return [];
  }
}
