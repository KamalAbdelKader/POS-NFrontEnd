import { Injectable } from '@angular/core';
import { SessionService } from './session.service';
@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(private sessionService: SessionService) { }

  isArabicLan(): boolean {
    return this.sessionService.getLanguages() === 'ar';
  }
}
