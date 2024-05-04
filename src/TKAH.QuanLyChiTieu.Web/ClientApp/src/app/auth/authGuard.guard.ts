import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { User } from 'oidc-client-ts';
import { AuthService } from '../shared/services/auth/auth.service';
import { UserManagerService } from '../shared/services/auth/user/user-manager.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userManager: UserManagerService,
    private router: Router
  ) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    let isActivated = true;
    // await this.authService.getUser().then((user) => {
    //   if (!user) {
    //     isActivated = false;
    //     this.router.navigate(['/auth/login']);
    //   } else {
    //     this.userManager.setUser(user.profile);
    //   }
    // });
    return isActivated;
  }
}
