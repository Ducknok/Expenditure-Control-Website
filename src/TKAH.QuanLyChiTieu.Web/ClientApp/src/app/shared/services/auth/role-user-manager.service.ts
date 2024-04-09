import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserManagerService } from './user/user-manager.service';
import { RoleService } from '../permission/role.service';

@Injectable({
  providedIn: 'root',
})
export class RoleUserManagerService {
  constructor(private roleService: RoleService) {}
  //#region role
  private roleSource = new BehaviorSubject<any | null>(null);
  private roleGet = this.roleSource.asObservable();

  setRole(request: any) {
    this.roleService.getById(request).subscribe((role) => {
      this.roleSource.next(role.result);
      let listPermissions: any[] = [];
      role.result.permissions.forEach((permission) => {
        if (permission.isGranted) {
          listPermissions.push(permission.name);
        }
      });

      this.setPermissions(listPermissions);
    });
  }

  getRole() {
    return this.roleGet;
  }
  //#endregion
  //#region permissions
  private permissionsSource = new BehaviorSubject<any | null>(null);
  private permissionsGet = this.permissionsSource.asObservable();
  setPermissions(request: any) {
    this.permissionsSource.next(request);
  }

  getPermissions() {
    return this.permissionsGet;
  }

  //#endregion
}
