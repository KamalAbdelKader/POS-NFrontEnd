import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public show = false;

  constructor(private modalService: NgbModal, private router: Router) { }

  ngOnInit(): void {
  }

  onClick(): void {
    this.router.navigate(['/products/register']);
    this.modalService.dismissAll();
  }
  showPassword(): void {
    this.show = !this.show;
  }

}
