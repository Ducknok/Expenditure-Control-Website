import { Injectable } from "@angular/core";
import { NzNotificationService } from 'ng-zorro-antd/notification';
@Injectable({
  providedIn: "root",
})
export class NotifyService {

  constructor(private notification: NzNotificationService) {}
  success(message: string){
    this.notification.create(
      'success',
      'Success',
      message
    );
  } 

  error(message: string){
    this.notification.create(
      'error',
      'Error',
      message
    );
  } 
}
