import { Component, PLATFORM_ID, Inject, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { map, delay, withLatestFrom } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ItemService } from './shared/services/item/item.service';
import { ItemChangeService } from './shared/services/item/item-change.service';
import { Item } from './shared/model/item';
import { ShoppingCartService } from './shared/services/shopping.service';
import { ArrayIsNotEmpty } from './shared/helper/helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // For Progressbar
  loaders = this.loader.progress$.pipe(
    delay(1000),
    withLatestFrom(this.loader.progress$),
    map((v) => v[1])
  );

  items: Item[] = [];
  extraItems: Item[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private itemService: ItemService,
    private itemChangeService: ItemChangeService,
    private shoppingService: ShoppingCartService,
    private loader: LoadingBarService,
    translate: TranslateService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang('en');
      translate.addLangs(['en', 'de', 'es', 'fr', 'pt', 'cn', 'ae']);
    }
  }

  async ngOnInit(): Promise<void> {
    await this.getExtraItems();
    this.shoppingService.setItemsAndExtraItems(this.items, this.extraItems);

    // get Cart Data
    const savedProduct = this.shoppingService.getItems();
    if (ArrayIsNotEmpty(savedProduct)) {
      this.shoppingService.setProducts(savedProduct);
    }
  }

  private async getExtraItems(): Promise<void> {
    this.extraItems = await this.itemService.getExtraItems().toPromise();
    this.itemChangeService.extraItemsChange(this.extraItems);
  }

}
