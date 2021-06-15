import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getImageUrl } from 'src/app/shared/helper/image';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
declare var require
const Swal = require('sweetalert2')
@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
})
export class ProductCheckoutComponent implements OnInit {
  items: Item[] = [];
  showMsg = false;
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {}
  ngOnInit() {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items
    });
  }

  get_ImageUrl(item: Item) {
    // return getImageUrl(item);
    return 'data:image/png;base64,' + item.image;
  }

  getTotalPrice() {
    return this.shoppingCartService.getTotalPrice();
  }

  getTotalProductPrice(item: Item) {
    return this.shoppingCartService.getProductTotal(item);
  }

  checkout() {
    this.shoppingCartService.saveItems(this.items).subscribe((response) => {});
    Swal.fire({
      type: 'success',
      title: 'Success',
      text: 'You clicked the button!',
      showConfirmButton: true,
    });     this.router.navigate(["/products"]);
     this.shoppingCartService.clearProducts();
  }

  removeFromCart(item: Item) {
    this.shoppingCartService.removeFromCart(item, this.items)
  }

  removeExtraFromCart(item: Item, extraItem: Item) {
    this.shoppingCartService.removeFromCart(extraItem, item.extraItems, item);
  }
}
