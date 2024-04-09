import { Injectable } from '@angular/core';
import { User, UserManager } from 'oidc-client-ts';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userManager: UserManager;
  constructor() {
    let settings = {
      authority: 'http://localhos:5500',
      redirect_uri: `${window.location.origin}/auth/callback`,
      client_id: 'Xbook_pharma_dev',
      post_logout_redirect_uri: `${window.location.origin}/auth/login`,
      response_type: 'code',
      scope: 'openid profile email',
      filterProtocolClaims: true,
      loadUserInfo: true,
      monitorSession: true,
      silentRequestTimeout: 29000,
      checkSessionInterval: 30000,
      silent_redirect_uri: `${window.location.origin}/silent-renew.html`,
      automaticSilentRenew: true,
      accessTokenExpiringNotificationTime: 4,
    };

    this.userManager = new UserManager(settings);
  }

  public async getUser(): Promise<User | null> {
    return this.userManager.getUser();
  }

  public login(): Promise<void> {
    return this.userManager.signinRedirect();
  }

  public renewToken(): Promise<User | null> {
    return this.userManager.signinSilent();
  }

  public logout(): Promise<void> {
    return this.userManager.signoutRedirect();
  }
}
