import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CovidModule } from './covid/covid.module';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire';

// Components
import { AppComponent } from './app.component';

// Pipes
import { SortPipe } from './pipes/sort.pipe';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';

// Externals
import { JwtModule } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    SortPipe,
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    AuthModule,
    CovidModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("access_token");
        },
        allowedDomains: [ // ??
          "http://localhost:4200",
          "http://localhost:4200/countries",
          "http://localhost:4200/infected"
        ]
      },
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
