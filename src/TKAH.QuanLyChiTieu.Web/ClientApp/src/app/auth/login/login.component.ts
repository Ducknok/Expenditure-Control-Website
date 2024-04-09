import { Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { OverlayContainer } from '@angular/cdk/overlay';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthManager } from 'src/app/shared/services/managers/auth-manager.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatIconModule, ReactiveFormsModule],
  standalone: true,
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit,OnDestroy{
  form: FormGroup;
  sub: any = [];
  constructor(
    private authManager: AuthManager,
    private authService: AuthService,
    private formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
  }
  ngOnDestroy(): void {
      
  }
  createForm(){
    return this.formBuilder.group({
      username: [''],
      password: [''],
    })
  }

  get username(){
    return this.form.controls['username'] as FormControl;
  }
  get password(){
    return this.form.controls['password'] as FormControl;
  }
  login() {
    this.authService.login();
  }

  onChangeValue(event:any, control: string){
    this.form.controls[control].setValue(event.value);
  }

  emptyControl(control: string){
    this.form.controls[control].setValue('');
  }
}
