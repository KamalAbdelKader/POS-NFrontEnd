import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class CartComponent implements OnInit {
  @Input() openCart = false;
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;

  items: Item[] = [];
  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private _eref: ElementRef
  ) { }

  ngOnInit(): void {
    this.openCart = false;
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  // For Mobile Device
  toggleCart(): void {
    this.openCart = !this.openCart;
  }

  get_ImageUrl(item: Item): string {
    const image = (item.image && item.image.length > 0) ? 'data:image/png;base64,' + item.image :
      './assets/images/no-image-available.png';
    return image;
  }

  clearCart(): void {
    this.openCart = false;
    this.shoppingCartService.clearProducts();
  }

  getTotalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  removeFromCart(item: Item): void {
    this.shoppingCartService.removeFromCart(item, this.items);
  }

  getQuantity(item: Item): number {
    return this.shoppingCartService.getQuantity(item);
  }

  navigate(): void {
    this.openCart = false;
    this.router.navigate(['products/checkout']);
  }

  onClick(event: any): void {
    if (!this._eref.nativeElement.contains(event.target)) {
      this.openCart = true;
    }
  }
}
