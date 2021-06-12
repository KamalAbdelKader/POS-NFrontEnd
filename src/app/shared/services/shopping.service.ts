import { Item } from "./../model/item";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  CloneObject,
  ConvertObjectToString,
  IsNullOrEmptyString,
  ObjectHasValue,
} from "../helper/helper";
import { DataService } from "./base/data.service";
import { SessionService } from "./session.service";

@Injectable({
  providedIn: "root",
})
export class ShoppingCartService extends DataService {
  private itemList: Item[] = [];
  private itemListSource = new BehaviorSubject<Item[]>([]);
  private shoppingCartUrl: string;
  /**
   * Observable of current product list in user cart
   */
  currentItemsList = this.itemListSource.asObservable();

  constructor(private sessionService: SessionService, httpClient: HttpClient) {
    super(httpClient);
    this.shoppingCartUrl = this.url.shoppingCart.saveItems;
  }

  private productChange(): void {
    const obj = ConvertObjectToString(this.itemList);
    this.sessionService.setProducts(obj);
    this.itemListSource.next(this.itemList.filter((prod) => prod.quantity > 0));
  }

  /**
   * Get user stored Products from local storage
   */
  getItems(): void {
    const productsString = this.sessionService.getProducts();
    if (!IsNullOrEmptyString(productsString)) {
      this.itemList = JSON.parse(productsString);
    }
    this.productChange();
  }

  /** Set Product datasource from the api
   * in case the user logged in and already have products
   */
  setProducts(item: Item[]): void {
    this.itemList = item;
    this.productChange();
  }
  removeFromCart(item: Item, itemList: Item[]): void {
    if (item && ObjectHasValue(item)) {
      itemList = itemList.filter((prod) => prod.id !== item.id);
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
    itemList: Item[]
  ) {
    if (
      cartItem &&
      ObjectHasValue(cartItem) &&
      cartItem.quantity + change >= 0
    ) {
      cartItem.quantity += change;
      if (cartItem.quantity == 0) {
        this.removeFromCart(cartItem, itemList);
      }
    } else if (_item && change > 0) {
      const prod = this.setCartProduct(_item, change);
      itemList.push(prod);
    }
  }

  private getItemFromCart(_item: Item) {
    return this.itemList.find((prod) => prod.id == _item.id);
  }

  updateExtraItems(_item: Item, extraItem: Item, change: number) {
    let extraItemCart: Item = null;
    const cartItem = this.getItemFromCart(_item);

    if (cartItem.extraItems && cartItem.extraItems.length > 0) {
      extraItemCart = cartItem?.extraItems.find((it) => it.id == extraItem.id);
    } else {
      cartItem.extraItems = [];
    }

    this.updateData(extraItemCart, extraItem, change, cartItem.extraItems);

    if (cartItem.extraItems && cartItem.extraItems.length > 0) {
      cartItem.extraItems = cartItem.extraItems.filter((it) => it.quantity > 0);
    }
    this.productChange();
  }

  getQuantity(_item: Item): number {
    const item = this.itemList.find((it) => _item.id == it.id);
    return item ? item.quantity : 0;
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

  getTotalPrice() {
    let total = 0;
    this.itemList.forEach((it) => {
      total +=
        it.quantity * it.endUser + this.calculateTotalExtraItem(it, total);
    });
    return total;
  }

  private calculateTotalExtraItem(it: Item, total: number) {
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

  saveItems(itemList: Item[]): Observable<void> {
    itemList.forEach((it) => {
      it.image = null;
    });
    return this.post(this.shoppingCartUrl, itemList);
  }
}
