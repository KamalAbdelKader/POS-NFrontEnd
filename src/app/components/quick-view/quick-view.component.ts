import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { getImageUrl } from 'src/app/shared/helper/image';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss'],
})
export class QuickViewComponent implements OnInit {
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;
  public closeResult: string;
  public modalOpen: boolean = false;
  @Input('item') item: Item;

  constructor(
    private modalService: NgbModal,
    private shoppingService: ShoppingCartService
  ) {}

  ngOnInit(): void {}

  openModal() {
    this.modalOpen = true;
    this.modalService
      .open(this.QuickView, {
        size: 'lg',
        ariaLabelledBy: 'modal-basic-title',
        centered: true,
        windowClass: 'Quickview',
      })
      .result.then(
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

  addToCart(item: Item) {
    this.shoppingService.updateItem(item, 1);
  }

  get_ImageUrl(item: Item) {
    return getImageUrl(item);
  }
}
