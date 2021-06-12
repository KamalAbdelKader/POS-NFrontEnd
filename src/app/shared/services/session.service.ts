import { Injectable } from '@angular/core';
import { IsNullOrEmptyString } from '../helper/helper';
import { EncrDecrService } from './encrDecrService.service';

/** This service for handling local-storage variable
 * as encrapted and decrpted
 */
@Injectable({
  providedIn: 'root',
})
export class SessionService {
  
  private readonly _products = 'p___k';
  private readonly _dateTime = 'p___d';
  private readonly _userName = 'p___u';

  constructor(private encrDecrService: EncrDecrService) {}

  setProducts(value: string): void {
    this.setValue(this._products, value);
  }

  getProducts(): string {
    return this.getValue(this._products);
  }

  setTime(arg0: Date) {
    const val = arg0.getDay().toString();
    this.setValue(this._dateTime, val);
  }

  getTime(): string {
    return this.getValue(this._dateTime);
  }

  setUserName(userName: string) {
    const val = userName;
    this.setValue(this._userName, val);
  }

  getUserName(): string {
    return this.getValue(this._userName);
  }

  clearUserData() {
    localStorage.removeItem(this._dateTime);
    localStorage.removeItem(this._userName);
  }

  clearProducts(): void {
    localStorage.removeItem(this._products);
  }

  clearAll(): void {
    localStorage.clear();
  }

  private setValue(key: string, value: string): void {
    switch (key) {
      case this._products:
        this.setlocalValue(this._products, value);
        break;
      case this._dateTime:
        this.setlocalValue(this._dateTime, value);
        break;
      case this._userName:
        this.setlocalValue(this._userName, value);
        break;
      default:
        break;
    }
  }

  private setlocalValue(key: string, value: string): void {
    if (!IsNullOrEmptyString(value)) {
      const encrpty = this.encrDecrService.set(value);
      localStorage.setItem(key, encrpty);
    }
  }

  private getValue(key: string): string {
    const val = localStorage.getItem(key);
    if (val && !IsNullOrEmptyString(val)) {
      return this.encrDecrService.get(val);
    }

    return '';
  }
}
