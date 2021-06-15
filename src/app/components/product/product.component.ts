import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/model/item';
import { ItemService } from 'src/app/shared/services/item/item.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public openSidebar: boolean = false;
  public listView: boolean = false;
  public col: string = '3';

  items: Item[];
  extraItems: Item[];
  categoryId: string;
  clicked: boolean = false;
  
  @ViewChild('quickView') QuickView: QuickViewComponent;

  constructor(
    private itemService: ItemService,
    public shoppingService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.items = [];
    this.extraItems = [];
    this.clicked = false;
  }

  ngOnInit() {
    this.getItems();
    this.getExtraItems();
  }

  private getItems() {
    this.route.queryParams.subscribe(async (param) => {
      this.categoryId = param["category"] as string;
      if (this.categoryId && this.categoryId.length > 0) {
        this.items = await this.itemService
          .getItemsByCategoryGuid(this.categoryId)
          .toPromise();
      } else {
        this.items = await this.itemService.getAllitems().toPromise();
      }
    });
  }

  private getExtraItems() {
    this.itemService.getExtraItems().subscribe((response) => {
      this.extraItems = [...response];
    });
  }

  addToCart(item: Item) {
    this.shoppingService.updateItem(item, 1);
  }

  getQuantity(item: Item) {
    return this.shoppingService.getQuantity(item);
  }

  sidebarToggle() {
    this.openSidebar = !this.openSidebar;
    this.col = '3';
  }

  toggleListView(val) {
    this.listView = val;
  }

  gridColumn(val) {
    this.col = val;
  }
}
