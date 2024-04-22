import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sending',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sending.component.html',
  styleUrl: './sending.component.scss',
})
export class SendingComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  onRouteIncome() {
    this.router.navigate(['pages/income']);
  }
}
