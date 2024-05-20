import { Component } from "@angular/core";
import { NzCalendarMode, NzCalendarModule } from "ng-zorro-antd/calendar";
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from "@angular/forms";
import { JsonPipe } from "@angular/common";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { provideNativeDateAdapter } from "@angular/material/core";
import { Tag } from "../../shared/models/tag";

@Component({
  selector: "app-calendar",
  standalone: true,
  imports: [NzCalendarModule],
  templateUrl: "./calendar.component.html",
  styleUrl: "./calendar.component.scss",
})
export class CalendarComponent {
  date = new Date(2012, 11, 21);
  mode: NzCalendarMode = "month";

  panelChange(change: { date: Date; mode: string }): void {
    console.log(change.date, change.mode);
  }

  listCategory: Tag[] = [
    {
      id: "",
      categoryId: "",
      name: "Ăn uống",
      icon: "../assets/icon/eat.svg",
      color: "#FFE666",
      note: "Ăn tối cùng người rất yêu 1",
    },
    {
      id: "",
      categoryId: "",
      name: "Ăn uống",
      icon: "../assets/icon/eat.svg",
      color: "#FFE666",
      note: "Ăn tối cùng người rất yêu 2",
    },
    {
      id: "",
      categoryId: "",
      name: "Ăn uống",
      icon: "../assets/icon/eat.svg",
      color: "#FFE666",
      note: "Ăn tối cùng người rất yêu 3",
    },
    {
      id: "",
      categoryId: "",
      name: "Ăn uống",
      icon: "../assets/icon/eat.svg",
      color: "#FFE666",
      note: "Ăn tối cùng người rất yêu 4",
    },
    {
      id: "",
      categoryId: "",
      name: "Ăn uống",
      icon: "../assets/icon/eat.svg",
      color: "#FFE666",
      note: "Ăn tối cùng người rất yêu 5",
    },
  ];
}
