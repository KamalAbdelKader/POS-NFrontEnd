import { ProductComponent } from './../product/product.component';
import { ProductCategoryComponent } from './../product-category/product-category.component';
import { ProductCartComponent } from './../product-cart/product-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { QuickViewComponent } from '../quick-view/quick-view.component';

@NgModule({
  imports: [CommonModule, SharedModule, ProductRoutingModule],
  declarations: [
    ProductComponent,
    ProductCartComponent,
    QuickViewComponent,
    ProductCategoryComponent
  ],
})
export class ProductModule {}
