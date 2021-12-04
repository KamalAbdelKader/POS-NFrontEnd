import { LayoutService } from '../../shared/services/layout.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbTabChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Types } from '../../shared/enums/types';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
import { UserInfo } from 'src/app/shared/model/userInfo';
import { ShoppingCartDeliveryModel } from 'src/app/shared/model/shoppingCartDeliveryModel';
import { Item } from 'src/app/shared/model/item';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss'],
})
export class DeliveryViewComponent implements OnInit {

  public closeResult: string;
  public modalOpen = false;
  type: Types = Types.Home;
  types = Types;
  form: FormGroup = new FormGroup({});
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  items: Item[];

  constructor(private router: Router,
              private modelService: NgbModal,
              public layout: LayoutService,
              private toastrService: ToastrService,
              private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.form = this.CreateForm();
    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  onChange(type: number): void {
    this.type = type;
    this.getControl('type').setValue(this.type);

    if (this.type == Types.Car) {
      this.getControl('CarModel').setValidators(Validators.compose(
        [Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)]));
    } else {
      this.getControl('CarModel').clearValidators();
    }
  }

  CreateForm(): FormGroup {
    return new FormGroup({
      Name: new FormControl('', [Validators.required]),
      Email: new FormControl('', Validators.email),
      Number: new FormControl('', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(11),
      Validators.pattern(/^965/)
      ]),
      Block: new FormControl(''),
      Street: new FormControl('', [Validators.required, Validators.minLength(3)]),
      Building: new FormControl('', Validators.minLength(3)),
      Floor: new FormControl('', Validators.minLength(1)),
      type: new FormControl(this.types.Home),
      CarModel: new FormControl(''),
      carId: new FormControl(''),
      CarColor: new FormControl(''),
      CarNumber: new FormControl('')
    });
  }
  // 965 + 8 numbers
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public beforeChange($event: NgbTabChangeEvent): void {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }

  getControl(controlName: string): AbstractControl {
    return this.form.get(controlName);
  }


  onSave(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // call API form.value
      const userInfo = new ShoppingCartDeliveryModel();
      userInfo.Items = this.items;
      userInfo.OrderTypeId = this.form.value.type;
      userInfo.UserInfo = this.form.value as UserInfo;
      this.shoppingCartService.saveAsUserInfo(userInfo).subscribe(response => {
        if (response > 0) {
          this.toastrService.success(
            `Order Completed successfully Order Number ${response}`
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
}
