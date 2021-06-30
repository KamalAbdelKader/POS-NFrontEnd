import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { NavService } from '../../services/nav.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public elem: any;
  public dark: boolean =
    this.layout.config.settings.layout_version == 'dark-only' ? true : false;
  openCart = true;
  constructor(
    public layout: LayoutService,
    public navServices: NavService,
    @Inject(DOCUMENT) private document: any
  ) {}

  ngOnInit(): void {
    this.elem = document.documentElement;
  }

  mouseHover(active: boolean): void {
    this.openCart = active;
  }

  sidebarToggle(): void {
    this.navServices.collapseSidebar = !this.navServices.collapseSidebar;
    this.navServices.megaMenu = false;
    this.navServices.levelMenu = false;
  }

  layoutToggle(): void {
    this.dark = !this.dark;
    this.layout.config.settings.layout_version = this.dark
      ? 'dark-only'
      : 'light';
  }

  searchToggle(): void {
    this.navServices.search = true;
  }

  languageToggle(): void {
    this.navServices.language = !this.navServices.language;
  }

  toggleFullScreen(): void {
    this.navServices.fullScreen = !this.navServices.fullScreen;
    if (this.navServices.fullScreen) {
      if (this.elem.requestFullscreen) {
        this.elem.requestFullscreen();
      } else if (this.elem.mozRequestFullScreen) {
        /* Firefox */
        this.elem.mozRequestFullScreen();
      } else if (this.elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.elem.webkitRequestFullscreen();
      } else if (this.elem.msRequestFullscreen) {
        /* IE/Edge */
        this.elem.msRequestFullscreen();
      }
    } else {
      if (!this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
