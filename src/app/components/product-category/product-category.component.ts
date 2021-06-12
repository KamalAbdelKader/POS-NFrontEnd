import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CategoryService } from '../../shared/services/category/category.service';

@Component({
  selector: 'app-product-Category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.scss'],
})
export class ProductCategoryComponent implements OnInit {
  category$: any;
  @Input("category") category: string;
  
  constructor(private categoryService: CategoryService) {}
  ngOnInit() {
    this.category$ =  this.categoryService.getCategoryies();
  }
}
