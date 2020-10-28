import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-auth',
  templateUrl: './google-auth.component.html',
  styleUrls: ['./google-auth.component.scss']
})
export class GoogleAuthComponent implements OnInit {
  user: any;

  constructor(
    public service: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }
  
  signInWithGoogle(){
    try{
      this.service.googleAuth()
        .then((res) => {
          if(res){
            this.user = res.user
            localStorage.setItem('access_token', this.user.xa)
            this.router.navigateByUrl("/home")
          }
        })
    }
    catch(error){
      console.error();
    }
  }
}
