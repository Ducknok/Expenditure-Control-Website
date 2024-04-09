import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RoleManager {
  //#region Fb Item
  private itemSource = new BehaviorSubject<any | null>(null);
  private itemGet = this.itemSource.asObservable();

  sendItem(request: any) {
    this.itemSource.next(request);
  }

  getItem() {
    return this.itemGet;
  }
  //#endregion

  //#region Fb Item
  private UpdateSource = new BehaviorSubject<any | null>(null);
  private UpdateGet = this.UpdateSource.asObservable();

  sendUpdate(request: any) {
    this.UpdateSource.next(request);
  }

  getUpdate() {
    return this.UpdateGet;
  }
  //#endregion
}
