import { Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'LoaderSpinner',
  template: `<div class="justify-content-center">
    <div class="loader"></div>
  </div>`,
  styleUrls: ['./loaderSpinner.component.scss'],
})
export class LoaderSpinnerComponent {}
