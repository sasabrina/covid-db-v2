// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { UserComponent } from './user/user.component';
import { AuthComponent } from './auth.component';
import { GoogleAuthComponent } from './google-auth/google-auth.component';
import { PhoneAuthComponent } from './phone-auth/phone-auth.component';
import { PhoneModalComponent } from './phone-auth/phone-modal/phone-modal.component';

// Services
import { AuthService } from '../services/auth.service';
import { WindowService } from '../services/window.service';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AuthComponent,
    GoogleAuthComponent,
    UserComponent,
    PhoneAuthComponent,
    PhoneModalComponent
  ],
  entryComponents: [
    PhoneModalComponent,
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  exports: [
    UserComponent,
  ],
  providers: [
    AuthService, 
    WindowService
  ]
})
export class AuthModule { }
