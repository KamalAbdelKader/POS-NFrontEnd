import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { QuickViewComponent } from '../quick-view/quick-view.component';
@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent implements OnInit {
  @ViewChild('quickView') QuickView: QuickViewComponent;

  constructor() {}
  ngOnInit() {}
}
