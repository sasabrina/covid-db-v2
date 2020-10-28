import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { CountriesComponent } from './countries/countries.component';
import { InfectedComponent } from './infected/infected.component';

const routes: Routes = [
    { path: '', redirectTo: 'countries', pathMatch: 'full', canActivate: [AuthGuard] },
    { path: 'countries', component: CountriesComponent, canActivate: [AuthGuard] },
    { path: 'infected', component: InfectedComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class CovidRoutingModule { }