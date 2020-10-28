import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces';
import { CountriesService } from '../../services/countries.service';
import { TrackHttpError } from '../../models/error-model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})

export class CountriesComponent implements OnInit {
  dataSource: Country[];
  errorMessage: string;
  loading = true;
  tableColumns: string[] = ['name', 'infected'];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.getCountries();
  }

  getCountries(): void {
    this.countriesService.getCountries()
      .subscribe((res: any) => {
        if(res){
          this.dataSource = res
          this.loading = false
        }
      },
      (error: TrackHttpError) => this.errorMessage = error.friendlyMessage)
  }
}
