import { Component, OnInit } from '@angular/core';
import { Client } from '../../shared/models/account';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotifyService } from 'src/app/shared/services/notify.service';
import { NzNotificationModule } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [MatFormFieldModule, MatSelectModule, CommonModule, FormsModule, ReactiveFormsModule, NzNotificationModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit{
  selected = 'option2';
  form: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private notifyService: NotifyService,){}
  ngOnInit(): void {
    this.form = this.createForm();
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      name: [""],
      birthdate: [null],
      sex: [0],
      email: [""]
    });
    return form;
  }
  onSubmit(){
    this.notifyService.success("OK")
    console.log(this.form.value)
  }
}
