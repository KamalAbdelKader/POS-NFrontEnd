import { DeliveryViewComponent } from './../delivery-view/delivery-view.component';
import { ProductComponent } from './../product/product.component';
import { TableNumberViewComponent } from './../table-number-view/table-number-view.component';
import { TakeAwayComponent } from './../takeaway/take-away.component';
import { ProductCategoryComponent } from './../product-category/product-category.component';
import { ProductQuantityComponent } from './../product-quantity/product-quantity.component';
import { ProductCartComponent } from './../product-cart/product-cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { QuickViewComponent } from '../quick-view/quick-view.component';
import { ExtraItemComponent } from '../extra-item/extra-item.component';
import { ProductCheckoutComponent } from '../product-checkout/product-checkout.component';
import { LoaderSpinnerComponent } from '../loader/loaderSpinner.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryViewComponent } from '../category-view/category-view.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
    InfiniteScrollModule,
    MatTabsModule
  ],
  declarations: [
    ProductComponent,
    ProductCartComponent,
    QuickViewComponent,
    ProductQuantityComponent,
    ProductCategoryComponent,
    ProductCheckoutComponent,
    ExtraItemComponent,
    LoaderSpinnerComponent,
    TableNumberViewComponent,
    CategoryViewComponent,
    DeliveryViewComponent,
    TakeAwayComponent,
    LoginComponent,
    RegisterComponent
  ],
  exports: [ProductQuantityComponent],
})
export class ProductModule {}
