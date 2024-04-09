import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavBarComponent } from './app-nav-bar.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppNavBarComponent],
  imports: [CommonModule, MatIconModule, RouterModule],
  exports: [AppNavBarComponent],
})
export class AppNavBarModule {}
