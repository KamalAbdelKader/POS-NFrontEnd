import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  show = false;

  constructor() { }

  ngOnInit(): void {
  }

  showPassword(): void {
    this.show = !this.show;
  }
}
