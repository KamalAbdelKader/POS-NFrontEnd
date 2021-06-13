import { ProductComponent } from './../product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductCheckoutComponent } from '../product-checkout/product-checkout.component';

const routes: Routes = [
  {
    path: '',
    component: ProductComponent
  },
  {
    path: 'checkout',
    component: ProductCheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
