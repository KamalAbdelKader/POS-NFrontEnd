import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.scss'],
})
export class ValidationComponent implements OnInit {
  @Input() control: FormControl;
  @Input() fieldName: string;

  constructor() {
    this.control = new FormControl();
    this.fieldName = '';
  }

  ngOnInit(): void {}
}
