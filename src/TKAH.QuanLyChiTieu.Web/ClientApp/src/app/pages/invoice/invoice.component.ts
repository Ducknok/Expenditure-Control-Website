import { CommonModule, formatDate } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { NgxMaskDirective, provideNgxMask } from "ngx-mask";
import { debounceTime, filter } from "rxjs";
import { CategoryService } from "src/app/shared/services/category/category.service";
import { NotifyService } from "src/app/shared/services/notify.service";
import { TagService } from "src/app/shared/services/tag/tag.service";
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';

@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NgxMaskDirective, MatFormFieldModule, MatInputModule, MatDatepickerModule],
  providers: [provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: "./invoice.component.html",
  styleUrl: "./invoice.component.scss",
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  listCategory: any[] = [];
  listTag: any[] = [];
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notifyService: NotifyService,
    private tagService: TagService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    console.log(this.form.value)
    // this.tagService.getAll().subscribe((data: any) => {
    //   this.listTag = [...data];
    // });
    // this.categoryService
    //   .getAll()
    //   .pipe(filter((x) => x.tagId == this.form.value.tagId))
    //   .subscribe((data: any) => {
    //     this.listCategory = [...data];
    //   });
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      id: [""],
      date: [formatDate(new Date(),'yyyy-MM-dd','en')],
      note: [""],
      money: [0],
      code: [""],
      tagId: ["0"],
    });
    return form;
  }
  onRouteSending() {
    // this.notifyService.success("tes")
    this.router.navigate(["pages/sending"]);
  }
  onRouteIncome() {
    this.router.navigate(["pages/income"]);
  }

  onChangeType(id: string) {
    this.form.controls["tagId"].setValue(id);
  }

  onSelectCategory(code: string) {
    this.form.controls["code"].setValue(code);
  }
  onSubmit(){
    this.notifyService.success("ok")
  }
}
