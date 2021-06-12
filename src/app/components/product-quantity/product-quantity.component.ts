import { Component, Input, OnInit } from '@angular/core';
import { ObjectHasValue } from 'src/app/shared/helper/helper';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss'],
})
export class ProductQuantityComponent implements OnInit {
  
  @Input() header = 'Quantity';
  @Input("item") item: Item;
  @Input("extraItem") extraItem: Item;
  
  constructor(private shoppingService: ShoppingCartService) {}
  ngOnInit() {
  }

  addToCart() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, 1);
    } else {
      this.shoppingService.updateItem(this.item, 1);
    }
  }

  removeFromCart() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, -1);
    } else {
      this.shoppingService.updateItem(this.item, -1);
    }
  }

  getQuantity() {
    if (this.extraItem && ObjectHasValue(this.extraItem)) {
      return this.shoppingService.getExtraQuantity(this.item, this.extraItem);
    }
    return this.shoppingService.getQuantity(this.item);
  }
}
