import { Injectable } from '@angular/core';
import { RoleUserManagerService } from '../auth/role-user-manager.service';

@Injectable({
  providedIn: 'root',
})
export class RolePerService {
  listPermissions: Set<string> | any = new Set();
  constructor(private roleUserManager: RoleUserManagerService) {
    this.roleUserManager.getPermissions().subscribe((data: any[]) => {
      if (data) {
        data.forEach((permission) => this.listPermissions.add(permission));
      }
    });
  }

  canCurrentUser(permission: string): boolean {
    return this.listPermissions.has(permission);
  }

  addPermission(permission: string) {
    this.listPermissions.add(permission);
  }

  removePermission(permission: string) {
    this.listPermissions.delete(permission);
  }
}
