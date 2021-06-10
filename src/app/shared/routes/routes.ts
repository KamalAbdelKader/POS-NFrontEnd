import { Routes } from '@angular/router';


export const content: Routes = [
  {
    path: 'products',
    loadChildren: () => import('../../components/product/product.module').then(m => m.ProductModule)
  }
];
