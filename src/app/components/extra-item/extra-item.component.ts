import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
@Component({
  selector: 'app-extra-item',
  templateUrl: './extra-item.component.html',
  styleUrls: ['./extra-item.component.scss'],
})
export class ExtraItemComponent implements OnInit {
  @Input('extraItem') extraItem: Item = {} as Item;
  @Input('item') item: Item = {} as Item;
  clicked = false;
  constructor(private shoppingService: ShoppingCartService) {}

  ngOnInit(): void {}

  onClick() {
    this.clicked = !this.clicked;

    if(this.clicked) {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, 1);
    } else {
      this.shoppingService.updateExtraItems(this.item, this.extraItem, -1);
    }
    
  }
}
