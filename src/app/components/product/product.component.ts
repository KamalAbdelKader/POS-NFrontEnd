import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/shared/model/item';
import { ItemChangeService } from 'src/app/shared/services/item/item-change.service';
import { ItemService } from 'src/app/shared/services/item/item.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
import { QuickViewComponent } from '../quick-view/quick-view.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  public openSidebar = false;
  public listView = false;
  public col = '3';

  items: Item[];
  extraItems: Item[];
  categoryId: string;
  clicked = false;
  isLoading = false;
  throttle = 300;
  scrollDistance = 3;
  scrollUpDistance = 2;

  @ViewChild('quickView') QuickView: QuickViewComponent;
  pageIndex: number;

  constructor(
    private itemService: ItemService,
    private itemChangeService: ItemChangeService,
    public shoppingService: ShoppingCartService,
    private route: ActivatedRoute
  ) {
    this.items = [];
    this.extraItems = [];
    this.clicked = false;
    this.pageIndex = 0;
  }

  ngOnInit(): void {
    this.getItems();
    this.getExtraItems();
  }

  private getItems(): void {
    this.route.queryParams.subscribe(async (param) => {
      this.categoryId = param?.category as string;
      if (this.categoryId && this.categoryId.length > 0) {
        this.items = await this.itemService
          .getItemsByCategoryGuid(this.categoryId)
          .toPromise();
      } else {
        this.getAllItems();
      }
    });
  }

  private getExtraItems(): void {
    this.itemChangeService.currentExtraItemListSource.subscribe((response) => {
      this.extraItems = [...response];
    });
  }

  addToCart(item: Item): void {
    this.shoppingService.updateItem(item, 1);
  }

  getQuantity(item: Item): number {
    return this.shoppingService.getQuantity(item);
  }

  sidebarToggle(): void {
    this.openSidebar = !this.openSidebar;
    this.col = '3';
  }

  toggleListView(val): void {
    this.listView = val;
  }

  gridColumn(val): void {
    this.col = val;
  }

  onScrollDown(): void {
    this.pageIndex++;
    this.isLoading = true;
    this.getAllItems();
    this.isLoading = false;
  }

  private async getAllItems(): Promise<void> {
    const items = await this.itemService
      .getAllitems(this.pageIndex, 8)
      .toPromise();

    this.items.push(...items);
  }
}
