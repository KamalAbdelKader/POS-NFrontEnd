import { LayoutService } from '../../shared/services/layout.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
  NgbTabChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Types } from '../../shared/enums/types';
import { ShoppingCartService } from 'src/app/shared/services/shopping.service';
import { UserInfo } from 'src/app/shared/model/userInfo';
import { ShoppingCartDeliveryModel } from 'src/app/shared/model/shoppingCartDeliveryModel';
import { Item } from 'src/app/shared/model/item';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss'],
})
export class DeliveryViewComponent implements OnInit {
  public closeResult: string;
  public modalOpen = false;
  OrderTypeId: Types = Types.Home;
  types = Types;
  form: FormGroup = new FormGroup({});
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  items: Item[];

  constructor(
    private router: Router,
    private modelService: NgbModal,
    public layout: LayoutService,
    private toastrService: ToastrService,
    private shoppingCartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.form = this.CreateForm();
    this.setTypesExpectCarValidators();

    this.shoppingCartService.currentItemsList.subscribe((items) => {
      this.items = items;
    });
  }

  onChange(type: number): void {
    this.OrderTypeId = type;
    this.getControl('type').setValue(this.OrderTypeId);

    if (this.OrderTypeId == Types.Car) {
      this.setCarValidators();
    } else {
      this.setTypesExpectCarValidators();
    }
    this.form.updateValueAndValidity();
  }

  private setCarValidators() {
    this.removeValidators();
    this.getControl('CarModel').setValidators(
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])
    );
  }

  private setTypesExpectCarValidators() {
    this.removeValidators();
    this.getControl('Name').setValidators(Validators.required);
    this.getControl('Email').setValidators(Validators.email);
    this.getControl('Building').setValidators(Validators.minLength(3));
    this.getControl('Floor').setValidators(Validators.minLength(1));
    this.getControl('Street').setValidators(
      Validators.compose([Validators.required, Validators.minLength(3)])
    );
    this.getControl('Number').setValidators(
      Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(11),
        Validators.pattern(/^965/),
      ])
    );
  }

  CreateForm(): FormGroup {
    return new FormGroup({
      Name: new FormControl(''),
      Email: new FormControl(''),
      Number: new FormControl(''),
      type: new FormControl(''),
      Block: new FormControl(''),
      Street: new FormControl(''),
      Building: new FormControl(''),
      Floor: new FormControl(''),
      CarModel: new FormControl(''),
      CarColor: new FormControl(''),
      CarNumber: new FormControl(''),
    });
  }
  public removeValidators() {
    for (const key in this.form.controls) {
      this.form.get(key).clearValidators();
      this.form.get(key).updateValueAndValidity();
    }
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
    debugger;
    this.form.markAllAsTouched();
    if (this.form.valid) {
      // call API form.value
      const userInfo = new ShoppingCartDeliveryModel();
      userInfo.Items = this.items;
      userInfo.OrderTypeId = this.OrderTypeId;
      userInfo.UserInfo = this.form.value as UserInfo;
      console.log(userInfo);
      this.shoppingCartService
        .saveAsUserInfo(userInfo)
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
}
