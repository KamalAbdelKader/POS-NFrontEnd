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
  @Input('item') item: Item;

  constructor() {}
  ngOnInit() {
  }

  get_ImageUrl(item: Item) {
    return 'data:image/png;base64,' + item.image;
  }
}
