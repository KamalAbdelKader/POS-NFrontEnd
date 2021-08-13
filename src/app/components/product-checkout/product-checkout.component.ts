import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private shoppingCartService: ShoppingCartService,
    private router: Router,
    private toastrService: ToastrService
  ) {}
  ngOnInit() {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
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
    console.log("checkout")
    this.shoppingCartService.saveItems(this.items).subscribe((response) => {
      response > 0
        ? this.toastrService.success( 
            'Your order number is: ' + response,
            'Order Completed successfully'
          )
        : this.toastrService.error(
            '',
            'Sorry something went wrong please try again.'
          );
      this.router.navigate(['/products']);
      this.shoppingCartService.clearProducts();
    });
  }

  removeFromCart(item: Item) {
    this.shoppingCartService.removeFromCart(item, this.items);
  }

  removeExtraFromCart(item: Item, extraItem: Item) {
    this.shoppingCartService.removeFromCart(extraItem, item.extraItems, item);
  }
}
