import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { WindowService } from '../../../services/window.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-phone-modal',
  templateUrl: './phone-modal.component.html',
  styleUrls: ['./phone-modal.component.scss']
})

export class PhoneModalComponent implements OnInit {
  user: any;
  windowRef: any;
  validateMessages = {
    phone: 'Please enter a valid phone number.',
    code: 'Please enter the six-digit code.'
  };
  recaptchaVerifier: any;

  constructor(
    public dialogRef: MatDialogRef<PhoneModalComponent>,
    public service: AuthService,
    private wService: WindowService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.renderCaptcha()
  }

  signInWithPhoneNumber(form: NgForm){
    const appVerifier = this.windowRef.recaptchaVerifier;
    const { phone } = form.value;
  
    try{
      this.service.phoneAuth(phone, appVerifier)
      .then((res:any) => {
        this.windowRef.confirmationResult = res;
      })
    }
    catch(error){
      console.log(error)
    }
  }

  verifyCode(form: NgForm){
    const { code } = form.value;

    try{
      this.windowRef.confirmationResult
      .confirm(code)
      .then((res: any) => {
        if(res){
          this.user = res.user;
          this.onClose()
          localStorage.setItem('access_token', this.user.xa)
          this.router.navigateByUrl("/home")
        }
      })
    }
    catch(error){
      console.log(error);
    }
  }

  renderCaptcha(){
    this.windowRef = this.wService.windowRef()
    this.windowRef.recaptchaVerifier = this.service.recaptcha('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }

  resetForm(form?: NgForm){
    if(form != null){
      form.resetForm()

      this.service.formData = {
        phone: '',
        code: null,
      }
    }
  }

  onClose(){
    this.dialogRef.close()
    this.resetForm()
  }
}
