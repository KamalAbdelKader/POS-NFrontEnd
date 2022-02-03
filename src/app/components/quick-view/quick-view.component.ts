import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ObjectHasValue } from 'src/app/shared/helper/helper';
import { Item } from 'src/app/shared/model/item';
import { ItemService } from 'src/app/shared/services/item/item.service';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss'],
})
export class QuickViewComponent implements OnInit {
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename
  @Input('item') item: Item;
  extraItems: Item[];
  public closeResult: string;
  public modalOpen = false;

  get quantity(): number {
    if (ObjectHasValue(this.item)) {
      return this.shoppingService.getQuantity(this.item);
    }
    return 0;
  }

  constructor(
    public layout: LayoutService,
    private modalService: NgbModal,
    private itemService: ItemService,
    private translateService: TranslateService,
    private shoppingService: ShoppingCartService
  ) { }

  ngOnInit(): void {
    if(!this.item.note) {
      this.item.note = this.shoppingService.getItemFromCart(this.item)?.note;
    }

        // this.translateService.onLangChange.subscribe(val => {
        //   val.lang
        // })
  }

  async openModal(id: number): Promise<void> {
    this.modalOpen = true;
    const model = this.modalService.open(this.QuickView, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      windowClass: 'Quickview',
    });

    model.result.then(
      (result) => {
        `Result ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );

    this.layout.config.settings.layout_version = this.layout.isDarkMode()
      ? 'dark-only'
      : 'light';
    this.extraItems = [];
    this.extraItems = await this.itemService.getExtraItems(id).toPromise();
    this.shoppingService.setExtraItems(this.extraItems);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addToCart(item: Item): void {
    const quantity = this.shoppingService.getQuantity(item);
    if (quantity == 0) {
      this.shoppingService.updateItem(item, 1);
    }
    this.modalService.dismissAll();
  }



  setNote(note: string): void {
    this.item.note = note;
    this.shoppingService.update(this.item);
  }

  get_ImageUrl(item: Item): string {
    const image = (item.image && item.image.length > 0) ? 'data:image/png;base64,' + item.image :
      './assets/images/no-image-available.png';
    return image;
  }
}
