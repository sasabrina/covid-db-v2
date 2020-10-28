import { Component, OnInit } from '@angular/core';
import { Infected } from '../../models/infected-model';
import { TrackHttpError } from '../../models/error-model';
import { InfectedService } from '../../services/infected.service';
import { CountriesService } from '../../services/countries.service';
import { FormComponent } from './form/form.component';
import { ModalDeleteComponent } from './modal-delete/modal-delete.component'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Observable, forkJoin } from 'rxjs';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-infected',
  templateUrl: './infected.component.html',
  styleUrls: ['./infected.component.scss']
})

export class InfectedComponent implements OnInit {
  infected: Observable<Infected[]>;
  errorMessage: string;
  loading = true;
  columns = [
    {id: 'first_name', name: 'name'},
    {id: 'last_name', name: 'last name'},
    {id: 'country', name: 'country'},
    {id: 'age', name: 'age'},
    {id: 'female', name: 'gender'},
    {id: 'infect_date', name: 'infect date'},
    {id: 'actions', name: ''}
  ]
  sortedColumn: string;
  sortAsc = true;
  page: number = 1;
  pageSize: number = 10;
  fileName = "Covid19-database.xlsx";

  constructor(
    private infectedService: InfectedService,
    private countriesService: CountriesService,
    public dialog: MatDialog
  ) { 
    this.infectedService.listen().subscribe(() => {
      this.getInfected()
    })
  }
  
  ngOnInit(): void {
    this.getInfected();
  }

  getInfected() {
    forkJoin({
      infected: this.infectedService.getInfected().pipe((res:any) => res),
      countries: this.countriesService.getInfectedCountries().pipe((res:any) => res)
    }).subscribe((allResults:any) => {
      if(allResults){
        const infected = allResults.infected[0]
        const countries = allResults.countries[0]
        
        infected.forEach((e:any) => {
          countries.forEach((c:any) => {
            if(e.country_id === c.id){
              e.country_name = c.name
            }
          })
        });
      
        this.infected = infected
      }
      this.loading = false
    },
    (error: TrackHttpError) => this.errorMessage = error.friendlyMessage)
  }

  onAdd() {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    this.dialog.open(FormComponent, dialogConfig)
  }

  onEdit(data: Infected){
    this.infectedService.formData = {
      ...data,
      gender_id: data.gender_id === 1 ? "female" : "male",
      status_id: data.status_id === 1 ? "yes" : "no"
    };
    
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = this.infectedService.formData
    dialogConfig.disableClose = true
    this.dialog.open(FormComponent, dialogConfig)
  }

  onDelete(id:any){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.data = id;
    dialogConfig.disableClose = true
    this.dialog.open(ModalDeleteComponent, dialogConfig)
  }

  exportExcel(): void {
    let element = document.getElementById('infected-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, this.fileName);
  }

  sortTable(name: string): void {
    this.sortedColumn = name;
    this.sortAsc = !this.sortAsc
  }
}
