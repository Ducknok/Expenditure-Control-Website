import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
@Component({
  selector: 'app-call-back',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './call-back.component.html',
  styleUrl: './call-back.component.scss'
})
export class CallBackComponent {
  constructor(private authService: AuthService, private router: Router) {}

  async ngOnInit() {
    // await this.authService.userManager.signinCallback().then((user) => {
    //   this.router.navigate(['']);
    // });
  }
}
