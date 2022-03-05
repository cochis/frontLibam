import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment';
import { AngularFirestore, AngularFirestoreDocument, } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User, UserGoogle } from '../interfaces/interfaces';
import { FirebasebdService } from './firebasebd.service';
import { FunctionService } from 'src/app/services/functions';
import { id } from '@swimlane/ngx-datatable';
// import firebaseApp from './credentials';
@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    public auth;
    userData: any;
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        private dbs: FirebasebdService,
        private functionService: FunctionService,
        private database: FirebasebdService
    ) {
        /* Saving user data in localstorage when 
        logged in and setting up null when logged out */
        this.afAuth.authState.subscribe((user) => {

            if (localStorage.getItem('usuario')) {

            } else {
                if (user) {
                    this.userData = user;
                    this.database.getById('users', this.userData.uid).then(res => {
                        res.subscribe(docRef => {
                            let usuario = docRef.data();
                            console.log('usuario', usuario)
                            usuario['id'] = docRef.id;
                            localStorage.setItem('usuario', JSON.stringify(usuario))
                        })
                    })

                }
            }



        });
    }
    // Sign in with email/password
    SignIn(email: string, password: string) {

        return this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['site/home-site']);
                });
            })
            .catch((error) => {
                window.alert(error.message);
            });
    }
    // Sign up with email/password
    async SignUp(email: string, password: string) {
        // await this.afAuth
        //     .createUserWithEmailAndPassword(email, password)
        //     .then((result) => {
        //         console.log('result', result.user)
        //         return this.SetUserData(result.user);

        //     })
        //     .catch((error) => {
        //         window.alert(error.message);
        //     });

        try {
            const { user } = await this.afAuth.createUserWithEmailAndPassword(email, password);
            if (user) {
                console.log('user', user)
                this.SendVerificationMail()
                this.SetUserData(user);
                return user;
            } else {
                return null;
            }

        } catch (error) {
            console.log('error', error)
            return null;
        }
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        console.log(this.afAuth.currentUser);
        return this.afAuth.currentUser
            .then((u: any) => u.sendEmailVerification())

    }
    // Reset Forggot password
    ForgotPassword(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                window.alert('Password reset email sent, check your inbox.');
            })
            .catch((error) => {
                window.alert(error);
            });
    }
    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user')!);
        return user !== null && user.emailVerified !== false ? true : false;
    }
    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
            if (res) {
                this.router.navigate(['site/home-site']);
            }
        });
    }
    // Auth logic to run auth providers
    AuthLogin(provider: any) {
        return this.afAuth
            .signInWithPopup(provider)
            .then((result) => {
                this.SetUserData(result.user);
                this.ngZone.run(() => {
                    this.router.navigate(['site/home-site']);
                });

            })
            .catch((error) => {
                window.alert(error);
            });
    }
    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(
            `users/${user.uid}`
        );
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            role: ''
        };
        return userRef.set(userData, {
            merge: true,
        });
    }
    // Sign out
    SignOut() {
        return this.afAuth.signOut().then(() => {
            this.functionService.deleteLocal();
            this.router.navigate(['home']);
        });
    }






}
