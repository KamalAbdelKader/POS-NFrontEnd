import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public config = {
    settings: {
      layout: 'Dubai',
      layout_type: 'ltr',
      layout_version: 'dark-only',
      sidebar_type: 'default-sidebar',
    },
    color: {
      primary_color: '#7366ff',
      secondary_color: '#f73164',
    },
  };

  private _dark = false;

  constructor() {
    if (this.config.settings.layout_type == 'rtl') {
      document
        .getElementsByTagName('html')[0]
        .setAttribute('dir', this.config.settings.layout_type);
    }

    document.documentElement.style.setProperty(
      '--theme-deafult',
      this.config.color.primary_color
    );
    document.documentElement.style.setProperty(
      '--theme-secondary',
      this.config.color.secondary_color
    );
  }

  setDarkMode(change: boolean): void {
    this._dark = change;
  }
  isDarkMode(): boolean {
    return this._dark;
  }
}
