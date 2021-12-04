import { LayoutService } from '../../shared/services/layout.service';
import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbTabChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Types } from '../../shared/enums/types';
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

  constructor(public layout: LayoutService) { }

  ngOnInit(): void {
    this.form = this.CreateForm();
  }

  onChange(type: number): void {
    this.type = type;
    this.getControl('type').setValue(this.type);

    if (this.type == Types.Car) {
      this.getControl('car').setValidators(Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(30)]));
    } else {
      this.getControl('car').clearValidators();
    }
  }

  CreateForm(): FormGroup {
    return new FormGroup({
      name: new FormControl('', [Validators.required]),
      mail: new FormControl('', Validators.email),
      number: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(13)])),
      block: new FormControl('', Validators.minLength(3)),
      street: new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      building: new FormControl('', Validators.minLength(3)),
      floor: new FormControl('', Validators.minLength(1)),
      type: new FormControl(this.types.Home),
      car: new FormControl(''),
      carId: new FormControl(''),
      color: new FormControl(''),
      carNumber: new FormControl('')
    });
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
    }

  }

}
