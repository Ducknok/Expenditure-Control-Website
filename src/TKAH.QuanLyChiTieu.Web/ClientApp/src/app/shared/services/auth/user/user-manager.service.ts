import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RoleUserManagerService } from '../role-user-manager.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserManagerService {
  constructor(
    private roleManager: RoleUserManagerService,
    private userService: UserService
  ) {}
  //#region current user
  private userSource = new BehaviorSubject<any | null>(null);
  private userGet = this.userSource.asObservable();

  setUser(request: any) {
    this.userService.getAll().subscribe((users) => {
      let userFilter = users?.result?.items.filter(
        (user) => user?.userName === request.email
      )[0];
      if (userFilter) {
        this.roleManager.setRole(userFilter?.roleId);
        this.userSource.next(userFilter);
      } else {
        this.userSource.next(null);
      }
    });
  }

  getUser() {
    return this.userGet;
  }
  //#endregion
}
