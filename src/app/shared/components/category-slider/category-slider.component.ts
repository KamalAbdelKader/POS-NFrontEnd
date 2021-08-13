import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from './../../model/Category';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit {
  categories: Category[] = [];
  owlcarousel5Options = {
    margin: 5,
    loop: false,
    autoWidth: true,
    autoHeight:true,
    autoHeightClass: 'owl-height',
    items: 5,
    nav: false,
    responsive: {
      576: {
        items: 1,
        mergeFit: true,
      },
      768: {
        items: 2,
        mergeFit: true,
      },
      992: {
        items: 3, 
        mergeFit: true,
      },
    },
  };

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.categoryService
      .getCategoryies()
      .subscribe((categories: Category[]) => {
        console.log(categories);
        this.categories = categories;
      });
  }

  get_ImageUrl(category: Category) {
    return 'data:image/png;base64,' + category.img;
  }
}
