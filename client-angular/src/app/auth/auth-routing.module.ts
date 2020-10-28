import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AfterAuthGuard } from '../guards/after-auth.guard';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full', canActivate: [AfterAuthGuard] },
  { path: 'signin', component: AuthComponent, canActivate: [AfterAuthGuard]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AuthRoutingModule { }
