// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CovidRoutingModule } from './covid-rounting.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { CountriesComponent } from './countries/countries.component';
import { CountriesChartComponent } from './countries/countries-chart/countries-chart.component';
import { CounterComponent } from './counter/counter.component';
import { InfectedComponent } from './infected/infected.component';
import { InfectedChartComponent } from './infected/infected-chart/infected-chart.component';
import { FormComponent } from './infected/form/form.component';
import { ModalDeleteComponent } from  './infected/modal-delete/modal-delete.component';
import { HomeComponent } from './home/home.component';

// Services
import { CountriesService } from '../services/countries.service';
import { InfectedService } from '../services/infected.service';

// Externals
import { ToastrModule } from 'ngx-toastr';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';

// Material
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    CountriesComponent,
    CountriesChartComponent,
    CounterComponent,
    InfectedComponent,
    InfectedChartComponent,
    FormComponent,
    ModalDeleteComponent,
    HomeComponent
  ],
  entryComponents: [
    FormComponent,
    ModalDeleteComponent
  ],
  imports: [
    // BrowserModule,
    CommonModule,
    CovidRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    ChartsModule,
    NgxPaginationModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
  ],
  providers: [
    CountriesService,
    InfectedService
  ]
})
export class CovidModule { }
