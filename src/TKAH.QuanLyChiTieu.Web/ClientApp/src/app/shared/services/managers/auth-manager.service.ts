import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthManager {
  //#region Fb Item
  private dataSource = new BehaviorSubject<any | null>(null);
  private dataGet = this.dataSource.asObservable();

  sendData(request: any) {
    this.dataSource.next(request);
  }

  getData() {
    return this.dataGet;
  }
  //#endregion
}
