import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {AppointmentInterface} from "../../core/models/appointment.interface";

@Component({
  selector: 'appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  hours: Array<number>;

  constructor(public dialogRef: MatDialogRef<AppointmentFormComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AppointmentInterface) {
  }

  ngOnInit(): void {
    this.hours = [];
    for (let i = 1; i < 24; i++) {
      this.hours.push(i);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
