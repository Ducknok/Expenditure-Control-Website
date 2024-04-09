import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { PagesService } from '../shared/services/pages.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit, OnDestroy{
  innerWidth: any;
  fontsize = 42;
  mode: any = 'side';
  hasBackdrop: boolean = false;
  openNav: boolean = false;
  openData: boolean = false;
  sub: any[] = [];
  nameRestaraunt: any;
  addressRestaraunt: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pagesService: PagesService,
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add '' to the class.
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 960) {
      this.mobileSettings();
    } else {
      this.desktopSettings();
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements ' to the class.

    this.sub.forEach((x) => x.unsubscribe());
  }
  navright() {
    this.sub.push(
      this.pagesService.getData().subscribe((data) => {
        this.openData = false;
      })
    );
  }
  mobileSettings() {
    this.mode = 'over';
    this.hasBackdrop = true;
    this.openData = false;
    this.openNav = false;
  }

  desktopSettings() {
    this.mode = 'side';
    this.hasBackdrop = false;
    this.openNav = true;
    this.openData = true;
  }

  dataright(data: any) {
    this.openData = data;
  }

  home() {
    let url: string = this.route.snapshot['_routerState'].url;
    if (url != '/pages/order') {
      this.router.navigate(['/pages/order']);
    } else {
      // window.location.reload();
    }
  }

  @HostListener('window:resize', ['$event', '$window'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if (this.innerWidth < 960) {
      this.mobileSettings();
    } else {
      this.desktopSettings();
    }
  }

  @HostListener('click', ['$event.target', '$window']) onClick(e) {
    if (this.innerWidth < 960) {
      if (e.classList.contains('mat-drawer-backdrop')) {
        this.openData = false;
      }
    }
  }
}
