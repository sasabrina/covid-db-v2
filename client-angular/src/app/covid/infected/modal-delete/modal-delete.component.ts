import { Component, OnInit, Inject } from '@angular/core';
import { InfectedService } from '../../../services/infected.service';
import { TrackHttpError } from '../../../models/error-model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.scss']
})
export class ModalDeleteComponent implements OnInit {
  id: any;

  constructor(    
    public service: InfectedService,
    public dialogRef: MatDialogRef<ModalDeleteComponent>,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) matData:any) {
      this.id = matData
    }

  ngOnInit(): void {
  }

  onSubmit(id:any){
    this.service.deleteInfected(id)
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
    this.service.filter('Submit click')
  }

  showSuccess() {
    this.toastr.success('Deleted successfully!', 'Success!');
  }

  showError() {
    this.toastr.error("Sorry, something went wrong. Try again.", 'Error.')
  }
}
