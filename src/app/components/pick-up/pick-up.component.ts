import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pick-up',
  templateUrl: './pick-up.component.html',
  styleUrls: ['./pick-up.component.scss'],
})
export class PickUpComponent implements OnInit {
  sh: any;
  isChecked: boolean = true;
  constructor() {}

  ngOnInit(): void {}
}