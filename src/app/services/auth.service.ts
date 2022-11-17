import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ActivatedRoute, Router } from "@angular/router";
import firebase from "firebase/compat/app";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  appUser$ = this.afAuth.authState;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly afs: AngularFirestore
  ) {}

  login() {
    // Store the return URL in localstorage, to be used once the user logs in successfully
    const returnUrl =
      this.route.snapshot.queryParamMap.get("returnUrl") || this.router.url;

    localStorage.setItem("returnUrl", returnUrl);

    this.afAuth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((credential) => this.updateUserData(credential.user));
  }


   // Sign in with email/password
   SignIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['home']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.router.navigate(["/"]);
    });
  }


   // Returns true when user is looged in and email is verified
   get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Save the user data to firestore on login
  private updateUserData(user) {
    const userRef = this.afs.doc(`appusers/${user.uid}`);
    const data = {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    return userRef.set(data, { merge: true });
  }
}
