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
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { CloneObject, ObjectHasValue } from 'src/app/shared/helper/helper';
import { getImageUrl } from 'src/app/shared/helper/image';
import { Item } from 'src/app/shared/model/item';
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
  // tslint:disable-next-line:no-input-rename
  @Input('extraItems') extraItems: Item[];
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
    private shoppingService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  openModal(): void {
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

  get_ImageUrl(item: Item): string {
    return 'data:image/png;base64,' + item.image;
  }
}
