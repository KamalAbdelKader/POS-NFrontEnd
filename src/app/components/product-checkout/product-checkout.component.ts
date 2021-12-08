import { CategoryViewComponent } from './../category-view/category-view.component';
import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
declare var require;
const Swal = require('sweetalert2');
@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
})
export class ProductCheckoutComponent implements OnInit {
  items: Item[] = [];
  showMsg = false;
  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  get_ImageUrl(item: Item): string {
    const image = (item.image && item.image.length > 0) ? 'data:image/png;base64,' + item.image :
      './assets/images/no-image-available.png';
    return image;
  }

  getTotalPrice(): number {
    return this.shoppingCartService.getTotalPrice();
  }

  getTotalProductPrice(item: Item): number {
    return this.shoppingCartService.getProductTotal(item);
  }

  checkout(view: CategoryViewComponent): void {
    view.openModal();
  }

  removeFromCart(item: Item): void {
    this.shoppingCartService.removeFromCart(item, this.items);
  }

  removeExtraFromCart(item: Item, extraItem: Item): void {
    this.shoppingCartService.removeFromCart(extraItem, item.extraItems, item);
  }
}
