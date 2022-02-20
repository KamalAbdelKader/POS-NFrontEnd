import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../../services/languages.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(protected lanService2: LanguagesService) { }

  ngOnInit(): void {
  }


  isArabicLan(): boolean {
    return this.lanService2.isArabicLan();
  }
}
