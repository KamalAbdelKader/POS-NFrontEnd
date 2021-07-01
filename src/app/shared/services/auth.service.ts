import { SessionService } from './session.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataService } from './base/data.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends DataService {
  private loginUrl: string;

  constructor(http: HttpClient, private sessionService: SessionService) {
    super(http);
    this.loginUrl = this.url.login.loginUrl;
  }

  demoLogin(userNumber: string): boolean {
    return userNumber == '123';
  }

  login(userNumber: string) {
    return this.post(this.loginUrl, { userNumber });
  }

  logOut(): void {
    this.sessionService.clearUserData();
    this.sessionService.clearAll();
  }

  onLoginChange(isLogin: boolean, userNumber: string): void {
    if (isLogin) {
      this.sessionService.setUserName(userNumber);
      this.sessionService.setTime(new Date());
    }
  }

  isLogin(): boolean {
    const getTime = this.sessionService.getTime();
    return getTime == new Date().getDay().toString();
  }
}
