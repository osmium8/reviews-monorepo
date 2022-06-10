import { Component, OnInit } from '@angular/core';
import { AuthService } from '@pranshu/users';

@Component({
  selector: 'reviews-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  pointer = 'pointer';

  constructor(
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  logoutUser() {
    this.authService.logout();
  }
}
