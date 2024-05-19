import { Component, OnInit } from "@angular/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { CommonModule, formatDate } from "@angular/common";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { NgxMaskDirective } from "ngx-mask";
import { Tag } from "../../shared/models/tag";
import { Category } from "../../shared/models/category";
import { TagService } from "src/app/shared/services/tag/tag.service";
import { CategoryService } from "../../shared/services/category/category.service";
import { v4 as uuid } from "uuid";
import { MatIconModule } from "@angular/material/icon";
@Component({
  selector: "app-setting-tag",
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
  templateUrl: "./setting-tag.component.html",
  styleUrl: "./setting-tag.component.scss",
})
export class SettingTagComponent implements OnInit {
  form: FormGroup;
  listIcons: string[] = [
    "payments",
    "redeem",
    "sports_soccer",
    "restaurant",
    "pedal_bike",
    "flight",
    "attach_money",
    "cases",
    "monetization_on",
    "account_balance_wallet",
  ];
  listColors: string[] = [
    "#000000",
    "#c170bb",
    "#17ba52",
    "#246ab5",
    "#ff6600",
    "#b60075",
    "#a2d96e",
    "#ffe666",
  ];
  listCategory: Category[] = [];
  listTag: Tag[] = [];

  constructor(
    private tagService: TagService,
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.createForm();
    this.tagService.getAll().subscribe((data: any) => {
      this.listTag = [...data.result.items];
    });
    this.categoryService.getAll().subscribe((data: any) => {
      this.listCategory = [...data.result.items];
      this.categoryControl.setValue(this.listCategory[0].id);
    });
  }

  get categoryControl() {
    return this.form.get("categoryId") as FormControl;
  }

  createForm(): FormGroup {
    let form = this.formBuilder.group({
      id: [uuid()],
      name: [""],
      icon: [""],
      note: [""],
      color: [""],
      categoryId: [""],
    });
    return form;
  }

  onSelectItem(type: string, value: any) {
    this.form.get(type)?.setValue(value);
  }

  onSubmit() {
    this.tagService.updateItem(this.form.value).subscribe((data) => {
      this.tagService.getAll().subscribe((data: any) => {
        this.listTag = [...data.result.items];
      });
    });
  }
  onSelectTag(tag: Tag) {
    this.form.patchValue(tag);
  }
}
