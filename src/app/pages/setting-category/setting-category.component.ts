import { Component } from '@angular/core';
import { Category } from '../../models/category';

@Component({
  selector: 'app-setting-category',
  standalone: true,
  imports: [],
  templateUrl: './setting-category.component.html',
  styleUrl: './setting-category.component.scss',
})
export class SettingCategoryComponent {
  listCategory: Category[] = [
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: '',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: '',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: '',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: '',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFE666',
      note: '',
    },
  ];
}
