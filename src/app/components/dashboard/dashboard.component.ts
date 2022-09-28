import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {WeekDay} from "@angular/common";
import {CdkDragDrop, moveItemInArray} from "@angular/cdk/drag-drop";
import {DayInterface} from "../../core/models/day.interface";
import {MatDialog} from "@angular/material/dialog";
import {AppointmentFormComponent} from "../appointment-form/appointment-form.component";
import {AppointmentInterface} from "../../core/models/appointment.interface";
import {AlertService} from "../../core/services/alert.service";

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges {

  @Input() currentDay: DayInterface;
  @Output() updateAppointments: EventEmitter<AppointmentInterface[]> = new EventEmitter<AppointmentInterface[]>()

  day: number;
  weekDay: string;
  timezoneOffset: number;
  hours: Array<number>;
  appointments: AppointmentInterface[];
  currentAppointment: AppointmentInterface;

  constructor(public dialog: MatDialog, private alertService: AlertService) {
    this.appointments = [];
  }

  ngOnInit(): void {
    this._initialize();
  }

  deleteAppointment($event: any, hour: number) {
    this.alertService.confirm().then(
      (result) => {
        if (result.isConfirmed) {
          delete this.appointments[hour];
          this.updateAppointments.emit(this.appointments);
          this.alertService.success('The appointment was deleted');
        }
      }
    ).catch((err) => {
      console.log(err);
      this.alertService.error('Some thing went wrong!');
    })
    return false;
  }

  drop(event: CdkDragDrop<any[]>) {
    const prevHour = this.hours[event.previousIndex];
    const currentHour = this.hours[event.currentIndex];
    const appointment = this.appointments[prevHour];


    if (appointment) {
      // @ts-ignore
      const difference = appointment?.to - appointment?.from;
      this.appointments[currentHour] = {
        title: appointment?.title,
        from: currentHour,
        to: currentHour + difference,
      }
      delete this.appointments[prevHour];
      this.updateAppointments.emit(this.appointments);
    }
  }

  addAppointment(hour: number) {
    this.openDialog(hour)
  }

  ngOnChanges(changes: SimpleChanges) {
    this._initialize();
  }

  openDialog(hour: number): void {
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      width: '500px',
      data: this.appointments[hour] || {
        title: '',
        from: hour,
        to: null,
      },
    });

    dialogRef.afterClosed().subscribe((result: AppointmentInterface) => {
      if (result?.from) {
        delete this.appointments[hour];
        this.appointments[result.from] = result;
        this.updateAppointments.emit(this.appointments);
      }
    });
  }

  private _initialize() {
    const date = this.currentDay.date;
    this.appointments = this.currentDay.appointments || [];
    this.day = date.getDate();
    this.weekDay = WeekDay[date.getDay()];
    this.timezoneOffset = date.getTimezoneOffset();
    this.hours = [];
    for (let i = 1; i < 24; i++) {
      this.hours.push(i);
    }
  }
}
