import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(private angularFireAuth: AngularFireAuth) {

  }

  //Used to login to application using firebase auth
  login(): void {
    this.angularFireAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }
}
