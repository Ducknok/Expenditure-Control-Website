import { Injectable } from '@angular/core';
import { BaseService } from '../../../base/base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  protected url: string = 'api/services/app/User';
  getAll(): Observable<any> {
    return this.get(`${this.url}/GetAll?MaxResultCount=99999`);
  }
  getById(id: number): Observable<any> {
    return this.get(`${this.url}/Get?Id=${id}`, id);
  }
  createUser(request: any): Observable<any> {
    return this.post(`${this.url}/Create`, request);
  }
  updateUser(request: any): Observable<any> {
    return this.put(`${this.url}/Update`, request);
  }
  deleteUser(id: number): Observable<any> {
    return this.delete(`${this.url}/Delete?Id=${id}`, id);
  }
}
