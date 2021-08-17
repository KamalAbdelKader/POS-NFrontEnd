import { LayoutService } from '../../shared/services/layout.service';
import {
  Component,
  OnInit
} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delivery-view',
  templateUrl: './delivery-view.component.html',
  styleUrls: ['./delivery-view.component.scss'],
})

export class DeliveryViewComponent implements OnInit {
   // tslint:disable-next-line:no-input-rename

  public closeResult: string;
  public modalOpen = false;
  
  currentJustify = 'start';
  currentOrientation = 'horizontal';
  

  constructor(public layout: LayoutService, private modalService: NgbModal) {}

  ngOnInit(): void {}
 
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  } 
  
  public beforeChange($event: NgbTabChangeEvent) {
      if ($event.nextId === 'tab-preventchange2') {
        $event.preventDefault();
      }
  }
}
