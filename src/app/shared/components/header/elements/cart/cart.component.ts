import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getImageUrl } from 'src/app/shared/helper/image';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public openCart: boolean = false;
  items: Item[] = [];
  constructor(private shoppingCartService: ShoppingCartService, private router: Router) {}

  ngOnInit() {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  // For Mobile Device
  toggleCart() {
    this.openCart = !this.openCart;
  }

  get_ImageUrl(item: Item) {
    return getImageUrl(item);
  }


  clearCart() {
    this.shoppingCartService.clearProducts();
  }

  getTotalPrice() {
    return this.shoppingCartService.getTotalPrice();
  }
  
}
