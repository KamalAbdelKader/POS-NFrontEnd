import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Item } from 'src/app/shared/model/item';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
@Component({
  selector: 'app-take-away',
  templateUrl: './take-away.component.html',
  styleUrls: ['./take-away.component.scss']
})
export class TakeAwayComponent implements OnInit {
  private items: Item[];
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private modelService: NgbModal,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  onSubmit(): void {
    this.takeAway();
  }


  private takeAway(): void {
    this.shoppingCartService
      .saveAsTakeAway({ items: this.items })
      .subscribe((response) => {
        if (response > 0) {
          this.toastrService.success(
            `Order Completed Successfully # ${response}`
          );
          this.modelService.dismissAll();
          this.router.navigate(['/products']);
          this.shoppingCartService.clearProducts();
        } else {
          this.toastrService.error(
            '',
            'Sorry something went wrong please try again.'
          );
        }
      });
  }
}
