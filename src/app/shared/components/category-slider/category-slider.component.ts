import { CategoryService } from './../../services/category/category.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../model/category';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-category-slider',
  templateUrl: './category-slider.component.html',
  styleUrls: ['./category-slider.component.scss'],
})
export class CategorySliderComponent implements OnInit {
  categories: Category[] = [];
  allCategoriesImag = '../../../../assets/images/slider/AllCategory.jfif';
  category = '../../../../assets/images/slider/Category.jfif';
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
  layoutType = 'ltr';
  constructor(private categoryService: CategoryService,
    private router: Router,
    private transService: TranslateService,
  ) { }

  ngOnInit(): void {
    this.categoryService
      .getCategoryies()
      .subscribe((categories: Category[]) => {
        this.categories = categories;
      });

    this.transService.onLangChange.subscribe(lan => {
      this.layoutType = lan.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }

  get_ImageUrl(category: Category): string {
    const image = (category.img && category.img.length > 0) ? 'data:image/png;base64,' + category.img :
      './assets/images/no-image-available.png';
    return image;
  }
  //
  route(category = ''): void {
    if (category) {
      this.router.navigateByUrl(`/products?category=${category}`);
    } else {
      this.router.navigate(['/products']);
    }
  }
}
