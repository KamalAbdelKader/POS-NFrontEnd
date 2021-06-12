import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
  constructor() {}
  public configuration = {
    // hostName: 'http://62.171.165.227:9090/',
    hostName: 'https://localhost:44378/',
  };
}