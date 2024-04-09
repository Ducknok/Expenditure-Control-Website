import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styleUrls: ['./callback.component.scss'],
})
export class CallbackComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    await this.authService.userManager.signinCallback().then((user) => {
      this.router.navigate(['']);
    });
  }
}
