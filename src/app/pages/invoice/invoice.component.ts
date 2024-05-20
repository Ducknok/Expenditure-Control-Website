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
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { v4 as uuid } from "uuid";
import { Tag } from "../../shared/models/tag";
import { Category } from "../../shared/models/category";
import { MatIconModule } from "@angular/material/icon";
import { InvoiceService } from "../../shared/services/invoice/invoice.service";
@Component({
  selector: "app-invoice",
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
  ],
  providers: [provideNgxMask(), provideNativeDateAdapter()],
  templateUrl: "./invoice.component.html",
  styleUrl: "./invoice.component.scss",
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  listCategory: Category[] = [];
  listTag: Tag[] = [];
  cateId = "";
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private notifyService: NotifyService,
    private tagService: TagService,
    private invoiceService: InvoiceService
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.tagService.getAll().subscribe((data: any) => {
      this.listTag = [...data.result.items];
    });
    this.categoryService.getAll().subscribe((data: any) => {
      this.listCategory = [...data.result.items];
      this.cateId = this.listCategory[0].id;
    });
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      id: [uuid()],
      issueDate: [formatDate(new Date(), "yyyy-MM-dd", "en")],
      note: [""],
      amount: [0],
      code: [""],
      tagId: [""],
      clientId: ["A75F7C79-1B1B-4078-AE13-3DD6E0770F6D"],
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
    this.cateId = id;
  }

  onSelectCategory(code: string) {
    this.form.controls["code"].setValue(code);
  }
  onSubmit() {
    this.invoiceService.createItem(this.form.value).subscribe((data) => {
      if (data.success) {
        this.notifyService.success("ok");
      }
    });
  }

  onCreate() {
    this.categoryService
      .createItem({
        id: uuid(),
        code: "Income",
        name: "Phiếu chi",
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  onSelectTag(tag: Tag) {
    this.form.get("tagId")?.setValue(tag.id);
  }
}
