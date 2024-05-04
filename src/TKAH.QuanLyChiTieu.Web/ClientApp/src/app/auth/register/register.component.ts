import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { RouterLink } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CookieService } from "src/app/shared/services/cookie.service";
import { AuthManager } from "src/app/shared/services/managers/auth-manager.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [RouterLink, HttpClientModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent implements OnInit {
  isPasswordVisible: boolean = false;
  form: FormGroup;
  sub: any = [];

  constructor(
    private authManager: AuthManager,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }
  ngOnDestroy(): void {}
  createForm() {
    return this.formBuilder.group({
      name: [""],
      email: [""],
      password: [""],
      comfirmPassword: [""],
    });
  }

  get email() {
    return this.form.controls["email"] as FormControl;
  }
  get password() {
    return this.form.controls["password"] as FormControl;
  }
  register() {
    this.authService.register(this.form.value).subscribe((token: string) => {
      this.cookieService.setCookie("token", token);
    });
  }

  onChangeValue(event: any, control: string) {
    this.form.controls[control].setValue(event.value);
  }

  emptyControl(control: string) {
    this.form.controls[control].setValue("");
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }
}
