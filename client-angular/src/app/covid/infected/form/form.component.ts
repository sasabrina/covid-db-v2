import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InfectedService } from '../../../services/infected.service';
import { CountriesService } from '../../../services/countries.service'
import { TrackHttpError } from '../../../models/error-model';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';


@Component({
  selector: 'app-form2',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  title: string;
  countries: [];
  validateMessage = "You must enter a value";
  isEditing: boolean;
  dataToUpdate: any;

  constructor(
    public dialogRef: MatDialogRef<FormComponent>,
    public service: InfectedService,
    public cService: CountriesService,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) matData:any
  ) { 
      this.isEditing = matData ? true : false
      this.title = this.isEditing ? "Update infected" : "Add a new infected"
      this.dataToUpdate = matData
      
    }

  ngOnInit(): void {
    this.getCountries()
  }

  getCountries(){
    this.cService.getInfectedCountries()
    .subscribe((res:any) => {
      if(res){
        this.countries = res[0]
      }
    })
  }

  resetForm(form?: NgForm){
    if(form != null)
    form.resetForm()

    this.service.formData = {
      id: '',
      first_name: '',
      last_name: '',
      country_id: '',
      country_name: '',
      status_id: '',
      age: '',
      infect_date: '',
      gender_id: ''
    }
  }
  
  onSubmit(form:NgForm){
    if(form != null){
      if(!this.isEditing){
        this.add(form.value)
      }else{
        this.edit(form.value)
      }
    }
  }
  
  add(data: any){
    const payload = this.generatePayload(data)

    this.service.addNewInfected(payload)
      .subscribe(res => {
        if(res){
          this.showSuccess()
          setTimeout(() => {
            this.onClose()
          }, 1000);
        }
      },
      (error: TrackHttpError) => {
        console.log(error);
        this.showError()
     });
  }
  
  edit(data: any){
    const payload = {...this.generatePayload(data), id: this.dataToUpdate.id}

    this.service.updateInfected(payload)
      .subscribe(res => {
        if(res){
          this.showSuccess()
          setTimeout(() => {
            this.onClose()
          }, 1000);
        }
      },
      (error: TrackHttpError) => {
        console.log(error);
        this.showError()
    });
  }

  onClose(){
    this.dialogRef.close()
    this.service.filter('')
    this.resetForm()
  }

  showSuccess() {
    this.toastr.success('Your information has been loaded successfully!', 'Success!');
  }

  showError() {
    this.toastr.error("Sorry, something went wrong. Try again.", 'Error.')
  }

  generatePayload(data: any) {
    this.countries.forEach((c:any) => {
      if(data.country_name === c.name){
        data.country_id = c.id
      }
    })
    return {id: data.id,
      first_name: data.first_name,
      last_name: data.last_name,
      infect_date: moment(data.infect_date).format('YYYY-MM-DD HH:mm:ss'),
      status_id: data.status_id === "yes" ? 1 : 2,
      age: new Date().getFullYear() - new Date(data.age).getFullYear(),
      gender_id: data.gender_id === "female" ? 1 : 2,
      country_id: Number(data.country_id)
    }
  }
}
