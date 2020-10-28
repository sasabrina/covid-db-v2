import { Component, OnInit } from '@angular/core';

import { PhoneModalComponent } from './phone-modal/phone-modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-phone-auth',
  templateUrl: './phone-auth.component.html',
  styleUrls: ['./phone-auth.component.scss']
})
export class PhoneAuthComponent implements OnInit {
  showPhoneInput = false;
 

  constructor(
    
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  openModal(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    this.dialog.open(PhoneModalComponent, dialogConfig)
    
  }

}
