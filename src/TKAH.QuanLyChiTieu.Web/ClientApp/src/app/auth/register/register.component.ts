import { HttpClientModule } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CookieService } from "src/app/shared/services/cookie.service";
import { AuthManager } from "src/app/shared/services/managers/auth-manager.service";
import { NotifyService } from "../../shared/services/notify.service";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [RouterLink, HttpClientModule, FormsModule, ReactiveFormsModule],
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
    private cookieService: CookieService,
    private router: Router,
    private notifyService: NotifyService
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
    this.authService.register(this.form.value).subscribe((token: any) => {
      if (token.result != "") {
        this.cookieService.setCookie("token", token.result);
        this.router.navigate(["pages/invoice"]);
      } else {
        this.notifyService.error("Create error");
      }
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
