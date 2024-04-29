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
    },
    {
      id: '',
      code: '',
      name: 'Chi tiêu vặt',
      icon: '../assets/icon/eat.svg',
      color: '#FFC0AD',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FF8D8D',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#FFFF67',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#F1CC0B',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#B4FF00',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#AC0002',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#B36500',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#97FEDF',
    },
    {
      id: '',
      code: '',
      name: 'Ăn uống',
      icon: '../assets/icon/eat.svg',
      color: '#00A0F4',
    },
  ];
}
