import { Component, OnInit } from '@angular/core';
import { getImageUrl } from 'src/app/shared/helper/image';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-product-checkout',
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.scss'],
})
export class ProductCheckoutComponent implements OnInit {
  items: Item[] = [];
  constructor(
    private shoppingCartService: ShoppingCartService
  ) {}
  ngOnInit() {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items.map((item) => {
        item.image = "data:image/png;base64," + item["pic_1"];
        return item;
      });
    });
  }


  get_ImageUrl(item: Item) {
    return getImageUrl(item);
  }

  getTotalPrice() {
    return this.shoppingCartService.getTotalPrice();
  }
}
