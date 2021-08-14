import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/shared/model/item';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
@Component({
  selector: 'app-table-number-view',
  templateUrl: './table-number-view.component.html',
  styleUrls: ['./table-number-view.component.scss'],
})
export class TableNumberViewComponent implements OnInit {
  @ViewChild('quickView', { static: false }) QuickView: TemplateRef<any>;
  public closeResult: string;
  form: FormGroup = {} as FormGroup;
  items: Item[] = [];
  get tableNumber(): FormControl {
    return this.form.get('tableNumber') as FormControl;
  }

  constructor(
    private modalService: NgbModal,
    private shoppingCartService: ShoppingCartService,
    private toastrService: ToastrService,
    private router: Router,
    public layout: LayoutService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }
  createForm(): FormGroup {
    return new FormGroup({
      tableNumber: new FormControl('', [
        Validators.required,
        Validators.max(6000),
        Validators.pattern(/^[0-9]+$/),
      ]),
    });
  }

  async openModal(): Promise<void> {
    const model = this.modalService.open(this.QuickView, {
      size: 'lg',
      ariaLabelledBy: 'modal-basic-title',
      centered: true,
      windowClass: 'Quickview',
    });

    model.result.then(
      (result) => `Result ${result}`,
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  onSubmit(): void {
    // Call Api
    this.form.markAllAsTouched();
    if (this.form && this.form.valid) {
      this.modalService.dismissAll();
         this.getOrderNumber();
    }
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

  private getOrderNumber(): void {
    const tableNumber = +this.tableNumber.value;
    this.shoppingCartService
      .saveItems({ items: this.items, tableNumber })
      .subscribe((response) => {
        response > 0
          ? this.toastrService.success(
              'Your order number is: ' + response,
              'Order Completed successfully'
            )
          : this.toastrService.error(
              '',
              'Sorry something went wrong please try again.'
            );
        this.router.navigate(['/products']);
        this.shoppingCartService.clearProducts();
      });
  }
}
