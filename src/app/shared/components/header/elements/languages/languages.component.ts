import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LayoutService } from 'src/app/shared/services/layout.service';
import { SessionService } from 'src/app/shared/services/session.service';
import { NavService, Menu } from '../../../../services/nav.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit {

  public language = false;

  public languages: any[] = [{
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  },
  {
    language: 'Arabic',
    code: 'ar',
    type: 'AR',
    icon: 'ae'
  }];

  public _selectedLanguage: any = {
    language: 'English',
    code: 'en',
    type: 'US',
    icon: 'us'
  };

  public selectedLanguage: any = {};

  constructor(private translate: TranslateService,
    private sessionService: SessionService,
    private layout: LayoutService,
    public navServices: NavService) { }

  ngOnInit(): void {
    const code = this.sessionService.getLanguages();
    if (code) {
      this.selectedLanguage = this.languages.find(lan => lan.code == code);
      this.translate.use(this.selectedLanguage.code);
    } else {
      this.selectedLanguage = this._selectedLanguage;
      this.sessionService.setLanguages(this._selectedLanguage.code);
      this.translate.use(this._selectedLanguage.code);
    }

    this.changeLanguage(this.selectedLanguage);
  }

  changeLanguage(lang: any): void {
    this.translate.use(lang.code);
    this.selectedLanguage = lang;
    this.sessionService.setLanguages(lang.code);
    this.customizeLayoutType(lang.code);
  }


  customizeLayoutType(val): void {
    // this.layoutType = val;
    val = (val == 'ar') ? 'rtl' : 'ltr';
    this.layout.config.settings.layout_type = val;
    if (val == 'rtl') {
      document.getElementsByTagName('html')[0].setAttribute('dir', val);
    } else {
      document.getElementsByTagName('html')[0].removeAttribute('dir');
    }
  }

}
