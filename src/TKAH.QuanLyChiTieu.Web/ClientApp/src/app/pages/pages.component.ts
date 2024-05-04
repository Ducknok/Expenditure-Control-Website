import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatSelectModule } from "@angular/material/select";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterOutlet } from "@angular/router";
import { NavBarComponent } from "../components/nav-bar/nav-bar.component";
import { AuthService } from "../shared/services/auth/auth.service";
import { CookieService } from "../shared/services/cookie.service";
import { HttpClientModule } from "@angular/common/http";
import { CategoryService } from "../shared/services/category/category.service";
import { NotifyService } from "../shared/services/notify.service";
import { TagService } from "../shared/services/tag/tag.service";

@Component({
  selector: "app-pages",
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    NavBarComponent,
    HttpClientModule,
  ],
  templateUrl: "./pages.component.html",
  styleUrl: "./pages.component.scss",
  providers: [AuthService, CookieService, CategoryService, NotifyService,TagService],
})
export class PagesComponent {}
