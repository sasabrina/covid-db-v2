import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [AuthService]
})

export class UserComponent implements OnInit {
  user: Observable<any> = this.authService.afAuth.user;
  currentUser: any;
  displayName: string;
  
  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }

  async getCurrentUser(){
    this.currentUser = await this.authService.getCurrentUser()
    if(this.currentUser){
      this.displayName = this.currentUser.displayName
      // this.setDisplayName()
      console.log(this.displayName);
    }
  }

  onSignOut(){
    this.authService.signOut()
    localStorage.removeItem('access_token')
    this.router.navigateByUrl("/auth")
  }

}
