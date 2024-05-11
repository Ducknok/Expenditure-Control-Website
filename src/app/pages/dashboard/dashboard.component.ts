import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Category } from '../../models/category';

import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';

import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  // calendar
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  // chart
  chartRound = {
    animationEnabled: true,
    theme: 'dark2',
    exportEnabled: true,
    title: {
      text: 'Thống kê tiền chi',
    },
    subtitles: [
      {
        text: 'VND/Tháng',
      },
    ],
    data: [
      {
        type: 'pie', //change type to column, line, area, doughnut, etc
        indexLabel: '{name}: {y}%',
        dataPoints: [
          { name: 'Thể thao', y: 9.1 },
          { name: 'Đi lại', y: 3.7 },
          { name: 'Ăn uống', y: 36.4 },
          { name: 'Học tập', y: 30.7 },
          { name: 'Chi tiêu vặt', y: 20.1 },
        ],
      },
    ],
  };
  listCategory: Category[] = [
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: 'Ăn tối cùng người rất yêu 1',
    },
    {
      id: '',
      code: '',
      name: 'Thể Thao',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: 'Ăn tối cùng người rất yêu 2',
    },
    {
      id: '',
      code: '',
      name: 'Đi lại',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: 'Ăn tối cùng người rất yêu 3',
    },
    {
      id: '',
      code: '',
      name: 'Học tập',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: 'Ăn tối cùng người rất yêu 4',
    },
    {
      id: '',
      code: '',
      name: 'Chi tiêu vặt',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: 'Ăn tối cùng người rất yêu 4',
    },
  ];
}
