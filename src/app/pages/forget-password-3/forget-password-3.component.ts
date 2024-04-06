import { Component } from '@angular/core';

@Component({
  selector: 'app-forget-password-3',
  standalone: true,
  imports: [],
  templateUrl: './forget-password-3.component.html',
  styleUrl: './forget-password-3.component.scss',
})
export class ForgetPassword3Component {
  isPasswordVisible: boolean = false;
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
