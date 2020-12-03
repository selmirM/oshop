import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  user$: Observable<firebase.User>;

  constructor(private authService: AuthService) {
    this.user$ = authService.user$;
  }

  logout(): void {
    this.authService.logout();
  }
}
