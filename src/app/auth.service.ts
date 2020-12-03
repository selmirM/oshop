import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private route: ActivatedRoute) {
      this.user$ = angularFireAuth.authState;
  }

  // Used to login to application using firebase auth
  login(): void {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    returnUrl = returnUrl == null ? '/' : returnUrl;
    localStorage.setItem('returnUrl', returnUrl);

    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  // Used to logut of the applications using firebase auth
  logout(): void {
    this.angularFireAuth.signOut();
  }
}
