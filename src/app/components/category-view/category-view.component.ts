import { LayoutService } from './../../shared/services/layout.service';
import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-category-view',
  templateUrl: './category-view.component.html',
  styleUrls: ['./category-view.component.scss'],
})

export class CategoryViewComponent implements OnInit {
  @ViewChild('categoryView', { static: false }) categoryView: TemplateRef<any>;
  // tslint:disable-next-line:no-input-rename

  public closeResult: string;
  public modalOpen = false;

  currentJustify = 'start';
  currentOrientation = 'horizontal';


  constructor(private layout: LayoutService, private modalService: NgbModal) { }

  ngOnInit(): void { }

  async openModal(): Promise<void> {
    const model = this.modalService.open(this.categoryView, {
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

  public beforeChange($event: NgbTabChangeEvent) {
    if ($event.nextId === 'tab-preventchange2') {
      $event.preventDefault();
    }
  }
}
