import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { NavService, Menu } from '../../../../services/nav.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language = false;

  public languages = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Emirates',
    code: 'ar',
    type: 'AR',
    icon: 'ae'
  }
  ];

  public selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  };

  constructor(private translate: TranslateService,
    public layout: LayoutService,
    public navServices: NavService) { }

  ngOnInit(): void {
  }

  changeLanguage(lang): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
    if (lang.code == 'ar') {
      this.layout.config.settings.layout_type = 'rtl';
      this.layout.config.settings.sidebar_type = 'default-sidebar';
      document.getElementsByTagName('html')[0].setAttribute('dir', 'rtl');
    } else {
      this.layout.config.settings.layout_type = 'ltr';
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    }
  }





}
