import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Item } from 'src/app/shared/model/item';

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

  constructor() {}
  ngOnInit(): void {
  }

  get_ImageUrl(item: Item): string {
    const image = (item.image && item.image.length >0) ? 'data:image/png;base64,' + item.image:
    './assets/images/no-image-available.png'
    return image;
  }
}
