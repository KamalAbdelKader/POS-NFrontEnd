import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  category$: any;
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('item') item: Item = {} as Item;

  constructor(private shoppingService: ShoppingCartService) { }
  ngOnInit(): void {
    console.log(this.item);
  }

  addToCart(): void {
    const quantity = this.shoppingService.getQuantity(this.item);
    if (quantity == 0) {
      this.shoppingService.updateItem(this.item, 1);
    }
  }


  get_ImageUrl(item: Item): string {
    const image = (item.image && item.image.length > 0) ? 'data:image/png;base64,' + item.image :
      './assets/images/no-image-available.png';
    return image;
  }
}
