import { Component, HostListener } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CookieService } from "src/app/shared/services/cookie.service";
@Component({
  selector: "app-nav-bar",
  standalone: true,
  imports: [MatIconModule, RouterModule],
  templateUrl: "./nav-bar.component.html",
  styleUrl: "./nav-bar.component.scss",
})
export class NavBarComponent {
  innerWidth: number = window.innerWidth;
  user: any;
  constructor(private router: Router, private authService: AuthService, private cookieService: CookieService) {}

  ngOnInit() {}
  routers: Nativegate[] = [
    {
      name: "Nhập vào",
      router: "invoice",
      icon: "../assets/icon/pen.svg",
    },
    {
      name: "Lịch",
      router: "invoice-list",
      icon: "../assets/icon/calendar.svg",
    },
    {
      name: "Báo cáo",
      router: "dashboard",
      icon: "../assets/icon/trello.svg",
    },
    {
      name: "Cài đặt cơ bản",
      router: "profile",
      icon: "../assets/icon/setting.svg",
    }
  ];
  refresh(): void {
    this.router.navigate([`/order`]);
  }

  nav() {
    this.router.navigate([`/pages/settings`], { queryParams: { tab: "1" } });
  }

  @HostListener("window:resize", ["$event"])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }
  onLogout(){
    this.cookieService.deleteCookie("token")
  }
}
class Nativegate {
  router: string | undefined;
  name: string | undefined;
  icon: string | any;
}
