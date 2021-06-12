import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { getImageUrl } from "src/app/shared/helper/image";
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  category$: any;
  @ViewChild("quickView", { static: false }) QuickView: TemplateRef<any>;
  @Input("item") item: Item;
  imageUrl: string | ArrayBuffer = "";
  
  constructor() {}
  ngOnInit() {
    this.imageUrl = "data:image/png;base64," + this.item["pic_1"];
  }


  get_ImageUrl(item: Item) {
    return getImageUrl(item);
  }

}


