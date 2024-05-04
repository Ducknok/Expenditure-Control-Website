import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from '../../base/base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService{
  url: string = "auth/"

  // public async getUser(): Observable<any> {
  //   return 
  // }

  public login(request: any): Observable<any> {
    return this.post(`${this.url}/CheckExistAccount`, request);
  }

  public register(request: any): Observable<any> {
    return this.post(`${this.url}/CreateAccount`, request)
  }
}
