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
  Images = [
    '../../../../assets/images/slider/banner-5.jpg',
    '../../../../assets/images/slider/banner-4.jpg',
    '../../../../assets/images/slider/banner-6.jpg',
  ];
  owlcarousel5Options = {
    margin: 20,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    stagePadding: 30,
    smartSpeed: 450,
    loop: false,
    autoWidth: true,
    autoHeight: true,
    responsiveClass: true,
    nav: false,
    responsive: {
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  };

  sliderOptions = {
    loop: true,
    autoWidth: true,
    autoHeight: true,
    responsiveClass: true,
    nav: false,
    dots: false,
    responsive: {
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 1,
      },
    },
  };
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService
      .getCategoryies()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });
  }

  get_ImageUrl(category: Category): string {
    return 'data:image/png;base64,' + category.img;
  }
}
