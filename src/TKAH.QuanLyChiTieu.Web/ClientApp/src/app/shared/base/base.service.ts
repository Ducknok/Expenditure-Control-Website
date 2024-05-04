import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseService {
  protected baseUrl: string;

  constructor(protected http: HttpClient) {
    this.baseUrl = '/api/services/app';
  }
  private processUrl<T>(url: string) {
    url = url.replace('//', '/');
    if (url[0] === '/') {
      url = url.substring(1);
    }
    let endpoint = this.baseUrl + url;
    endpoint = endpoint.replace(/[?&]$/, '');
    if (endpoint[0] === '/') {
      endpoint = endpoint.substring(1);
    }
    return endpoint;
  }

  get<T>(url: string, param?: any): Observable<T> {
    if (param) {
      return this.http.get<T>(this.processUrl(url), { params: param });
    }
    return this.http.get<T>(this.processUrl(url));
  }

  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(this.processUrl(url), data);
  }

  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(this.processUrl(url), data);
  }

  delete<T>(url: string, data?: any): Observable<any> {
    if (data) return this.http.delete(this.processUrl(url), data);

    return this.http.delete<T>(this.processUrl(url));
  }
}
