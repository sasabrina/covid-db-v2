import { Injectable } from '@angular/core';
import { Auth } from '../models/auth-model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth'; 
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user: User;
  formData: Auth = new Auth();
  
  constructor(
    public afAuth: AngularFireAuth,
    public jwtHelper: JwtHelperService
  ) { }

  // GOOGLE PROVIDER
  async googleAuth(){
    try{
      return await this.afAuth.signInWithPopup(new auth.GoogleAuthProvider())
    }
    catch(error){
      console.log(error);
    }
  }

  // PHONE NUMBER
  async phoneAuth(num: any, appVerifier: any){
    const phone = `+549${num}`
    try{
      return await this.afAuth.signInWithPhoneNumber(phone, appVerifier)
    }
    catch(error){
      console.log(error)
    }
  }

  // RECAPTCHA
  recaptcha(captchaContainer: string){    
    return new auth.RecaptchaVerifier(captchaContainer, {'size': 'invisible'})
  }

  // SIGN OUT
  async signOut(){
    try{
      await this.afAuth.signOut()
    }
    catch(error){
      console.log(error);
    }
  }

  getCurrentUser(){
    return this.afAuth.authState.pipe(first()).toPromise()
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token')
    return !this.jwtHelper.isTokenExpired(token)
  }
}
