import { Component, HostListener } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { CookieService } from "src/app/shared/services/cookie.service";
import { FunctionsService } from "../../shared/services/functions/functions.service";
import { v4 as uuid } from "uuid";

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
  routers: Nativegate[] = [];
  constructor(
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
    private functionsService: FunctionsService
  ) {}

  ngOnInit() {
    this.functionsService.getAll().subscribe((data: any) => {
      this.routers = [...data.result.items];
    });
  }

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
  onLogout() {
    this.cookieService.deleteCookie("token");
    this.router.navigate(["auth/login"]);
  }
}
class Nativegate {
  url: string | undefined;
  title: string | undefined;
  icon: string | any;
}
