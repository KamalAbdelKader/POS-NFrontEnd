import { LayoutService } from '../../shared/services/layout.service';
import { Component, OnInit } from '@angular/core';
import {
  NgbModal,
  ModalDismissReasons,
  NgbTabChangeEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss'],
})
export class DeliveryViewComponent implements OnInit {

  public closeResult: string;
  public modalOpen = false;
  form: FormGroup = new FormGroup({});
  currentJustify = 'start';
  currentOrientation = 'horizontal';

  constructor(public layout: LayoutService) {}

  ngOnInit(): void {
    this.form = this.CreateForm();
  }

  CreateForm(): FormGroup {
    return new FormGroup({
          Name: new FormControl(''),
          mail: new FormControl(''),
          Number: new FormControl(''),
          block: new FormControl(''),
          street: new FormControl(''),
          building: new FormControl(''),
          floor: new FormControl(''),
          type: new FormControl(''),
          car: new FormControl(''),
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



}
