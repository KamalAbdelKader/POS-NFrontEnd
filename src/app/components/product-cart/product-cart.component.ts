import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { Item } from 'src/app/shared/model/item';
import { LanguagesService } from 'src/app/shared/services/languages.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent extends BaseComponent implements OnInit {
  category$: any;
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('item') item: Item = {} as Item;
  constructor(private shoppingService: ShoppingCartService, protected lanService2: LanguagesService) {
    super(lanService2);
  }

  ngOnInit(): void {
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
